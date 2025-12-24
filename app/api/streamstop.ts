import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST() {
  try {
    exec('taskkill /IM ffmpeg.exe /F', (error) => {
      if (error) {
        console.error('Error stopping FFmpeg:', error);
      }
    });

    return NextResponse.json({ success: true, message: 'Stream stopped' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
