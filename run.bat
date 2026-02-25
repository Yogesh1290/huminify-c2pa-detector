@echo off
REM Quick run script for AI Content Detector

echo ========================================
echo AI Content Detector - Quick Run
echo ========================================
echo.

if not exist "venv\Scripts\python.exe" (
    echo ERROR: Virtual environment not found!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

if "%~1"=="" (
    echo Usage: run.bat ^<file_path^>
    echo.
    echo Examples:
    echo   run.bat examples\ChatGPT_Image.png
    echo   run.bat examples\test2.png
    echo   run.bat myimage.jpg
    echo.
    pause
    exit /b 1
)

echo Analyzing: %~1
echo.

venv\Scripts\python.exe bin\detector.py "%~1"

echo.
pause
