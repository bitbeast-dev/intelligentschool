// app/analytics/comfort/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, 
  FaChartBar, FaUserCog, FaVideo, FaBars, FaChevronDown, 
  FaSignOutAlt, FaCog, FaQuestionCircle, FaUserCircle,
  FaGraduationCap, FaTemperatureHigh, FaTint, FaVolumeUp,
  FaDownload, FaEye, FaWind, FaLightbulb
} from 'react-icons/fa';

export default function ComfortAnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const comfortStats = {
    avgTemperature: 21.8,
    avgHumidity: 48,
    avgNoiseLevel: 38,
    avgLightLevel: 680,
    comfortScore: 8.4
  };

  const classroomData = [
    { room: 'Lab D401', temperature: 20.5, humidity: 52, noise: 28, light: 920, score: 9.3 },
    { room: 'Room C205', temperature: 22.8, humidity: 45, noise: 42, light: 650, score: 8.1 },
    { room: 'Auditorium', temperature: 23.5, humidity: 41, noise: 55, light: 580, score: 7.2 },
    { room: 'Library Hall', temperature: 21.2, humidity: 49, noise: 25, light: 750, score: 9.5 },
    { room: 'Gym Complex', temperature: 24.8, humidity: 58, noise: 65, light: 450, score: 6.8 },
    { room: 'Art Studio', temperature: 22.1, humidity: 46, noise: 35, light: 890, score: 8.9 }
  ];

  const navItems = [
    { name: 'Dashboard', icon: FaTachometerAlt, href: '/dashboard' },
    { name: 'Live Classes', icon: FaVideo, href: '/live' },
    { name: 'Students', icon: FaUserGraduate, href: '/students' },
    { name: 'Teachers', icon: FaChalkboardTeacher, href: '/teachers' },
    { name: 'Student Analytics', icon: FaChartBar, href: '/analytics/student' },
    { name: 'Teacher Analytics', icon: FaChartBar, href: '/analytics/teacher' },
    { name: 'Comfort Analytics', icon: FaChartBar, active: true, href: '/analytics/comfort' },
    { name: 'Class Analytics', icon: FaChartBar, href: '/analytics/class' },
    { name: 'Profile Settings', icon: FaUserCog, href: '/profile' }
  ];

  const getScoreColor = (score) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

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
              <p className="text-sm text-gray-400">Comfort Analytics</p>
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
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Comfort Analytics</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              
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
                    <Link href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaQuestionCircle className="mr-2" /> Help
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temperature</p>
                  <p className="text-2xl font-bold text-gray-900">{comfortStats.avgTemperature}°C</p>
                </div>
                <FaTemperatureHigh className="text-3xl text-red-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Humidity</p>
                  <p className="text-2xl font-bold text-gray-900">{comfortStats.avgHumidity}%</p>
                </div>
                <FaTint className="text-3xl text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Noise Level</p>
                  <p className="text-2xl font-bold text-gray-900">{comfortStats.avgNoiseLevel}dB</p>
                </div>
                <FaVolumeUp className="text-3xl text-orange-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Light Level</p>
                  <p className="text-2xl font-bold text-gray-900">{comfortStats.avgLightLevel}lx</p>
                </div>
                <FaLightbulb className="text-3xl text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Comfort Score</p>
                  <p className="text-2xl font-bold text-gray-900">{comfortStats.comfortScore}/10</p>
                </div>
                <FaEye className="text-3xl text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Classroom Environmental Data</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Temperature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Humidity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Noise</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Light</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classroomData.map((room, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.room}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.temperature}°C</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.humidity}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.noise}dB</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.light}lx</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${getScoreColor(room.score)}`}>
                          {room.score}/10
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Environmental Trends Chart */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Temperature & Humidity Trends</h3>
            </div>
            <div className="p-6">
              <div className="relative h-64">
                <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
                  {[22, 21, 23, 22, 24, 23, 22, 21, 23, 22, 23, 22].map((temp, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="flex flex-col items-center w-full">
                        <div 
                          className="w-1/2 mx-1 bg-gradient-to-t from-red-500 to-red-300 rounded-t"
                          style={{ height: `${(temp / 30) * 100}%` }}
                          title={`${temp}°C`}
                        ></div>
                        <div 
                          className="w-1/2 mx-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t mt-1"
                          style={{ height: `${([45, 48, 42, 46, 44, 47, 45, 50, 46, 45, 48, 46][index] / 60) * 100}%` }}
                          title={`${[45, 48, 42, 46, 44, 47, 45, 50, 46, 45, 48, 46][index]}%`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{index + 1}h</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Temperature (°C)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Humidity (%)</span>
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