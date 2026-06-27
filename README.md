# Global Aviation Forecast — Interactive POC

**Live URL:** (Will be created after GitHub + Vercel deployment)

## About

Interactive proof-of-concept dashboard showing global aviation forecasts through 2044, with drill-down from global → region → country → airport.

**Features:**
- 2,805 airports with complete forecast data
- 7 user entry points (Lessor, Airport, Bank, Government, Airline, University, Analyst)
- Interactive navigation with breadcrumbs
- Professional blue UI with Tailwind CSS
- Real data from bottom-up airport-level model

## Tech Stack

- **React 18** - UI framework
- **Recharts** - Charts
- **Tailwind CSS** - Styling
- **Vercel** - Hosting
- **GitHub** - Version control

## Local Development

### Prerequisites
- Node.js 16+ (https://nodejs.org/)
- npm or yarn

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Aviaacct1/avia-forecast-poc.git
cd avia-forecast-poc

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# Opens at http://localhost:3000
```

### Build for Production

```bash
npm run build
```

## Deployment to Vercel

1. **Connect GitHub to Vercel:**
   - Go to vercel.com (already signed in with GitHub)
   - Click "New Project"
   - Select `avia-forecast-poc` repository
   - Click "Import"

2. **Vercel auto-deploys** every time you push to GitHub

3. **Get live URL** from Vercel dashboard

## Project Structure

```
avia-web-poc/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── data/
│   │   ├── airports.json   # 2,805 airports + forecasts
│   │   ├── regions.json    # 6 global regions
│   │   ├── countries.json  # Country/region hierarchy
│   │   └── flows.json      # Zone-to-zone flows
│   ├── pages/
│   │   ├── Home.jsx        # User selection screen
│   │   └── Dashboard.jsx   # Main interactive dashboard
│   ├── App.jsx             # Main app component
│   ├── index.js            # Entry point
│   └── index.css           # Global styling
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Forecast Data

**Airports:** 2,805 (all regions, all countries)
- Passenger forecasts (2024, 2030, 2044)
- ATM forecasts
- RPK (Revenue Passenger Kilometers)
- Fleet composition by type (NB, WB, LHNB)

**Flows:** 1,155 zone-to-zone corridors
- RPK trends
- LHNB eligibility and share

**Regions:** 6 global regions
- Europe, North America, Asia-Pacific, China, Middle East, Latin America

## How to Push Code to GitHub

```bash
# From project root (first time setup):
git init
git add .
git commit -m "Initial commit: Avia forecast POC"
git branch -M main
git remote add origin https://github.com/Aviaacct1/avia-forecast-poc.git
git push -u origin main

# After making changes:
git add .
git commit -m "Your commit message"
git push
```

Vercel auto-deploys on every push.

## Showing Jess

1. **Live URL:** Send her the Vercel link (no setup needed)
2. **Local demo:** Run `npm start`, show at `http://localhost:3000`
3. **Walk-through:**
   - Click a user type (e.g., "Airport Operator")
   - Click a region in the chart
   - Click a country from the list
   - Drill down to a specific airport
   - Use breadcrumbs to navigate back
   - Change forecast year with selector

## Next Steps

1. Get Jess feedback on forecast logic and required variables
2. Define exact data inputs needed for the bottom-up model
3. Build forecast methodology
4. Update with real forecast outputs

---

**Built:** June 2026 | **For:** Avia Solutions | **Status:** POC / Specification Tool
