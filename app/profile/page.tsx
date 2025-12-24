'use client';

import Sidebar from '../Sidebar';
import { FaBars, FaVideo, FaPlus, FaTimes, FaSave, FaEdit, FaTrash, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function CameraManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rtspUrl: '',
    httpUrl: '',
    username: '',
    password: '',
    resolution: '1080p',
    fps: '30',
    status: 'active'
  });

  const [cameras, setCameras] = useState([
    { id: 1, name: 'Classroom 10A', location: 'Building A - Floor 1', rtspUrl: 'rtsp://192.168.1.101:554/stream', httpUrl: 'http://192.168.1.101/video', username: 'admin', password: '****', resolution: '1080p', fps: 30, status: 'active', lastSeen: '2 min ago' },
    { id: 2, name: 'Classroom 10B', location: 'Building A - Floor 1', rtspUrl: 'rtsp://192.168.1.102:554/stream', httpUrl: 'http://192.168.1.102/video', username: 'admin', password: '****', resolution: '1080p', fps: 30, status: 'active', lastSeen: '1 min ago' },
    { id: 3, name: 'Classroom 11A', location: 'Building A - Floor 2', rtspUrl: 'rtsp://192.168.1.103:554/stream', httpUrl: 'http://192.168.1.103/video', username: 'admin', password: '****', resolution: '720p', fps: 25, status: 'inactive', lastSeen: '15 min ago' },
    { id: 4, name: 'Lab - Computer Science', location: 'Building B - Floor 1', rtspUrl: 'rtsp://192.168.1.104:554/stream', httpUrl: 'http://192.168.1.104/video', username: 'admin', password: '****', resolution: '1080p', fps: 30, status: 'active', lastSeen: '3 min ago' },
    { id: 5, name: 'Library Main Hall', location: 'Building C - Floor 1', rtspUrl: 'rtsp://192.168.1.105:554/stream', httpUrl: 'http://192.168.1.105/video', username: 'admin', password: '****', resolution: '4K', fps: 30, status: 'active', lastSeen: '1 min ago' },
  ]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', location: '', rtspUrl: '', httpUrl: '', username: '', password: '', resolution: '1080p', fps: '30', status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (camera: any) => {
    setEditingId(camera.id);
    setFormData({
      name: camera.name,
      location: camera.location,
      rtspUrl: camera.rtspUrl,
      httpUrl: camera.httpUrl,
      username: camera.username,
      password: camera.password,
      resolution: camera.resolution,
      fps: camera.fps.toString(),
      status: camera.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this camera?')) {
      setCameras(cameras.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = { ...formData, fps: parseInt(formData.fps), lastSeen: 'Just now' };
    if (editingId) {
      setCameras(cameras.map(c => c.id === editingId ? { ...c, ...newData } : c));
    } else {
      setCameras([...cameras, { id: Date.now(), ...newData }]);
    }
    setShowModal(false);
  };

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
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                    <FaVideo className="mr-3 text-purple-600" />
                    IP Camera Management
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">Configure and monitor surveillance cameras</p>
                </div>
              </div>
              <button onClick={handleAdd} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                <FaPlus />
                Add Camera
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Cameras</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{cameras.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FaVideo className="text-2xl text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Cameras</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">{cameras.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <FaCheckCircle className="text-2xl text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Offline Cameras</p>
                  <p className="text-3xl font-bold text-red-600 mt-1">{cameras.filter(c => c.status === 'inactive').length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <FaTimesCircle className="text-2xl text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Camera Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">RTSP URL</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Resolution</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">FPS</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Last Seen</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cameras.map((camera) => (
                    <tr key={camera.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                            <FaVideo />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-slate-900">{camera.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">{camera.location}</td>
                      <td className="px-4 py-4 text-sm text-slate-600 font-mono">{camera.rtspUrl}</td>
                      <td className="px-4 py-4 text-center text-sm font-semibold text-slate-900">{camera.resolution}</td>
                      <td className="px-4 py-4 text-center text-sm font-semibold text-slate-900">{camera.fps}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${camera.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {camera.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-slate-600">{camera.lastSeen}</td>
                      <td className="px-4 py-4 text-center">
                        <button onClick={() => window.open(camera.httpUrl, '_blank')} className="text-purple-600 hover:text-purple-800 mr-2">
                          <FaEye />
                        </button>
                        <button onClick={() => handleEdit(camera)} className="text-blue-600 hover:text-blue-800 mr-2">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(camera.id)} className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit' : 'Add'} Camera</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Camera Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">RTSP URL *</label>
                  <input type="text" value={formData.rtspUrl} onChange={(e) => setFormData({...formData, rtspUrl: e.target.value})} placeholder="rtsp://192.168.1.100:554/stream" className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-mono text-sm" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">HTTP URL</label>
                  <input type="text" value={formData.httpUrl} onChange={(e) => setFormData({...formData, httpUrl: e.target.value})} placeholder="http://192.168.1.100/video" className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Username *</label>
                  <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
                  <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Resolution *</label>
                  <select value={formData.resolution} onChange={(e) => setFormData({...formData, resolution: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500" required>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">FPS *</label>
                  <input type="number" value={formData.fps} onChange={(e) => setFormData({...formData, fps: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500" min="15" max="60" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status *</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500" required>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2">
                  <FaSave />
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
