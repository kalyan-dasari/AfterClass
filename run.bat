@echo off
cd /d "%~dp0"
echo Starting AfterClass Development Servers...
cd frontend && npm run dev:all
