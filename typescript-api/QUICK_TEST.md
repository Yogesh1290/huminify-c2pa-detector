# 🚀 Quick Test Guide

## Super Simple - Just Copy & Paste!

### Step 1: Start Server (Terminal 1)
```bash
cd typescript-api
npm run dev
```

Wait until you see:
```
🚀 Server running on http://localhost:3000
```

---

### Step 2: Test (Terminal 2 - PowerShell)

**Copy and paste these commands ONE BY ONE:**

```powershell
# Go to typescript-api folder
cd typescript-api

# Test 1: Health Check
Invoke-WebRequest -Uri http://localhost:3000/api/health -UseBasicParsing | Select-Object -ExpandProperty Content

# Test 2: Platforms
Invoke-WebRequest -Uri http://localhost:3000/api/platforms -UseBasicParsing | Select-Object -ExpandProperty Content

# Test 3: Detect AI Image (copy all 6 lines together)
$filePath = Resolve-Path "..\examples\ChatGPT_Image.png"
$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"
$fileBytes = [System.IO.File]::ReadAllBytes($filePath)
$bodyLines = @("--$boundary", "Content-Disposition: form-data; name=`"file`"; filename=`"ChatGPT_Image.png`"", "Content-Type: image/png", "", "") -join $LF; $bodyLines += [System.Text.Encoding]::GetEncoding("iso-8859-1").GetString($fileBytes); $bodyLines += "$LF--$boundary--$LF"
Invoke-RestMethod -Uri http://localhost:3000/api/detect -Method POST -ContentType "multipart/form-data; boundary=$boundary" -Body ([System.Text.Encoding]::GetEncoding("iso-8859-1").GetBytes($bodyLines)) | ConvertTo-Json -Depth 10
```

---

## Even Simpler - Use Test Script

```powershell
cd typescript-api
.\test-powershell.ps1
```

---

## Python Version Test

```powershell
# Go back to main folder
cd ..

# Test Python version
.\run.bat examples\ChatGPT_Image.png
```

---

## Expected Results

### TypeScript API Response:
```json
{
  "success": true,
  "data": {
    "file": "ChatGPT_Image.png",
    "fileType": "image",
    "c2paStatus": "valid",
    "verdict": "AI_DETECTED_C2PA",
    "confidence": "high",
    "platform": "openai",
    "company": "OpenAI",
    "aiGenerated": true,
    "signatureValid": true
  }
}
```

### Python Version Output:
```
🎯 VERDICT: AI_DETECTED_C2PA
   Confidence: medium-high
   Platform: OpenAI
```

---

## Troubleshooting

**Server not running?**
```bash
cd typescript-api
npm run dev
```

**Port already in use?**
- Stop other servers or change port in `.env`

**File not found?**
- Make sure you're in `typescript-api` folder when testing
