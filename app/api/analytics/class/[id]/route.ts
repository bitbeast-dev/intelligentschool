import { NextResponse } from 'next/server';

const classData: any = {
  'advanced-calculus': {
    id: 'advanced-calculus',
    name: 'Advanced Calculus',
    teacher: 'Dr. Sarah Johnson',
    schedule: 'Mon, Wed, Fri - 10:00 AM',
    room: 'Room 301',
    students: [
      { id: 1, name: 'John Smith', grade: 'A', attendance: 95 },
      { id: 2, name: 'Emma Wilson', grade: 'A-', attendance: 92 },
      { id: 3, name: 'Michael Brown', grade: 'B+', attendance: 88 }
    ],
    assignments: [
      { id: 1, title: 'Derivatives Problem Set', dueDate: '2024-02-15', submitted: 28, total: 32 },
      { id: 2, title: 'Integration Quiz', dueDate: '2024-02-20', submitted: 30, total: 32 }
    ]
  },
  'quantum-mechanics': {
    id: 'quantum-mechanics',
    name: 'Quantum Mechanics',
    teacher: 'Prof. Michael Chen',
    schedule: 'Tue, Thu - 2:00 PM',
    room: 'Lab A',
    students: [
      { id: 1, name: 'Sophia Davis', grade: 'A', attendance: 98 },
      { id: 2, name: 'James Johnson', grade: 'B', attendance: 85 }
    ],
    assignments: [
      { id: 1, title: 'Wave Functions Lab', dueDate: '2024-02-18', submitted: 25, total: 28 }
    ]
  }
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const data = classData[params.id];
  if (!data) return NextResponse.json({ error: 'Class not found' }, { status: 404 });
  return NextResponse.json(data);
}
