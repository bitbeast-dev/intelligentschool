import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    metrics: {
      averageGPA: 3.65,
      attendanceRate: 92,
      totalStudents: 1248,
      activeStudents: 1180,
      graduationRate: 96
    },
    subjectPerformance: [
      { subject: 'Mathematics', score: 85, trend: 'up' },
      { subject: 'Physics', score: 82, trend: 'up' },
      { subject: 'Chemistry', score: 88, trend: 'down' },
      { subject: 'Biology', score: 90, trend: 'up' },
      { subject: 'English', score: 87, trend: 'stable' }
    ],
    gradeDistribution: [
      { grade: 'A', count: 450, percentage: 36 },
      { grade: 'B', count: 520, percentage: 42 },
      { grade: 'C', count: 200, percentage: 16 },
      { grade: 'D', count: 50, percentage: 4 },
      { grade: 'F', count: 28, percentage: 2 }
    ],
    performanceTrend: [
      { month: 'Jan', score: 85 }, { month: 'Feb', score: 86 }, { month: 'Mar', score: 87 },
      { month: 'Apr', score: 88 }, { month: 'May', score: 89 }, { month: 'Jun', score: 90 },
      { month: 'Jul', score: 91 }, { month: 'Aug', score: 92 }, { month: 'Sep', score: 93 },
      { month: 'Oct', score: 94 }, { month: 'Nov', score: 93 }, { month: 'Dec', score: 92 }
    ],
    weeklyAttendance: [
      { day: 'Mon', rate: 95 }, { day: 'Tue', rate: 93 }, { day: 'Wed', rate: 92 },
      { day: 'Thu', rate: 90 }, { day: 'Fri', rate: 88 }, { day: 'Sat', rate: 85 }, { day: 'Sun', rate: 82 }
    ]
  });
}
