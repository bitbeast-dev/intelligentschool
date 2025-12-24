import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  if (email === 'admin@school.com' && password === 'admin123') {
    return NextResponse.json({
      success: true,
      token: 'mock-jwt-token',
      user: { id: 1, name: 'Admin User', email, role: 'admin' }
    });
  }
  
  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
