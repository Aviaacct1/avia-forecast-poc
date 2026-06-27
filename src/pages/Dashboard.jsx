import React, { useState } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import regionsData from '../data/regions.json';

export default function Dashboard({ userProfile, onBack }) {
  const [year, setYear] = useState('2030');

  const yearStr = year;
  const regionList = regionsData.map((r) => ({
    name: r.name,
    pax: r.forecasts[yearStr]?.pax || 0,
    rpk: r.forecasts[yearStr]?.rpk || 0,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-900 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded-lg">
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold">Global Aviation Forecast</h1>
            </div>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="px-4 py-2 rounded bg-blue-800 text-white">
              <option value="2024">2024</option>
              <option value="2030">2030</option>
              <option value="2044">2044</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-blue-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Regions</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm">
              <Download size={16} /> Download
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">REGION</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">PASSENGERS</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">RPK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {regionList.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50">
                  <td className="px-6 py-3">{row.name}</td>
                  <td className="px-6 py-3">{row.pax.toLocaleString()}</td>
                  <td className="px-6 py-3">{row.rpk.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
