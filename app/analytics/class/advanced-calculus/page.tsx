// app/analytics/class/advanced-calculus/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, 
  FaChartBar, FaUserCog, FaVideo, FaBars, FaChevronDown, 
  FaSignOutAlt, FaCog, FaQuestionCircle, FaUserCircle,
  FaGraduationCap, FaDownload, FaEye, FaClock, FaUsers,
  FaArrowLeft
} from 'react-icons/fa';

export default function AdvancedCalculusPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const classInfo = {
    name: 'Advanced Calculus',
    teacher: 'Prof. James Wilson',
    students: 32,
    attendance: 94,
    avgGrade: 89.2,
    duration: 60,
    room: 'Room A301',
    schedule: 'Mon, Wed, Fri - 08:00-09:00'
  };

  const studentList = [
    { id: 1, name: 'Alice Johnson', grade: 92, attendance: 96, lastActive: '2 hours ago' },
    { id: 2, name: 'Bob Smith', grade: 88, attendance: 94, lastActive: '1 day ago' },
    { id: 3, name: 'Carol Davis', grade: 95, attendance: 100, lastActive: '30 min ago' },
    { id: 4, name: 'David Wilson', grade: 85, attendance: 89, lastActive: '3 hours ago' },
    { id: 5, name: 'Emma Brown', grade: 91, attendance: 97, lastActive: '1 hour ago' }
  ];

  const assignments = [
    { name: 'Derivatives Quiz', dueDate: '2024-01-15', submitted: 28, total: 32, avgScore: 87 },
    { name: 'Integration Project', dueDate: '2024-01-20', submitted: 30, total: 32, avgScore: 91 },
    { name: 'Limits Assignment', dueDate: '2024-01-10', submitted: 32, total: 32, avgScore: 89 }
  ];

  const navItems = [
    { name: 'Dashboard', icon: FaTachometerAlt, href: '/dashboard' },
    { name: 'Live Classes', icon: FaVideo, href: '/live' },
    { name: 'Students', icon: FaUserGraduate, href: '/students' },
    { name: 'Teachers', icon: FaChalkboardTeacher, href: '/teachers' },
    { name: 'Student Analytics', icon: FaChartBar, href: '/analytics/student' },
    { name: 'Teacher Analytics', icon: FaChartBar, href: '/analytics/teacher' },
    { name: 'Comfort Analytics', icon: FaChartBar, href: '/analytics/comfort' },
    { name: 'Class Analytics', icon: FaChartBar, active: true, href: '/analytics/class' },
    { name: 'Profile Settings', icon: FaUserCog, href: '/profile' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-gray-900`}>
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center mr-3">
              <FaGraduationCap className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">IntelligentSchool</h2>
              <p className="text-sm text-gray-400">Class Details</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${item.active 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <item.icon className="mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-6 left-4 right-4">
            <div className="p-4 rounded-lg bg-gray-800">
              <p className="text-sm text-gray-400 text-center">© 2024 Intelligent School System</p>
              <p className="text-xs text-gray-500 text-center mt-1">Powered by DIRECA Company Ltd.</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100">
                <FaBars className="text-xl" />
              </button>
              <Link href="/analytics/class" className="p-2 rounded-md text-gray-600 hover:bg-gray-100 mr-2">
                <FaArrowLeft className="text-xl" />
              </Link>
              <h1 className="ml-2 text-2xl font-bold text-gray-900">{classInfo.name}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                <FaDownload className="mr-2" />Export
              </button>
              
              <div className="relative">
                <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <FaUserCircle className="text-2xl text-gray-600" />
                  <span className="hidden md:block text-sm font-medium text-gray-700">Admin User</span>
                  <FaChevronDown className="text-sm text-gray-500" />
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaCog className="mr-2" /> Settings
                    </Link>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaSignOutAlt className="mr-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-gray-900">{classInfo.students}</p>
                </div>
                <FaUsers className="text-3xl text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">{classInfo.attendance}%</p>
                </div>
                <FaEye className="text-3xl text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Grade</p>
                  <p className="text-2xl font-bold text-gray-900">{classInfo.avgGrade}%</p>
                </div>
                <FaChartBar className="text-3xl text-purple-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Duration</p>
                  <p className="text-2xl font-bold text-gray-900">{classInfo.duration}min</p>
                </div>
                <FaClock className="text-3xl text-orange-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Students</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentList.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.grade}%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{student.attendance}%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Assignments</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{assignment.name}</h4>
                        <span className="text-sm text-gray-500">Due: {assignment.dueDate}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Submitted: {assignment.submitted}/{assignment.total}</span>
                        <span>Avg Score: {assignment.avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Class Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Teacher:</span> {classInfo.teacher}</p>
                    <p><span className="font-medium">Room:</span> {classInfo.room}</p>
                    <p><span className="font-medium">Schedule:</span> {classInfo.schedule}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Class Average:</span> {classInfo.avgGrade}%</p>
                    <p><span className="font-medium">Attendance Rate:</span> {classInfo.attendance}%</p>
                    <p><span className="font-medium">Total Students:</span> {classInfo.students}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}