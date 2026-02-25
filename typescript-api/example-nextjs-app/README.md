# C2PA AI Content Detector - Next.js Serverless App

A beautiful, lightweight Next.js web application for detecting AI-generated content using C2PA metadata. Fully serverless and deployable to Vercel!

## ✨ Features

- 🎨 **Beautiful UI** - Modern, responsive design with gradient backgrounds
- 🚀 **Serverless** - Fully serverless architecture (frontend + backend)
- ⚡ **Fast** - Optimized for performance
- 🔒 **Secure** - No data storage, everything processed in real-time
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🌐 **Vercel Ready** - One-click deployment to Vercel

## 🎯 What It Does

Upload an image or video and instantly detect:
- ✅ AI-generated content (OpenAI, Google, Adobe, Microsoft)
- ✅ C2PA metadata verification
- ✅ Digital signature validation
- ✅ Platform identification
- ✅ Confidence scores

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📦 Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/c2pa-detector)

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 3: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

Done! Your app is live! 🎉

## 🏗️ Project Structure

```
nextjs-app/
├── pages/
│   ├── api/              # Serverless API routes
│   │   ├── detect.ts    # Main detection endpoint
│   │   ├── health.ts    # Health check
│   │   └── platforms.ts # Platform list
│   ├── _app.tsx         # App wrapper
│   ├── _document.tsx    # HTML document
│   └── index.tsx        # Home page (UI)
├── lib/                  # Shared services
│   ├── c2paService.ts   # C2PA reading
│   ├── platformService.ts # Platform detection
│   ├── detectorService.ts # Main detector
│   └── types.ts         # TypeScript types
├── styles/              # CSS styles
│   ├── globals.css      # Global styles
│   └── Home.module.css  # Home page styles
├── public/              # Static files
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── next.config.js       # Next.js config
└── vercel.json          # Vercel config
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules
- **C2PA**: @contentauth/c2pa-node
- **Deployment**: Vercel (Serverless)
- **File Upload**: formidable

## 📡 API Endpoints

### POST /api/detect
Upload file for AI content detection

**Request:**
```bash
curl -F "file=@image.png" https://your-app.vercel.app/api/detect
```

**Response:**
```json
{
  "success": true,
  "data": {
    "file": "image.png",
    "verdict": "AI_DETECTED_C2PA",
    "confidence": "high",
    "platform": "openai",
    "company": "OpenAI",
    "aiGenerated": true
  }
}
```

### GET /api/health
Health check endpoint

### GET /api/platforms
Get list of supported platforms

## 🎨 UI Features

- **Drag & Drop** - Drag files directly onto the upload area
- **Real-time Feedback** - Instant loading states and error messages
- **Color-Coded Results** - Visual indicators for AI/Human content
- **Detailed Information** - Complete C2PA metadata display
- **Responsive Design** - Works perfectly on all devices

## 🔧 Configuration

No configuration needed! The app works out of the box.

Optional: Customize in `next.config.js` or `vercel.json`

## 📊 Supported Platforms

- ✅ OpenAI (ChatGPT, DALL-E, Sora)
- ✅ Google (Gemini, Pixel Camera)
- ✅ Adobe (Firefly, Photoshop)
- ✅ Microsoft (Designer, Copilot)

## 📝 Supported File Types

**Images:**
- PNG, JPEG, JPG, WEBP, HEIC, AVIF

**Videos:**
- MP4, MOV, AVI, WEBM, MKV

## 🚀 Performance

- **Cold Start**: ~1-2 seconds
- **Warm Start**: ~200-500ms
- **File Size Limit**: 100MB
- **Memory**: 1024MB per function
- **Timeout**: 10 seconds

## 🔒 Privacy & Security

- ✅ No data storage
- ✅ Files processed in memory only
- ✅ Automatic cleanup after processing
- ✅ No tracking or analytics
- ✅ HTTPS only

## 🌍 Environment Variables

None required! The app uses native C2PA library.

## 📱 Mobile Support

Fully responsive design works on:
- 📱 iOS Safari
- 📱 Android Chrome
- 💻 Desktop browsers
- 📱 Tablets

## 🐛 Troubleshooting

**Build fails on Vercel:**
- Make sure Node.js version is 18+
- Check that all dependencies are installed

**File upload fails:**
- Check file size (max 100MB)
- Verify file format is supported

**C2PA detection fails:**
- File may not have C2PA metadata
- Try with known C2PA images (ChatGPT, Adobe Firefly)

## 📄 License

MIT License - See LICENSE file

## 🙏 Acknowledgments

- [C2PA](https://c2pa.org/) - Content Authenticity Initiative
- [@contentauth/c2pa-node](https://www.npmjs.com/package/@contentauth/c2pa-node) - C2PA Node.js library
- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Deployment platform

## 🔗 Links

- [Live Demo](https://your-app.vercel.app)
- [GitHub Repository](https://github.com/yourusername/c2pa-detector)
- [C2PA Specification](https://c2pa.org/specifications/)

---

**Made with ❤️ for content authenticity and transparency**

**Deploy to Vercel in 30 seconds!** 🚀
