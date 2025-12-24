import { NextResponse } from 'next/server';

let latestData: any = {
  temperature: null,
  humidity: null,
  co2: null,
  lighting: null,
  noise: null,
  distance: null,
  voltage: null,
  timestamp: null
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    latestData = {
      ...data,
      timestamp: new Date().toISOString()
    };
    return NextResponse.json({ success: true, message: 'Data received' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(latestData);
}
