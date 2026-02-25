@echo off
echo Starting C2PA Verification API Server...
echo.
echo The server will run at http://localhost:8000
echo API docs available at http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

venv\Scripts\python.exe bin\server.py
