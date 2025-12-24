import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch student analytics
    const students = await prisma.student.findMany({
      select: {
        attendance: true,
        focus: true,
        engagement: true,
        notetaking: true,
        deviceUsage: true,
        behavior: true
      }
    });

    if (students.length === 0) {
      return NextResponse.json({
        students: { avgAttendance: 0, avgFocus: 0, avgEngagement: 0, avgNotetaking: 0, avgDeviceUsage: 0, totalStudents: 0 },
        teachers: { avgTeachingHours: '0', avgEngagement: 0, avgCoverage: 0, avgPunctuality: 0, avgResourceUse: 0, avgProfDev: 0, totalTeachers: 0 },
        environment: []
      });
    }

    const studentMetrics = {
      avgAttendance: Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length),
      avgFocus: Math.round(students.reduce((sum, s) => sum + s.focus, 0) / students.length),
      avgEngagement: Math.round(students.reduce((sum, s) => sum + s.engagement, 0) / students.length),
      avgNotetaking: Math.round(students.reduce((sum, s) => sum + s.notetaking, 0) / students.length),
      avgDeviceUsage: Math.round(students.reduce((sum, s) => sum + s.deviceUsage, 0) / students.length),
      totalStudents: students.length
    };

    // Fetch teacher analytics
    const teachers = await prisma.teacher.findMany({
      select: {
        teachingHours: true,
        engagement: true,
        coverage: true,
        punctuality: true,
        resourceUse: true,
        profDev: true
      }
    });

    const teacherMetrics = teachers.length > 0 ? {
      avgTeachingHours: (teachers.reduce((sum, t) => sum + t.teachingHours, 0) / teachers.length).toFixed(1),
      avgEngagement: Math.round(teachers.reduce((sum, t) => sum + t.engagement, 0) / teachers.length),
      avgCoverage: Math.round(teachers.reduce((sum, t) => sum + t.coverage, 0) / teachers.length),
      avgPunctuality: Math.round(teachers.reduce((sum, t) => sum + t.punctuality, 0) / teachers.length),
      avgResourceUse: Math.round(teachers.reduce((sum, t) => sum + t.resourceUse, 0) / teachers.length),
      avgProfDev: Math.round(teachers.reduce((sum, t) => sum + t.profDev, 0) / teachers.length),
      totalTeachers: teachers.length
    } : { avgTeachingHours: '0', avgEngagement: 0, avgCoverage: 0, avgPunctuality: 0, avgResourceUse: 0, avgProfDev: 0, totalTeachers: 0 };

    // Fetch environment sensors
    const sensors = await prisma.environmentSensor.findMany({
      orderBy: { timestamp: 'desc' },
      take: 5
    });

    return NextResponse.json({
      students: studentMetrics,
      teachers: teacherMetrics,
      environment: sensors
    });
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch dashboard data',
      students: { avgAttendance: 0, avgFocus: 0, avgEngagement: 0, avgNotetaking: 0, avgDeviceUsage: 0, totalStudents: 0 },
      teachers: { avgTeachingHours: '0', avgEngagement: 0, avgCoverage: 0, avgPunctuality: 0, avgResourceUse: 0, avgProfDev: 0, totalTeachers: 0 },
      environment: []
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
