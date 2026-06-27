import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function Dashboard({ userProfile, onBack }) {
  const [view, setView] = useState('global');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-900 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">Global Aviation Forecast</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Interactive Forecast Dashboard</h2>
          <p className="text-slate-600">Drill down: Global → Region → Country → Airport</p>
          <p className="text-slate-600 mt-2">More views coming soon...</p>
        </div>
      </div>
    </div>
  );
}
