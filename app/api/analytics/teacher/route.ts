import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    metrics: {
      totalTeachers: 87,
      averageRating: 4.5,
      totalClasses: 245,
      studentSatisfaction: 92,
      activeTeachers: 82
    },
    teacherPerformance: [
      { name: 'Dr. Sarah Johnson', rating: 4.8, classes: 5, students: 120, trend: 'up' },
      { name: 'Prof. Michael Chen', rating: 4.6, classes: 4, students: 95, trend: 'up' },
      { name: 'Dr. Robert Wilson', rating: 4.9, classes: 6, students: 140, trend: 'stable' },
      { name: 'Ms. Lisa Anderson', rating: 4.5, classes: 4, students: 110, trend: 'up' },
      { name: 'Ms. Emily Davis', rating: 4.3, classes: 3, students: 78, trend: 'down' }
    ],
    ratingDistribution: [
      { rating: '5.0', count: 25 }, { rating: '4.5', count: 35 },
      { rating: '4.0', count: 18 }, { rating: '3.5', count: 7 }, { rating: '3.0', count: 2 }
    ]
  });
}
