@echo off
echo ========================================
echo Testing TypeScript C2PA Detection API
echo ========================================
echo.

echo [1/3] Testing health endpoint...
curl -s http://localhost:3000/api/health
echo.
echo.

echo [2/3] Testing platforms endpoint...
curl -s http://localhost:3000/api/platforms
echo.
echo.

echo [3/3] Testing file detection...
echo Note: Requires C2PA CLI tool to be installed
echo Install with: cargo install c2pa-tool
echo.
curl -s -F "file=@../examples/ChatGPT_Image.png" http://localhost:3000/api/detect
echo.
echo.

echo ========================================
echo Test Complete!
echo ========================================
pause
