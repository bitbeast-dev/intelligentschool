'use client';

import Sidebar from '../../Sidebar';
import { FaBars, FaChalkboardTeacher, FaDownload, FaSearch, FaPlus, FaTimes, FaSave, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function TeacherAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    teachingHours: '',
    engagement: '',
    coverage: '',
    punctuality: '',
    resourceUse: '',
    profDev: '',
    behavior: '',
    avatar: ''
  });

  const [uploading, setUploading] = useState(false);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', teachingHours: 6.5, engagement: 92, coverage: 95, punctuality: 98, resourceUse: 89, profDev: 12, behavior: 'excellent', overallScore: 93 },
    { id: 2, name: 'Prof. Michael Chen', subject: 'Physics', teachingHours: 7.2, engagement: 88, coverage: 90, punctuality: 85, resourceUse: 92, profDev: 15, behavior: 'excellent', overallScore: 90 },
    { id: 3, name: 'Ms. Emily Davis', subject: 'English', teachingHours: 5.8, engagement: 85, coverage: 88, punctuality: 92, resourceUse: 86, profDev: 10, behavior: 'good', overallScore: 87 },
    { id: 4, name: 'Dr. Robert Wilson', subject: 'Chemistry', teachingHours: 6.0, engagement: 78, coverage: 82, punctuality: 88, resourceUse: 80, profDev: 8, behavior: 'good', overallScore: 82 },
    { id: 5, name: 'Mr. James Taylor', subject: 'History', teachingHours: 5.5, engagement: 72, coverage: 75, punctuality: 70, resourceUse: 68, profDev: 5, behavior: 'needs-improvement', overallScore: 72 },
    { id: 6, name: 'Ms. Linda Martinez', subject: 'Biology', teachingHours: 6.8, engagement: 95, coverage: 97, punctuality: 96, resourceUse: 94, profDev: 14, behavior: 'excellent', overallScore: 95 },
    { id: 7, name: 'Dr. David Anderson', subject: 'Computer Science', teachingHours: 7.0, engagement: 90, coverage: 92, punctuality: 94, resourceUse: 91, profDev: 13, behavior: 'excellent', overallScore: 92 },
    { id: 8, name: 'Ms. Patricia Lee', subject: 'Art', teachingHours: 5.2, engagement: 80, coverage: 78, punctuality: 82, resourceUse: 75, profDev: 7, behavior: 'good', overallScore: 79 },
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('chart.js/auto').then((ChartJS) => {
        if (chartRef.current) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
          const colors = ['rgb(99, 102, 241)', 'rgb(139, 92, 246)', 'rgb(236, 72, 153)', 'rgb(239, 68, 68)', 'rgb(249, 115, 22)', 'rgb(234, 179, 8)', 'rgb(34, 197, 94)', 'rgb(20, 184, 166)', 'rgb(6, 182, 212)', 'rgb(59, 130, 246)', 'rgb(147, 51, 234)', 'rgb(219, 39, 119)'];
          const datasets = teachers.map((teacher, index) => {
            const baseScore = teacher.overallScore;
            const randomFluctuation = () => Math.random() * 20 - 10;
            return {
              label: teacher.name,
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
              plugins: { legend: { display: teachers.length <= 15, position: 'top' }, title: { display: true, text: `Activity Trends (${teachers.length} Teachers)` }, tooltip: { mode: 'index', intersect: false } },
              scales: { y: { beginAtZero: true, min: 0, max: 100, title: { display: true, text: 'Activity Value' } }, x: { title: { display: true, text: 'Time Period' } } },
              interaction: { mode: 'nearest', axis: 'x', intersect: false }
            }
          });
        }
      });
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [teachers]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', subject: '', teachingHours: '', engagement: '', coverage: '', punctuality: '', resourceUse: '', profDev: '', behavior: '', avatar: '' });
    setShowModal(true);
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);
    setFormData({
      name: teacher.name,
      subject: teacher.subject,
      teachingHours: teacher.teachingHours.toString(),
      engagement: teacher.engagement.toString(),
      coverage: teacher.coverage.toString(),
      punctuality: teacher.punctuality.toString(),
      resourceUse: teacher.resourceUse.toString(),
      profDev: teacher.profDev.toString(),
      behavior: teacher.behavior,
      avatar: teacher.avatar || ''
    });
    setShowModal(true);
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

  const handleDelete = (id) => {
    if (confirm('Delete this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...formData,
      teachingHours: parseFloat(formData.teachingHours),
      engagement: parseInt(formData.engagement),
      coverage: parseInt(formData.coverage),
      punctuality: parseInt(formData.punctuality),
      resourceUse: parseInt(formData.resourceUse),
      profDev: parseInt(formData.profDev),
      overallScore: Math.round((parseInt(formData.engagement) + parseInt(formData.coverage) + parseInt(formData.punctuality) + parseInt(formData.resourceUse)) / 4)
    };
    if (editingId) {
      setTeachers(teachers.map(t => t.id === editingId ? { ...t, ...newData } : t));
    } else {
      setTeachers([...teachers, { id: Date.now(), ...newData }]);
    }
    setShowModal(false);
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

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Sidebar />

      <div className="lg:ml-72">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100">
                  <FaBars className="text-xl text-slate-600" />
                </button>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center">
                    <FaChalkboardTeacher className="mr-3 text-emerald-600" />
                    Teacher Analytics
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">Performance evaluation and teaching effectiveness</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  />
                </div>
                <button onClick={handleAdd} className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                  <FaPlus />
                  <span className="hidden sm:inline">Add</span>
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                  <FaDownload />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Activity Trends Over Time</h2>
            <p className="text-sm text-slate-600 mb-4">
              Raw time-series data showing how {teachers.length} teachers' activity values changed over 4 weeks. 
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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Teacher</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Subject</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Hours/Day</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Engagement</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Coverage</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Punctuality</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Resource Use</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Prof. Dev</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Performance</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Overall Score</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {teacher.avatar ? (
                            <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div className="ml-3">
                            <p className="text-sm font-medium text-slate-900">{teacher.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{teacher.subject}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-semibold text-slate-900">{teacher.teachingHours}h</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${getScoreColor(teacher.engagement)}`}>{teacher.engagement}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${getScoreColor(teacher.coverage)}`}>{teacher.coverage}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${getScoreColor(teacher.punctuality)}`}>{teacher.punctuality}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-semibold ${getScoreColor(teacher.resourceUse)}`}>{teacher.resourceUse}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-semibold text-slate-900">{teacher.profDev}/15</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getBehaviorColor(teacher.behavior)}`}>
                          {teacher.behavior.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`text-lg font-bold ${getScoreColor(teacher.overallScore)}`}>{teacher.overallScore}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <button onClick={() => handleEdit(teacher)} className="text-blue-600 hover:text-blue-800 mr-3">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(teacher.id)} className="text-red-600 hover:text-red-800">
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
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit' : 'Add'} Teacher</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="w-full px-3 py-2 border border-slate-200 rounded-xl" />
                {uploading && <p className="text-sm text-emerald-600 mt-1">Uploading...</p>}
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
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
                  <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Teaching Hours/Day *</label>
                  <input type="number" step="0.1" value={formData.teachingHours} onChange={(e) => setFormData({...formData, teachingHours: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Engagement (%) *</label>
                  <input type="number" value={formData.engagement} onChange={(e) => setFormData({...formData, engagement: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Coverage (%) *</label>
                  <input type="number" value={formData.coverage} onChange={(e) => setFormData({...formData, coverage: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Punctuality (%) *</label>
                  <input type="number" value={formData.punctuality} onChange={(e) => setFormData({...formData, punctuality: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Resource Use (%) *</label>
                  <input type="number" value={formData.resourceUse} onChange={(e) => setFormData({...formData, resourceUse: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" min="0" max="100" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Prof. Development (0-15) *</label>
                  <input type="number" value={formData.profDev} onChange={(e) => setFormData({...formData, profDev: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" min="0" max="15" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Performance *</label>
                  <select value={formData.behavior} onChange={(e) => setFormData({...formData, behavior: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500" required>
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
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2">
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
