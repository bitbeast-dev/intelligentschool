import { NextResponse } from 'next/server';

const profile = {
  id: 1,
  name: 'Admin User',
  email: 'admin@school.com',
  phone: '+1 234-567-8900',
  role: 'Administrator',
  department: 'Management',
  joinDate: '2020-01-15',
  avatar: 'https://via.placeholder.com/150',
  bio: 'School system administrator',
  settings: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    twoFactorAuth: false
  }
};

export async function GET() {
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const body = await request.json();
  Object.assign(profile, body);
  return NextResponse.json(profile);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  if (body.settings) Object.assign(profile.settings, body.settings);
  return NextResponse.json(profile);
}
