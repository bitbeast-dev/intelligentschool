'use client';

import { useState } from 'react';
import Sidebar from '../../Sidebar';
import { 
  FaBars, FaThermometerHalf, FaDownload, FaPlus, FaTimes, FaSave, FaEdit, FaTrash
} from 'react-icons/fa';

export default function EnvironmentMonitoring() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    room: '',
    temp: '',
    humidity: '',
    co2: '',
    light: '',
    noise: ''
  });

  const [sensorData, setSensorData] = useState([
    { id: 1, room: 'Classroom A', temp: '22°C', humidity: '55%', co2: '450 ppm', light: '480 lux', noise: '42 dB', status: 'optimal' },
    { id: 2, room: 'Classroom B', temp: '23°C', humidity: '58%', co2: '520 ppm', light: '465 lux', noise: '48 dB', status: 'good' },
    { id: 3, room: 'Classroom C', temp: '21°C', humidity: '52%', co2: '480 ppm', light: '490 lux', noise: '40 dB', status: 'optimal' },
    { id: 4, room: 'Classroom D', temp: '24°C', humidity: '60%', co2: '580 ppm', light: '420 lux', noise: '52 dB', status: 'warning' }
  ]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ room: '', temp: '', humidity: '', co2: '', light: '', noise: '' });
    setShowModal(true);
  };

  const handleEdit = (sensor) => {
    setEditingId(sensor.id);
    setFormData({
      room: sensor.room,
      temp: sensor.temp,
      humidity: sensor.humidity,
      co2: sensor.co2,
      light: sensor.light,
      noise: sensor.noise
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this sensor data?')) {
      setSensorData(sensorData.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setSensorData(sensorData.map(s => s.id === editingId ? { ...s, ...formData } : s));
    } else {
      setSensorData([...sensorData, { id: Date.now(), ...formData, status: 'optimal' }]);
    }
    setShowModal(false);
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
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                    <FaThermometerHalf className="mr-3 text-violet-600" />
                    Environment Monitoring
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">Monitor and optimize learning conditions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleAdd} className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                  <FaPlus />
                  <span className="hidden sm:inline">Add Sensor</span>
                </button>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 text-sm font-medium flex items-center gap-2">
                  <FaDownload />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Classroom</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Temperature</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Humidity</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">CO2</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Light</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Noise</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sensorData.map((data) => (
                    <tr key={data.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{data.room}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-slate-600">{data.temp}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-slate-600">{data.humidity}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-slate-600">{data.co2}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-slate-600">{data.light}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-slate-600">{data.noise}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          data.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' :
                          data.status === 'good' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {data.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <button onClick={() => handleEdit(data)} className="text-blue-600 hover:text-blue-800 mr-3">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(data.id)} className="text-red-600 hover:text-red-800">
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
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit' : 'Add'} Sensor Data</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Classroom *</label>
                  <input type="text" value={formData.room} onChange={(e) => setFormData({...formData, room: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Temperature *</label>
                  <input type="text" value={formData.temp} onChange={(e) => setFormData({...formData, temp: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500" placeholder="22°C" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Humidity *</label>
                  <input type="text" value={formData.humidity} onChange={(e) => setFormData({...formData, humidity: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500" placeholder="55%" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CO2 Level *</label>
                  <input type="text" value={formData.co2} onChange={(e) => setFormData({...formData, co2: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500" placeholder="450 ppm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lighting *</label>
                  <input type="text" value={formData.light} onChange={(e) => setFormData({...formData, light: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500" placeholder="480 lux" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Noise Level *</label>
                  <input type="text" value={formData.noise} onChange={(e) => setFormData({...formData, noise: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500" placeholder="42 dB" required />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-lg flex items-center gap-2">
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
