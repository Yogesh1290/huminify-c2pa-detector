# C2PA Content Detection API - TypeScript Version

TypeScript/Node.js implementation of the C2PA content detection system with support for both Express and Next.js.

## Features

- 🔍 C2PA metadata detection for images and videos
- 🏢 Multi-platform support (OpenAI, Google, Adobe, Microsoft)
- 🚀 Express server for standalone API
- ⚡ Next.js API routes for serverless deployment
- 📝 TypeScript for type safety
- 🎯 Clean architecture with modular design

## Prerequisites

- Node.js 18+ 
- Rust (required for @contentauth/c2pa-node native bindings)

## Installation

### 1. Install Rust

The TypeScript version uses `@contentauth/c2pa-node` which requires Rust for native bindings.

**Windows (PowerShell):**
```powershell
winget install Rustlang.Rust.GNU
```

**macOS/Linux:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Verify installation:
```bash
rustc --version
cargo --version
```

### 2. Install Node.js Dependencies

```bash
cd typescript-api
npm install
```

The `@contentauth/c2pa-node` package will automatically download precompiled binaries for your platform during installation.

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
```

## Usage

### Express Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

Server runs at: `http://localhost:3000`

### Next.js Integration

1. Copy the Next.js API route to your project:
```bash
# For Pages Router
cp nextjs/api/detect.ts your-nextjs-project/pages/api/

# For App Router (Next.js 13+)
cp nextjs/api/detect.ts your-nextjs-project/app/api/detect/route.ts
```

2. Install additional dependency:
```bash
cd your-nextjs-project
npm install formidable
npm install --save-dev @types/formidable
```

3. Copy the source files:
```bash
cp -r src your-nextjs-project/
```

## API Endpoints

### POST /api/detect

Analyze uploaded file for AI content detection.

**Request:**
```bash
curl -X POST http://localhost:3000/api/detect \
  -F "file=@image.png"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "file": "image.png",
    "fileType": "image",
    "c2paStatus": "valid",
    "platform": "openai",
    "company": "OpenAI",
    "verdict": "AI_DETECTED_C2PA",
    "confidence": "high",
    "message": "AI-generated content detected via C2PA",
    "c2paInfo": {
      "title": "Generated Image",
      "software": "ChatGPT",
      "aiGenerated": true,
      "signatureValid": true
    }
  }
}
```

### GET /api/platforms

Get list of supported platforms.

**Response:**
```json
{
  "success": true,
  "data": {
    "platforms": ["openai", "google", "adobe", "microsoft"],
    "count": 4
  }
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "version": "1.0.0"
  }
}
```

## Project Structure

```
typescript-api/
├── src/
│   ├── config/          # Configuration
│   ├── routes/          # Express routes
│   ├── services/        # Business logic
│   │   ├── c2paService.ts
│   │   ├── platformService.ts
│   │   └── detectorService.ts
│   ├── types/           # TypeScript types
│   ├── utils/           # Utilities
│   ├── app.ts           # Express app setup
│   └── index.ts         # Entry point
├── nextjs/
│   └── api/
│       └── detect.ts    # Next.js API route
├── package.json
├── tsconfig.json
└── README.md
```

## Supported File Types

### Images
- PNG, JPEG, JPG, WEBP, HEIC, AVIF

### Videos
- MP4, MOV, AVI, WEBM, MKV, FLV, WMV

## Detection Logic

1. **C2PA Detection (Primary)**: Reads embedded C2PA metadata using CLI tool
2. **Platform Detection**: Identifies AI platform (OpenAI, Google, Adobe, Microsoft)
3. **Signature Validation**: Verifies C2PA signature integrity
4. **Verdict**: Returns confidence level and detection result

## Limitations

- No AI model fallback (C2PA only) - keeps implementation lightweight
- Requires C2PA CLI tool installation
- Video files: C2PA detection only (no AI model analysis)

## Development

**Build:**
```bash
npm run build
```

**Lint:**
```bash
npm run lint
```

**Watch mode:**
```bash
npm run dev
```

## Comparison with Python Version

| Feature | Python Version | TypeScript Version |
|---------|---------------|-------------------|
| C2PA Detection | ✅ | ✅ |
| Platform Detection | ✅ | ✅ |
| Image AI Fallback | ✅ (transformers) | ❌ |
| Video Support | ✅ | ✅ |
| API Server | FastAPI | Express |
| Serverless | ❌ | Next.js |
| Type Safety | ❌ | ✅ TypeScript |

## License

MIT License - See LICENSE file for details

## Contributing

See CONTRIBUTING.md for contribution guidelines.
