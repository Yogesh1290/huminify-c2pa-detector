# 🚀 Super Simple Test Commands

## Step 1: Start Server (Terminal 1)
```bash
cd typescript-api
npm run dev
```

---

## Step 2: Test (Terminal 2)

### Option 1: Node.js (Easiest!) ✅
```bash
cd typescript-api
node test.js ..\examples\ChatGPT_Image.png
node test.js ..\examples\test2.png
```

### Option 2: PowerShell ✅
```powershell
cd typescript-api
.\test.ps1 ..\examples\ChatGPT_Image.png
.\test.ps1 ..\examples\test2.png
```

### Option 3: Batch File ✅
```cmd
cd typescript-api
test.bat ..\examples\ChatGPT_Image.png
test.bat ..\examples\test2.png
```

---

## That's It! 🎉

Just one simple command:
```bash
node test.js <your-image-file>
```

Or:
```powershell
.\test.ps1 <your-image-file>
```

---

## Example Output

```json
{
  "success": true,
  "data": {
    "file": "ChatGPT_Image.png",
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

## Compare with Python Version

**TypeScript:**
```bash
cd typescript-api
node test.js ..\examples\test2.png
```

**Python:**
```bash
.\run.bat examples\test2.png
```

Both work perfectly! Choose whichever you prefer! 🚀
