'use client';

import Sidebar from '../Sidebar';
import { FaBars, FaCube, FaExpand, FaCompress, FaSync, FaEye, FaChair, FaDesktop } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function Classroom3D() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const students = [
    { id: 1, x: 100, y: 100, status: 'focused', name: 'Alice' },
    { id: 2, x: 250, y: 100, status: 'focused', name: 'Bob' },
    { id: 3, x: 400, y: 100, status: 'distracted', name: 'Carol' },
    { id: 4, x: 550, y: 100, status: 'focused', name: 'David' },
    { id: 5, x: 100, y: 200, status: 'engaged', name: 'Emma' },
    { id: 6, x: 250, y: 200, status: 'focused', name: 'Frank' },
    { id: 7, x: 400, y: 200, status: 'engaged', name: 'Grace' },
    { id: 8, x: 550, y: 200, status: 'distracted', name: 'Henry' },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw3DClassroom = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid floor
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Teacher desk (3D effect)
      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(canvas.width / 2 - 60, 50, 120, 40);
      ctx.fillStyle = '#6d28d9';
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 60, 50);
      ctx.lineTo(canvas.width / 2 - 50, 40);
      ctx.lineTo(canvas.width / 2 + 70, 40);
      ctx.lineTo(canvas.width / 2 + 60, 50);
      ctx.fill();

      // Draw students with 3D perspective
      students.forEach((student, index) => {
        const scale = 1 + (student.y / canvas.height) * 0.5;
        const size = 30 * scale;
        const offsetY = Math.sin(Date.now() / 1000 + index) * 5;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(student.x, student.y + size / 2 + 5, size / 2, size / 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Student desk
        ctx.fillStyle = '#64748b';
        ctx.fillRect(student.x - size / 2, student.y + offsetY, size, size * 0.6);
        
        // Student (circle)
        const statusColors: any = {
          focused: '#22c55e',
          engaged: '#3b82f6',
          distracted: '#ef4444'
        };
        ctx.fillStyle = statusColors[student.status];
        ctx.beginPath();
        ctx.arc(student.x, student.y - size / 2 + offsetY, size / 3, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = statusColors[student.status];
        ctx.beginPath();
        ctx.arc(student.x, student.y - size / 2 + offsetY, size / 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Name label
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(student.name, student.x, student.y + size);
      });

      // Floating particles
      for (let i = 0; i < 20; i++) {
        const x = (Date.now() / 50 + i * 100) % canvas.width;
        const y = Math.sin(Date.now() / 1000 + i) * 50 + canvas.height / 2;
        ctx.fillStyle = `rgba(139, 92, 246, ${0.3 + Math.sin(Date.now() / 500 + i) * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let animationId: number;
    const animate = () => {
      draw3DClassroom();
      if (autoRotate) {
        setRotation(prev => ({ x: prev.x + 0.5, y: prev.y + 0.3 }));
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, [autoRotate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Sidebar />
      <div className="lg:ml-72">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100">
                  <FaBars className="text-xl text-slate-600" />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
                    <FaCube className="mr-3 text-purple-600" />
                    3D Classroom Visualization
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">Real-time 3D spatial awareness & monitoring</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setAutoRotate(!autoRotate)} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                  <FaSync className={autoRotate ? 'animate-spin' : ''} />
                  {autoRotate ? 'Stop' : 'Rotate'}
                </button>
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                  {isFullscreen ? 'Exit' : 'Fullscreen'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Students Present</p>
                  <p className="text-4xl font-bold mt-2">{students.length}</p>
                </div>
                <FaChair className="text-5xl opacity-30" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Focused</p>
                  <p className="text-4xl font-bold mt-2">{students.filter(s => s.status === 'focused').length}</p>
                </div>
                <FaEye className="text-5xl opacity-30" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Engaged</p>
                  <p className="text-4xl font-bold mt-2">{students.filter(s => s.status === 'engaged').length}</p>
                </div>
                <FaDesktop className="text-5xl opacity-30" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Distracted</p>
                  <p className="text-4xl font-bold mt-2">{students.filter(s => s.status === 'distracted').length}</p>
                </div>
                <FaEye className="text-5xl opacity-30" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Live 3D Classroom View</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600">Focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">Engaged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-slate-600">Distracted</span>
                </div>
              </div>
            </div>
            
            <div className="relative bg-slate-900 rounded-xl overflow-hidden">
              <canvas ref={canvasRef} width={800} height={500} className="w-full h-auto" />
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <FaCube className="animate-spin" />
                3D RENDERING
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-xl">
                <p className="text-sm">
                  <span className="font-bold">Interactive 3D View:</span> Real-time spatial positioning with depth perception. 
                  Students glow based on attention levels. Auto-rotating camera provides 360° classroom awareness.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                <h3 className="font-bold text-purple-900 mb-2">🎮 3D Graphics</h3>
                <p className="text-sm text-purple-700">Real-time WebGL-style rendering with depth and perspective</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2">📍 Spatial Tracking</h3>
                <p className="text-sm text-blue-700">Precise student positioning with live status indicators</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                <h3 className="font-bold text-emerald-900 mb-2">🔄 Auto-Rotation</h3>
                <p className="text-sm text-emerald-700">Dynamic camera angles for complete classroom visibility</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
