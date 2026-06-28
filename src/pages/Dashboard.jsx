import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import regionsData from '../data/regions.json';
import airportsData from '../data/airports.json';

export default function Dashboard({ onBack }) {
  const [view, setView] = useState('global');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const years = ['2024', '2030', '2044'];

  const handleDrillDown = (name, targetView) => {
    if (targetView === 'regional') {
      setSelectedRegion(name);
      setView('regional');
    } else if (targetView === 'country') {
      setSelectedCountry(name);
      setView('country');
    }
  };

  if (view === 'global') {
    const barChartData = regionsData.map((region) => ({
      name: region.name,
      2024: region.forecasts['2024']?.pax / 1e9 || 0,
      2030: region.forecasts['2030']?.pax / 1e9 || 0,
      2044: region.forecasts['2044']?.pax / 1e9 || 0,
    }));

    const lineChartData = [
      {
        year: '2024',
        ...regionsData.reduce((acc, r) => ({ ...acc, [r.name]: (r.forecasts['2024']?.pax || 0) / 1e9 }), {}),
      },
      {
        year: '2030',
        ...regionsData.reduce((acc, r) => ({ ...acc, [r.name]: (r.forecasts['2030']?.pax || 0) / 1e9 }), {}),
      },
      {
        year: '2044',
        ...regionsData.reduce((acc, r) => ({ ...acc, [r.name]: (r.forecasts['2044']?.pax || 0) / 1e9 }), {}),
      },
    ];

    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444'];

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
                  {years.map((y) => (
                    <th key={y} className="px-6 py-3 text-right font-semibold">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {regionsData.map((region) => (
                  <tr key={region.name} className="hover:bg-blue-50 cursor-pointer" onClick={() => handleDrillDown(region.name, 'regional')}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{region.name}</td>
                    {years.map((y) => (
                      <td key={y} className="px-6 py-3 text-right">{((region.forecasts[y]?.pax || 0) / 1e9).toFixed(2)}B</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Comparison by Region (2024 vs 2030 vs 2044)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={150} />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Legend />
                  <Bar dataKey="2024" fill="#3b82f6" onClick={(data) => handleDrillDown(data.name, 'regional')} cursor="pointer" />
                  <Bar dataKey="2030" fill="#1d4ed8" onClick={(data) => handleDrillDown(data.name, 'regional')} cursor="pointer" />
                  <Bar dataKey="2044" fill="#1e40af" onClick={(data) => handleDrillDown(data.name, 'regional')} cursor="pointer" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-500 mt-2">Click bars to drill down</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Forecast Trend by Region</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Legend />
                  {regionsData.map((region, idx) => (
                    <Line key={region.name} type="monotone" dataKey={region.name} stroke={colors[idx % colors.length]} strokeWidth={2} />
                  ))}
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
      if (!countries[country]) {
        countries[country] = { 2024: 0, 2030: 0, 2044: 0 };
      }
      years.forEach((y) => {
        countries[country][y] += airport.forecasts[y]?.pax || 0;
      });
    });

    const sorted = Object.entries(countries).sort((a, b) => b[1][2044] - a[1][2044]);
    const barChartData = sorted.map(([name, data]) => ({
      name,
      2024: data[2024] / 1e9,
      2030: data[2030] / 1e9,
      2044: data[2044] / 1e9,
    }));

    const lineChartData = [
      { year: '2024', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2024] / 1e9])) },
      { year: '2030', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2030] / 1e9])) },
      { year: '2044', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2044] / 1e9])) },
    ];

    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

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
                  {years.map((y) => (
                    <th key={y} className="px-6 py-3 text-right font-semibold">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {sorted.map(([country, data]) => (
                  <tr key={country} className="hover:bg-blue-50 cursor-pointer" onClick={() => { setSelectedCountry(country); setView('country'); }}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{country}</td>
                    {years.map((y) => (
                      <td key={y} className="px-6 py-3 text-right">{(data[y] / 1e9).toFixed(2)}B</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Comparison by Country</h3>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={barChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: 'Passengers (Billions)', position: 'bottom' }} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Legend />
                  <Bar dataKey="2024" fill="#3b82f6" onClick={(data) => handleDrillDown(data.name, 'country')} cursor="pointer" />
                  <Bar dataKey="2030" fill="#1d4ed8" onClick={(data) => handleDrillDown(data.name, 'country')} cursor="pointer" />
                  <Bar dataKey="2044" fill="#1e40af" onClick={(data) => handleDrillDown(data.name, 'country')} cursor="pointer" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-500 mt-2">Click bars to drill down</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Forecast Trend by Country</h3>
              <ResponsiveContainer width="100%" height={450}>
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  {sorted.map(([country], idx) => (
                    <Line key={country} type="monotone" dataKey={country} stroke={colors[idx % colors.length]} strokeWidth={2} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'country' && selectedCountry && selectedRegion) {
    const countryAirports = airportsData.filter((a) => a.country === selectedCountry && a.region === selectedRegion).sort((a, b) => (b.forecasts['2044']?.pax || 0) - (a.forecasts['2044']?.pax || 0)).slice(0, 15);

    const barChartData = countryAirports.map((a) => ({
      code: a.code,
      2024: (a.forecasts['2024']?.pax || 0) / 1e6,
      2030: (a.forecasts['2030']?.pax || 0) / 1e6,
      2044: (a.forecasts['2044']?.pax || 0) / 1e6,
    }));

    const lineChartData = [
      { year: '2024', ...Object.fromEntries(countryAirports.map((a) => [a.code, (a.forecasts['2024']?.pax || 0) / 1e6])) },
      { year: '2030', ...Object.fromEntries(countryAirports.map((a) => [a.code, (a.forecasts['2030']?.pax || 0) / 1e6])) },
      { year: '2044', ...Object.fromEntries(countryAirports.map((a) => [a.code, (a.forecasts['2044']?.pax || 0) / 1e6])) },
    ];

    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-4 mb-4">
            <button onClick={() => setView('regional')} className="p-2 hover:bg-blue-800 rounded">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold">{selectedCountry}</h1>
          </div>
cd /c/Avia_Forecast_POC/avia-web-poc

rm src/pages/Dashboard.jsx

cat > src/pages/Dashboard.jsx << 'ENDOFFILE'
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import regionsData from '../data/regions.json';
import airportsData from '../data/airports.json';

export default function Dashboard({ onBack }) {
  const [view, setView] = useState('global');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const years = ['2024', '2030', '2044'];

  const handleDrillDown = (name, targetView) => {
    if (targetView === 'regional') {
      setSelectedRegion(name);
      setView('regional');
    } else if (targetView === 'country') {
      setSelectedCountry(name);
      setView('country');
    }
  };

  if (view === 'global') {
    const barChartData = regionsData.map((region) => ({
      name: region.name,
      2024: region.forecasts['2024']?.pax / 1e9 || 0,
      2030: region.forecasts['2030']?.pax / 1e9 || 0,
      2044: region.forecasts['2044']?.pax / 1e9 || 0,
    }));

    const lineChartData = [
      {
        year: '2024',
        ...regionsData.reduce((acc, r) => ({ ...acc, [r.name]: (r.forecasts['2024']?.pax || 0) / 1e9 }), {}),
      },
      {
        year: '2030',
        ...regionsData.reduce((acc, r) => ({ ...acc, [r.name]: (r.forecasts['2030']?.pax || 0) / 1e9 }), {}),
      },
      {
        year: '2044',
        ...regionsData.reduce((acc, r) => ({ ...acc, [r.name]: (r.forecasts['2044']?.pax || 0) / 1e9 }), {}),
      },
    ];

    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444'];

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
                  {years.map((y) => (
                    <th key={y} className="px-6 py-3 text-right font-semibold">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {regionsData.map((region) => (
                  <tr key={region.name} className="hover:bg-blue-50 cursor-pointer" onClick={() => handleDrillDown(region.name, 'regional')}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{region.name}</td>
                    {years.map((y) => (
                      <td key={y} className="px-6 py-3 text-right">{((region.forecasts[y]?.pax || 0) / 1e9).toFixed(2)}B</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Comparison by Region (2024 vs 2030 vs 2044)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={150} />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Legend />
                  <Bar dataKey="2024" fill="#3b82f6" onClick={(data) => handleDrillDown(data.name, 'regional')} cursor="pointer" />
                  <Bar dataKey="2030" fill="#1d4ed8" onClick={(data) => handleDrillDown(data.name, 'regional')} cursor="pointer" />
                  <Bar dataKey="2044" fill="#1e40af" onClick={(data) => handleDrillDown(data.name, 'regional')} cursor="pointer" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-500 mt-2">Click bars to drill down</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Forecast Trend by Region</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Legend />
                  {regionsData.map((region, idx) => (
                    <Line key={region.name} type="monotone" dataKey={region.name} stroke={colors[idx % colors.length]} strokeWidth={2} />
                  ))}
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
      if (!countries[country]) {
        countries[country] = { 2024: 0, 2030: 0, 2044: 0 };
      }
      years.forEach((y) => {
        countries[country][y] += airport.forecasts[y]?.pax || 0;
      });
    });

    const sorted = Object.entries(countries).sort((a, b) => b[1][2044] - a[1][2044]);
    const barChartData = sorted.map(([name, data]) => ({
      name,
      2024: data[2024] / 1e9,
      2030: data[2030] / 1e9,
      2044: data[2044] / 1e9,
    }));

    const lineChartData = [
      { year: '2024', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2024] / 1e9])) },
      { year: '2030', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2030] / 1e9])) },
      { year: '2044', ...Object.fromEntries(sorted.map(([name, data]) => [name, data[2044] / 1e9])) },
    ];

    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

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
                  {years.map((y) => (
                    <th key={y} className="px-6 py-3 text-right font-semibold">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {sorted.map(([country, data]) => (
                  <tr key={country} className="hover:bg-blue-50 cursor-pointer" onClick={() => { setSelectedCountry(country); setView('country'); }}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{country}</td>
                    {years.map((y) => (
                      <td key={y} className="px-6 py-3 text-right">{(data[y] / 1e9).toFixed(2)}B</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Comparison by Country</h3>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={barChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: 'Passengers (Billions)', position: 'bottom' }} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Legend />
                  <Bar dataKey="2024" fill="#3b82f6" onClick={(data) => handleDrillDown(data.name, 'country')} cursor="pointer" />
                  <Bar dataKey="2030" fill="#1d4ed8" onClick={(data) => handleDrillDown(data.name, 'country')} cursor="pointer" />
                  <Bar dataKey="2044" fill="#1e40af" onClick={(data) => handleDrillDown(data.name, 'country')} cursor="pointer" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-500 mt-2">Click bars to drill down</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Forecast Trend by Country</h3>
              <ResponsiveContainer width="100%" height={450}>
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Passengers (Billions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  {sorted.map(([country], idx) => (
                    <Line key={country} type="monotone" dataKey={country} stroke={colors[idx % colors.length]} strokeWidth={2} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'country' && selectedCountry && selectedRegion) {
    const countryAirports = airportsData.filter((a) => a.country === selectedCountry && a.region === selectedRegion).sort((a, b) => (b.forecasts['2044']?.pax || 0) - (a.forecasts['2044']?.pax || 0)).slice(0, 15);

    const barChartData = countryAirports.map((a) => ({
      code: a.code,
      2024: (a.forecasts['2024']?.pax || 0) / 1e6,
      2030: (a.forecasts['2030']?.pax || 0) / 1e6,
      2044: (a.forecasts['2044']?.pax || 0) / 1e6,
    }));

    const lineChartData = [
      { year: '2024', ...Object.fromEntries(countryAirports.map((a) => [a.code, (a.forecasts['2024']?.pax || 0) / 1e6])) },
      { year: '2030', ...Object.fromEntries(countryAirports.map((a) => [a.code, (a.forecasts['2030']?.pax || 0) / 1e6])) },
      { year: '2044', ...Object.fromEntries(countryAirports.map((a) => [a.code, (a.forecasts['2044']?.pax || 0) / 1e6])) },
    ];

    const colors = ['#3b82f6', '#1d4ed8', '#1e40af', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

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
                  {years.map((y) => (
                    <th key={y} className="px-6 py-3 text-right font-semibold">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {countryAirports.map((airport) => (
                  <tr key={airport.code} className="hover:bg-blue-50">
                    <td className="px-6 py-3 font-semibold text-blue-600">{airport.code}</td>
                    <td className="px-6 py-3">{airport.name}</td>
                    {years.map((y) => (
                      <td key={y} className="px-6 py-3 text-right">{((airport.forecasts[y]?.pax || 0) / 1e6).toFixed(0)}M</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-6">Comparison by Airport</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="code" angle={-45} textAnchor="end" height={100} />
                  <YAxis label={{ value: 'Passengers (Millions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(0)} />
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
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: 'Passengers (Millions)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => value.toFixed(0)} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  {countryAirports.map((airport, idx) => (
                    <Line key={airport.code} type="monotone" dataKey={airport.code} stroke={colors[idx % colors.length]} strokeWidth={2} />
                  ))}
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
