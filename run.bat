@echo off
echo Starting AfterClass Development Servers...

echo Starting Backend Server...
start "Backend (FastAPI)" cmd /k "cd backend && .\venv\Scripts\activate && uvicorn main:app --reload"

echo Starting Frontend Server...
start "Frontend (React)" cmd /k "cd frontend && npm run dev"

echo Both servers are starting in separate windows.
