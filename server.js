import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { WebSocketServer } from 'ws';
import { spawn } from 'child_process';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const wss = new WebSocketServer({ server, path: '/api/stream-ws' });

  let ffmpegProcesses = new Map();
  let clients = new Map();
  let hwAccelCache = null;

  const detectHardwareAccel = () => {
    if (hwAccelCache) return hwAccelCache;

    const encoders = [
      { name: 'NVIDIA NVENC', encoder: 'h264_nvenc', hwaccel: 'cuda', extra: ['-gpu', '0'] },
      { name: 'AMD AMF', encoder: 'h264_amf', hwaccel: 'd3d11va', extra: [] },
      { name: 'Intel QSV', encoder: 'h264_qsv', hwaccel: 'qsv', extra: [] },
      { name: 'D3D11VA', encoder: 'h264_mf', hwaccel: 'd3d11va', extra: [] },
      { name: 'Software', encoder: 'libx264', hwaccel: null, extra: [] }
    ];

    for (const enc of encoders) {
      try {
        const testArgs = enc.hwaccel ? ['-hwaccel', enc.hwaccel, '-i', 'nullsrc', '-c:v', enc.encoder] : ['-i', 'nullsrc', '-c:v', enc.encoder];
        const test = spawn('ffmpeg', [...testArgs, '-f', 'null', '-'], { stdio: 'pipe' });
        test.stdin.end();
        const exitCode = test.status;
        if (exitCode === 0 || exitCode === null) {
          console.log(`✅ Hardware Acceleration: ${enc.name}`);
          hwAccelCache = enc;
          return enc;
        }
      } catch (e) {}
    }
    
    console.log('⚠️ Using software encoding');
    hwAccelCache = encoders[4];
    return hwAccelCache;
  };

  const startFFmpeg = (cameraId, rtspUrl) => {
    if (ffmpegProcesses.has(cameraId)) return;
    
    const hwAccel = detectHardwareAccel();
    console.log(`🎬 Starting FFmpeg for camera ${cameraId} with ${hwAccel.name}...`);
    
    const baseArgs = [
      '-rtsp_transport', 'tcp',
      '-i', rtspUrl,
      '-an'
    ];

    const hwArgs = hwAccel.hwaccel ? ['-hwaccel', hwAccel.hwaccel, ...hwAccel.extra] : [];
    
    const encodeArgs = hwAccel.encoder === 'libx264' ? [
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-tune', 'zerolatency',
      '-profile:v', 'baseline',
      '-level', '3.1'
    ] : [
      '-c:v', hwAccel.encoder,
      '-preset', 'fast',
      '-tune', 'zerolatency',
      '-profile:v', 'baseline'
    ];

    const outputArgs = [
      '-pix_fmt', 'yuv420p',
      '-vf', 'scale=960:540',
      '-b:v', '1500k',
      '-maxrate', '2000k',
      '-bufsize', '3000k',
      '-r', '20',
      '-g', '40',
      '-sc_threshold', '0',
      '-f', 'mpegts',
      '-mpegts_copyts', '1',
      '-mpegts_flags', 'resend_headers',
      '-flush_packets', '0',
      'pipe:1'
    ];

    const ffmpegProcess = spawn('ffmpeg', [
      ...baseArgs.slice(0, 2),
      ...hwArgs,
      ...baseArgs.slice(2),
      ...encodeArgs,
      ...outputArgs
    ], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    ffmpegProcess.stdout.on('data', (chunk) => {
      const cameraClients = clients.get(cameraId) || new Set();
      cameraClients.forEach(ws => {
        if (ws.readyState === 1) {
          try {
            ws.send(chunk, { binary: true });
          } catch (err) {
            console.error('Error sending to client:', err);
          }
        }
      });
    });

    ffmpegProcess.stderr.on('data', (data) => {
      const msg = data.toString();
      console.error(`[${cameraId}] ${msg}`);
      if (msg.includes('frame=')) {
        process.stdout.write(`\r✓ [${cameraId}] ` + msg.split('frame=')[1].split('\n')[0].trim());
      }
    });

    ffmpegProcess.on('close', (code) => {
      console.log(`\n⚠ FFmpeg [${cameraId}] exited with code ${code}`);
      ffmpegProcesses.delete(cameraId);
      const cameraClients = clients.get(cameraId);
      if (cameraClients && cameraClients.size > 0 && code !== 0 && code !== null) {
        console.log(`🔄 Restarting FFmpeg [${cameraId}] in 3 seconds...`);
        setTimeout(() => startFFmpeg(cameraId, rtspUrl), 3000);
      }
    });

    ffmpegProcess.on('error', (err) => {
      console.error(`❌ FFmpeg [${cameraId}] error:`, err);
      ffmpegProcesses.delete(cameraId);
    });

    ffmpegProcesses.set(cameraId, ffmpegProcess);
  };

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const cameraId = url.searchParams.get('camera');
    const rtspUrl = url.searchParams.get('rtsp');
    
    if (!cameraId || !rtspUrl) {
      ws.close();
      return;
    }

    console.log(`🎥 Client connected to camera ${cameraId}`);
    
    if (!clients.has(cameraId)) {
      clients.set(cameraId, new Set());
    }
    clients.get(cameraId).add(ws);
    
    if (!ffmpegProcesses.has(cameraId)) {
      startFFmpeg(cameraId, decodeURIComponent(rtspUrl));
    }

    ws.on('close', () => {
      const cameraClients = clients.get(cameraId);
      if (cameraClients) {
        cameraClients.delete(ws);
        console.log(`👋 Client disconnected from camera ${cameraId} (Remaining: ${cameraClients.size})`);
        
        if (cameraClients.size === 0) {
          clients.delete(cameraId);
          const ffmpeg = ffmpegProcesses.get(cameraId);
          if (ffmpeg) {
            ffmpeg.kill('SIGTERM');
            ffmpegProcesses.delete(cameraId);
            console.log(`⏸ Stopped FFmpeg for camera ${cameraId}`);
          }
        }
      }
    });

    ws.on('error', (err) => {
      console.error(`WebSocket error for camera ${cameraId}:`, err);
      const cameraClients = clients.get(cameraId);
      if (cameraClients) {
        cameraClients.delete(ws);
      }
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log('> Multi-camera WebSocket streaming at ws://localhost:3000/api/stream-ws');
  });
});
