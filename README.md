# AfterClass

A student community platform for people who want to grow through **practical experience** — building projects, exploring AI, collaborating on real-world work, and preparing for the industry beyond the classroom.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Framer Motion
- **Backend:** FastAPI, SQLAlchemy, SQLite
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

The frontend goes on **Vercel** (free, fast CDN).  
The backend goes on **Render** (free tier with persistent disk for SQLite).

> **Can I deploy everything on Vercel?**  
> Not recommended. Vercel is built for serverless — functions are stateless and read-only (except `/tmp` which resets randomly). SQLite won't persist. Render gives you an always-on server with persistent storage.

---

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

### Step 2: Deploy Frontend on Vercel

| # | Action |
|---|--------|
| 1 | Go to [vercel.com/new](https://vercel.com/new) |
| 2 | Import your GitHub repo |
| 3 | Click **Edit** next to Root Directory → select `frontend` |
| 4 | Framework should auto-detect as **Vite** |
| 5 | Click **Deploy** |

That's it — Vercel reads the `vercel.json` in the repo and handles the rest.

---

### Step 3: Deploy Backend on Render

| # | Action |
|---|--------|
| 1 | Go to [dashboard.render.com](https://dashboard.render.com) and sign up |
| 2 | Click **New +** → **Web Service** |
| 3 | Connect your GitHub repo |
| 4 | **Name:** `afterclass-api` |
| 5 | **Root Directory:** `backend` |
| 6 | **Runtime:** `Python 3` |
| 7 | **Build Command:** `pip install -r requirements.txt` |
| 8 | **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| 9 | **Plan:** Free |
| 10 | Click **Advanced** → **Add Disk** |
| 11 | **Mount Path:** `/data` |
| 12 | **Size:** 1 GB |
| 13 | Click **Create Web Service** |

Render will build and deploy. The backend will be at `https://afterclass-api.onrender.com`.

---

### Step 4: Connect Frontend to Backend

1. Go to your Render dashboard → copy your backend URL (e.g. `https://afterclass-api.onrender.com`)
2. Go to Vercel dashboard → your project → **Settings** → **Environment Variables**
3. Add `VITE_API_URL` = `https://afterclass-api.onrender.com`
4. Re-deploy the frontend from Vercel dashboard

> For now, the frontend uses a relative URL (`/api/...`) which works in development because Vite proxies to the backend. In production, you need to update the API base URL. This can be done either via `VITE_API_URL` env var or by hardcoding the production URL in `frontend/src/api.ts`.

---

### Step 5: Update CORS

In `backend/main.py`, update the `origins` list (line ~125) to include your Vercel frontend URL:

```python
origins = [
    "https://afterclass-xxx.vercel.app",
    "http://localhost:5173",
]
```

Then push the change — Render auto-deploys.

---

### Updating After Deployment

Just push to GitHub — both Vercel and Render auto-deploy from the `main` branch.
