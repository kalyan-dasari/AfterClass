# AfterClass

A student community platform for people who want to grow through **practical experience** — building projects, exploring AI, collaborating on real-world work, and preparing for the industry beyond the classroom.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Framer Motion
- **Backend:** FastAPI, SQLAlchemy, SQLite for local dev or Postgres in production
- **Auth:** JWT (python-jose), bcrypt

## Local Setup

### Prerequisites

- Node.js 18+
- Python 3.10+

### Setup

```bash
cd frontend
npm install
cd ../backend
python -m venv venv
.\venv\Scripts\pip install -r requirements.txt
```

### Run

```bash
npm run dev
```

Starts both frontend (`:5173`) and backend (`:8000`).

---

## Deployment — Step by Step

This project can run as a single **Vercel** deployment.

The frontend is served from Vercel’s static output, and the FastAPI backend runs as a Python Serverless Function at `/api`.

> **Important:** do not use SQLite on Vercel for production data. Serverless filesystems are ephemeral, so writes disappear between invocations. Use a managed Postgres database such as Neon, Supabase, or another Vercel Marketplace provider.

---

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### Step 2: Deploy on Vercel

| # | Action |
|---|--------|
| 1 | Go to [vercel.com/new](https://vercel.com/new) |
| 2 | Import your GitHub repo |
| 3 | Keep the **root directory** at the repository root |
| 4 | Framework should auto-detect as **Vite** |
| 5 | Add your database env var, for example `DATABASE_URL` from Neon |
| 6 | Click **Deploy** |

Vercel reads the root `vercel.json`, builds the frontend from `frontend/`, and exposes the backend through `api/index.py`.

### Step 3: Configure the database

1. Create a Postgres database in Neon or another provider.
2. Copy the connection string into Vercel as `DATABASE_URL`.
3. Redeploy the project so the Python function picks up the env var.

The frontend already calls `/api/...` by default, so it works on the same Vercel domain without a separate backend URL.

---

### Updating After Deployment

Just push to GitHub — Vercel rebuilds the frontend and redeploys the Python function from the same repository.
