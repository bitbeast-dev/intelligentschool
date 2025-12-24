import { NextResponse } from 'next/server';
import { spawn, exec } from 'child_process';
import fs from 'fs';
import path from 'path';

let ffmpegProcess: any = null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const action = body.action;

    if (action === 'start') {
      if (ffmpegProcess) {
        return NextResponse.json({ error: 'Stream already running' }, { status: 400 });
      }

      const hlsDir = path.join(process.cwd(), 'public', 'hls');
      if (!fs.existsSync(hlsDir)) {
        fs.mkdirSync(hlsDir, { recursive: true });
      }

      const outputPath = path.join(hlsDir, 'stream.m3u8');

      ffmpegProcess = spawn('ffmpeg', [
        '-rtsp_transport', 'tcp',
        '-i', body.rtspUrl || 'rtsp://admin:LBEVFF@192.168.1.132:554/Streaming/Channels/101',
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-f', 'hls',
        '-hls_time', '2',
        '-hls_list_size', '6',
        '-hls_flags', 'delete_segments+append_list',
        outputPath
      ]);

      ffmpegProcess.stderr.on('data', (data: any) => {
        console.error(`FFmpeg: ${data}`);
      });

      ffmpegProcess.on('close', (code: any) => {
        console.log(`FFmpeg exited with code ${code}`);
        ffmpegProcess = null;
      });

      return NextResponse.json({ success: true, message: 'Stream started' });
    }

    if (action === 'stop') {
      exec('taskkill /IM ffmpeg.exe /F', (error) => {
        if (error) {
          console.error('Error stopping FFmpeg:', error);
        }
      });
      ffmpegProcess = null;
      return NextResponse.json({ success: true, message: 'Stream stopped' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
