import React, { useState, useMemo } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import airportsData from '../data/airports.json';
import regionsData from '../data/regions.json';

const LineChart = ({ data, title }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      <div className="flex items-end justify-around h-56 gap-1">
        {data.map((item, idx) => {
          const height = ((item.value - min) / range) * 100 + 10;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-all" style={{ height: `${height}px` }} title={`${item.label}: ${item.value.toLocaleString('en-US', { maximumFractionDigits: 1 })}`} />
              <p className="text-xs text-slate-600 mt-2 text-center">{item.label}</p>
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

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
    setView('regional');
  };

  const handleCountryClick = (countryCode) => {
    setSelectedCountry(countryCode);
    setView('country');
  };

  const handleAirportClick = (airportCode) => {
    setSelectedAirport(airportCode);
    setView('airport');
  };

  const handleBreadcrumb = (targetView) => {
    if (targetView === 'global') {
      setView('global');
      setSelectedRegion(null);
      setSelectedCountry(null);
      setSelectedAirport(null);
    } else if (targetView === 'regional') {
      setView('regional');
      setSelectedCountry(null);
      setSelectedAirport(null);
    } else if (targetView === 'country') {
      setView('country');
      setSelectedAirport(null);
    }
  };

  const getGlobalData = useMemo(() => {
    const yearStr = year;
    return regionsData.map((r) => ({
      name: r.name,
      pax2024: r.forecasts['2024']?.pax || 0,
      pax2030: r.forecasts['2030']?.pax || 0,
      pax2044: r.forecasts['2044']?.pax || 0,
      pax: r.forecasts[yearStr]?.pax || 0,
      rpk2024: r.forecasts['2024']?.rpk || 0,
      rpk2030: r.forecasts['2030']?.rpk || 0,
      rpk2044: r.forecasts['2044']?.rpk || 0,
      rpk: r.forecasts[yearStr]?.rpk || 0,
    }));
  }, [year]);

  const getRegionalData = useMemo(() => {
    if (!selectedRegion) return null;
    const yearStr = year;
    const countryAirports = airportsData.filter((a) => a.region === selectedRegion);
    const countryMap = {};
    countryAirports.forEach((airport) => {
      const country = airport.country || 'Unknown';
      if (!countryMap[country]) countryMap[country] = { pax2024: 0, pax2030: 0, pax2044: 0, pax: 0, rpk2024: 0, rpk2030: 0, rpk2044: 0, rpk: 0, airports: 0 };
      countryMap[country].pax2024 += airport.forecasts['2024']?.pax || 0;
      countryMap[country].pax2030 += airport.forecasts['2030']?.pax || 0;
      countryMap[country].pax2044 += airport.forecasts['2044']?.pax || 0;
      countryMap[country].pax += airport.forecasts[yearStr]?.pax || 0;
      countryMap[country].rpk2024 += airport.forecasts['2024']?.rpk || 0;
      countryMap[country].rpk2030 += airport.forecasts['2030']?.rpk || 0;
      countryMap[country].rpk2044 += airport.forecasts['2044']?.rpk || 0;
      countryMap[country].rpk += airport.forecasts[yearStr]?.rpk || 0;
      countryMap[country].airports += 1;
    });
    return Object.entries(countryMap).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.pax - a.pax);
  }, [selectedRegion, year]);

  const getCountryData = useMemo(() => {
    if (!selectedCountry || !selectedRegion) return null;
    const yearStr = year;
    const countryAirports = airportsData.filter((a) => a.country === selectedCountry && a.region === selectedRegion);
    return countryAirports.map((a) => ({
      code: a.code,
      name: a.name,
      city: a.city,
      pax2024: a.forecasts['2024']?.pax || 0,
      pax2030: a.forecasts['2030']?.pax || 0,
      pax2044: a.forecasts['2044']?.pax || 0,
      pax: a.forecasts[yearStr]?.pax || 0,
      rpk: a.forecasts[yearStr]?.rpk || 0,
      atm: a.forecasts[yearStr]?.atm || 0,
    })).sort((a, b) => b.pax - a.pax).slice(0, 15);
  }, [selectedCountry, selectedRegion, year]);

  const getAirportData = useMemo(() => {
    if (!selectedAirport) return null;
    const airport = airportsData.find((a) => a.code === selectedAirport);
    if (!airport) return null;
    const years = ['2024', '2030', '2044'];
cat > src/pages/Dashboard.jsx << 'EOF'
import React, { useState, useMemo } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import airportsData from '../data/airports.json';
import regionsData from '../data/regions.json';

const LineChart = ({ data, title }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      <div className="flex items-end justify-around h-56 gap-1">
        {data.map((item, idx) => {
          const height = ((item.value - min) / range) * 100 + 10;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-all" style={{ height: `${height}px` }} title={`${item.label}: ${item.value.toLocaleString('en-US', { maximumFractionDigits: 1 })}`} />
              <p className="text-xs text-slate-600 mt-2 text-center">{item.label}</p>
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

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
    setView('regional');
  };

  const handleCountryClick = (countryCode) => {
    setSelectedCountry(countryCode);
    setView('country');
  };

  const handleAirportClick = (airportCode) => {
    setSelectedAirport(airportCode);
    setView('airport');
  };

  const handleBreadcrumb = (targetView) => {
    if (targetView === 'global') {
      setView('global');
      setSelectedRegion(null);

git add -A
git commit -m "Fix: remove unused countriesData import"
git push
ls -la src/pages/Dashboard.jsx
cat > src/pages/Dashboard.jsx << 'EOF'
import React, { useState, useMemo } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import airportsData from '../data/airports.json';
import regionsData from '../data/regions.json';

const LineChart = ({ data, title }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      <div className="flex items-end justify-around h-56 gap-1">
        {data.map((item, idx) => {
          const height = ((item.value - min) / range) * 100 + 10;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-all" style={{ height: `${height}px` }} title={`${item.label}: ${item.value.toLocaleString('en-US', { maximumFractionDigits: 1 })}`} />
              <p className="text-xs text-slate-600 mt-2 text-center">{item.label}</p>
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

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
    setView('regional');
  };

  const handleCountryClick = (countryCode) => {
    setSelectedCountry(countryCode);
    setView('country');
  };

  const handleAirportClick = (airportCode) => {
    setSelectedAirport(airportCode);
    setView('airport');
  };

  const handleBreadcrumb = (targetView) => {
    if (targetView === 'global') {
      setView('global');
      setSelectedRegion(null);
      setSelectedCountry(null);
      setSelectedAirport(null);
    } else if (targetView === 'regional') {
      setView('regional');
      setSelectedCountry(null);
      setSelectedAirport(null);
    } else if (targetView === 'country') {
      setView('country');
      setSelectedAirport(null);
    }
  };

  const getGlobalData = useMemo(() => {
    const yearStr = year;
    return regionsData.map((r) => ({
      name: r.name,
      pax2024: r.forecasts['2024']?.pax || 0,
      pax2030: r.forecasts['2030']?.pax || 0,
      pax2044: r.forecasts['2044']?.pax || 0,
      pax: r.forecasts[yearStr]?.pax || 0,
      rpk2024: r.forecasts['2024']?.rpk || 0,
      rpk2030: r.forecasts['2030']?.rpk || 0,
      rpk2044: r.forecasts['2044']?.rpk || 0,
      rpk: r.forecasts[yearStr]?.rpk || 0,
    }));
  }, [year]);

  const getRegionalData = useMemo(() => {
    if (!selectedRegion) return null;
    const yearStr = year;
    const countryAirports = airportsData.filter((a) => a.region === selectedRegion);
    const countryMap = {};
    countryAirports.forEach((airport) => {
      const country = airport.country || 'Unknown';
      if (!countryMap[country]) countryMap[country] = { pax2024: 0, pax2030: 0, pax2044: 0, pax: 0, rpk2024: 0, rpk2030: 0, rpk2044: 0, rpk: 0, airports: 0 };
      countryMap[country].pax2024 += airport.forecasts['2024']?.pax || 0;
      countryMap[country].pax2030 += airport.forecasts['2030']?.pax || 0;
      countryMap[country].pax2044 += airport.forecasts['2044']?.pax || 0;
      countryMap[country].pax += airport.forecasts[yearStr]?.pax || 0;
      countryMap[country].rpk2024 += airport.forecasts['2024']?.rpk || 0;
      countryMap[country].rpk2030 += airport.forecasts['2030']?.rpk || 0;
      countryMap[country].rpk2044 += airport.forecasts['2044']?.rpk || 0;
      countryMap[country].rpk += airport.forecasts[yearStr]?.rpk || 0;
      countryMap[country].airports += 1;
    });
    return Object.entries(countryMap).map(([name, data]) => ({ name, ...data })).sort((a, b) => b.pax - a.pax);
  }, [selectedRegion, year]);

  const getCountryData = useMemo(() => {
    if (!selectedCountry || !selectedRegion) return null;
    const yearStr = year;
    const countryAirports = airportsData.filter((a) => a.country === selectedCountry && a.region === selectedRegion);
    return countryAirports.map((a) => ({
      code: a.code,
      name: a.name,
      city: a.city,
      pax2024: a.forecasts['2024']?.pax || 0,
      pax2030: a.forecasts['2030']?.pax || 0,
      pax2044: a.forecasts['2044']?.pax || 0,
      pax: a.forecasts[yearStr]?.pax || 0,
      rpk: a.forecasts[yearStr]?.rpk || 0,
      atm: a.forecasts[yearStr]?.atm || 0,
    })).sort((a, b) => b.pax - a.pax).slice(0, 15);
  }, [selectedCountry, selectedRegion, year]);

  const getAirportData = useMemo(() => {
    if (!selectedAirport) return null;
    const airport = airportsData.find((a) => a.code === selectedAirport);
    if (!airport) return null;
    const years = ['2024', '2030', '2044'];
    return {
      airport,
      forecast: years.map((y) => ({
        year: y,
        pax: airport.forecasts[y]?.pax || 0,
        atm: airport.forecasts[y]?.atm || 0,
        rpk: airport.forecasts[y]?.rpk || 0,
        fleet: (airport.forecasts[y]?.fleet_nb || 0) + (airport.forecasts[y]?.fleet_wb || 0) + (airport.forecasts[y]?.fleet_lhnb || 0),
      })),
    };
  }, [selectedAirport]);

  if (view === 'global') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded">
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold">Global Aviation Forecast</h1>
            </div>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="px-4 py-2 rounded bg-blue-800 text-white font-semibold">
              <option value="2024">2024</option>
              <option value="2030">2030</option>
              <option value="2044">2044</option>
            </select>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LineChart data={getGlobalData.map((r) => ({ label: r.name.substring(0, 8), value: r.pax / 1e9 }))} title="Passengers by Region (Billions)" />
            <LineChart data={getGlobalData.map((r) => ({ label: r.name.substring(0, 8), value: r.rpk }))} title="RPK by Region (Billions)" />
          </div>
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b border-slate-200 flex justify-between">
              <h3 className="text-lg font-bold">Regions</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm">
                <Download size={16} /> Download
              </button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">REGION</th>
                  <th className="px-6 py-3 text-right font-semibold">2024 PAX</th>
                  <th className="px-6 py-3 text-right font-semibold">2030 PAX</th>
                  <th className="px-6 py-3 text-right font-semibold">2044 PAX</th>
                  <th className="px-6 py-3 text-right font-semibold">RPK</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {getGlobalData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 cursor-pointer" onClick={() => handleRegionClick(row.name)}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{row.name}</td>
                    <td className="px-6 py-3 text-right">{(row.pax2024 / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{(row.pax2030 / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{(row.pax2044 / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{row.rpk.toFixed(0)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'regional' && getRegionalData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded">
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold">{selectedRegion}</h1>
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => handleBreadcrumb('global')} className="hover:text-blue-200">Global</button>
              <span>›</span>
              <span className="text-blue-200">{selectedRegion}</span>
            </div>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="absolute top-6 right-6 px-4 py-2 rounded bg-blue-800 text-white">
              <option value="2024">2024</option>
              <option value="2030">2030</option>
              <option value="2044">2044</option>
            </select>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LineChart data={getRegionalData.map((c) => ({ label: c.name.substring(0, 8), value: c.pax / 1e9 }))} title={`${selectedRegion} - Passengers`} />
            <LineChart data={getRegionalData.map((c) => ({ label: c.name.substring(0, 8), value: c.rpk }))} title={`${selectedRegion} - RPK`} />
          </div>
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b flex justify-between">
              <h3 className="text-lg font-bold">Countries</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm">
                <Download size={16} /> Download
              </button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">COUNTRY</th>
                  <th className="px-6 py-3 text-right font-semibold">AIRPORTS</th>
                  <th className="px-6 py-3 text-right font-semibold">2024 PAX</th>
                  <th className="px-6 py-3 text-right font-semibold">2030 PAX</th>
                  <th className="px-6 py-3 text-right font-semibold">2044 PAX</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {getRegionalData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 cursor-pointer" onClick={() => handleCountryClick(row.name)}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{row.name}</td>
                    <td className="px-6 py-3 text-right">{row.airports}</td>
                    <td className="px-6 py-3 text-right">{(row.pax2024 / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{(row.pax2030 / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{(row.pax2044 / 1e9).toFixed(2)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'country' && getCountryData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded">
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold">{selectedCountry}</h1>
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => handleBreadcrumb('global')} className="hover:text-blue-200">Global</button>
              <span>›</span>
              <button onClick={() => handleBreadcrumb('regional')} className="hover:text-blue-200">{selectedRegion}</button>
              <span>›</span>
              <span className="text-blue-200">{selectedCountry}</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b flex justify-between">
              <h3 className="text-lg font-bold">Top 15 Airports</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-sm">
                <Download size={16} /> Download
              </button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">CODE</th>
                  <th className="px-6 py-3 text-left font-semibold">AIRPORT</th>
                  <th className="px-6 py-3 text-left font-semibold">CITY</th>
                  <th className="px-6 py-3 text-right font-semibold">2024 PAX</th>
                  <th className="px-6 py-3 text-right font-semibold">2030 PAX</th>
                  <th className="px-6 py-3 text-right font-semibold">2044 PAX</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {getCountryData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 cursor-pointer" onClick={() => handleAirportClick(row.code)}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{row.code}</td>
                    <td className="px-6 py-3">{row.name}</td>
                    <td className="px-6 py-3 text-slate-600">{row.city}</td>
                    <td className="px-6 py-3 text-right">{(row.pax2024 / 1e6).toFixed(0)}M</td>
                    <td className="px-6 py-3 text-right">{(row.pax2030 / 1e6).toFixed(0)}M</td>
                    <td className="px-6 py-3 text-right">{(row.pax2044 / 1e6).toFixed(0)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'airport' && getAirportData) {
    const a = getAirportData.airport;
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-blue-900 text-white py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <button onClick={onBack} className="p-2 hover:bg-blue-800 rounded">
                <ChevronLeft size={24} />
              </button>
              <div>
                <p className="text-blue-200 text-sm">{a.city}, {a.country}</p>
                <h1 className="text-3xl font-bold">{a.code} - {a.name}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
            <h3 className="text-lg font-bold mb-6">Forecast Summary</h3>
            <table className="w-full text-sm">
              <thead className="bg-blue-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">YEAR</th>
                  <th className="px-6 py-3 text-right font-semibold">PASSENGERS</th>
                  <th className="px-6 py-3 text-right font-semibold">ATMs</th>
                  <th className="px-6 py-3 text-right font-semibold">RPK (bn)</th>
                  <th className="px-6 py-3 text-right font-semibold">TOTAL FLEET</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {getAirportData.forecast.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50">
                    <td className="px-6 py-3 font-semibold">{row.year}</td>
                    <td className="px-6 py-3 text-right">{(row.pax / 1e6).toFixed(1)}M</td>
                    <td className="px-6 py-3 text-right">{(row.atm / 1000).toFixed(0)}K</td>
                    <td className="px-6 py-3 text-right">{row.rpk.toFixed(1)}</td>
                    <td className="px-6 py-3 text-right">{row.fleet.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-slate-100 flex items-center justify-center"><p>Loading...</p></div>;
}
