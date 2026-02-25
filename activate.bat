@echo off
REM Activate virtual environment for AI Content Detector

if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo ========================================
echo Virtual Environment Activated!
echo ========================================
echo.
echo You can now use:
echo   python bin\detector.py image.png
echo   python bin\server.py
echo   python tools\extract_c2pa_raw.py image.png
echo.
echo To deactivate, type: deactivate
echo ========================================
