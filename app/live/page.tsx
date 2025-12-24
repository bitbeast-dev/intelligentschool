'use client';

import Sidebar from '../Sidebar';
import MultiCameraLive from '../MultiCameraLive';

export default function LiveClassPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <div className="lg:ml-72">
        <MultiCameraLive />
      </div>
    </div>
  );
}
