@echo off
echo ========================================
echo Testing TypeScript API
echo ========================================
echo.
echo Make sure the server is running: npm run dev
echo.
pause
echo.

echo [1/3] Health Check...
curl -s http://localhost:3000/api/health
echo.
echo.

echo [2/3] Platforms List...
curl -s http://localhost:3000/api/platforms
echo.
echo.

echo [3/3] Detect AI Content...
curl -s -F "file=@../examples/ChatGPT_Image.png" http://localhost:3000/api/detect
echo.
echo.

echo ========================================
echo Test Complete!
echo ========================================
pause
