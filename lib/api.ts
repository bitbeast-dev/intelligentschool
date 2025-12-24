// API utility functions
const API_BASE = '/api';

export const api = {
  // Dashboard
  getDashboard: () => fetch(`${API_BASE}/dashboard`).then(r => r.json()),

  // Students
  getStudents: (params?: { grade?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetch(`${API_BASE}/students?${query}`).then(r => r.json());
  },
  createStudent: (data: any) => fetch(`${API_BASE}/students`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  updateStudent: (data: any) => fetch(`${API_BASE}/students`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  deleteStudent: (id: number) => fetch(`${API_BASE}/students?id=${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Teachers
  getTeachers: (params?: { status?: string; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetch(`${API_BASE}/teachers?${query}`).then(r => r.json());
  },
  createTeacher: (data: any) => fetch(`${API_BASE}/teachers`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  updateTeacher: (data: any) => fetch(`${API_BASE}/teachers`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  deleteTeacher: (id: number) => fetch(`${API_BASE}/teachers?id=${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Live Classes
  getLiveClasses: () => fetch(`${API_BASE}/live`).then(r => r.json()),
  createLiveClass: (data: any) => fetch(`${API_BASE}/live`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),

  // Analytics
  getStudentAnalytics: () => fetch(`${API_BASE}/analytics/student`).then(r => r.json()),
  getTeacherAnalytics: () => fetch(`${API_BASE}/analytics/teacher`).then(r => r.json()),
  getComfortAnalytics: () => fetch(`${API_BASE}/analytics/comfort`).then(r => r.json()),
  getClassAnalytics: () => fetch(`${API_BASE}/analytics/class`).then(r => r.json()),
  getClassDetail: (id: string) => fetch(`${API_BASE}/analytics/class/${id}`).then(r => r.json()),

  // Profile
  getProfile: () => fetch(`${API_BASE}/profile`).then(r => r.json()),
  updateProfile: (data: any) => fetch(`${API_BASE}/profile`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  updateSettings: (settings: any) => fetch(`${API_BASE}/profile`, { method: 'PATCH', body: JSON.stringify({ settings }), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),

  // Auth
  login: (email: string, password: string) => fetch(`${API_BASE}/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  logout: () => fetch(`${API_BASE}/auth/logout`, { method: 'POST' }).then(r => r.json())
};
