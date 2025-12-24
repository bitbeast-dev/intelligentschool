import { NextResponse } from 'next/server';

const teachers = [
  { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', email: 'sarah.johnson@school.com', phone: '+1 234-567-8901', status: 'active', classes: 5, students: 120 },
  { id: 2, name: 'Prof. Michael Chen', subject: 'Physics', email: 'michael.chen@school.com', phone: '+1 234-567-8902', status: 'active', classes: 4, students: 95 },
  { id: 3, name: 'Ms. Emily Davis', subject: 'English Literature', email: 'emily.davis@school.com', phone: '+1 234-567-8903', status: 'inactive', classes: 3, students: 78 },
  { id: 4, name: 'Dr. Robert Wilson', subject: 'Chemistry', email: 'robert.wilson@school.com', phone: '+1 234-567-8904', status: 'active', classes: 6, students: 140 },
  { id: 5, name: 'Ms. Lisa Anderson', subject: 'Biology', email: 'lisa.anderson@school.com', phone: '+1 234-567-8905', status: 'active', classes: 4, students: 110 }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let filtered = teachers;
  if (status && status !== 'all') filtered = filtered.filter(t => t.status === status);
  if (search) filtered = filtered.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  return NextResponse.json({ teachers: filtered, total: teachers.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTeacher = { id: teachers.length + 1, ...body };
  teachers.push(newTeacher);
  return NextResponse.json(newTeacher, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const index = teachers.findIndex(t => t.id === body.id);
  if (index !== -1) teachers[index] = body;
  return NextResponse.json(body);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '0');
  const index = teachers.findIndex(t => t.id === id);
  if (index !== -1) teachers.splice(index, 1);
  return NextResponse.json({ success: true });
}
