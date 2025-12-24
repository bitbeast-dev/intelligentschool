// app/live/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import LiveStreamWS from '../LiveStreamWS';
import { 
  FaBars, FaVideo, FaExpand, FaCamera, FaPlus, FaTimes, FaSave, FaPlay, FaStop
} from 'react-icons/fa';

export default function LiveClassPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ fileCount: 0, totalSizeMB: '0', isStreaming: false, m3u8Exists: false });
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rtspUrl: '',
    username: '',
    password: ''
  });

  const liveClasses = [
    { 
      id: 1, 
      title: 'Advanced Mathematics - Calculus II', 
      teacher: 'Dr. Sarah Johnson', 
      students: 25, 
      status: 'live', 
      startTime: '09:00 AM',
      duration: '1h 30m',
      room: 'Room A101',
      cameraId: 'CAM_A101_001',
      cameraStatus: 'online',
      viewers: 23
    },
    { 
      id: 2, 
      title: 'Physics Lab - Quantum Mechanics', 
      teacher: 'Prof. Michael Chen', 
      students: 18, 
      status: 'live', 
      startTime: '10:30 AM',
      duration: '2h',
      room: 'Lab B205',
      cameraId: 'CAM_B205_001',
      cameraStatus: 'online',
      viewers: 18
    },
    {
      id: 3, 
      title: 'English Literature - Shakespeare', 
      teacher: 'Ms. Emily Davis', 
      students: 22, 
      status: 'live', 
      startTime: '11:00 AM',
      duration: '1h',
      room: 'Room C301',
      cameraId: 'CAM_C301_001',
      cameraStatus: 'online',
      viewers: 20
    },
    { 
      id: 4, 
      title: 'Chemistry - Organic Reactions', 
      teacher: 'Dr. Robert Wilson', 
      students: 30, 
      status: 'live', 
      startTime: '02:00 PM',
      duration: '1h 45m',
      room: 'Lab D401',
      cameraId: 'CAM_D401_001',
      cameraStatus: 'online',
      viewers: 28
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Camera data:', formData);
    setShowModal(false);
    setFormData({ name: '', location: '', rtspUrl: '', username: '', password: '' });
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status' })
      });
      const data = await res.json();
      setStatus(data);
      setStreaming(data.isStreaming);
    } catch (error) {
      console.error('Failed to fetch status:', error);
    }
  };

  const cleanupFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cleanup' })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Cleaned up ${data.deletedFiles} files, freed ${data.freedSpaceMB} MB`);
        fetchStatus();
      }
    } catch (error) {
      alert('Failed to cleanup files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const startStream = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', rtspUrl: 'rtsp://admin:LBEVFF@192.168.1.132:554/Streaming/Channels/101' })
      });
      const data = await res.json();
      if (data.success) {
        setStreaming(true);
        fetchStatus();
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Failed to start stream');
    } finally {
      setLoading(false);
    }
  };

  const stopStream = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/upload', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'stop' })
      });
      const data = await res.json();
      if (data.success) {
        setStreaming(false);
        fetchStatus();
      }
    } catch (error) {
      alert('Failed to stop stream');
    } finally {
      setLoading(false);
    }
  };







  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Sidebar />

      <div className="lg:ml-72">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <FaBars className="text-xl text-slate-600" />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    Live Camera Feed
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                      {liveClasses.length} Classrooms Streaming
                    </span>
                  </p>
                </div>
              </div>
              <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                <FaPlus />
                Add Camera
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <LiveStreamWS />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {liveClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative bg-slate-900 aspect-video flex items-center justify-center">
                  <FaCamera className="text-slate-600 text-4xl" />
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-red-600 text-white">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
                      LIVE
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      cls.cameraStatus === 'online' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                    }`}>
                      {cls.cameraStatus}
                    </span>
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors">
                    <FaExpand className="text-white text-sm" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{cls.room}</h3>
                  <p className="text-xs text-slate-600 mb-2">{cls.title}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{cls.teacher}</span>
                    <span className="flex items-center">
                      <FaVideo className="mr-1" />
                      {cls.viewers}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Add New Camera</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Camera Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500" placeholder="e.g., Main Classroom Camera" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location/Class *</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500" placeholder="e.g., Room A101" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">RTSP URL *</label>
                <input type="text" value={formData.rtspUrl} onChange={(e) => setFormData({...formData, rtspUrl: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500" placeholder="rtsp://192.168.1.100:554/stream" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500" placeholder="admin" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500" placeholder="••••••••" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2">
                  <FaSave />
                  Add Camera
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}