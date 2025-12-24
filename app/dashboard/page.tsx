'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../Sidebar';
import { 
  FaBars, FaBell, FaDownload, FaSmile, FaEye,
  FaClipboardCheck, FaMobileAlt, FaUserShield, FaClock,
  FaHandsHelping, FaWalking, FaBook, FaTools, FaThermometerHalf,
  FaLightbulb, FaWind, FaUserFriends, FaLock,
  FaMicrochip, FaChartLine, FaCogs, FaCalendarAlt, FaUserGraduate,
  FaChalkboardTeacher
} from 'react-icons/fa';

export default function ExecutiveDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const studentAnalytics = [
    { title: 'Attendance & Focus', icon: FaEye, value: `${dashboardData?.students?.avgAttendance || 0}%`, status: 'Excellent' },
    { title: 'Engagement', icon: FaSmile, value: `${dashboardData?.students?.avgEngagement || 0}%`, status: 'High' },
    { title: 'Note-taking', icon: FaClipboardCheck, value: `${dashboardData?.students?.avgNotetaking || 0}%`, status: 'Good' },
    { title: 'Device Usage', icon: FaMobileAlt, value: `${dashboardData?.students?.avgDeviceUsage || 0}%`, status: 'Low' },
    { title: 'Focus Level', icon: FaUserShield, value: `${dashboardData?.students?.avgFocus || 0}%`, status: 'Secure' }
  ];

  const teacherAnalytics = [
    { title: 'Teaching Duration', icon: FaClock, value: `${dashboardData?.teachers?.avgTeachingHours || 0}h`, status: 'On Track' },
    { title: 'Student Engagement', icon: FaHandsHelping, value: `${dashboardData?.teachers?.avgEngagement || 0}%`, status: 'High' },
    { title: 'Classroom Coverage', icon: FaWalking, value: `${dashboardData?.teachers?.avgCoverage || 0}%`, status: 'Excellent' },
    { title: 'Professional Development', icon: FaBook, value: `${dashboardData?.teachers?.avgProfDev || 0}/15`, status: 'Progress' },
    { title: 'Resource Utilization', icon: FaTools, value: `${dashboardData?.teachers?.avgResourceUse || 0}%`, status: 'Optimal' }
  ];

  const environmentMonitoring = dashboardData?.environment?.map((sensor: any) => ({
    title: sensor.room,
    icon: FaThermometerHalf,
    value: `${sensor.temperature}°C / ${sensor.humidity}%`,
    status: sensor.status,
    color: 'text-indigo-600'
  })) || [];

  const implementationSteps = [
    {
      step: '01',
      title: 'Installation & Setup',
      description: 'Our team installs IoT sensors and AI cameras in classrooms with minimal disruption to school activities.',
      icon: FaCogs,
      color: 'from-indigo-600 to-indigo-700'
    },
    {
      step: '02',
      title: 'Data Collection & Analysis',
      description: 'Sensors collect real-time data while our AI algorithms analyze student and teacher behavior, and environmental conditions.',
      icon: FaMicrochip,
      color: 'from-indigo-600 to-indigo-700'
    },
    {
      step: '03',
      title: 'Insights & Action',
      description: 'School administrators receive actionable insights through dashboards to improve teaching, learning, and resource management.',
      icon: FaChartLine,
      color: 'from-indigo-600 to-indigo-700'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <div className="lg:ml-72">
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <FaBars className="text-xl text-slate-400" />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    AI-Powered School Monitoring
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5 hidden sm:block">
                    Comprehensive analytics for students, teachers & environment
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl">
                  <FaCalendarAlt className="text-slate-400 text-sm" />
                  <span className="text-sm font-medium text-slate-300">Academic Year 2024-25</span>
                </div>
                
                <button className="relative p-2.5 rounded-xl hover:bg-slate-800 transition-colors border border-slate-800">
                  <FaBell className="text-lg text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                </button>
                
                <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all duration-200 font-medium text-sm shadow-lg shadow-indigo-500/20">
                  <FaDownload />
                  <span className="hidden md:inline">Export</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Student Analytics Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FaUserGraduate className="mr-3 text-indigo-400" />
                  Student Analytics
                </h2>
                <p className="text-slate-400 text-sm mt-1">Real-time monitoring of student behavior and engagement</p>
              </div>
              <Link 
                href="/analytics/student"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all text-sm font-medium shadow-lg shadow-indigo-500/20"
              >
                View Details
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {studentAnalytics.map((item) => (
                <Link
                  key={item.title}
                  href="/analytics/student"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                    <item.icon className="text-2xl text-indigo-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">{item.title}</h3>
                  <div className="flex items-end justify-between mb-3">
                    <span className="text-3xl font-bold text-white">{item.value}</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {item.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: item.value }}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Teacher Analytics Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FaChalkboardTeacher className="mr-3 text-indigo-400" />
                  Teacher Analytics
                </h2>
                <p className="text-slate-400 text-sm mt-1">Monitor teaching effectiveness and classroom management</p>
              </div>
              <Link 
                href="/analytics/teacher"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all text-sm font-medium shadow-lg shadow-indigo-500/20"
              >
                View Details
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {teacherAnalytics.map((item) => (
                <Link
                  key={item.title}
                  href="/analytics/teacher"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                    <item.icon className="text-2xl text-indigo-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">{item.title}</h3>
                  <div className="flex items-end justify-between mb-3">
                    <span className="text-3xl font-bold text-white">{item.value}</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {item.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: typeof item.value === 'string' && item.value.includes('%') ? item.value : '100%' }}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Environment Monitoring Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FaThermometerHalf className="mr-3 text-indigo-400" />
                  Environment Monitoring
                </h2>
                <p className="text-slate-400 text-sm mt-1">Real-time IoT sensor data for optimal learning conditions</p>
              </div>
              <Link 
                href="/analytics/comfort"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all text-sm font-medium shadow-lg shadow-indigo-500/20"
              >
                View Details
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {environmentMonitoring.map((item) => (
                <Link
                  key={item.title}
                  href="/analytics/comfort"
                  className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                      <item.icon className="text-2xl text-indigo-400" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-3">{item.title}</h3>
                  <p className="text-2xl font-bold text-white mb-2">{item.value}</p>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                    item.status === 'optimal' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                    item.status === 'good' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                    'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {item.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Implementation Steps */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-3 text-center">How It Works</h2>
            <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
              Our AI-powered IoT system seamlessly integrates into your school environment in three simple steps
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {implementationSteps.map((step) => (
                <div key={step.step} className="bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors">
                      {step.step}
                    </span>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20`}>
                      <step.icon className="text-white text-3xl" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
