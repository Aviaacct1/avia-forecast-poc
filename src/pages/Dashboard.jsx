import React, { useState } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import airportsData from '../data/airports.json';
import regionsData from '../data/regions.json';
import countriesData from '../data/countries.json';

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

export default function Dashboard({ userProfile, onBack }) {
  const [view, setView] = useState('global');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [year, setYear] = useState('2030');

  // Navigation handlers

pwd
> c/

cat
cat > /c/Avia_Forecast_POC/avia-web-poc/src/pages/Dashboard.jsx << 'EOF'
[paste the entire Dashboard.jsx code from above]
