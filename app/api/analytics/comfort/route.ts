import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    metrics: {
      avgTemperature: 22.5,
      avgHumidity: 45,
      avgNoise: 35,
      avgLight: 450,
      comfortScore: 85
    },
    classrooms: [
      { room: 'Room 101', temperature: 22, humidity: 45, noise: 30, light: 450, status: 'optimal' },
      { room: 'Room 102', temperature: 24, humidity: 50, noise: 40, light: 420, status: 'good' },
      { room: 'Room 103', temperature: 21, humidity: 42, noise: 35, light: 480, status: 'optimal' },
      { room: 'Lab A', temperature: 23, humidity: 48, noise: 45, light: 500, status: 'good' },
      { room: 'Lab B', temperature: 25, humidity: 55, noise: 50, light: 400, status: 'warning' }
    ],
    temperatureTrend: [
      { hour: '8AM', temp: 20, humidity: 40 }, { hour: '9AM', temp: 21, humidity: 42 },
      { hour: '10AM', temp: 22, humidity: 44 }, { hour: '11AM', temp: 23, humidity: 46 },
      { hour: '12PM', temp: 24, humidity: 48 }, { hour: '1PM', temp: 25, humidity: 50 },
      { hour: '2PM', temp: 24, humidity: 49 }, { hour: '3PM', temp: 23, humidity: 47 }
    ]
  });
}
