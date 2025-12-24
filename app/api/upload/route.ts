import { NextResponse } from 'next/server';
import { spawn, exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);
let ffmpegProcess: any = null;

function cleanupHLSFiles(hlsDir: string) {
  if (!fs.existsSync(hlsDir)) return { deletedCount: 0, freedSpace: 0 };
  
  const files = fs.readdirSync(hlsDir);
  let deletedCount = 0;
  let freedSpace = 0;
  
  files.forEach(file => {
    if (file.startsWith('stream') && (file.endsWith('.ts') || file.endsWith('.m3u8') || file.endsWith('.tmp'))) {
      const filePath = path.join(hlsDir, file);
      try {
        const stats = fs.statSync(filePath);
        freedSpace += stats.size;
        fs.unlinkSync(filePath);
        deletedCount++;
      } catch (err) {
        console.error(`Failed to delete ${file}:`, err);
      }
    }
  });
  
  return { deletedCount, freedSpace };
}

function waitForFile(filePath: string, timeout = 10000): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (fs.existsSync(filePath)) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 500);
  });
}

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

      // Clean up old files before starting
      const cleanup = cleanupHLSFiles(hlsDir);
      console.log(`Cleaned up ${cleanup.deletedCount} files, freed ${(cleanup.freedSpace / 1024 / 1024).toFixed(2)} MB`);

      const outputPath = path.join(hlsDir, 'stream.m3u8');
      const segmentPath = path.join(hlsDir, 'stream%d.ts');

      ffmpegProcess = spawn('ffmpeg', [
        '-rtsp_transport', 'tcp',
        '-i', body.rtspUrl || 'rtsp://admin:LBEVFF@192.168.1.132:554/Streaming/Channels/101',
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-f', 'hls',
        '-hls_time', '2',
        '-hls_list_size', '3',
        '-hls_flags', 'delete_segments',
        '-hls_segment_filename', segmentPath,
        outputPath
      ], {
        windowsHide: true
      });

      ffmpegProcess.stdout.on('data', (data: any) => {
        console.log(`FFmpeg stdout: ${data}`);
      });

      ffmpegProcess.stderr.on('data', (data: any) => {
        console.error(`FFmpeg: ${data}`);
      });

      ffmpegProcess.on('close', (code: any) => {
        console.log(`FFmpeg exited with code ${code}`);
        ffmpegProcess = null;
      });

      // Wait for stream.m3u8 to be created
      const fileCreated = await waitForFile(outputPath, 10000);
      
      if (!fileCreated) {
        if (ffmpegProcess) {
          ffmpegProcess.kill();
          ffmpegProcess = null;
        }
        return NextResponse.json({ error: 'Stream failed to start - m3u8 file not created' }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Stream started successfully',
        cleanup,
        streamUrl: '/hls/stream.m3u8'
      });
    }

    if (action === 'stop') {
      try {
        await execAsync('taskkill /F /IM ffmpeg.exe');
      } catch (error) {
        console.error('Error stopping FFmpeg:', error);
      }
      ffmpegProcess = null;
      
      // Clean up files after stopping
      const hlsDir = path.join(process.cwd(), 'public', 'hls');
      const cleanup = cleanupHLSFiles(hlsDir);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Stream stopped', 
        cleanup 
      });
    }

    if (action === 'cleanup') {
      const hlsDir = path.join(process.cwd(), 'public', 'hls');
      const cleanup = cleanupHLSFiles(hlsDir);
      return NextResponse.json({ 
        success: true, 
        message: 'Cleanup completed',
        deletedFiles: cleanup.deletedCount,
        freedSpaceMB: (cleanup.freedSpace / 1024 / 1024).toFixed(2)
      });
    }

    if (action === 'status') {
      const hlsDir = path.join(process.cwd(), 'public', 'hls');
      const m3u8Path = path.join(hlsDir, 'stream.m3u8');
      
      if (!fs.existsSync(hlsDir)) {
        return NextResponse.json({ 
          fileCount: 0, 
          totalSizeMB: '0', 
          isStreaming: false,
          m3u8Exists: false
        });
      }
      
      const files = fs.readdirSync(hlsDir);
      let totalSize = 0;
      let fileCount = 0;
      
      files.forEach(file => {
        if (file.startsWith('stream')) {
          const filePath = path.join(hlsDir, file);
          try {
            const stats = fs.statSync(filePath);
            totalSize += stats.size;
            fileCount++;
          } catch (err) {
            // Ignore
          }
        }
      });
      
      return NextResponse.json({ 
        fileCount, 
        totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
        isStreaming: ffmpegProcess !== null,
        m3u8Exists: fs.existsSync(m3u8Path)
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
