# ✅ Working Test Commands

## Step 1: Start Server
```bash
cd typescript-api
npm run dev
```

Wait for: `🚀 Server running on http://localhost:3000`

---

## Step 2: Test (Copy & Paste in PowerShell)

### Test 1: Health Check ✅
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/health -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Expected Output:**
```json
{"success":true,"data":{"status":"healthy","timestamp":"...","version":"1.0.0"}}
```

---

### Test 2: Platforms List ✅
```powershell
Invoke-WebRequest -Uri http://localhost:3000/api/platforms -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Expected Output:**
```json
{"success":true,"data":{"platforms":["openai","google","adobe","microsoft"],"count":4}}
```

---

### Test 3: Detect AI Image ✅
**Copy ALL lines together:**
```powershell
$filePath = Resolve-Path "examples\ChatGPT_Image.png"; $boundary = [System.Guid]::NewGuid().ToString(); $LF = "`r`n"; $fileBytes = [System.IO.File]::ReadAllBytes($filePath); $bodyLines = @("--$boundary", "Content-Disposition: form-data; name=`"file`"; filename=`"ChatGPT_Image.png`"", "Content-Type: image/png", "", "") -join $LF; $bodyLines += [System.Text.Encoding]::GetEncoding("iso-8859-1").GetString($fileBytes); $bodyLines += "$LF--$boundary--$LF"; Invoke-RestMethod -Uri http://localhost:3000/api/detect -Method POST -ContentType "multipart/form-data; boundary=$boundary" -Body ([System.Text.Encoding]::GetEncoding("iso-8859-1").GetBytes($bodyLines)) | ConvertTo-Json -Depth 10
```

**Expected Output:**
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

---

## Python Version Test

```powershell
cd ..
.\run.bat examples\ChatGPT_Image.png
```

---

## Summary

✅ **All 3 tests working!**
- Health check: Server is running
- Platforms: Lists 4 platforms
- Detection: Successfully detects AI content from OpenAI

Both Python and TypeScript versions are fully functional! 🎉
