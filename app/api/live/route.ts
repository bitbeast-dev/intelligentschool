import { NextResponse } from 'next/server';

const liveClasses = [
  { id: 1, title: 'Advanced Calculus', teacher: 'Dr. Sarah Johnson', viewers: 45, thumbnail: 'https://via.placeholder.com/320x180', streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', isLive: true, startTime: '10:00 AM' },
  { id: 2, title: 'Quantum Physics', teacher: 'Prof. Michael Chen', viewers: 38, thumbnail: 'https://via.placeholder.com/320x180', streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', isLive: true, startTime: '11:00 AM' },
  { id: 3, title: 'Organic Chemistry', teacher: 'Dr. Robert Wilson', viewers: 52, thumbnail: 'https://via.placeholder.com/320x180', streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', isLive: true, startTime: '2:00 PM' }
];

export async function GET() {
  return NextResponse.json({ classes: liveClasses });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newClass = { id: liveClasses.length + 1, viewers: 0, isLive: true, ...body };
  liveClasses.push(newClass);
  return NextResponse.json(newClass, { status: 201 });
}
