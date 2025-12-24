import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.attentionLog.deleteMany();
  await prisma.voiceCommand.deleteMany();
  await prisma.predictiveAnalytics.deleteMany();
  await prisma.camera.deleteMany();
  await prisma.environmentSensor.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.class.deleteMany();

  // Seed Cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Classroom 10A',
        location: 'Building A - Floor 1',
        rtspUrl: 'rtsp://192.168.1.101:554/stream',
        httpUrl: 'http://192.168.1.101/video',
        username: 'admin',
        password: 'admin123',
        resolution: '1080p',
        fps: 30,
        status: 'active'
      }
    }),
    prisma.camera.create({
      data: {
        name: 'Classroom 10B',
        location: 'Building A - Floor 1',
        rtspUrl: 'rtsp://192.168.1.102:554/stream',
        httpUrl: 'http://192.168.1.102/video',
        username: 'admin',
        password: 'admin123',
        resolution: '1080p',
        fps: 30,
        status: 'active'
      }
    }),
    prisma.camera.create({
      data: {
        name: 'Lab - Computer Science',
        location: 'Building B - Floor 1',
        rtspUrl: 'rtsp://192.168.1.104:554/stream',
        httpUrl: 'http://192.168.1.104/video',
        username: 'admin',
        password: 'admin123',
        resolution: '4K',
        fps: 30,
        status: 'active'
      }
    })
  ]);
  console.log(`✅ Created ${cameras.length} cameras`);

  // Seed Teachers
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@school.com',
        subject: 'Mathematics',
        teachingHours: 6.5,
        engagement: 92,
        coverage: 95,
        punctuality: 98,
        resourceUse: 89,
        profDev: 12,
        behavior: 'excellent',
        overallScore: 93,
        phone: '+1234567890',
        rating: 4.8
      }
    }),
    prisma.teacher.create({
      data: {
        name: 'Prof. Michael Chen',
        email: 'michael.chen@school.com',
        subject: 'Physics',
        teachingHours: 7.2,
        engagement: 88,
        coverage: 90,
        punctuality: 85,
        resourceUse: 92,
        profDev: 15,
        behavior: 'excellent',
        overallScore: 90,
        phone: '+1234567891',
        rating: 4.7
      }
    }),
    prisma.teacher.create({
      data: {
        name: 'Ms. Emily Davis',
        email: 'emily.davis@school.com',
        subject: 'English',
        teachingHours: 5.8,
        engagement: 85,
        coverage: 88,
        punctuality: 92,
        resourceUse: 86,
        profDev: 10,
        behavior: 'good',
        overallScore: 87,
        phone: '+1234567892',
        rating: 4.5
      }
    })
  ]);
  console.log(`✅ Created ${teachers.length} teachers`);

  // Seed Students
  const students = await Promise.all([
    prisma.student.create({
      data: {
        name: 'Alice Johnson',
        email: 'alice.j@student.com',
        grade: 'Grade 10',
        class: 'Grade 10A',
        gpa: 3.8,
        attendance: 95,
        focus: 88,
        engagement: 92,
        notetaking: 85,
        deviceUsage: 12,
        behavior: 'excellent',
        overallScore: 90,
        phone: '+1234560001'
      }
    }),
    prisma.student.create({
      data: {
        name: 'Bob Smith',
        email: 'bob.s@student.com',
        grade: 'Grade 10',
        class: 'Grade 10A',
        gpa: 2.5,
        attendance: 78,
        focus: 72,
        engagement: 75,
        notetaking: 70,
        deviceUsage: 35,
        behavior: 'needs-improvement',
        overallScore: 74,
        phone: '+1234560002'
      }
    }),
    prisma.student.create({
      data: {
        name: 'Carol White',
        email: 'carol.w@student.com',
        grade: 'Grade 10',
        class: 'Grade 10B',
        gpa: 3.9,
        attendance: 92,
        focus: 90,
        engagement: 94,
        notetaking: 88,
        deviceUsage: 8,
        behavior: 'excellent',
        overallScore: 91,
        phone: '+1234560003'
      }
    }),
    prisma.student.create({
      data: {
        name: 'David Brown',
        email: 'david.b@student.com',
        grade: 'Grade 10',
        class: 'Grade 10B',
        gpa: 3.2,
        attendance: 85,
        focus: 82,
        engagement: 80,
        notetaking: 78,
        deviceUsage: 22,
        behavior: 'good',
        overallScore: 81,
        phone: '+1234560004'
      }
    }),
    prisma.student.create({
      data: {
        name: 'Emma Davis',
        email: 'emma.d@student.com',
        grade: 'Grade 11',
        class: 'Grade 11A',
        gpa: 3.5,
        attendance: 88,
        focus: 85,
        engagement: 87,
        notetaking: 82,
        deviceUsage: 18,
        behavior: 'good',
        overallScore: 85,
        phone: '+1234560005'
      }
    }),
    prisma.student.create({
      data: {
        name: 'Frank Miller',
        email: 'frank.m@student.com',
        grade: 'Grade 11',
        class: 'Grade 11A',
        gpa: 2.0,
        attendance: 65,
        focus: 60,
        engagement: 62,
        notetaking: 58,
        deviceUsage: 45,
        behavior: 'poor',
        overallScore: 63,
        phone: '+1234560006'
      }
    }),
    prisma.student.create({
      data: {
        name: 'Grace Wilson',
        email: 'grace.w@student.com',
        grade: 'Grade 11',
        class: 'Grade 11B',
        gpa: 4.0,
        attendance: 97,
        focus: 95,
        engagement: 96,
        notetaking: 93,
        deviceUsage: 5,
        behavior: 'excellent',
        overallScore: 95,
        phone: '+1234560007'
      }
    }),
    prisma.student.create({
      data: {
        name: 'Henry Moore',
        email: 'henry.m@student.com',
        grade: 'Grade 11',
        class: 'Grade 11B',
        gpa: 3.0,
        attendance: 82,
        focus: 78,
        engagement: 80,
        notetaking: 75,
        deviceUsage: 28,
        behavior: 'good',
        overallScore: 79,
        phone: '+1234560008'
      }
    })
  ]);
  console.log(`✅ Created ${students.length} students`);

  // Seed Classes
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        name: 'Grade 10A',
        subject: 'Mathematics',
        schedule: 'Mon-Fri 9:00-10:00',
        room: 'Room 101',
        teacherId: teachers[0].id,
        students: 25,
        behavior: 'excellent',
        winRate: 85,
        avgScore: 87.5,
        advice: 'Maintain current teaching methods. Students are highly engaged.',
        avgGrade: 3.5,
        attendance: 92
      }
    }),
    prisma.class.create({
      data: {
        name: 'Grade 10B',
        subject: 'Physics',
        schedule: 'Mon-Fri 10:00-11:00',
        room: 'Room 102',
        teacherId: teachers[1].id,
        students: 28,
        behavior: 'good',
        winRate: 78,
        avgScore: 82.3,
        advice: 'Consider more interactive experiments to boost engagement.',
        avgGrade: 3.2,
        attendance: 88
      }
    }),
    prisma.class.create({
      data: {
        name: 'Grade 11A',
        subject: 'English',
        schedule: 'Mon-Fri 11:00-12:00',
        room: 'Room 103',
        teacherId: teachers[2].id,
        students: 22,
        behavior: 'good',
        winRate: 72,
        avgScore: 79.8,
        advice: 'Focus on reading comprehension activities.',
        avgGrade: 3.0,
        attendance: 85
      }
    })
  ]);
  console.log(`✅ Created ${classes.length} classes`);

  // Seed Environment Sensors
  const sensors = await Promise.all([
    prisma.environmentSensor.create({
      data: {
        location: 'Building A - Floor 1',
        room: 'Classroom 10A',
        temperature: 22.5,
        humidity: 45,
        co2: 650,
        lighting: 450,
        noise: 35,
        status: 'normal'
      }
    }),
    prisma.environmentSensor.create({
      data: {
        location: 'Building A - Floor 1',
        room: 'Classroom 10B',
        temperature: 23.0,
        humidity: 48,
        co2: 680,
        lighting: 420,
        noise: 42,
        status: 'normal'
      }
    }),
    prisma.environmentSensor.create({
      data: {
        location: 'Building B - Floor 1',
        room: 'Lab - Computer Science',
        temperature: 21.5,
        humidity: 50,
        co2: 720,
        lighting: 500,
        noise: 38,
        status: 'warning'
      }
    })
  ]);
  console.log(`✅ Created ${sensors.length} environment sensors`);

  // Seed Attention Logs (batch create)
  const attentionLogsData = [];
  for (const student of students) {
    for (let i = 0; i < 5; i++) {
      attentionLogsData.push({
        studentId: student.id,
        attention: Math.floor(Math.random() * 40) + 60,
        emotion: ['Focused', 'Engaged', 'Distracted', 'Confused'][Math.floor(Math.random() * 4)],
        x: Math.random() * 800,
        y: Math.random() * 450
      });
    }
  }
  await prisma.attentionLog.createMany({ data: attentionLogsData });
  console.log(`✅ Created ${attentionLogsData.length} attention logs`);

  // Seed Voice Commands
  const voiceCommands = await Promise.all([
    prisma.voiceCommand.create({
      data: {
        command: 'What is the current attendance rate?',
        response: 'Current attendance rate is 92%. Top performers: Grade 10A (97%), Grade 11B (95%).',
        accuracy: 98.5
      }
    }),
    prisma.voiceCommand.create({
      data: {
        command: 'Show me student performance metrics',
        response: 'Overall student performance: 87% average. 45% students scoring 90+.',
        accuracy: 97.2
      }
    }),
    prisma.voiceCommand.create({
      data: {
        command: 'How is classroom behavior today?',
        response: 'Classroom behavior is excellent in 60% of classes, good in 30%.',
        accuracy: 96.8
      }
    })
  ]);
  console.log(`✅ Created ${voiceCommands.length} voice commands`);

  // Seed Predictive Analytics
  const predictions = await Promise.all([
    prisma.predictiveAnalytics.create({
      data: {
        type: 'exam_success',
        prediction: '87% predicted exam success rate',
        confidence: 94.2,
        targetDate: new Date('2025-06-01'),
        metadata: JSON.stringify({ factors: ['attendance', 'engagement', 'past_performance'] })
      }
    }),
    prisma.predictiveAnalytics.create({
      data: {
        type: 'dropout_risk',
        prediction: '12 students at dropout risk',
        confidence: 89.5,
        targetDate: new Date('2025-12-31'),
        metadata: JSON.stringify({ risk_factors: ['low_attendance', 'poor_grades', 'behavior_issues'] })
      }
    }),
    prisma.predictiveAnalytics.create({
      data: {
        type: 'top_performers',
        prediction: '15 students predicted as top performers',
        confidence: 96.8,
        targetDate: new Date('2025-06-01'),
        metadata: JSON.stringify({ criteria: ['consistent_high_scores', 'engagement', 'participation'] })
      }
    })
  ]);
  console.log(`✅ Created ${predictions.length} predictive analytics`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
