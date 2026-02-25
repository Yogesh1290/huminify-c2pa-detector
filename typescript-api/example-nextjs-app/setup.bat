@echo off
echo ========================================
echo C2PA Detector - Next.js Setup
echo ========================================
echo.

echo [1/2] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/2] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Run development server:
echo    npm run dev
echo.
echo 2. Open browser:
echo    http://localhost:3000
echo.
echo 3. Deploy to Vercel:
echo    vercel
echo.
echo See DEPLOY.md for deployment instructions
echo.
pause
