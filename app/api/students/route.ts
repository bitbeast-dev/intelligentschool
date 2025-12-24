import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const grade = searchParams.get('grade') || '';

    const students = await prisma.student.findMany({
      where: {
        AND: [
          search ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { class: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } }
            ]
          } : {},
          grade ? { grade: { contains: grade, mode: 'insensitive' } } : {}
        ]
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(students);
  } catch (error: any) {
    console.error('Students API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch students', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const student = await prisma.student.create({
      data: {
        name: data.name,
        email: data.email || `${data.name.toLowerCase().replace(/\s+/g, '.')}@student.com`,
        grade: data.grade || 'Grade 10',
        class: data.class,
        gpa: data.gpa || 0,
        attendance: data.attendance,
        focus: data.focus,
        engagement: data.engagement,
        notetaking: data.notetaking,
        deviceUsage: data.deviceUsage,
        behavior: data.behavior,
        overallScore: data.overallScore,
        phone: data.phone || '',
        avatar: data.avatar || null
      }
    });
    return NextResponse.json(student);
  } catch (error: any) {
    console.error('Create Student Error:', error);
    return NextResponse.json({ error: 'Failed to create student', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const student = await prisma.student.update({
      where: { id: data.id },
      data: {
        name: data.name,
        class: data.class,
        attendance: data.attendance,
        focus: data.focus,
        engagement: data.engagement,
        notetaking: data.notetaking,
        deviceUsage: data.deviceUsage,
        behavior: data.behavior,
        overallScore: data.overallScore,
        avatar: data.avatar || null
      }
    });
    return NextResponse.json(student);
  } catch (error: any) {
    console.error('Update Student Error:', error);
    return NextResponse.json({ error: 'Failed to update student', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }

    await prisma.student.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete Student Error:', error);
    return NextResponse.json({ error: 'Failed to delete student', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
