// Sample forecast data - structurally matches Excel schema
// This is illustrative data to test UI/UX flows

export const airports = [
  // Europe
  { id: 'LHR', code: 'LHR', name: 'London Heathrow', city: 'London', country: 'United Kingdom', region: 'Europe', zone: 'Europe-West', pax2024: 80000000, pax2030: 95000000, pax2044: 110000000, atm2024: 476000, atm2030: 520000, atm2044: 560000, transfer_ratio: 0.42, domestic_share: 0.15, intl_share: 0.85, rpk_total_2024: 250, rpk_total_2030: 310, rpk_total_2044: 380, fleet_nb: 450, fleet_wb: 350, fleet_lhnb: 85, confidence: 'High', archetype: 'Global_Hub' },
  { id: 'CDG', code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France', region: 'Europe', zone: 'Europe-West', pax2024: 72000000, pax2030: 85000000, pax2044: 100000000, atm2024: 420000, atm2030: 460000, atm2044: 500000, transfer_ratio: 0.38, domestic_share: 0.12, intl_share: 0.88, rpk_total_2024: 230, rpk_total_2030: 285, rpk_total_2044: 350, fleet_nb: 400, fleet_wb: 320, fleet_lhnb: 75, confidence: 'High', archetype: 'Global_Hub' },
  { id: 'AMS', code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands', region: 'Europe', zone: 'Europe-West', pax2024: 68000000, pax2030: 78000000, pax2044: 90000000, atm2024: 410000, atm2030: 445000, atm2044: 475000, transfer_ratio: 0.51, domestic_share: 0.08, intl_share: 0.92, rpk_total_2024: 210, rpk_total_2030: 260, rpk_total_2044: 320, fleet_nb: 380, fleet_wb: 300, fleet_lhnb: 70, confidence: 'High', archetype: 'Regional_Hub' },
  { id: 'FRA', code: 'FRA', name: 'Frankfurt am Main', city: 'Frankfurt', country: 'Germany', region: 'Europe', zone: 'Europe-Central', pax2024: 70000000, pax2030: 82000000, pax2044: 95000000, atm2024: 415000, atm2030: 455000, atm2044: 490000, transfer_ratio: 0.44, domestic_share: 0.10, intl_share: 0.90, rpk_total_2024: 240, rpk_total_2030: 295, rpk_total_2044: 360, fleet_nb: 420, fleet_wb: 330, fleet_lhnb: 80, confidence: 'High', archetype: 'Global_Hub' },
  { id: 'MUC', code: 'MUC', name: 'Munich', city: 'Munich', country: 'Germany', region: 'Europe', zone: 'Europe-Central', pax2024: 48000000, pax2030: 56000000, pax2044: 65000000, atm2024: 285000, atm2030: 320000, atm2044: 350000, transfer_ratio: 0.28, domestic_share: 0.18, intl_share: 0.82, rpk_total_2024: 140, rpk_total_2030: 170, rpk_total_2044: 210, fleet_nb: 250, fleet_wb: 180, fleet_lhnb: 45, confidence: 'High', archetype: 'Major_Airport' },
  { id: 'MAD', code: 'MAD', name: 'Madrid-Barajas', city: 'Madrid', country: 'Spain', region: 'Europe', zone: 'Europe-South', pax2024: 60000000, pax2030: 70000000, pax2044: 82000000, atm2024: 360000, atm2030: 400000, atm2044: 440000, transfer_ratio: 0.32, domestic_share: 0.20, intl_share: 0.80, rpk_total_2024: 175, rpk_total_2030: 215, rpk_total_2044: 265, fleet_nb: 320, fleet_wb: 240, fleet_lhnb: 60, confidence: 'High', archetype: 'Major_Airport' },
  
  // North America
  { id: 'ATL', code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', country: 'United States', region: 'North America', zone: 'USA-Southeast', pax2024: 115000000, pax2030: 135000000, pax2044: 155000000, atm2024: 650000, atm2030: 720000, atm2044: 800000, transfer_ratio: 0.48, domestic_share: 0.65, intl_share: 0.35, rpk_total_2024: 280, rpk_total_2030: 350, rpk_total_2044: 430, fleet_nb: 580, fleet_wb: 420, fleet_lhnb: 95, confidence: 'High', archetype: 'Mega_Hub' },
  { id: 'ORD', code: 'ORD', name: 'Chicago O\'Hare', city: 'Chicago', country: 'United States', region: 'North America', zone: 'USA-Midwest', pax2024: 85000000, pax2030: 100000000, pax2044: 115000000, atm2024: 480000, atm2030: 540000, atm2044: 600000, transfer_ratio: 0.45, domestic_share: 0.60, intl_share: 0.40, rpk_total_2024: 220, rpk_total_2030: 275, rpk_total_2044: 340, fleet_nb: 420, fleet_wb: 310, fleet_lhnb: 70, confidence: 'High', archetype: 'Mega_Hub' },
  { id: 'LAX', code: 'LAX', name: 'Los Angeles', city: 'Los Angeles', country: 'United States', region: 'North America', zone: 'USA-West', pax2024: 88000000, pax2030: 102000000, pax2044: 118000000, atm2024: 490000, atm2030: 550000, atm2044: 610000, transfer_ratio: 0.18, domestic_share: 0.58, intl_share: 0.42, rpk_total_2024: 240, rpk_total_2030: 300, rpk_total_2044: 370, fleet_nb: 450, fleet_wb: 340, fleet_lhnb: 80, confidence: 'High', archetype: 'Major_Hub' },
  { id: 'JFK', code: 'JFK', name: 'New York JFK', city: 'New York', country: 'United States', region: 'North America', zone: 'USA-Northeast', pax2024: 68000000, pax2030: 80000000, pax2044: 92000000, atm2024: 385000, atm2030: 430000, atm2044: 480000, transfer_ratio: 0.22, domestic_share: 0.45, intl_share: 0.55, rpk_total_2024: 200, rpk_total_2030: 250, rpk_total_2044: 310, fleet_nb: 340, fleet_wb: 260, fleet_lhnb: 65, confidence: 'High', archetype: 'Major_Hub' },
  
  // Asia-Pacific
  { id: 'HND', code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', region: 'Asia-Pacific', zone: 'Asia-Northeast', pax2024: 86000000, pax2030: 105000000, pax2044: 128000000, atm2024: 480000, atm2030: 580000, atm2044: 680000, transfer_ratio: 0.25, domestic_share: 0.68, intl_share: 0.32, rpk_total_2024: 210, rpk_total_2030: 280, rpk_total_2044: 360, fleet_nb: 420, fleet_wb: 330, fleet_lhnb: 75, confidence: 'High', archetype: 'Mega_Hub' },
  { id: 'SIN', code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore', region: 'Asia-Pacific', zone: 'Asia-Southeast', pax2024: 68000000, pax2030: 85000000, pax2044: 105000000, atm2024: 385000, atm2030: 460000, atm2044: 540000, transfer_ratio: 0.58, domestic_share: 0.02, intl_share: 0.98, rpk_total_2024: 190, rpk_total_2030: 250, rpk_total_2044: 320, fleet_nb: 340, fleet_wb: 280, fleet_lhnb: 70, confidence: 'High', archetype: 'Regional_Hub' },
  { id: 'HKG', code: 'HKG', name: 'Hong Kong', city: 'Hong Kong', country: 'Hong Kong', region: 'Asia-Pacific', zone: 'Asia-East', pax2024: 72000000, pax2030: 88000000, pax2044: 108000000, atm2024: 410000, atm2030: 490000, atm2044: 570000, transfer_ratio: 0.42, domestic_share: 0.05, intl_share: 0.95, rpk_total_2024: 210, rpk_total_2030: 280, rpk_total_2044: 360, fleet_nb: 380, fleet_wb: 310, fleet_lhnb: 75, confidence: 'High', archetype: 'Regional_Hub' },
];

export const regions = [
  { name: 'Europe', pax2024: 850000000, pax2030: 1020000000, pax2044: 1200000000, rpk2024: 1850, rpk2030: 2310, rpk2044: 2850, cagr_forecast: 1.8, cagr_historical_2013_2019: 2.1, confidence: 'High' },
  { name: 'North America', pax2024: 950000000, pax2030: 1150000000, pax2044: 1320000000, rpk2024: 2100, rpk2030: 2650, rpk2044: 3250, cagr_forecast: 1.9, cagr_historical_2013_2019: 2.3, confidence: 'High' },
  { name: 'Asia-Pacific', pax2024: 1200000000, pax2030: 1650000000, pax2044: 2200000000, rpk2024: 2400, rpk2030: 3450, rpk2044: 4800, cagr_forecast: 4.2, cagr_historical_2013_2019: 4.5, confidence: 'High' },
  { name: 'China', pax2024: 800000000, pax2030: 1250000000, pax2044: 1800000000, rpk2024: 1200, rpk2030: 2100, rpk2044: 3300, cagr_forecast: 5.1, cagr_historical_2013_2019: 4.8, confidence: 'Medium' },
  { name: 'Middle East', pax2024: 320000000, pax2030: 450000000, pax2044: 620000000, rpk2024: 850, rpk2030: 1250, rpk2044: 1750, cagr_forecast: 3.8, cagr_historical_2013_2019: 3.2, confidence: 'High' },
  { name: 'Latin America', pax2024: 280000000, pax2030: 350000000, pax2044: 420000000, rpk2024: 650, rpk2030: 850, rpk2044: 1050, cagr_forecast: 2.1, cagr_historical_2013_2019: 2.0, confidence: 'High' },
];

export const countries = {
  'Europe': [
    { code: 'GB', name: 'United Kingdom', airports: ['LHR'] },
    { code: 'FR', name: 'France', airports: ['CDG'] },
    { code: 'NL', name: 'Netherlands', airports: ['AMS'] },
    { code: 'DE', name: 'Germany', airports: ['FRA', 'MUC'] },
    { code: 'ES', name: 'Spain', airports: ['MAD'] },
  ],
  'North America': [
    { code: 'US', name: 'United States', airports: ['ATL', 'ORD', 'LAX', 'JFK'] },
  ],
  'Asia-Pacific': [
    { code: 'JP', name: 'Japan', airports: ['HND'] },
    { code: 'SG', name: 'Singapore', airports: ['SIN'] },
    { code: 'HK', name: 'Hong Kong', airports: ['HKG'] },
  ],
};

export const corridors = [
  { from: 'Europe', to: 'North America', rpk2024: 420, rpk2030: 550, rpk2044: 680, distance_km: 5800, lhnb_eligible: true, lhnb_share: 0.95 },
  { from: 'Asia-Pacific', to: 'North America', rpk2024: 350, rpk2030: 520, rpk2044: 750, distance_km: 10800, lhnb_eligible: true, lhnb_share: 0.98 },
  { from: 'Europe', to: 'Asia-Pacific', rpk2024: 380, rpk2030: 580, rpk2044: 850, distance_km: 10400, lhnb_eligible: true, lhnb_share: 0.96 },
  { from: 'Middle East', to: 'Asia-Pacific', rpk2024: 280, rpk2030: 450, rpk2044: 680, distance_km: 4200, lhnb_eligible: true, lhnb_share: 0.85 },
  { from: 'Asia-Pacific', to: 'Asia-Pacific', rpk2024: 1200, rpk2030: 1850, rpk2044: 2800, distance_km: 3500, lhnb_eligible: false, lhnb_share: 0.15 },
];

export const benchmarks = [
  { source: 'Boeing CMO 2025', metric: 'RPK Growth', value: 2.5, unit: '%', period: '2025-2044', notes: 'Global average' },
  { source: 'Airbus GMF 2025', metric: 'RPK Growth', value: 2.4, unit: '%', period: '2025-2044', notes: 'Global average' },
  { source: 'IATA Forecast', metric: 'Passenger Growth', value: 2.7, unit: '%', period: '2024-2034', notes: 'Mid-case' },
  { source: 'Avia PoC', metric: 'RPK Growth', value: 3.1, unit: '%', period: '2024-2044', notes: 'Bottom-up aggregate' },
];

export const userProfiles = [
  {
    id: 'lessor',
    name: 'Aircraft Lessor',
    description: 'Monitor fleet demand, utilisation, and replacement cycles',
    icon: '✈️',
    focus: ['Fleet', 'RPK Flows', 'Aircraft Utilisation', 'Retirement Cycles'],
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: 'airport',
    name: 'Airport Operator',
    description: 'Plan capacity, terminal expansion, and commercial growth',
    icon: '🏢',
    focus: ['Passengers', 'ATMs', 'Constraints', 'Revenue', 'Peer Comparison'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'bank',
    name: 'Bank / M&A',
    description: 'Evaluate airport acquisitions and lending decisions',
    icon: '🏦',
    focus: ['Financial Metrics', 'Growth Trajectory', 'Risk Assessment', 'Debt Servicing'],
    color: 'from-blue-700 to-blue-800',
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Regional planning, policy, and sustainability targets',
    icon: '🏛️',
    focus: ['Regional Growth', 'Emissions', 'Policy Impact', 'Infrastructure Planning'],
    color: 'from-blue-600 to-slate-700',
  },
  {
    id: 'airline',
    name: 'Airline',
    description: 'Route planning, fleet requirements, and capacity planning',
    icon: '🛫',
    focus: ['Route Demand', 'Fleet Mix', 'Load Factors', 'Capacity Planning'],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'university',
    name: 'University / Research',
    description: 'Data analysis, trends, and case studies',
    icon: '🎓',
    focus: ['Trends', 'Analysis Tools', 'Downloadable Data', 'Case Studies'],
    color: 'from-indigo-600 to-blue-700',
  },
  {
    id: 'analyst',
    name: 'Analyst',
    description: 'Deep data exploration and custom analysis',
    icon: '📊',
    focus: ['All Variables', 'Raw Data', 'Filtering', 'Export / Download'],
    color: 'from-slate-600 to-blue-600',
  },
];
