import React, { useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const USER_PROFILES = [
  {
    id: 'lessor',
    name: 'Aircraft Lessor',
    icon: '✈️',
    description: 'Track fleet demand, capacity utilisation, and regional growth',
  },
  {
    id: 'airport',
    name: 'Airport Operator',
    icon: '🏢',
    description: 'Monitor passenger throughput, runway capacity, terminal needs',
  },
  {
    id: 'bank',
    name: 'Bank / M&A',
    icon: '🏦',
    description: 'Evaluate asset valuations, transaction multiples, growth profiles',
  },
  {
    id: 'government',
    name: 'Government',
    icon: '🏛️',
    description: 'Plan infrastructure, policy, capacity expansion, taxation',
  },
  {
    id: 'airline',
    name: 'Airline',
    icon: '🛫',
    description: 'Analyse route economics, load factors, fleet planning',
  },
  {
    id: 'university',
    name: 'University / Research',
    icon: '📚',
    description: 'Benchmark forecasts, methodology validation, academic analysis',
  },
  {
    id: 'analyst',
    name: 'Analyst / Consultant',
    icon: '📊',
    description: 'Deep-dive market analysis, competitive landscape, trend spotting',
  },
];

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSelectUser = (userId) => {
    const profile = USER_PROFILES.find((p) => p.id === userId);
    setSelectedProfile(profile);
    setCurrentView('dashboard');
  };

  const handleBackHome = () => {
    setCurrentView('home');
    setSelectedProfile(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {currentView === 'home' ? (
        <Home userProfiles={USER_PROFILES} onSelectUser={handleSelectUser} />
      ) : (
        <Dashboard userProfile={selectedProfile} onBack={handleBackHome} />
      )}
    </div>
  );
}

export default App;
