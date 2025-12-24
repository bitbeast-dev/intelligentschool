'use client';

import { useState } from 'react';
import Sidebar from '../../Sidebar';
import { FaBars, FaPlus, FaTimes, FaSave, FaEdit, FaTrash, FaTrophy, FaChalkboardTeacher } from 'react-icons/fa';

export default function ClassManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    students: '',
    behavior: '',
    winRate: '',
    advice: ''
  });

  const [classes, setClasses] = useState([
    { id: 1, name: 'Grade 10A', teacher: 'Dr. Sarah Johnson', students: 28, behavior: 'excellent', winRate: 95, advice: 'Maintain current teaching methods', avgScore: 92 },
    { id: 2, name: 'Grade 10B', teacher: 'Prof. Michael Chen', students: 25, behavior: 'good', winRate: 88, advice: 'Focus on student engagement', avgScore: 85 },
    { id: 3, name: 'Grade 11A', teacher: 'Ms. Emily Davis', students: 30, behavior: 'needs-improvement', winRate: 72, advice: 'Implement behavior management strategies', avgScore: 78 },
    { id: 4, name: 'Grade 11B', teacher: 'Dr. Robert Wilson', students: 27, behavior: 'good', winRate: 90, advice: 'Continue positive reinforcement', avgScore: 88 }
  ]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ name: '', teacher: '', students: '', behavior: '', winRate: '', advice: '' });
    setShowModal(true);
  };

  const handleEdit = (cls) => {
    setEditingId(cls.id);
    setFormData({
      name: cls.name,
      teacher: cls.teacher,
      students: cls.students.toString(),
      behavior: cls.behavior,
      winRate: cls.winRate.toString(),
      advice: cls.advice
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this class?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setClasses(classes.map(c => c.id === editingId ? { ...c, ...formData, students: parseInt(formData.students), winRate: parseInt(formData.winRate), avgScore: parseInt(formData.winRate) } : c));
    } else {
      setClasses([...classes, { id: Date.now(), ...formData, students: parseInt(formData.students), winRate: parseInt(formData.winRate), avgScore: parseInt(formData.winRate) }]);
    }
    setShowModal(false);
  };

  const getBehaviorColor = (behavior) => {
    switch(behavior) {
      case 'excellent': return 'bg-emerald-100 text-emerald-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'needs-improvement': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

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
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
                    <FaChalkboardTeacher className="mr-3 text-blue-600" />
                    Class Management
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">Manage classes, behavior, and performance</p>
                </div>
              </div>
              <button onClick={handleAdd} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                <FaPlus />
                <span className="hidden sm:inline">Add Class</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Class Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Teacher</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Students</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Behavior</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Win Rate</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Avg Score</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Advice</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classes.map((cls) => (
                    <tr key={cls.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                            {cls.name.substring(0, 2)}
                          </div>
                          <span className="ml-3 text-sm font-medium text-slate-900">{cls.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{cls.teacher}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-semibold text-slate-900">{cls.students}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getBehaviorColor(cls.behavior)}`}>
                          {cls.behavior.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaTrophy className={cls.winRate >= 90 ? 'text-yellow-500' : 'text-slate-400'} />
                          <span className="text-sm font-bold text-slate-900">{cls.winRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-bold text-blue-600">{cls.avgScore}</td>
                      <td className="px-4 py-4 text-sm text-slate-600 max-w-xs truncate">{cls.advice}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <button onClick={() => handleEdit(cls)} className="text-blue-600 hover:text-blue-800 mr-3">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(cls.id)} className="text-red-600 hover:text-red-800">
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
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit' : 'Add'} Class</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Class Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Teacher *</label>
                  <input type="text" value={formData.teacher} onChange={(e) => setFormData({...formData, teacher: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Students *</label>
                  <input type="number" value={formData.students} onChange={(e) => setFormData({...formData, students: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Behavior *</label>
                  <select value={formData.behavior} onChange={(e) => setFormData({...formData, behavior: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="needs-improvement">Needs Improvement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Win Rate *</label>
                  <input type="number" value={formData.winRate} onChange={(e) => setFormData({...formData, winRate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" min="0" max="100" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Advice</label>
                <textarea value={formData.advice} onChange={(e) => setFormData({...formData, advice: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2">
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
