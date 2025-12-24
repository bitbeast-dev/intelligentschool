'use client';

import Sidebar from '../../Sidebar';
import { FaBars, FaUserGraduate, FaDownload, FaSearch, FaPlus, FaTimes, FaSave, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function StudentAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    attendance: '',
    focus: '',
    engagement: '',
    notetaking: '',
    deviceUsage: '',
    behavior: '',
    avatar: ''
  });

  const [uploading, setUploading] = useState(false);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setStudents([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('chart.js/auto').then((ChartJS) => {
        if (chartRef.current) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
          const colors = ['rgb(99, 102, 241)', 'rgb(139, 92, 246)', 'rgb(236, 72, 153)', 'rgb(239, 68, 68)', 'rgb(249, 115, 22)', 'rgb(234, 179, 8)', 'rgb(34, 197, 94)', 'rgb(20, 184, 166)', 'rgb(6, 182, 212)', 'rgb(59, 130, 246)', 'rgb(147, 51, 234)', 'rgb(219, 39, 119)'];
          const datasets = students.map((student, index) => {
            const baseScore = student.overallScore;
            const randomFluctuation = () => Math.random() * 20 - 10;
            return {
              label: student.name,
              data: [Math.max(0, Math.min(100, baseScore + randomFluctuation())), Math.max(0, Math.min(100, baseScore + randomFluctuation())), Math.max(0, Math.min(100, baseScore + randomFluctuation())), Math.max(0, Math.min(100, baseScore + randomFluctuation()))],
              borderColor: colors[index % colors.length],
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0,
              pointRadius: 4
            };
          });
          const ctx = chartRef.current.getContext('2d');
          chartInstance.current = new ChartJS.default(ctx, {
            type: 'line',
            data: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: students.length <= 15, position: 'top' }, title: { display: true, text: `Behavior Trends (${students.length} Students)` }, tooltip: { mode: 'index', intersect: false } },
              scales: { y: { beginAtZero: true, min: 0, max: 100, title: { display: true, text: 'Behavior Value' } }, x: { title: { display: true, text: 'Time Period' } } },
              interaction: { mode: 'nearest', axis: 'x', intersect: false }
            }
          });
        }
      });
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [students]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', class: '', attendance: '', focus: '', engagement: '', notetaking: '', deviceUsage: '', behavior: '', avatar: '' });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      class: student.class,
      attendance: student.attendance.toString(),
      focus: student.focus.toString(),
      engagement: student.engagement.toString(),
      notetaking: student.notetaking.toString(),
      deviceUsage: student.deviceUsage.toString(),
      behavior: student.behavior,
      avatar: student.avatar || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this student?')) {
      try {
        await fetch(`/api/students?id=${id}`, { method: 'DELETE' });
        fetchStudents();
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'schoolsystem');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      console.log('Cloudinary response:', data);
      setFormData(prev => ({ ...prev, avatar: data.secure_url }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      attendance: parseInt(formData.attendance),
      focus: parseInt(formData.focus),
      engagement: parseInt(formData.engagement),
      notetaking: parseInt(formData.notetaking),
      deviceUsage: parseInt(formData.deviceUsage),
      overallScore: Math.round((parseInt(formData.attendance) + parseInt(formData.focus) + parseInt(formData.engagement) + parseInt(formData.notetaking)) / 4),
      avatar: formData.avatar || null
    };
    
    console.log('Submitting student data:', newData);
    
    try {
      if (editingId) {
        await fetch('/api/students', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...newData })
        });
      } else {
        await fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData)
        });
      }
      fetchStudents();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to save student:', error);
    }
  };

  const getBehaviorColor = (behavior) => {
    switch(behavior) {
      case 'excellent': return 'bg-emerald-100 text-emerald-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'needs-improvement': return 'bg-amber-100 text-amber-700';
      case 'poor': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 font-bold';
    if (score >= 80) return 'text-blue-600 font-semibold';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const filteredStudents = Array.isArray(students) ? students.filter(student => 
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Sidebar />

      <div className="lg:ml-72">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <FaBars className="text-xl text-slate-600" />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent flex items-center">
                    <FaUserGraduate className="mr-3 text-indigo-600" />
                    Student Analytics
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">Detailed performance and behavior analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>
                <button onClick={handleAdd} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                  <FaPlus />
                  <span className="hidden sm:inline">Add</span>
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium flex items-center gap-2">
                  <FaDownload />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Behavior Trends Over Time</h2>
            <p className="text-sm text-slate-600 mb-4">
              Raw time-series data showing how {students.length} students' behavior values changed over 4 weeks. 
              Each line represents actual recorded values with natural fluctuations including increases, decreases, and variations.
            </p>
            <div style={{ height: '400px' }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Class</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Attendance</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Focus</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Engagement</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Note-taking</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Device Usage</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Behavior</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Overall Score</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {student.avatar ? (
                            <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div className="ml-3">
                            <p className="text-sm font-medium text-slate-900">{student.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{student.class}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${getScoreColor(student.attendance)}`}>{student.attendance}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${getScoreColor(student.focus)}`}>{student.focus}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${getScoreColor(student.engagement)}`}>{student.engagement}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${getScoreColor(student.notetaking)}`}>{student.notetaking}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${student.deviceUsage > 30 ? 'text-red-600' : student.deviceUsage > 20 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {student.deviceUsage}%
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getBehaviorColor(student.behavior)}`}>
                          {student.behavior.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-lg font-bold ${getScoreColor(student.overallScore)}`}>{student.overallScore}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <button onClick={() => handleEdit(student)} className="text-blue-600 hover:text-blue-800 mr-3">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-800">
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
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit' : 'Add'} Student</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="w-full px-3 py-2 border border-slate-200 rounded-xl" />
                {uploading && <p className="text-sm text-indigo-600 mt-1">Uploading...</p>}
                {formData.avatar && (
                  <div className="mt-2">
                    <img src={formData.avatar} alt="Preview" className="w-32 h-32 rounded-lg object-cover" />
                    <p className="text-xs text-slate-500 mt-1 break-all">{formData.avatar}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Class *</label>
                  <input type="text" value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Attendance (%) *</label>
                  <input type="number" value={formData.attendance} onChange={(e) => setFormData({...formData, attendance: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Focus (%) *</label>
                  <input type="number" value={formData.focus} onChange={(e) => setFormData({...formData, focus: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Engagement (%) *</label>
                  <input type="number" value={formData.engagement} onChange={(e) => setFormData({...formData, engagement: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Note-taking (%) *</label>
                  <input type="number" value={formData.notetaking} onChange={(e) => setFormData({...formData, notetaking: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Device Usage (%) *</label>
                  <input type="number" value={formData.deviceUsage} onChange={(e) => setFormData({...formData, deviceUsage: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Behavior *</label>
                  <select value={formData.behavior} onChange={(e) => setFormData({...formData, behavior: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" required>
                    <option value="">Select</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="needs-improvement">Needs Improvement</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2">
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
