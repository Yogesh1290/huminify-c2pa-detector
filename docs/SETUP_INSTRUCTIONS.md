# Complete Setup Instructions

## What You Have Now:

A 3-layer AI detection system:
1. **Local C2PA API** (Priority 1) - Your own verification server
2. **Embedded C2PA** (Priority 2) - Direct file reading
3. **AI Detection Models** (Priority 3) - Fallback analysis

## Installation:

### 1. Install API Dependencies

```bash
venv\Scripts\pip.exe install fastapi uvicorn python-multipart
```

### 2. Start the C2PA API Server

Open a NEW terminal and run:

```bash
start_api_server.bat
```

This starts your local C2PA verification API at `http://localhost:8000`

Leave this terminal running!

### 3. Test the Detector (in another terminal)

```bash
venv\Scripts\python.exe ai_content_detector.py test2.png
```

## How It Works:

### With API Server Running:
```
🌐 C2PA API: ai_confirmed_api
   🤖 AI GENERATION DETECTED via C2PA API!
   Generator: Adobe Firefly
   
🎯 VERDICT: AI_DETECTED_C2PA_API
   Confidence: high
```

### Without API Server:
```
🌐 C2PA API: api_unavailable
📋 C2PA Embedded: signature_error
🔍 AI Detection: uncertain
   
🎯 VERDICT: UNCERTAIN
   Confidence: low
```

## API Endpoints:

Your local server provides:

- `POST /validate/file` - Upload file for validation
- `POST /validate/base64` - Send base64-encoded data
- `POST /validate/url` - Validate from URL
- `GET /health` - Check if server is running
- `GET /docs` - Interactive API documentation

## Testing the API Directly:

### Using curl:

```bash
curl -X POST http://localhost:8000/validate/file \
  -F "file=@test2.png"
```

### Using browser:

Visit `http://localhost:8000/docs` for interactive testing

## Deploy to Cloud (Optional):

### Free Options:

1. **Render.com** - Free tier for Python apps
2. **Railway.app** - Free tier with 500 hours/month
3. **Fly.io** - Free tier for small apps

Just push your code to GitHub and connect the service.

## Troubleshooting:

### "Connection refused" error:
- Make sure API server is running (`start_api_server.bat`)
- Check if port 8000 is available

### "Module not found" error:
```bash
venv\Scripts\pip.exe install fastapi uvicorn python-multipart
```

### API server won't start:
- Check if another process is using port 8000
- Try changing PORT in the server code

## What Makes This Better:

- **No external dependencies** - Runs completely offline
- **Full control** - You own the verification logic
- **Free forever** - No API costs or rate limits
- **Extensible** - Add your own rules and checks
- **Fast** - Local processing, no network delays

## Next Steps:

1. Test with images that have C2PA data
2. Deploy to cloud for universal access
3. Add authentication if needed
4. Integrate with your web app/extension
