import React from 'react';

export default function Home({ userProfiles, onSelectUser }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="bg-blue-900 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Global Aviation Forecast</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Bottom-up airport forecasts through 2044. 2,805 airports. Interactive drill-down.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your View</h2>
          <p className="text-slate-600 text-lg">Select your role to explore the forecast</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => onSelectUser(profile.id)}
              className="text-left bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all p-6 border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-4xl">{profile.icon}</span>
                <h3 className="text-lg font-bold text-blue-900">{profile.name}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">{profile.description}</p>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-blue-600 font-semibold text-xs">Explore →</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
