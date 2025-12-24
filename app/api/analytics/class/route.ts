import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    metrics: {
      totalClasses: 45,
      activeClasses: 12,
      avgAttendance: 88,
      avgPerformance: 85,
      completionRate: 92
    },
    classPerformance: [
      { id: 'advanced-calculus', name: 'Advanced Calculus', teacher: 'Dr. Sarah Johnson', students: 32, attendance: 95, avgGrade: 88 },
      { id: 'quantum-mechanics', name: 'Quantum Mechanics', teacher: 'Prof. Michael Chen', students: 28, attendance: 92, avgGrade: 85 },
      { id: 'organic-chemistry', name: 'Organic Chemistry', teacher: 'Dr. Robert Wilson', students: 35, attendance: 90, avgGrade: 87 },
      { id: 'molecular-biology', name: 'Molecular Biology', teacher: 'Ms. Lisa Anderson', students: 30, attendance: 88, avgGrade: 86 }
    ],
    weeklySchedule: [
      { day: 'Monday', classes: 8, hours: 24 }, { day: 'Tuesday', classes: 9, hours: 27 },
      { day: 'Wednesday', classes: 8, hours: 24 }, { day: 'Thursday', classes: 10, hours: 30 },
      { day: 'Friday', classes: 7, hours: 21 }
    ],
    weeklyAttendance: [
      { day: 'Mon', rate: 95 }, { day: 'Tue', rate: 92 }, { day: 'Wed', rate: 90 },
      { day: 'Thu', rate: 88 }, { day: 'Fri', rate: 85 }, { day: 'Sat', rate: 80 }, { day: 'Sun', rate: 78 }
    ]
  });
}
