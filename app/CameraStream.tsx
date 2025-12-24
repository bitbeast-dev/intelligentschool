'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function CameraStream({ cameraId, rtspUrl, name }) {
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const queueRef = useRef([]);
  const mountedRef = useRef(true);
  const containerRef = useRef(null);
  const [status, setStatus] = useState('disconnected');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [bufferHealth, setBufferHealth] = useState(100);
  const [fps, setFps] = useState(0);
  const lastFrameTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);

  const connectWebSocket = useCallback(() => {
    const wsUrl = `ws://localhost:3000/api/stream-ws?camera=${encodeURIComponent(cameraId)}&rtsp=${encodeURIComponent(rtspUrl)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      setStatus('connected');
      console.log(`✅ Connected to camera ${cameraId}`);
    };

    ws.onmessage = (event) => {
      const chunk = new Uint8Array(event.data);
      const sourceBuffer = sourceBufferRef.current;

      // Track FPS
      frameCountRef.current++;
      const now = Date.now();
      if (now - lastFrameTimeRef.current >= 1000) {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
        lastFrameTimeRef.current = now;
      }

      if (sourceBuffer && mediaSourceRef.current.readyState === 'open') {
        if (!sourceBuffer.updating) {
          try {
            sourceBuffer.appendBuffer(chunk);
          } catch (err) {
            if (queueRef.current.length < 50) {
              queueRef.current.push(chunk);
            }
          }
        } else {
          if (queueRef.current.length < 50) {
            queueRef.current.push(chunk);
          }
        }
      }
    };

    ws.onerror = () => {
      setStatus('error');
      console.error(`❌ WebSocket error for camera ${cameraId}`);
    };

    ws.onclose = () => {
      setStatus('disconnected');
      console.log(`👋 Disconnected from camera ${cameraId}`);
      if (mountedRef.current) {
        setTimeout(() => {
          if (mountedRef.current) {
            console.log(`🔄 Reconnecting camera ${cameraId}...`);
            connectStream();
          }
        }, 3000);
      }
    };
  }, [cameraId, rtspUrl]);

  const connectStream = useCallback(() => {
    const video = videoRef.current;
    
    if ('MediaSource' in window) {
      const mediaSource = new MediaSource();
      mediaSourceRef.current = mediaSource;
      video.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener('sourceopen', () => {
        try {
          const sourceBuffer = mediaSource.addSourceBuffer('video/mp2t; codecs="avc1.42E01E"');
          sourceBufferRef.current = sourceBuffer;
          sourceBuffer.mode = 'sequence';
          
          sourceBuffer.addEventListener('updateend', () => {
            if (queueRef.current.length > 0 && !sourceBuffer.updating) {
              const nextChunk = queueRef.current.shift();
              try {
                sourceBuffer.appendBuffer(nextChunk);
              } catch (err) {
                console.error('Buffer append error:', err);
              }
            }
            
            // Update buffer health and auto-play
            if (sourceBuffer.buffered.length > 0) {
              const bufferedEnd = sourceBuffer.buffered.end(0);
              const currentTime = video.currentTime;
              const bufferLength = bufferedEnd - currentTime;
              setBufferHealth(Math.min(100, (bufferLength / 3) * 100));
              
              // Auto-play when buffer is ready
              if (bufferLength > 1 && video.paused) {
                video.play().catch(() => {});
              }
              
              // Aggressive buffer cleanup for low latency
              if (bufferLength > 10) {
                try {
                  sourceBuffer.remove(0, currentTime - 2);
                } catch (e) {}
              }
            }
          });

          connectWebSocket();
        } catch (err) {
          console.error('SourceBuffer error:', err);
          setStatus('error');
        }
      });
    }
  }, [connectWebSocket]);

  useEffect(() => {
    mountedRef.current = true;
    connectStream();
    return () => {
      mountedRef.current = false;
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connectStream]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            status === 'connected' ? 'bg-green-400 animate-pulse' :
            status === 'error' ? 'bg-red-400' : 'bg-gray-400'
          }`}></div>
          <span className="text-white font-semibold text-sm">{name}</span>
        </div>
        <div className="flex items-center gap-3">
          {status === 'connected' && (
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    bufferHealth > 70 ? 'bg-green-400' :
                    bufferHealth > 40 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${bufferHealth}%` }}
                />
              </div>
              <span className="text-xs text-gray-200">{fps} FPS</span>
              <span className="text-xs text-gray-200">540p</span>
            </div>
          )}
          <span className="text-xs text-gray-200 capitalize">{status}</span>
        </div>
      </div>
      
      <div className="relative bg-black aspect-video group">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
        />
        
        {/* Custom Controls Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-white hover:text-indigo-400 transition-colors p-2 hover:bg-white/10 rounded-lg"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>
              
              <button
                onClick={toggleMute}
                className="text-white hover:text-indigo-400 transition-colors p-2 hover:bg-white/10 rounded-lg"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-white text-xs bg-red-600 px-2 py-1 rounded font-semibold">LIVE</span>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-indigo-400 transition-colors p-2 hover:bg-white/10 rounded-lg"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
              </button>
            </div>
          </div>
        </div>
        
        {status !== 'connected' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
            <div className="text-center">
              {status === 'disconnected' && (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <div className="text-white text-sm">Connecting...</div>
                </>
              )}
              {status === 'error' && (
                <>
                  <div className="text-red-400 text-lg mb-4">Connection Error</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                  >
                    Reconnect
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
