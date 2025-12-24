// app/live/details/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, 
  FaSchool, FaChartBar, FaUserCog, FaVideo,
  FaUsers, FaTemperatureHigh, FaTint, FaVolumeUp,
  FaEye, FaBars, FaChevronDown, FaSignOutAlt,
  FaCog, FaQuestionCircle, FaUserCircle, FaSyncAlt,
  FaPlay, FaPause, FaExpand, FaVolumeMute,
  FaGraduationCap, FaFire, FaShieldAlt
} from 'react-icons/fa';

export default function LiveClassPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [fullscreen, setFullscreen] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: FaTachometerAlt, href: '/dashboard' },
    { name: 'Live Classes', icon: FaVideo, active: true, href: '/live' },
    { name: 'Students', icon: FaUserGraduate, href: '/students' },
    { name: 'Teachers', icon: FaChalkboardTeacher, href: '/teachers' },
    { name: 'Student Analytics', icon: FaChartBar, href: '/analytics/student' },
    { name: 'Teacher Analytics', icon: FaChartBar, href: '/analytics/teacher' },
    { name: 'Comfort Analytics', icon: FaChartBar, href: '/analytics/comfort' },
    { name: 'Class Analytics', icon: FaChartBar, href: '/analytics/class' },
    { name: 'Profile Settings', icon: FaUserCog, href: '/profile' }
  ];

  // Mock classrooms data
  const classrooms = [
    { id: 1, name: 'L5BDC', students: '0/59', incidents: 0, alerts: 0, present: '0%' },
    { id: 2, name: 'L5FBO', students: '0/66', incidents: 0, alerts: 0, present: '0%' },
    { id: 3, name: 'S5 HGL', students: '0/55', incidents: 0, alerts: 0, present: '0%' },
    { id: 4, name: 'S5 MCE', students: '0/66', incidents: 0, alerts: 0, present: '0%' },
    { id: 5, name: 'Test Class', students: '0/1', incidents: 0, alerts: 0, present: '0%' },
  ];

  // Mock sensor data
  const sensorData = [
    { label: 'Temperature', value: '24.5°C', status: 'good', icon: FaTemperatureHigh },
    { label: 'Humidity', value: '65%', status: 'good', icon: FaTint },
    { label: 'Noise Level', value: '42 dB', status: 'warning', icon: FaVolumeUp },
    { label: 'Air Quality', value: '12 PPM', status: 'good', icon: FaFire },
    { label: 'Motion', value: 'Detected', status: 'good', icon: FaEye },
    { label: 'Safety Status', value: 'Secure', status: 'good', icon: FaShieldAlt },
  ];

  const togglePlay = () => setPlaying(!playing);
  const toggleFullscreen = () => setFullscreen(!fullscreen);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => setVolume(parseInt(e.target.value));

  const handleClassSelect = (classroom: any) => {
    setSelectedClass(classroom);
    setPlaying(true);
  };

  // Simulate video player
  useEffect(() => {
    if (selectedClass && playing) {
      console.log(`Playing stream for ${selectedClass.name}`);
    }
  }, [selectedClass, playing]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-gray-900`}>
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center mr-3">
              <FaGraduationCap className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">IntelligentSchool</h2>
              <p className="text-sm text-gray-400">Live Monitoring</p>
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
              <p className="text-sm text-gray-400 text-center">
                © 2025 Intelligent School System
              </p>
              <p className="text-xs text-gray-500 text-center mt-1">
                Powered by DIRECA Company Ltd.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg mr-4"
                >
                  <FaBars className="text-xl text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold">Live Class</h1>
                  <p className="text-sm text-gray-600">
                    school managment system dashboard
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      GS
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="font-semibold">GS Camp Kigali School</p>
                      <p className="text-sm text-gray-500">School Administrator</p>
                    </div>
                    <FaChevronDown className="text-gray-500" />
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 bg-white border border-gray-200">
                      <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <FaUserCircle className="mr-3" />
                        <span>My Profile</span>
                      </Link>
                      <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <FaCog className="mr-3" />
                        <span>Settings</span>
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <FaQuestionCircle className="mr-3" />
                        <span>Help & Support</span>
                      </a>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50">
                        <FaSignOutAlt className="mr-3" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">

            
        {/* Footer */}
          <div className="mt-6 p-4 rounded-lg text-center bg-gray-100 text-gray-600">
            <p className="text-sm">
              © 2024 Intelligent School System. Live classroom monitoring dashboard.
            </p>
            <p className="text-xs mt-1">
              Real-time streaming with environmental sensor integration
            </p>
          </div>

        </main>
      </div>
      

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}