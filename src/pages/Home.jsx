import React from 'react';

export default function Home({ userProfiles, onSelectUser }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-blue-900 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Global Aviation Forecast</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Bottom-up airport forecasts through 2044. Consistent across passengers, RPK, and aircraft demand.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your View</h2>
          <p className="text-slate-600 text-lg">Select your role to see the forecast through your lens</p>
        </div>

        {/* User Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => onSelectUser(profile.id)}
              className="text-left bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 p-8 border-2 border-transparent hover:border-blue-500 cursor-pointer"
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{profile.icon}</span>
                <h3 className="text-2xl font-bold text-blue-900">{profile.name}</h3>
              </div>

              {/* Description */}
              <p className="text-slate-600 mb-6">{profile.description}</p>

              {/* Focus Areas */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-500 uppercase">Focus Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.focus.map((focus, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-blue-600 font-semibold text-sm">Click to explore →</p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">About This Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
            <div>
              <p className="font-semibold text-blue-900 mb-2">2,805 Airports</p>
              <p className="text-sm">Global coverage with detailed local forecasts</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-2">21 Year Horizon</p>
              <p className="text-sm">Detailed forecasts from 2024 to 2044</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-2">Bottom-Up Build</p>
              <p className="text-sm">Airport-level data aggregated to global flows</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
