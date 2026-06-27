import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import regionsData from '../data/regions.json';
import airportsData from '../data/airports.json';

export default function Dashboard({ onBack }) {
  const [view, setView] = useState('global');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [year] = useState('2030');

  if (view === 'global') {
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
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b">
              <h3 className="text-lg font-bold">Regions</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">REGION</th>
                  <th className="px-6 py-3 text-right font-semibold">PASSENGERS</th>
                  <th className="px-6 py-3 text-right font-semibold">RPK</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {regionsData.map((region) => (
                  <tr key={region.name} className="hover:bg-blue-50 cursor-pointer" onClick={() => { setSelectedRegion(region.name); setView('regional'); }}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{region.name}</td>
                    <td className="px-6 py-3 text-right">{((region.forecasts[year]?.pax || 0) / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{(region.forecasts[year]?.rpk || 0).toFixed(0)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      if (!countries[country]) countries[country] = { pax: 0, rpk: 0 };
      countries[country].pax += airport.forecasts[year]?.pax || 0;
      countries[country].rpk += airport.forecasts[year]?.rpk || 0;
    });

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
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b">
              <h3 className="text-lg font-bold">Countries</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">COUNTRY</th>
                  <th className="px-6 py-3 text-right font-semibold">PASSENGERS</th>
                  <th className="px-6 py-3 text-right font-semibold">RPK</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {Object.entries(countries).map(([country, data]) => (
                  <tr key={country} className="hover:bg-blue-50 cursor-pointer" onClick={() => { setSelectedCountry(country); setView('country'); }}>
                    <td className="px-6 py-3 font-semibold text-blue-600">{country}</td>
                    <td className="px-6 py-3 text-right">{(data.pax / 1e9).toFixed(2)}B</td>
                    <td className="px-6 py-3 text-right">{data.rpk.toFixed(0)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'country' && selectedCountry && selectedRegion) {
    const countryAirports = airportsData.filter((a) => a.country === selectedCountry && a.region === selectedRegion).slice(0, 15);

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
          <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b">
              <h3 className="text-lg font-bold">Top 15 Airports</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">CODE</th>
                  <th className="px-6 py-3 text-left font-semibold">AIRPORT</th>
                  <th className="px-6 py-3 text-right font-semibold">PASSENGERS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {countryAirports.map((airport) => (
                  <tr key={airport.code} className="hover:bg-blue-50">
                    <td className="px-6 py-3 font-semibold text-blue-600">{airport.code}</td>
                    <td className="px-6 py-3">{airport.name}</td>
                    <td className="px-6 py-3 text-right">{((airport.forecasts[year]?.pax || 0) / 1e6).toFixed(0)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
