# 🌌 Vía Láctea Py — Paraguay Space Monitor

Dashboard público de eventos espaciales visibles desde Paraguay y hemisferio sur.

## Qué muestra

- **APOD** — Foto astronómica del día (NASA)
- **Asteroides** — Objetos cercanos a la Tierra (NEO)
- **Bólidos** — Fireballs detectados en Sudamérica
- **Satélites** — Pasadas visibles de ISS desde Asunción
- **Solar** — Actividad solar e índice Kp

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS (dark space theme)
- Cloudflare Pages (deploy)
- NASA Open APIs

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
npx wrangler pages deploy dist
```

## Links

- **Producción:** https://vialactea-py.pages.dev
- **GitHub:** https://github.com/EMATOPPI/vialactea-py

## APIs usadas

| API | Endpoint | Propósito |
|-----|----------|-----------|
| APOD | api.nasa.gov/planetary/apod | Foto del día |
| NEOW | api.nasa.gov/neo/rest/v1/feed | Asteroides |
| DONKI | api.nasa.gov/DONKI/FLR | Eyecciones solares |
| Fireballs | ssd-api.jpl.nasa.gov/fireballs.api | Bólidos |

---

Hecho en Paraguay 🇵🇾 2026