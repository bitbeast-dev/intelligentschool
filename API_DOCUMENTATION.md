# API Routes Documentation - Intelligent School System

## 🚀 Complete API Endpoints

### Camera Management API
**Base URL:** `/api/cameras`

#### GET /api/cameras
- **Description:** Get all cameras
- **Response:** Array of camera objects
```json
[{
  "id": "uuid",
  "name": "Classroom 10A",
  "location": "Building A - Floor 1",
  "rtspUrl": "rtsp://192.168.1.101:554/stream",
  "httpUrl": "http://192.168.1.101/video",
  "resolution": "1080p",
  "fps": 30,
  "status": "active",
  "lastSeen": "2025-01-15T10:30:00Z"
}]
```

#### POST /api/cameras
- **Description:** Create new camera
- **Body:**
```json
{
  "name": "Classroom 10A",
  "location": "Building A - Floor 1",
  "rtspUrl": "rtsp://192.168.1.101:554/stream",
  "httpUrl": "http://192.168.1.101/video",
  "username": "admin",
  "password": "admin123",
  "resolution": "1080p",
  "fps": 30,
  "status": "active"
}
```

#### PUT /api/cameras/[id]
- **Description:** Update camera
- **Body:** Same as POST

#### DELETE /api/cameras/[id]
- **Description:** Delete camera

---

### Student Analytics API
**Base URL:** `/api/students`

#### GET /api/students
- **Description:** Get all students with analytics
- **Response:**
```json
[{
  "id": "uuid",
  "name": "Alice Johnson",
  "class": "Grade 10A",
  "attendance": 95,
  "focus": 88,
  "engagement": 92,
  "notetaking": 85,
  "deviceUsage": 12,
  "behavior": "excellent",
  "overallScore": 90
}]
```

#### POST /api/students
- **Description:** Create new student
- **Body:** Student object with all fields

#### GET /api/students/analytics
- **Description:** Get behavior trends
- **Response:** Time-series data for charts

---

### Teacher Analytics API
**Base URL:** `/api/teachers`

#### GET /api/teachers
- **Description:** Get all teachers with metrics
- **Response:**
```json
[{
  "id": "uuid",
  "name": "Dr. Sarah Johnson",
  "subject": "Mathematics",
  "teachingHours": 6.5,
  "engagement": 92,
  "coverage": 95,
  "punctuality": 98,
  "resourceUse": 89,
  "profDev": 12,
  "behavior": "excellent",
  "overallScore": 93
}]
```

---

### Environment Monitoring API
**Base URL:** `/api/environment`

#### GET /api/environment
- **Description:** Get all sensor readings
- **Response:**
```json
[{
  "id": "uuid",
  "location": "Building A - Floor 1",
  "room": "Classroom 10A",
  "temperature": 22.5,
  "humidity": 45,
  "co2": 650,
  "lighting": 450,
  "noise": 35,
  "status": "normal",
  "timestamp": "2025-01-15T10:30:00Z"
}]
```

---

### AI Attention Tracking API
**Base URL:** `/api/attention`

#### GET /api/attention/logs
- **Description:** Get attention logs for heatmap
- **Response:**
```json
[{
  "id": "uuid",
  "studentId": "uuid",
  "attention": 85,
  "emotion": "Focused",
  "x": 250.5,
  "y": 180.3,
  "timestamp": "2025-01-15T10:30:00Z"
}]
```

#### POST /api/attention/logs
- **Description:** Create attention log
- **Body:**
```json
{
  "studentId": "uuid",
  "attention": 85,
  "emotion": "Focused",
  "x": 250.5,
  "y": 180.3
}
```

---

### Voice Assistant API
**Base URL:** `/api/voice`

#### POST /api/voice/command
- **Description:** Process voice command
- **Body:**
```json
{
  "command": "What is the current attendance rate?",
  "userId": "uuid"
}
```
- **Response:**
```json
{
  "response": "Current attendance rate is 92%...",
  "accuracy": 98.5,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

#### GET /api/voice/history
- **Description:** Get voice command history

---

### Predictive Analytics API
**Base URL:** `/api/predictions`

#### GET /api/predictions
- **Description:** Get all predictions
- **Response:**
```json
[{
  "id": "uuid",
  "type": "exam_success",
  "prediction": "87% predicted exam success rate",
  "confidence": 94.2,
  "targetDate": "2025-06-01",
  "metadata": "{...}"
}]
```

#### POST /api/predictions/generate
- **Description:** Generate new prediction
- **Body:**
```json
{
  "type": "exam_success",
  "studentIds": ["uuid1", "uuid2"],
  "targetDate": "2025-06-01"
}
```

---

### Class Management API
**Base URL:** `/api/classes`

#### GET /api/classes
- **Description:** Get all classes
- **Response:**
```json
[{
  "id": "uuid",
  "name": "Grade 10A",
  "teacher": "Dr. Sarah Johnson",
  "students": 25,
  "behavior": "excellent",
  "winRate": 85,
  "avgScore": 87.5,
  "advice": "Maintain current teaching methods..."
}]
```

---

### Dashboard API
**Base URL:** `/api/dashboard`

#### GET /api/dashboard/metrics
- **Description:** Get all dashboard metrics
- **Response:**
```json
{
  "totalStudents": 150,
  "totalTeachers": 25,
  "avgAttendance": 92,
  "avgPerformance": 87,
  "activeCameras": 12,
  "alerts": 3
}
```

---

## 📝 Implementation Instructions

### 1. Create API Route Files
```bash
# Create directories
mkdir -p app/api/cameras
mkdir -p app/api/attention
mkdir -p app/api/voice
mkdir -p app/api/predictions
mkdir -p app/api/environment
```

### 2. Install Dependencies
```bash
npm install @prisma/client
npx prisma generate
```

### 3. Run Migrations
```bash
npx prisma migrate dev --name add_ai_features
```

### 4. Seed Database
```bash
npm run db:seed
```

### 5. Test APIs
```bash
# Test camera API
curl http://localhost:3000/api/cameras

# Test students API
curl http://localhost:3000/api/students

# Test voice API
curl -X POST http://localhost:3000/api/voice/command \
  -H "Content-Type: application/json" \
  -d '{"command":"What is attendance?"}'
```

---

## 🔐 Authentication

All APIs should include authentication middleware:

```typescript
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.headers.get('authorization');
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
  // Verify token
}
```

---

## 📊 Response Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **404** - Not Found
- **500** - Server Error

---

## 🚀 Ready for Implementation

All API endpoints are documented and ready to be implemented. The Prisma schema and seed data are complete.

**Next Steps:**
1. Run `npx prisma migrate dev`
2. Run `npm run db:seed`
3. Implement API route files
4. Test with frontend
5. Deploy to production
