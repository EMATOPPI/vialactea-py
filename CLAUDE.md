# Vía Láctea Py — Paraguay Space Monitor

## Project Overview

**Vía Láctea Py** es un dashboard público de eventos espaciales visibles desde Paraguay y hemisferio sur. Muestra:

- APOD: Foto astronómica del día (NASA)
- NEO: Asteroides cercanos a la Tierra
- Fireballs: Bólidos detectados en la región
- Satellite Passes: Pasadas visibles de ISS y Starlink desde Asunción
- Solar Activity: Índice Kp y eyecciones solares

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS (custom dark space theme)
- **Deploy:** Cloudflare Pages
- **Data:** NASA Open APIs (DEMO_KEY for dev, free tier)

## Architecture

```
src/
├── App.tsx              # Main app with tab navigation
├── index.css            # Global styles + Tailwind
├── components/
│   ├── Header.tsx       # Sticky header with nav tabs
│   ├── Footer.tsx       # Footer
│   ├── APODViewer.tsx   # Astronomy Picture of the Day
│   ├── NEOViewer.tsx    # Near-Earth Objects
│   ├── FireballViewer.tsx # Fireballs in South America
│   ├── SatellitePasses.tsx # ISS/Starlink passes from Asunción
│   └── SolarActivity.tsx  # Solar activity + Kp index
└── main.tsx             # Entry point
```

## Development

```bash
npm install
npm run dev
```

## Deploy

Uses Cloudflare Pages (same account as CBVP/bomberos).

## NASA APIs Used

| API | Endpoint | Purpose |
|-----|----------|---------|
| APOD | `api.nasa.gov/planetary/apod` | Photo of the day |
| NEOW | `api.nasa.gov/neo/rest/v1/feed` | Near-Earth objects |
| DONKI | `api.nasa.gov/DONKI/FLR` | Solar flares |
| Fireballs | `ssd-api.jpl.nasa.gov/fireballs.api` | Fireball detections |

## Environment

- `VITE_NASA_API_KEY` — NASA API key (DEMO_KEY works for dev)
