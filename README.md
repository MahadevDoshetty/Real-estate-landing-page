
# Pre‑Launch Plots — Landing Page

Minimal modern landing page for a plots pre‑launch registration (Kalaburgi).  
Contains a Vite + React frontend and a small backend for form submissions.

## Features
- Attractive single-page frontend with countdown and priority registration form
- Responsive, modern design (CSS + simple components)
- Backend endpoint placeholder for receiving registrations
- Env-driven API URL (frontend -> backend)

## Repo layout
- frontend/ — Vite + React TypeScript app (src/, public/)
- backend/ — simple Node server (server.js)
- README.md — this file

## Prerequisites
- Node.js (16+)
- npm (or pnpm/yarn)
- Windows shell (commands below use PowerShell / CMD)

## Quick start (development)

1. Install dependencies

Frontend:
```bash
cd c:\Projects\real-estate-landing-page\frontend
npm install
```

Backend:
```bash
cd c:\Projects\real-estate-landing-page\backend
npm install
```

2. Configure environment

Create frontend .env (frontend/.env):
```env
VITE_URL=http://localhost:3000/register
```

Create backend .env (backend/.env) — example:
```env
PORT=3000
# any other secrets you need
```

3. Run

Start backend:
```bash
cd c:\Projects\real-estate-landing-page\backend
# If package.json defines a start script:
npm start
# or:
node server.js
```

Start frontend:
```bash
cd c:\Projects\real-estate-landing-page\frontend
npm run dev
```

Open the frontend dev URL (Vite prints it, commonly http://localhost:5173).

## Build & deploy

Build frontend:
```bash
cd c:\Projects\real-estate-landing-page\frontend
npm run build
```
Serve `dist/` via static host or integrate with your server.

Deploy backend as a Node service (Heroku, DigitalOcean App Platform, Railway, etc.). Update `VITE_URL` to point to the deployed backend.

## Environment variables
- frontend/.env
  - VITE_URL — full URL to backend registration endpoint (e.g. https://api.example.com/register)
- backend/.env
  - PORT — server port

## Notes
- The UI intentionally contains no pricing. It's only a registration flow for a limited-time pre‑launch opportunity near Ram Mandir Circle (2 km) and Railway Station (3.5 km), Kalaburgi.
- Replace the placeholder backend with your real API or integrate with a CRM / email service.
- Ensure privacy & consent text is appropriate for your legal region.

If you want, I can add a sample backend registration handler (saving to a JSON file) or update the deployment README.