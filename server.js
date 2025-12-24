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

  let ffmpegProcess = null;
  let clients = new Set();

  const startFFmpeg = () => {
    if (ffmpegProcess) return;
    
    console.log('🎬 Starting FFmpeg stream...');
    ffmpegProcess = spawn('ffmpeg', [
      '-rtsp_transport', 'tcp',
      '-i', 'rtsp://admin:LBEVFF@192.168.1.132:554/Streaming/Channels/101',
      '-an',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-tune', 'zerolatency',
      '-profile:v', 'baseline',
      '-level', '3.0',
      '-pix_fmt', 'yuv420p',
      '-r', '25',
      '-g', '50',
      '-sc_threshold', '0',
      '-f', 'mpegts',
      '-mpegts_copyts', '1',
      '-mpegts_flags', 'resend_headers',
      'pipe:1'
    ], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    ffmpegProcess.stdout.on('data', (chunk) => {
      clients.forEach(ws => {
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
      if (msg.includes('frame=')) {
        process.stdout.write('\r✓ ' + msg.split('frame=')[1].split('\n')[0].trim());
      }
    });

    ffmpegProcess.on('close', (code) => {
      console.log(`\n⚠ FFmpeg exited with code ${code}`);
      ffmpegProcess = null;
      if (clients.size > 0) {
        console.log('🔄 Restarting FFmpeg in 2 seconds...');
        setTimeout(startFFmpeg, 2000);
      }
    });

    ffmpegProcess.on('error', (err) => {
      console.error('❌ FFmpeg error:', err);
      ffmpegProcess = null;
      if (clients.size > 0) {
        setTimeout(startFFmpeg, 2000);
      }
    });
  };

  wss.on('connection', (ws) => {
    console.log('🎥 Client connected (Total:', clients.size + 1, ')');
    clients.add(ws);
    
    if (!ffmpegProcess) {
      startFFmpeg();
    }

    ws.on('close', () => {
      clients.delete(ws);
      console.log('👋 Client disconnected (Remaining:', clients.size, ')');
      
      if (clients.size === 0 && ffmpegProcess) {
        console.log('⏸ No clients connected, keeping stream alive...');
      }
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
      clients.delete(ws);
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log('> WebSocket streaming at ws://localhost:3000/api/stream-ws');
  });
});
