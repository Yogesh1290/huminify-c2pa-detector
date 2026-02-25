@echo off
echo ========================================
echo C2PA Detector - TypeScript Setup
echo ========================================
echo.

echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [2/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [3/3] Checking C2PA CLI tool...
c2pa-tool --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: C2PA CLI tool not found!
    echo.
    echo To install C2PA CLI:
    echo 1. Install Rust: winget install Rustlang.Rust.GNU
    echo 2. Install C2PA: cargo install c2pa-tool
    echo.
    echo See README.md for detailed instructions.
) else (
    echo C2PA CLI tool found!
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy .env.example to .env and configure
echo 2. Run: npm run dev
echo.
pause
