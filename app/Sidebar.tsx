'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, 
  FaVideo, FaGraduationCap, FaThermometerHalf,
  FaCamera, FaBell, FaUsers, FaCalendar, FaTimes, FaBars
} from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 left-3 sm:top-4 sm:left-4 z-50 p-2.5 sm:p-3 bg-slate-900 rounded-xl shadow-lg border border-slate-800 active:scale-95 transition-transform"
      >
        {isOpen ? <FaTimes className="text-lg sm:text-xl text-slate-300" /> : <FaBars className="text-lg sm:text-xl text-slate-300" />}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 z-40"
        />
      )}

      <aside className={`fixed top-0 left-0 z-40 w-64 sm:w-72 h-screen bg-slate-950 border-r border-slate-800 shadow-2xl transition-transform duration-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-800">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <FaGraduationCap className="text-lg sm:text-xl text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">Intelligent School</h2>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-150 group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white active:scale-95'
                  }`}
                >
                  <item.icon className={`mr-2.5 sm:mr-3 text-base sm:text-lg ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`} />
                  <span className="font-medium text-xs sm:text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="p-3 sm:p-4 border-t border-slate-800">
            <div className="p-3 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="text-xs font-semibold text-slate-300 text-center">Ministry of Education</p>
              <p className="text-xs text-slate-500 text-center">Smart School Initiative 2025</p>
              <div className="pt-2 mt-2 border-t border-slate-800 space-y-1">
                <p className="text-xs text-slate-400 text-center">Kigali, Rwanda</p>
                <p className="text-xs text-slate-400 text-center">+250 791 904 250</p>
                <p className="text-xs text-indigo-400 text-center font-medium">info@intelligentschool.rw</p>
                <p className="text-xs text-indigo-400 text-center font-medium">www.intelligentschool.rw</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
