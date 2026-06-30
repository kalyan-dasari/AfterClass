# AfterClass

A student community platform for people who want to grow through **practical experience** — building projects, exploring AI, collaborating on real-world work, and preparing for the industry beyond the classroom.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Framer Motion
- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Auth:** JWT (python-jose), bcrypt

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+

### Setup

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
python -m venv venv
.\venv\Scripts\pip install -r requirements.txt
```

### Run

```bash
npm run dev
```

Starts both frontend (Vite on `:5173`) and backend (FastAPI on `:8000`).

### Build

```bash
npm run build
```

Outputs static files to `frontend/dist/`.

## Deployment

### Frontend (static)

Deploy `frontend/dist/` to any static host:

- **Vercel** — `vercel --prod` (set root to `frontend`, output dir to `dist`)
- **Netlify** — drag `dist/` or connect Git repo
- **Cloudflare Pages** — connect repo, build command `npm run build`, output `frontend/dist`

### Backend (FastAPI + SQLite)

The backend requires a Python server with persistent disk (SQLite):

| Platform | Notes |
|----------|-------|
| **Render** | Web Service — start command: `uvicorn main:app --host 0.0.0.0 --port $PORT` (working dir `backend/`) |
| **Railway** | Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT` (root `backend/`) |
| **PythonAnywhere** | Manual setup via web tab, WSGI config pointing to FastAPI |
| **VPS** (DigitalOcean, Hetzner, etc.) | Full control, run with systemd or Docker |

**Important:** SQLite stores data in a local file. On Render/Railway, enable a persistent disk or the database resets on each deploy. For production, consider migrating to PostgreSQL.

### Environment Variables

Create `backend/.env`:

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | JWT signing key (change from default) |
| `DATABASE_URL` | Override the SQLite path |

### CORS

Update `origins` in `backend/main.py` with your production frontend URL before deploying.
