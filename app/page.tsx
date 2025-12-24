'use client';

import Link from "next/link";
import { useState } from 'react';
import { FaGraduationCap, FaLock, FaVideo, FaChartLine, FaBrain, FaMicrophone, FaCube, FaThermometerHalf, FaUsers, FaCamera, FaRobot, FaShieldAlt, FaArrowRight, FaBell, FaClipboardCheck, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@school.com' && password === 'admin123') {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials. Use: admin@school.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
                <FaGraduationCap className="text-white text-base sm:text-lg" />
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-900">Intelligent School</span>
            </Link>
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              <Link href="#features" className="text-sm sm:text-[15px] text-slate-600 hover:text-indigo-600 font-medium">Features</Link>
              <Link href="#solutions" className="text-sm sm:text-[15px] text-slate-600 hover:text-indigo-600 font-medium">Solutions</Link>
              <button onClick={() => setShowLogin(true)} className="px-4 sm:px-5 py-2 bg-indigo-600 text-white text-sm sm:text-[15px] font-medium rounded-lg hover:bg-indigo-700 shadow-md">
                Sign In
              </button>
            </div>
            <button onClick={() => setShowLogin(true)} className="md:hidden px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-[14px] font-semibold mb-4 sm:mb-6">
            <FaBell className="text-indigo-600" />
            <span className="hidden sm:inline">Trusted by 500+ Educational Institutions Worldwide</span>
            <span className="sm:hidden">500+ Schools Trust Us</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-5 leading-tight px-4">
            Next-Generation School<br />Management Platform
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive AI-powered monitoring, real-time analytics, and intelligent insights for modern educational institutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <button onClick={() => setShowLogin(true)} className="px-6 sm:px-7 py-2.5 sm:py-3 bg-indigo-600 text-white text-sm sm:text-[15px] font-semibold rounded-lg hover:bg-indigo-700 shadow-lg inline-flex items-center justify-center gap-2">
              Get Started Free <FaArrowRight />
            </button>
            <button className="px-6 sm:px-7 py-2.5 sm:py-3 bg-white border-2 border-slate-300 text-slate-700 text-sm sm:text-[15px] font-semibold rounded-lg hover:border-indigo-600 hover:text-indigo-600">
              Watch Demo
            </button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-16 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">250+</p>
              <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600">Features</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">98%</p>
              <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600">AI Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">24/7</p>
              <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600">Monitoring</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2">500+</p>
              <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600">Schools</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Powerful Features</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">Everything you need to manage and monitor your educational institution</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4 sm:mb-5">
                <FaRobot className="text-indigo-600 text-lg sm:text-xl" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">AI-Powered Analytics</h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Advanced machine learning algorithms analyze student behavior patterns and performance metrics in real-time</p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5">
                <FaBrain className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Attention Heatmaps</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Real-time facial recognition and emotion tracking with 60 FPS visualization for engagement monitoring</p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5">
                <FaVideo className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Live Surveillance</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Multi-camera grid view with LIVE indicators and intelligent motion detection across all classrooms</p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5">
                <FaChartLine className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Predictive Insights</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Forecast student performance and identify at-risk learners early with predictive analytics</p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5">
                <FaMicrophone className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Voice Assistant</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Natural language processing with speech recognition and text-to-speech capabilities</p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5">
                <FaThermometerHalf className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Environment Control</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Monitor temperature, humidity, CO2, lighting, and noise levels for optimal learning conditions</p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5">
                <FaShieldAlt className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise Security</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Bank-level encryption with role-based access control and comprehensive audit logs</p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5">
                <FaClipboardCheck className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Attendance Tracking</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Automated attendance with facial recognition and real-time reporting for students and staff</p>
            </div>

            <div className="bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5">
                <FaCube className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3D Visualization</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">Interactive 3D classroom views with perspective effects and particle system animations</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Complete Solutions</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">Comprehensive tools for every aspect of school management</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link href="/analytics/student" className="group bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all">
              <FaUserGraduate className="text-indigo-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">Student Analytics</h3>
              <p className="text-[15px] text-slate-600 mb-4">Track attendance, focus levels, engagement scores, note-taking activity, and device usage with AI insights</p>
              <span className="text-[15px] text-indigo-600 font-semibold inline-flex items-center gap-2">
                Explore <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/analytics/teacher" className="group bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all">
              <FaChalkboardTeacher className="text-indigo-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">Teacher Performance</h3>
              <p className="text-[15px] text-slate-600 mb-4">Monitor teaching hours, curriculum coverage, punctuality, resource utilization, and professional development</p>
              <span className="text-[15px] text-indigo-600 font-semibold inline-flex items-center gap-2">
                Explore <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/live" className="group bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all">
              <FaVideo className="text-indigo-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">Live Camera Feed</h3>
              <p className="text-[15px] text-slate-600 mb-4">Multi-camera grid layout with LIVE indicators showing simultaneous feeds from all classrooms</p>
              <span className="text-[15px] text-indigo-600 font-semibold inline-flex items-center gap-2">
                Explore <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/profile" className="group bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all">
              <FaCamera className="text-indigo-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">Camera Management</h3>
              <p className="text-[15px] text-slate-600 mb-4">Configure IP cameras with RTSP/HTTP URLs, authentication, resolution, and FPS settings</p>
              <span className="text-[15px] text-indigo-600 font-semibold inline-flex items-center gap-2">
                Explore <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/analytics/class" className="group bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all">
              <FaUsers className="text-indigo-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">Class Management</h3>
              <p className="text-[15px] text-slate-600 mb-4">Manage class rosters, track behavior status, win rates, and receive AI-powered improvement advice</p>
              <span className="text-[15px] text-indigo-600 font-semibold inline-flex items-center gap-2">
                Explore <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link href="/analytics/comfort" className="group bg-white p-7 rounded-xl border border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all">
              <FaThermometerHalf className="text-indigo-600 text-3xl mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600">Environment Monitor</h3>
              <p className="text-[15px] text-slate-600 mb-4">Real-time tracking of temperature, humidity, CO2 levels, lighting, and noise for optimal conditions</p>
              <span className="text-[15px] text-indigo-600 font-semibold inline-flex items-center gap-2">
                Explore <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>



      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">Ready to Transform Your School?</h2>
          <p className="text-base sm:text-lg text-indigo-100 mb-6 sm:mb-8 px-4">Join 500+ institutions using Intelligent School for smarter education management</p>
          <button onClick={() => setShowLogin(true)} className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-indigo-600 text-sm sm:text-[15px] font-semibold rounded-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
            Start Free Trial <FaArrowRight />
          </button>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-10 mb-8 sm:mb-10">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <FaGraduationCap className="text-white text-sm sm:text-base" />
                </div>
                <span className="text-base sm:text-lg font-bold">Intelligent School</span>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-400 mb-3">AI-powered school management for modern education</p>
              <div className="space-y-1 text-sm text-slate-400">
                <p>Kigali, Rwanda</p>
                <p>+250 791 904 250</p>
                <p className="text-indigo-400">info@intelligentschool.rw</p>
                <p className="text-indigo-400">www.intelligentschool.rw</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm sm:text-[15px] font-semibold mb-2 sm:mb-3">Product</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-[15px] text-slate-400">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#solutions" className="hover:text-white">Solutions</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-[15px] font-semibold mb-2 sm:mb-3">Company</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-[15px] text-slate-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-[15px] font-semibold mb-2 sm:mb-3">Legal</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-[15px] text-slate-400">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
                <li><Link href="#" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-[15px] font-semibold mb-2 sm:mb-3">Support</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-[15px] text-slate-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-4 sm:pt-6 text-center">
            <p className="text-xs sm:text-[15px] text-slate-400">© 2025 Intelligent School. Ministry of Education Approved System. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center mb-7">
              <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaLock className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-[15px] text-slate-600">Sign in to access your dashboard</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[15px] font-semibold text-slate-700 mb-2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@school.com" className="w-full px-4 py-3 text-[15px] border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-[15px] font-semibold text-slate-700 mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-3 text-[15px] border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" required />
              </div>
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
                <p className="text-[14px] text-indigo-900 font-semibold mb-1">Demo Credentials:</p>
                <p className="text-[14px] text-indigo-700">Email: admin@school.com</p>
                <p className="text-[14px] text-indigo-700">Password: admin123</p>
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white text-[15px] font-semibold rounded-lg hover:bg-indigo-700 shadow-lg">
                Sign In to Dashboard
              </button>
              <button type="button" onClick={() => setShowLogin(false)} className="w-full px-6 py-3 text-[15px] text-slate-600 hover:text-slate-900 font-medium">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
