'use client';
import { useEffect, useRef, useState } from 'react';

export default function LiveStreamWS() {
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const queueRef = useRef([]);
  const [status, setStatus] = useState('disconnected');

  const mountedRef = useRef(true);

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
  }, []);

  const connectStream = () => {
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
            
            if (sourceBuffer.buffered.length > 0) {
              const bufferedEnd = sourceBuffer.buffered.end(0);
              const currentTime = video.currentTime;
              if (bufferedEnd - currentTime > 30) {
                try {
                  sourceBuffer.remove(0, currentTime - 5);
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
  };

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:3000/api/stream-ws');
    wsRef.current = ws;
    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      setStatus('connected');
      console.log('✅ Connected to live stream');
    };

    ws.onmessage = (event) => {
      const chunk = new Uint8Array(event.data);
      const sourceBuffer = sourceBufferRef.current;

      if (sourceBuffer && mediaSourceRef.current.readyState === 'open') {
        if (!sourceBuffer.updating) {
          try {
            sourceBuffer.appendBuffer(chunk);
          } catch (err) {
            queueRef.current.push(chunk);
          }
        } else {
          queueRef.current.push(chunk);
        }
      }
    };

    ws.onerror = () => {
      setStatus('error');
      console.error('❌ WebSocket error');
    };

    ws.onclose = () => {
      setStatus('disconnected');
      console.log('👋 Disconnected from stream');
      if (mountedRef.current) {
        setTimeout(() => {
          if (mountedRef.current) {
            console.log('🔄 Reconnecting...');
            connectStream();
          }
        }, 3000);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-full mx-auto p-2 sm:p-4 lg:p-6">
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-purple-600 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                  status === 'connected' ? 'bg-green-400 animate-pulse' :
                  status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                }`}></div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Live Camera Stream</h1>
                  <p className="text-xs sm:text-sm text-gray-200">Zero File Storage • WebSocket</p>
                </div>
              </div>
              <div className="text-left sm:text-right text-white text-xs sm:text-sm">
                <div>Status: <strong className="capitalize">{status}</strong></div>
              </div>
            </div>
          </div>

          <div className="relative bg-black aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full"
              autoPlay
              muted
              playsInline
              controls
            />
            {status === 'error' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
                <div className="text-center p-4">
                  <div className="text-red-400 text-base sm:text-xl mb-4">Connection Error</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white text-sm sm:text-base rounded-lg hover:bg-red-700"
                  >
                    Reconnect
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 bg-gray-750 border-t border-gray-700">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <div className="text-gray-400">Protocol</div>
                <div className="text-white font-semibold">WebSocket</div>
              </div>
              <div>
                <div className="text-gray-400">Codec</div>
                <div className="text-white font-semibold">H.264 (Video Only)</div>
              </div>
              <div>
                <div className="text-gray-400">Format</div>
                <div className="text-white font-semibold">MPEG-TS</div>
              </div>
              <div>
                <div className="text-gray-400">Storage</div>
                <div className="text-green-400 font-semibold">In-Memory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
