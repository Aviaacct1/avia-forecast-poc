import React, { useState } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import airportsData from '../data/airports.json';
import regionsData from '../data/regions.json';

const SimpleLineChart = ({ data, title }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-6">{title}</h3>
      <div className="flex items-end justify-around h-48 gap-2">
        {data.map((item, idx) => {
          const height = ((item.value - min) / range) * 100 + 20;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${height}px` }} />
              <p className="text-xs text-slate-600 mt-2">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Dashboard({ userProfile, onBack }) {
  const [view, setView] = useState('global');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [year, setYear] = useState('2030');

  const getViewData = () => {
    const yearStr = year;
    if (view === 'global') {
      const regionList = regionsData.map((r) => ({
        name: r.name,
        pax: r.forecasts[yearStr]?.pax || 0,
        rpk: r.forecasts[yearStr]?.rpk || 0,
      }));
      return {
        title: 'Global Aviation Forecast',
        breadcrumb: ['Global'],
        chartData: { passengers: regionList.map((r) => ({ label: r.name.substring(0, 10), value: r.pax / 1e9 })) },
        tableData: regionList,
        tableColumns: ['name', 'pax', 'rpk'],
      };
    }
    if (view === 'regional' && selectedRegion) {
      const regionAirports = airportsData.filter((a) => a.region === selectedRegion);
      const topAirports = regionAirports.map((a) => ({ code: a.code, name: a.name, pax: a.forecasts[yearStr]?.pax || 0 })).sort((a, b) => b.pax - a.pax);
      return { title: `${selectedRegion} - Regional`, breadcrumb: ['Global', selectedRegion], tableData: topAirports, tableColumns: ['code', 'name', 'pax'], clickableRows: true };
    }
    return null;
  };

  const viewData = getViewData();
  if (!viewData) return <div className="min-h-screen bg-slate-100 p-4"><p>Loading...</p></div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-blue-900 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded-lg">
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold">{viewData.title}</h1>
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
        {viewData.chartData?.passengers && <SimpleLineChart data={viewData.chartData.passengers} title="Passengers" />}
        
        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden mt-8">
          <div className="px-6 py-4 bg-blue-50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">{view === 'regional' ? 'Airports' : 'Regions'}</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm">
              <Download size={16} /> Download
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {viewData.tableColumns.map((col) => <th key={col} className="px-6 py-3 text-left font-semibold text-slate-700">{col.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {viewData.tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50" onClick={() => { if (viewData.clickableRows && view === 'regional') setSelectedCountry(row.code); }}>
                  {viewData.tableColumns.map((col) => <td key={col} className="px-6 py-3">{typeof row[col] === 'number' ? row[col].toLocaleString() : row[col]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
