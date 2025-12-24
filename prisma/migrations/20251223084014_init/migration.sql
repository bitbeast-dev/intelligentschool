-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "advice" TEXT,
ADD COLUMN     "avgScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "behavior" TEXT NOT NULL DEFAULT 'good',
ADD COLUMN     "students" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "winRate" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "behavior" TEXT NOT NULL DEFAULT 'good',
ADD COLUMN     "class" TEXT NOT NULL DEFAULT 'Not Assigned',
ADD COLUMN     "deviceUsage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "engagement" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "focus" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "notetaking" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "overallScore" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "behavior" TEXT NOT NULL DEFAULT 'good',
ADD COLUMN     "coverage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "engagement" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "overallScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profDev" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "punctuality" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "resourceUse" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "teachingHours" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Camera" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "rtspUrl" TEXT NOT NULL,
    "httpUrl" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resolution" TEXT NOT NULL DEFAULT '1080p',
    "fps" INTEGER NOT NULL DEFAULT 30,
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Camera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnvironmentSensor" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" INTEGER NOT NULL,
    "co2" INTEGER NOT NULL,
    "lighting" INTEGER NOT NULL,
    "noise" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'normal',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnvironmentSensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttentionLog" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "attention" INTEGER NOT NULL,
    "emotion" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttentionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceCommand" (
    "id" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "userId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceCommand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictiveAnalytics" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prediction" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "actualOutcome" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PredictiveAnalytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AttentionLog" ADD CONSTRAINT "AttentionLog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
