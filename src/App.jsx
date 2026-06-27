import React, { useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const userProfiles = [
    {
      id: 'lessor',
      name: 'Aircraft Lessor',
      description: 'Monitor fleet demand, utilisation, and replacement cycles',
      icon: '✈️',
      focus: ['Fleet Evolution', 'RPK Flows', 'Aircraft Utilisation', 'Retirement Cycles'],
    },
    {
      id: 'airport',
      name: 'Airport Operator',
      description: 'Plan capacity, terminal expansion, and commercial growth',
      icon: '🏢',
      focus: ['Passengers', 'ATMs', 'Capacity Constraints', 'Peer Comparison'],
    },
    {
      id: 'bank',
      name: 'Bank / M&A',
      description: 'Evaluate airport acquisitions and lending decisions',
      icon: '🏦',
      focus: ['Financial Metrics', 'Growth Trajectory', 'Risk Assessment', 'Debt Capacity'],
    },
    {
      id: 'government',
      name: 'Government',
      description: 'Regional planning, policy, and sustainability targets',
      icon: '🏛️',
      focus: ['Regional Growth', 'Emissions', 'Policy Impact', 'Infrastructure'],
    },
    {
      id: 'airline',
      name: 'Airline',
      description: 'Route planning, fleet requirements, and capacity planning',
      icon: '🛫',
      focus: ['Route Demand', 'Fleet Mix', 'Load Factors', 'Capacity'],
    },
    {
      id: 'university',
      name: 'University / Research',
      description: 'Data analysis, trends, and case studies',
      icon: '🎓',
      focus: ['Trends', 'Analysis Tools', 'Downloadable Data', 'Case Studies'],
    },
    {
      id: 'analyst',
      name: 'Analyst',
      description: 'Deep data exploration and custom analysis',
      icon: '📊',
      focus: ['All Variables', 'Raw Data', 'Filtering', 'Export'],
    },
  ];

  if (!selectedUser) {
    return <Home userProfiles={userProfiles} onSelectUser={setSelectedUser} />;
  }

  return (
    <Dashboard
      userProfile={userProfiles.find(p => p.id === selectedUser)}
      onBack={() => setSelectedUser(null)}
    />
  );
}
