'use client';
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import CameraStream from './CameraStream';

export default function MultiCameraLive() {
  const [cameras, setCameras] = useState([]);
  const [showAdd, setShowAdd] = useState(true);
  const [newCamera, setNewCamera] = useState({ name: '', rtsp: '', username: '', password: '' });

  const addCamera = () => {
    if (newCamera.name && newCamera.rtsp) {
      let rtspUrl = newCamera.rtsp;
      if (newCamera.username && newCamera.password) {
        rtspUrl = rtspUrl.replace('rtsp://', `rtsp://${newCamera.username}:${newCamera.password}@`);
      }
      setCameras([...cameras, { id: Date.now().toString(), name: newCamera.name, rtsp: rtspUrl }]);
      setNewCamera({ name: '', rtsp: '', username: '', password: '' });
      setShowAdd(false);
    }
  };

  const removeCamera = (id) => {
    setCameras(cameras.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-2 sm:p-4">
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Live Camera Feeds</h1>
            <p className="text-sm text-gray-400 mt-1">{cameras.length} camera{cameras.length !== 1 ? 's' : ''} active</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <FaPlus /> Add Camera
          </button>
        </div>

        {cameras.length === 0 && !showAdd && (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <FaPlus className="text-4xl text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Cameras Added</h2>
            <p className="text-gray-400 mb-4">Add your first camera to start streaming</p>
            <button
              onClick={() => setShowAdd(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Camera
            </button>
          </div>
        )}

        {cameras.length > 0 && (
          <div className={`grid gap-4 ${
            cameras.length === 1 ? 'grid-cols-1' :
            cameras.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
            cameras.length === 3 ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' :
            'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
          }`}>
            {cameras.map(camera => (
              <div key={camera.id} className="relative">
                <button
                  onClick={() => removeCamera(camera.id)}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <FaTimes />
                </button>
                <CameraStream cameraId={camera.id} rtspUrl={camera.rtsp} name={camera.name} />
              </div>
            ))}
          </div>
        )}

        {showAdd && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-white mb-4">Add New Camera</h2>
              <p className="text-sm text-gray-400 mb-4">Enter your camera details below. If your camera requires authentication, provide username and password.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Camera Name</label>
                  <input
                    type="text"
                    value={newCamera.name}
                    onChange={(e) => setNewCamera({...newCamera, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="e.g., Classroom A"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">RTSP URL *</label>
                  <input
                    type="text"
                    value={newCamera.rtsp}
                    onChange={(e) => setNewCamera({...newCamera, rtsp: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="rtsp://192.168.0.104:554/Streaming/Channels/101"
                  />
                  <p className="text-xs text-gray-500 mt-1">Don't include username/password in URL</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Username</label>
                  <input
                    type="text"
                    value={newCamera.username}
                    onChange={(e) => setNewCamera({...newCamera, username: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="admin (leave empty if no auth)"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={newCamera.password}
                    onChange={(e) => setNewCamera({...newCamera, password: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="•••••••• (leave empty if no auth)"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addCamera}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAdd(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
