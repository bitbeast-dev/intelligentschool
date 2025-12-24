'use client';

import Sidebar from '../Sidebar';
import { FaBars, FaBrain, FaEye, FaFire, FaDownload, FaPlay, FaPause } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function AIHeatmap() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedFaces, setDetectedFaces] = useState<any[]>([]);
  const [attentionScore, setAttentionScore] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawHeatmap = () => {
      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const centerX = width / 2;
          const centerY = height / 2;
          const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
          const intensity = Math.max(0, 255 - (distance / maxDistance) * 255);
          const time = Date.now() / 1000;
          const wave = Math.sin(time + x / 50) * Math.cos(time + y / 50);
          const finalIntensity = intensity * (0.5 + wave * 0.5);

          data[index] = finalIntensity * 2;
          data[index + 1] = finalIntensity * 0.5;
          data[index + 2] = 0;
          data[index + 3] = finalIntensity;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      const faces = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        attention: Math.random() * 100,
        emotion: ['Focused', 'Engaged', 'Distracted', 'Confused'][Math.floor(Math.random() * 4)]
      }));
      setDetectedFaces(faces);
      setAttentionScore(Math.floor(faces.reduce((acc, f) => acc + f.attention, 0) / faces.length));

      faces.forEach(face => {
        ctx.beginPath();
        ctx.arc(face.x, face.y, 20, 0, 2 * Math.PI);
        ctx.strokeStyle = face.attention > 70 ? '#22c55e' : face.attention > 50 ? '#eab308' : '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(`${Math.floor(face.attention)}%`, face.x - 15, face.y + 35);
      });
    };

    let animationId: number;
    const animate = () => {
      if (isPlaying) {
        drawHeatmap();
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

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
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center">
                    <FaBrain className="mr-3 text-orange-600" />
                    AI Attention Heatmap
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5">Real-time facial recognition & attention tracking</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsPlaying(!isPlaying)} className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:shadow-lg text-sm font-medium flex items-center gap-2">
                  <FaDownload />
                  Export
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Average Attention</p>
                  <p className="text-4xl font-bold mt-2">{attentionScore}%</p>
                </div>
                <FaEye className="text-5xl opacity-30" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Faces Detected</p>
                  <p className="text-4xl font-bold mt-2">{detectedFaces.length}</p>
                </div>
                <FaBrain className="text-5xl opacity-30" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Heat Intensity</p>
                  <p className="text-4xl font-bold mt-2">High</p>
                </div>
                <FaFire className="text-5xl opacity-30" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Engagement</p>
                  <p className="text-4xl font-bold mt-2">{Math.floor(attentionScore * 0.9)}%</p>
                </div>
                <FaEye className="text-5xl opacity-30" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Live Attention Heatmap</h2>
              <div className="relative bg-slate-900 rounded-xl overflow-hidden">
                <canvas ref={canvasRef} width={800} height={450} className="w-full h-auto" />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  LIVE AI TRACKING
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    <span className="text-slate-600">High Attention (70%+)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-amber-500 rounded"></div>
                    <span className="text-slate-600">Medium (50-70%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-slate-600">Low (&lt;50%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Detected Students</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {detectedFaces.map((face) => (
                  <div key={face.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900">Student {face.id + 1}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${face.attention > 70 ? 'bg-emerald-100 text-emerald-700' : face.attention > 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {Math.floor(face.attention)}%
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Emotion: <span className="font-semibold text-slate-900">{face.emotion}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${face.attention > 70 ? 'bg-emerald-500' : face.attention > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${face.attention}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
