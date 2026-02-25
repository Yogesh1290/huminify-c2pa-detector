@echo off
echo ========================================
echo AI Content Detector - Setup
echo ========================================
echo.

echo Creating virtual environment...
python -m venv venv

if not exist "venv\Scripts\python.exe" (
    echo ERROR: Failed to create virtual environment!
    echo Please ensure Python 3.8+ is installed.
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
venv\Scripts\python.exe -m pip install --upgrade pip
venv\Scripts\python.exe -m pip install -r requirements.txt

echo.
echo ========================================
echo Verifying installation...
echo ========================================
venv\Scripts\python.exe verify_setup.py

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Quick Start:
echo   1. Use batch files (easiest):
echo      run.bat examples\ChatGPT_Image.png
echo      start_api_server.bat
echo.
echo   2. Or activate virtual environment:
echo      activate.bat
echo      python bin\detector.py image.png
echo.
echo Documentation: docs\QUICK_START.md
echo.
pause
