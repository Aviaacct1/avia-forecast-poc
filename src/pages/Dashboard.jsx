import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import regionsData from '../data/regions.json';
import airportsData from '../data/airports.json';

export default function Dashboard({ onBack }) {
  const [view, setView] = useState('global');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (view === 'global') {
    const barData = regionsData.map((r) => ({
      name: r.name,
      '2024': (r.forecasts['2024']?.pax || 0) / 1e9,
      '2030': (r.forecasts['2030']?.pax || 0) / 1e9,
      '2044': (r.forecasts['2044']?.pax || 0) / 1e9,
    }));

    const lineData = [
      {
        year: '2024',
        ...Object.fromEntries(regionsData.map((r) => [r.name, (r.forecasts['2024']?.pax || 0) / 1e9])),
      },
      {
        year: '2030',
        ...Object.fromEntries(regionsData.map((r) => [r.name, (r.forecasts['2030']?.pax || 0) / 1e9])),
      },
      {
        year: '2044',
        ...Object.fromEntries(regionsData.map((r) => [r.name, (r.forecasts['2044']?.pax || 0) / 1e9])),
      },
    ];

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
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-x-auto mb-8">
            <div className="px-6 py-4 bg-blue-50 border-b">
              <h3 className="text-lg font-bold">Regions - Passenger Forecast (Billions)</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">REGION</th>
                  <th className="px-6 py-3 text-right font-semibold">2024</th>
                  <th className="px-6 py-3 text-right font-semibold">2030</th>
                  <th className="px-6 py-3 text-right font-semibold">2044</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {regionsData.map((region) => (
                  <tr key={region.name} className="hover:bg-blue-50 cursor-pointer" onClick={() => { setSelectedRegion(region.name); setView('regional'); }}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{region.name}</td>
                    <td className="px-6 py-3 text-right">{((region.forecasts['2024']?.pax || 0) / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{((region.forecasts['2030']?.pax || 0) / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{((region.forecasts['2044']?.pax || 0) / 1e9).toFixed(2)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Comparison (2024, 2030, 2044)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 150 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={150} />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(v) => v.toFixed(2)} />
                  <Legend />
                  <Bar dataKey="2024" fill="#3b82f6" />
                  <Bar dataKey="2030" fill="#1d4ed8" />
                  <Bar dataKey="2044" fill="#1e40af" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-500 mt-2">Click bars or rows to drill down</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Forecast Trend</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(v) => v.toFixed(2)} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  {regionsData.map((region, idx) => {
                    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444'];
                    return <Line key={region.name} type="monotone" dataKey={region.name} stroke={colors[idx % colors.length]} strokeWidth={2} />;
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'regional' && selectedRegion) {
    const regionAirports = airportsData.filter((a) => a.region === selectedRegion);
    const countries = {};
    regionAirports.forEach((airport) => {
      const country = airport.country || 'Unknown';
      if (!countries[country]) countries[country] = { 2024: 0, 2030: 0, 2044: 0 };
      countries[country][2024] += airport.forecasts['2024']?.pax || 0;
      countries[country][2030] += airport.forecasts['2030']?.pax || 0;
      countries[country][2044] += airport.forecasts['2044']?.pax || 0;
    });

    const sorted = Object.entries(countries).sort((a, b) => b[1][2044] - a[1][2044]);
    const barData = sorted.map(([name, data]) => ({
      name,
      '2024': data[2024] / 1e9,
      '2030': data[2030] / 1e9,
      '2044': data[2044] / 1e9,
    }));

    const lineData = [
      { year: '2024', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2024] / 1e9])) },
      { year: '2030', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2030] / 1e9])) },
      { year: '2044', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2044] / 1e9])) },
    ];

    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-4 mb-4">
            <button onClick={() => setView('global')} className="p-2 hover:bg-blue-800 rounded">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold">{selectedRegion}</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-x-auto mb-8">
            <div className="px-6 py-4 bg-blue-50 border-b">
              <h3 className="text-lg font-bold">Countries - Passenger Forecast (Billions)</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">COUNTRY</th>
                  <th className="px-6 py-3 text-right font-semibold">2024</th>
                  <th className="px-6 py-3 text-right font-semibold">2030</th>
                  <th className="px-6 py-3 text-right font-semibold">2044</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sorted.map(([country, data]) => (
                  <tr key={country} className="hover:bg-blue-50 cursor-pointer" onClick={() => { setSelectedCountry(country); setView('country'); }}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{country}</td>
                    <td className="px-6 py-3 text-right">{(data[2024] / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{(data[2030] / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{(data[2044] / 1e9).toFixed(2)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Comparison by Country</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData} layout="vertical" margin={{ top: 20, right: 30, left: 120, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: 'Passengers (Billions)', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(v) => v.toFixed(2)} />
                  <Legend />
                  <Bar dataKey="2024" fill="#3b82f6" />
                  <Bar dataKey="2030" fill="#1d4ed8" />
                  <Bar dataKey="2044" fill="#1e40af" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Forecast Trend by Country</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(v) => v.toFixed(2)} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  {sorted.map(([country], idx) => {
                    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
                    return <Line key={country} type="monotone" dataKey={country} stroke={colors[idx % colors.length]} strokeWidth={2} />;
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'country' && selectedCountry && selectedRegion) {
    const airports = airportsData.filter((a) => a.country === selectedCountry && a.region === selectedRegion).sort((a, b) => (b.forecasts['2044']?.pax || 0) - (a.forecasts['2044']?.pax || 0)).slice(0, 15);

    const barData = airports.map((a) => ({
      code: a.code,
      '2024': (a.forecasts['2024']?.pax || 0) / 1e6,
      '2030': (a.forecasts['2030']?.pax || 0) / 1e6,
      '2044': (a.forecasts['2044']?.pax || 0) / 1e6,
    }));

    const lineData = [
      { year: '2024', ...Object.fromEntries(airports.map((a) => [a.code, (a.forecasts['2024']?.pax || 0) / 1e6])) },
      { year: '2030', ...Object.fromEntries(airports.map((a) => [a.code, (a.forecasts['2030']?.pax || 0) / 1e6])) },
      { year: '2044', ...Object.fromEntries(airports.map((a) => [a.code, (a.forecasts['2044']?.pax || 0) / 1e6])) },
    ];

    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-4 mb-4">
            <button onClick={() => setView('regional')} className="p-2 hover:bg-blue-800 rounded">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold">{selectedCountry}</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-x-auto mb-8">
            <div className="px-6 py-4 bg-blue-50 border-b">
              <h3 className="text-lg font-bold">Top 15 Airports - Passenger Forecast (Millions)</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">CODE</th>
                  <th className="px-6 py-3 text-left font-semibold">AIRPORT</th>
                  <th className="px-6 py-3 text-right font-semibold">2024</th>
                  <th className="px-6 py-3 text-right font-semibold">2030</th>
                  <th className="px-6 py-3 text-right font-semibold">2044</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {airports.map((airport) => (
                  <tr key={airport.code} className="hover:bg-blue-50">
                    <td className="px-6 py-3 font-semibold text-blue-600">{airport.code}</td>
                    <td className="px-6 py-3">{airport.name}</td>
                    <td className="px-6 py-3 text-right">{((airport.forecasts['2024']?.pax || 0) / 1e6).toFixed(0)}M</td>
                    <td className="px-6 py-3 text-right">{((airport.forecasts['2030']?.pax || 0) / 1e6).toFixed(0)}M</td>
                    <td className="px-6 py-3 text-right">{((airport.forecasts['2044']?.pax || 0) / 1e6).toFixed(0)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Comparison by Airport</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="code" angle={-45} textAnchor="end" height={100} />
                  <YAxis label={{ value: 'Passengers (Millions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(v) => v.toFixed(0)} />
                  <Legend />
                  <Bar dataKey="2024" fill="#3b82f6" />
                  <Bar dataKey="2030" fill="#1d4ed8" />
                  <Bar dataKey="2044" fill="#1e40af" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Forecast Trend by Airport</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Passengers (Millions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(v) => v.toFixed(0)} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  {airports.map((airport, idx) => {
                    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
                    return <Line key={airport.code} type="monotone" dataKey={airport.code} stroke={colors[idx % colors.length]} strokeWidth={2} />;
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
