import React, { useState, useMemo } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import airportsData from '../data/airports.json';
import regionsData from '../data/regions.json';
import countriesData from '../data/countries.json';
import flowsData from '../data/flows.json';

// Chart component
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
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all"
                style={{ height: `${height}px` }}
                title={`${item.label}: ${item.value.toLocaleString()}`}
              />
              <p className="text-xs text-slate-600 mt-2">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Table component
const DataTable = ({ data, title, columns }) => {
  if (!data || data.length === 0) return null;
  
  return (
    <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-blue-50 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left font-semibold text-slate-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.slice(0, 20).map((row, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition-colors">
                {columns.map((col) => (
                  <td key={col} className="px-6 py-3 text-slate-700">
                    {typeof row[col] === 'number' 
                      ? row[col].toLocaleString('en-US', {
                          maximumFractionDigits: row[col] < 100 ? 2 : 0,
                        })
                      : row[col]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Dashboard({ userProfile, onBack }) {
  const [view, setView] = useState('global'); // global, regional, country, airport
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [year, setYear] = useState('2030');

  // Navigation handlers
  const handleSelectRegion = (regionName) => {
    setSelectedRegion(regionName);
    setView('regional');
  };

  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    setView('country');
  };

  const handleSelectAirport = (airportCode) => {
    setSelectedAirport(airportCode);
    setView('airport');
  };

  const handleBack = () => {
    if (view === 'airport') {
      setView('country');
      setSelectedAirport(null);
    } else if (view === 'country') {
      setView('regional');
      setSelectedCountry(null);
    } else if (view === 'regional') {
      setView('global');
      setSelectedRegion(null);
    }
  };

  // Get data based on current view
  const getViewData = () => {
    const yearStr = year;

    if (view === 'global') {
      const regionList = regionsData.map((r) => ({
        name: r.name,
        pax: r.forecasts[yearStr]?.pax || 0,
        rpk: r.forecasts[yearStr]?.rpk || 0,
        airports: r.forecasts[yearStr]?.airports || 0,
      }));

      return {
        title: 'Global Aviation Forecast',
        breadcrumb: ['Global'],
        chartData: {
          passengers: regionList.map((r) => ({
            label: r.name.substring(0, 10),
            value: r.pax / 1e9,
          })),
          rpk: regionList.map((r) => ({
            label: r.name.substring(0, 10),
            value: r.rpk,
          })),
        },
        tableData: regionList,
        tableColumns: ['name', 'pax', 'rpk', 'airports'],
      };
    }

    if (view === 'regional' && selectedRegion) {
      const regionAirports = airportsData.filter((a) => a.region === selectedRegion);
      const topAirports = regionAirports
        .map((a) => ({
          code: a.code,
          name: a.name,
          country: a.country,
          pax: a.forecasts[yearStr]?.pax || 0,
          rpk: a.forecasts[yearStr]?.rpk || 0,
          atm: a.forecasts[yearStr]?.atm || 0,
        }))
        .sort((a, b) => b.pax - a.pax);

      return {
        title: `${selectedRegion} - Regional Detail`,
        breadcrumb: ['Global', selectedRegion],
        chartData: {
          passengers: topAirports.slice(0, 8).map((a) => ({
            label: a.code,
            value: a.pax / 1e6,
          })),
          rpk: topAirports.slice(0, 8).map((a) => ({
            label: a.code,
            value: a.rpk,
          })),
        },
        tableData: topAirports,
        tableColumns: ['code', 'name', 'country', 'pax', 'rpk', 'atm'],
        clickableRows: true,
      };
    }

    if (view === 'country' && selectedCountry && selectedRegion) {
      const countryAirports = airportsData.filter(
        (a) => a.country === selectedCountry && a.region === selectedRegion
      );
      const airportList = countryAirports
        .map((a) => ({
          code: a.code,
          name: a.name,
          city: a.city,
          pax: a.forecasts[yearStr]?.pax || 0,
          rpk: a.forecasts[yearStr]?.rpk || 0,
          atm: a.forecasts[yearStr]?.atm || 0,
        }))
        .sort((a, b) => b.pax - a.pax);

      return {
        title: `${selectedCountry} - Airports`,
        breadcrumb: ['Global', selectedRegion, selectedCountry],
        tableData: airportList,
        tableColumns: ['code', 'name', 'city', 'pax', 'rpk', 'atm'],
        clickableRows: true,
      };
    }

    if (view === 'airport' && selectedAirport) {
      const airport = airportsData.find((a) => a.code === selectedAirport);
      if (!airport) return null;

      const forecast = airport.forecasts;
      const years = ['2024', '2030', '2044'];

      return {
        title: `${airport.code} - ${airport.name}`,
        breadcrumb: ['Global', airport.region, airport.country, airport.code],
        airport,
        forecastTable: years.map((y) => ({
          year: y,
          pax: forecast[y]?.pax || 0,
          atm: forecast[y]?.atm || 0,
          rpk: forecast[y]?.rpk || 0,
          fleet_total: (forecast[y]?.fleet_nb || 0) + (forecast[y]?.fleet_wb || 0) + (forecast[y]?.fleet_lhnb || 0),
        })),
      };
    }

    return null;
  };

  const viewData = getViewData();

  if (!viewData) {
    return (
      <div className="min-h-screen bg-slate-100 p-4">
        <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
          Back to Home
        </button>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <p className="text-blue-200 text-sm">Viewing as: {userProfile.name}</p>
                <h1 className="text-3xl font-bold">{viewData.title}</h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-sm mb-1">Forecast Year:</p>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-4 py-2 rounded bg-blue-800 text-white font-semibold border border-blue-700"
              >
                <option value="2024">2024</option>
                <option value="2030">2030</option>
                <option value="2044">2044</option>
              </select>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-100 text-sm">
            {viewData.breadcrumb.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx > 0 && <span>›</span>}
                <button
                  onClick={() => {
                    if (idx === 0) {
                      setView('global');
                      setSelectedRegion(null);
                      setSelectedCountry(null);
                      setSelectedAirport(null);
                    } else if (idx === 1) {
                      setView('regional');
                      setSelectedCountry(null);
                      setSelectedAirport(null);
                    }
                  }}
                  className="hover:text-white underline"
                >
                  {crumb}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Charts */}
        {viewData.chartData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {viewData.chartData.passengers && (
              <SimpleLineChart
                data={viewData.chartData.passengers}
                title="Passengers by Region"
              />
            )}
            {viewData.chartData.rpk && (
              <SimpleLineChart
                data={viewData.chartData.rpk}
                title="RPK (Revenue Passenger Kilometers)"
              />
            )}
          </div>
        )}

        {/* Forecast Table (Airport View) */}
        {viewData.forecastTable && (
          <div className="mb-8 bg-white rounded-lg shadow p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {viewData.airport.name} - Forecast Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">Year</th>
                    <th className="px-6 py-3 text-right font-semibold text-slate-700">Passengers</th>
                    <th className="px-6 py-3 text-right font-semibold text-slate-700">ATMs</th>
                    <th className="px-6 py-3 text-right font-semibold text-slate-700">RPK (bn)</th>
                    <th className="px-6 py-3 text-right font-semibold text-slate-700">Total Fleet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {viewData.forecastTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50">
                      <td className="px-6 py-3 font-semibold text-slate-900">{row.year}</td>
                      <td className="px-6 py-3 text-right text-slate-700">
                        {(row.pax / 1e6).toFixed(1)}M
                      </td>
                      <td className="px-6 py-3 text-right text-slate-700">
                        {(row.atm / 1000).toFixed(0)}K
                      </td>
                      <td className="px-6 py-3 text-right text-slate-700">
                        {row.rpk.toFixed(1)}
                      </td>
                      <td className="px-6 py-3 text-right text-slate-700">
                        {row.fleet_total.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Data Table */}
        {viewData.tableData && viewData.tableColumns && (
          <div
            className={`bg-white rounded-lg shadow border border-slate-200 overflow-hidden`}
          >
            <div className="px-6 py-4 bg-blue-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">
                {view === 'regional'
                  ? 'Top Airports'
                  : view === 'country'
                  ? 'Airports'
                  : 'Regions'}
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                <Download size={16} />
                Download CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {viewData.tableColumns.map((col) => (
                      <th
                        key={col}
                        className="px-6 py-3 text-left font-semibold text-slate-700"
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1).replace('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {viewData.tableData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-blue-50 transition-colors ${
                        viewData.clickableRows ? 'cursor-pointer' : ''
                      }`}
                      onClick={() => {
                        if (viewData.clickableRows) {
                          if (view === 'regional') {
                            handleSelectCountry(row.country);
                          } else if (view === 'country') {
                            handleSelectAirport(row.code);
                          }
                        }
                      }}
                    >
                      {viewData.tableColumns.map((col) => (
                        <td key={col} className="px-6 py-3 text-slate-700">
                          {typeof row[col] === 'number'
                            ? row[col].toLocaleString('en-US', {
                                maximumFractionDigits: row[col] < 100 ? 2 : 0,
                              })
                            : row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
