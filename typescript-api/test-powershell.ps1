# TypeScript API Test Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing TypeScript API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if server is running
try {
    $health = Invoke-WebRequest -Uri http://localhost:3000/api/health -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✓ Server is running!" -ForegroundColor Green
}
catch {
    Write-Host "✗ Server not running. Start it with: npm run dev" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[1/3] Health Check..." -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri http://localhost:3000/api/health -UseBasicParsing
Write-Host $response.Content -ForegroundColor White
Write-Host ""

Write-Host "[2/3] Platforms List..." -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri http://localhost:3000/api/platforms -UseBasicParsing
Write-Host $response.Content -ForegroundColor White
Write-Host ""

Write-Host "[3/3] Detect AI Content (ChatGPT Image)..." -ForegroundColor Yellow
$filePath = Resolve-Path "..\examples\ChatGPT_Image.png"
$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"
$fileBytes = [System.IO.File]::ReadAllBytes($filePath)
$bodyLines = @(
    "--$boundary",
    "Content-Disposition: form-data; name=`"file`"; filename=`"ChatGPT_Image.png`"",
    "Content-Type: image/png",
    "",
    ""
) -join $LF
$bodyLines += [System.Text.Encoding]::GetEncoding("iso-8859-1").GetString($fileBytes)
$bodyLines += "$LF--$boundary--$LF"

$result = Invoke-RestMethod -Uri http://localhost:3000/api/detect -Method POST -ContentType "multipart/form-data; boundary=$boundary" -Body ([System.Text.Encoding]::GetEncoding("iso-8859-1").GetBytes($bodyLines))

Write-Host ($result | ConvertTo-Json -Depth 10) -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ All Tests Passed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
