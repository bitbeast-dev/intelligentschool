'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, 
  FaVideo, FaCog, FaGraduationCap, FaThermometerHalf,
  FaCamera, FaBell, FaUsers, FaCalendar
} from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard Overview', icon: FaTachometerAlt, href: '/dashboard' },
    { name: 'Live Camera Feed', icon: FaVideo, href: '/live' },
    { name: 'Camera Management', icon: FaCamera, href: '/profile' },
    { name: 'AI Attention Heatmap', icon: FaBell, href: '/students' },
    { name: 'AI Voice Assistant', icon: FaUsers, href: '/teachers' },
    { name: '3D Classroom View', icon: FaCalendar, href: '/logins' },
    { name: 'Student Analytics', icon: FaUserGraduate, href: '/analytics/student' },
    { name: 'Teacher Analytics', icon: FaChalkboardTeacher, href: '/analytics/teacher' },
    { name: 'Class Management', icon: FaChalkboardTeacher, href: '/analytics/class' },
    { name: 'Environment Monitor', icon: FaThermometerHalf, href: '/analytics/comfort' }
  ];

  const handleNavigation = (href: string) => {
    router.prefetch(href);
    router.push(href);
  };

  return (
    <aside className="fixed top-0 left-0 z-50 w-64 sm:w-72 h-screen bg-white border-r border-slate-200 shadow-xl">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
              <FaGraduationCap className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">IntelliSchool</h2>
              
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <item.icon className={`mr-3 text-lg ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
            <p className="text-xs font-semibold text-slate-700 text-center">Ministry of Education</p>
            <p className="text-xs text-slate-500 text-center mt-1">Smart School Initiative 2025</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
