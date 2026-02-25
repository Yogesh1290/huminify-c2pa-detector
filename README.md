<div align="center">

# 🔍 Huminify - Ai content detector powered by C2PA

### AI Content Detector with C2PA Verification

**Verify content authenticity and detect AI-generated media using C2PA technology**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 18+](https://img.shields.io/badge/node-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red.svg)](https://github.com/Yogesh1290/huminify-c2pa-detector)

[Live Demo](https://huminify.vercel.app) • [Documentation](https://huminify.vercel.app/docs) • [Report Bug](https://github.com/Yogesh1290/huminify-c2pa-detector/issues) • [Request Feature](https://github.com/Yogesh1290/huminify-c2pa-detector/issues)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Supported Platforms](#-supported-platforms)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About

**Huminify** is a comprehensive AI content detection system that uses **C2PA (Coalition for Content Provenance and Authenticity)** technology to verify the authenticity of images and videos. It helps you determine if content was AI-generated or human-created by analyzing embedded Content Credentials.

### Why Huminify?

- ✅ **100% Free & Open Source** - No hidden costs, fully transparent
- ✅ **C2PA Verified** - Industry-standard content authenticity
- ✅ **Multi-Platform Support** - Detects OpenAI, Google, Adobe, Microsoft
- ✅ **Dual Implementation** - Python (full-featured) & TypeScript (lightweight)
- ✅ **Easy Integration** - REST API, CLI, and Next.js web app
- ✅ **Production Ready** - Clean architecture, well-documented

---

## 🌟 Features

### 🔐 3-Layer Detection System

#### **Layer 1: C2PA API Verification** (Priority)
- Local FastAPI server for C2PA manifest validation
- Extracts comprehensive metadata (creator, company, software, certificates)
- Detects 30+ AI generators
- Works for **images and videos**

#### **Layer 2: Embedded C2PA Reading**
- Direct file reading using c2pa-python library
- Works offline without API
- Handles invalid/expired signatures with raw data extraction
- Works for **images and videos**

#### **Layer 3: AI Model Detection** (Fallback)
- Image AI detection using Hugging Face models
- Provides confidence scores when C2PA unavailable
- ~70-85% accuracy (use with caution)
- **Images only** - not available for videos

### 🎨 Supported Content Types

| Type | Formats | C2PA Detection | AI Fallback |
|------|---------|----------------|-------------|
| **Images** | PNG, JPEG, WebP, HEIC, AVIF | ✅ | ✅ |
| **Videos** | MP4, MOV, AVI, WebM, MKV | ✅ | ❌ |

### 🏢 Supported Platforms

**Working C2PA Implementations:**
- ✅ Adobe Firefly (images)
- ✅ Adobe Premiere Pro (videos)
- ✅ OpenAI ChatGPT/DALL-E (images)
- ✅ OpenAI Sora (videos)
- ✅ Microsoft Designer (images)
- ✅ Google Gemini (images)
- ✅ Google Pixel Camera (images)

**200+ C2PA Coalition Members** (various implementation stages)

---

## 🎬 Demo

### Web Application
Visit our live demo: **[huminify.vercel.app](https://huminify.vercel.app)**

### CLI Demo

```bash
$ python bin/detector.py examples/ChatGPT_Image.png

🌐 C2PA API: ai_confirmed_api
   🤖 AI GENERATION DETECTED!
   Software: ChatGPT
   Organization: OpenAI
   Certificate: Truepic Lens CLI in Sora
   AI Assertions: AI Generator: ChatGPT

🎯 VERDICT: AI_DETECTED_C2PA_API
   Confidence: HIGH
```

---

## 🚀 Quick Start

### Choose Your Version

| Version | Best For | Features |
|---------|----------|----------|
| **Python** | Full-featured detection | C2PA + AI models, CLI, API server |
| **TypeScript** | Lightweight & serverless | C2PA only, Express, Next.js |
| **Next.js Web App** | End users | Beautiful UI, drag-and-drop, instant results |

### Python Version (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/Yogesh1290/huminify-c2pa-detector.git
cd huminify-c2pa-detector

# 2. Run setup
setup.bat  # Windows
# or
./setup.sh  # Linux/Mac

# 3. Analyze content
run.bat examples/ChatGPT_Image.png  # Windows
# or
./run.sh examples/ChatGPT_Image.png  # Linux/Mac
```

### TypeScript Version

```bash
# Navigate to TypeScript directory
cd typescript-api

# Install dependencies
npm install

# Start server
npm start

# Test API
curl -X POST http://localhost:3000/api/detect \
  -F "file=@../examples/test.png"
```

### Next.js Web App

```bash
# Navigate to Next.js app
cd typescript-api/example-nextjs-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

---

## 📦 Installation

### Prerequisites

**For Python Version:**
- Python 3.8 or higher
- pip (Python package manager)
- 2GB+ RAM (for AI models)

**For TypeScript Version:**
- Node.js 18 or higher
- npm or yarn
- 500MB+ RAM

### Detailed Installation

#### Python Setup

```bash
# Clone repository
git clone https://github.com/Yogesh1290/huminify-c2pa-detector.git
cd huminify-c2pa-detector

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Verify installation
python verify_setup.py
```

#### TypeScript Setup

```bash
# Navigate to TypeScript directory
cd typescript-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Install C2PA CLI (required)
npm install -g @contentauth/c2pa-node

# Start server
npm start
```

#### Next.js Web App Setup

```bash
# Navigate to Next.js app
cd typescript-api/example-nextjs-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 💻 Usage

### Python CLI

#### Basic Usage

```bash
# Activate virtual environment (one-time per session)
activate.bat  # Windows
# or
source venv/bin/activate  # Linux/Mac

# Analyze image
python bin/detector.py image.png

# Analyze video
python bin/detector.py video.mp4

# Start API server
python bin/server.py
```

#### Using Batch Files (Windows)

```bash
# Easiest way - no activation needed
run.bat examples/test.png
start_api_server.bat
```

### Python API Server

```bash
# Start server
python bin/server.py

# Server runs at http://localhost:8000
# API docs at http://localhost:8000/docs
```

**API Endpoints:**
- `POST /validate/file` - Upload file for validation
- `POST /validate/base64` - Validate base64-encoded data
- `POST /validate/url` - Validate file from URL
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation

### TypeScript API

```bash
# Start Express server
cd typescript-api
npm start

# Server runs at http://localhost:3000
```

**API Endpoint:**
```bash
# Detect AI content
curl -X POST http://localhost:3000/api/detect \
  -F "file=@image.png"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "file": "image.png",
    "fileType": "image/png",
    "c2paStatus": "FOUND",
    "verdict": "AI_DETECTED_C2PA",
    "confidence": "HIGH",
    "platform": "openai",
    "company": "OpenAI",
    "c2paInfo": {
      "aiGenerated": true,
      "signatureValid": true,
      "software": "DALL-E 3",
      "organization": "OpenAI"
    }
  }
}
```

### Next.js Web Application

```bash
# Development
cd typescript-api/example-nextjs-app
npm run dev
# Visit http://localhost:3000

# Production build
npm run build
npm start

# Deploy to Vercel
vercel deploy
```

### Integration Examples

#### React/Next.js

```typescript
import { useState } from 'react';

function AIDetector() {
  const [result, setResult] = useState(null);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/detect', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
      {result && <div>Verdict: {result.data.verdict}</div>}
    </div>
  );
}
```

#### Python

```python
import requests

with open('image.jpg', 'rb') as f:
    files = {'file': f}
    response = requests.post(
        'http://localhost:8000/validate/file',
        files=files
    )
    
result = response.json()
print(result)
```

#### Node.js

```javascript
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const formData = new FormData();
formData.append('file', fs.createReadStream('image.jpg'));

axios.post('http://localhost:3000/api/detect', formData, {
  headers: formData.getHeaders()
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

---

## 📁 Project Structure

```
huminify-c2pa-detector/
├── 📂 bin/                          # Entry point scripts
│   ├── detector.py                  # CLI detector
│   └── server.py                    # API server
│
├── 📂 src/                          # Python source code
│   ├── 📂 api/                      # FastAPI server
│   │   ├── server.py               # App initialization
│   │   ├── routes.py               # Route handlers
│   │   └── models.py               # Request/response models
│   ├── 📂 core/                     # Core detection logic
│   │   ├── detector.py             # Main orchestrator
│   │   ├── c2pa_reader.py          # C2PA reading
│   │   └── api_client.py           # API communication
│   ├── 📂 models/                   # AI detection models
│   │   └── image_detector.py       # Image AI detection
│   ├── 📂 platforms/                # Platform extractors
│   │   ├── base.py                 # Base class
│   │   ├── registry.py             # Platform registry
│   │   ├── openai.py               # OpenAI extractor
│   │   ├── google.py               # Google extractor
│   │   ├── adobe.py                # Adobe extractor
│   │   ├── microsoft.py            # Microsoft extractor
│   │   └── TEMPLATE.py             # New platform template
│   └── 📂 utils/                    # Utilities
│       └── console.py              # Console formatting
│
├── 📂 typescript-api/               # TypeScript version
│   ├── 📂 src/                      # TypeScript source
│   │   ├── 📂 config/              # Configuration
│   │   ├── 📂 services/            # Business logic
│   │   ├── 📂 routes/              # Express routes
│   │   ├── 📂 types/               # TypeScript types
│   │   └── 📂 utils/               # Utilities
│   ├── 📂 example-nextjs-app/      # Next.js web application
│   │   ├── 📂 pages/               # Next.js pages
│   │   │   ├── index.tsx           # Home page
│   │   │   ├── docs.tsx            # Documentation
│   │   │   └── 📂 api/             # API routes
│   │   ├── 📂 components/          # React components
│   │   ├── 📂 lib/                 # Client libraries
│   │   ├── 📂 styles/              # CSS styles
│   │   └── 📂 public/              # Static assets
│   ├── package.json
│   └── README.md
│
├── 📂 docs/                         # Documentation
│   ├── QUICK_START.md
│   ├── SETUP_INSTRUCTIONS.md
│   ├── C2PA_COMPANIES_2025.md
│   └── ENHANCED_METADATA.md
│
├── 📂 examples/                     # Test images/videos
│   ├── ChatGPT_Image.png
│   ├── test2.png
│   └── videotest.mp4
│
├── 📂 tools/                        # Utility scripts
│   ├── extract_c2pa_raw.py
│   ├── inspect_manifest.py
│   └── download_test_images.py
│
├── requirements.txt                 # Python dependencies
├── setup.bat                        # Windows setup
├── run.bat                          # Quick run script
├── activate.bat                     # Activate venv
├── README.md                        # This file
├── ARCHITECTURE.md                  # Architecture docs
├── CONTRIBUTING.md                  # Contribution guide
├── CHANGELOG.md                     # Version history
└── LICENSE                          # MIT License
```

---

## 📚 API Documentation

### Python API Endpoints

**Base URL:** `http://localhost:8000`

#### POST /validate/file
Upload a file for C2PA validation.

**Request:**
```bash
curl -X POST http://localhost:8000/validate/file \
  -F "file=@image.png"
```

**Response:**
```json
{
  "status": "ai_confirmed_api",
  "verdict": "AI_DETECTED_C2PA_API",
  "confidence": "high",
  "metadata": {
    "company": "OpenAI",
    "software": "ChatGPT",
    "ai_generated": true
  }
}
```

#### POST /validate/base64
Validate base64-encoded content.

#### POST /validate/url
Validate content from URL.

#### GET /health
Health check endpoint.

#### GET /docs
Interactive API documentation (Swagger UI).

### TypeScript API Endpoints

**Base URL:** `http://localhost:3000`

#### POST /api/detect
Detect AI-generated content.

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
    "verdict": "AI_DETECTED_C2PA",
    "confidence": "HIGH",
    "platform": "openai",
    "c2paInfo": {
      "aiGenerated": true,
      "signatureValid": true
    }
  }
}
```

#### GET /api/health
Health check endpoint.

#### GET /api/platforms
List supported platforms.

---

## 🏢 Supported Platforms

### Fully Implemented

| Platform | Type | Status | C2PA Support |
|----------|------|--------|--------------|
| **OpenAI** | ChatGPT, DALL-E, Sora | ✅ Working | Full |
| **Adobe** | Firefly, Premiere Pro | ✅ Working | Full |
| **Google** | Gemini, Pixel Camera | ✅ Working | Full |
| **Microsoft** | Designer | ✅ Working | Full |

### Adding New Platforms

Want to add support for a new platform? It's easy!

1. **Copy the template:**
```bash
cp src/platforms/TEMPLATE.py src/platforms/newplatform.py
```

2. **Implement the extractor:**
```python
class NewPlatformExtractor(BasePlatformExtractor):
    def __init__(self):
        self.company_name = "NewPlatform"
        self.markers = ["NewPlatform", "NP"]
        self.ai_indicators = ["ai_generated"]
    
    def extract_metadata(self, manifest, raw_data):
        metadata = {
            "company": self.company_name,
            "detected_markers": self.search_raw_data(raw_data)
        }
        return metadata
    
    def is_ai_generated(self, metadata):
        return len(metadata.get("detected_markers", [])) > 0
```

3. **Register in registry:**
```python
# src/platforms/registry.py
from .newplatform import NewPlatformExtractor

class PlatformRegistry:
    def __init__(self):
        self.extractors = {
            "openai": OpenAIExtractor(),
            "google": GoogleExtractor(),
            "adobe": AdobeExtractor(),
            "microsoft": MicrosoftExtractor(),
            "newplatform": NewPlatformExtractor()  # Add here
        }
```

4. **Test and submit PR!**

See [src/platforms/README.md](src/platforms/README.md) for detailed guide.

---

## 🤝 Contributing

We love contributions! Huminify is open source and community-driven.

### Ways to Contribute

- 🐛 **Report bugs** - Found an issue? [Open a bug report](https://github.com/Yogesh1290/huminify-c2pa-detector/issues)
- ✨ **Suggest features** - Have an idea? [Request a feature](https://github.com/Yogesh1290/huminify-c2pa-detector/issues)
- 📝 **Improve docs** - Help make our documentation better
- 🔧 **Submit PRs** - Fix bugs or add features
- ⭐ **Star the repo** - Show your support!

### Development Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/huminify-c2pa-detector.git
cd huminify-c2pa-detector

# Create branch
git checkout -b feature/amazing-feature

# Make changes and test
python bin/detector.py examples/test.png

# Commit and push
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# Open Pull Request
```

### Contribution Guidelines

1. **Code Style**
   - Python: Follow PEP 8
   - TypeScript: Follow ESLint rules
   - Add comments for complex logic

2. **Testing**
   - Test your changes thoroughly
   - Include test cases if applicable

3. **Documentation**
   - Update README if needed
   - Add docstrings to functions
   - Update CHANGELOG.md

4. **Commit Messages**
   - Use clear, descriptive messages
   - Format: `type: description`
   - Examples: `feat: add video support`, `fix: resolve API error`

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 🗺️ Roadmap

### Version 2.1 (Current)
- ✅ Python implementation with 3-layer detection
- ✅ TypeScript/Express API
- ✅ Next.js web application
- ✅ Image and video support
- ✅ Multi-platform detection

### Version 2.2 (In Progress)
- 🔄 Docker containerization
- 🔄 Batch processing support
- 🔄 Database integration
- 🔄 Enhanced error handling

### Version 3.0 (Planned)
- 📋 Audio file support
- 📋 PDF document support
- 📋 Advanced analytics dashboard
- 📋 REST API client libraries
- 📋 Webhook support
- 📋 Cloud deployment guides

### Future Ideas
- Mobile app (React Native)
- Browser extension
- WordPress plugin
- Zapier integration
- Enterprise features

**Have a feature request?** [Open an issue](https://github.com/Yogesh1290/huminify-c2pa-detector/issues)!

---

## ⚠️ Limitations & Reality Check

### C2PA Adoption Status

**Current Reality (Feb 2025):**
- Only 4-5 tools have full C2PA implementation
- Most images on the internet don't have C2PA metadata
- Popular tools like Midjourney don't support C2PA yet
- Older content lacks C2PA (standard is relatively new)

**What This Means:**
- ✅ **High accuracy** when C2PA is present
- ⚠️ **Limited coverage** - most content won't have C2PA
- 🔄 **Growing adoption** - more tools adding support

### AI Model Limitations

**Image Detection (Layer 3):**
- ~70-85% accuracy
- Best used as fallback when C2PA unavailable
- Not 100% reliable
- Can produce false positives/negatives

**Text Detection:**
- ❌ **Not supported** - fundamentally unreliable
- Even OpenAI shut down their text detector
- Different models give contradictory results

### Best Practices

1. **Trust C2PA first** - Most reliable when available
2. **Use AI models as fallback** - Not primary detection
3. **Verify critical content** - Don't rely solely on automated detection
4. **Stay updated** - C2PA adoption is growing

See [docs/REALITY_CHECK.md](docs/REALITY_CHECK.md) for detailed analysis.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What This Means

✅ **You can:**
- Use commercially
- Modify the code
- Distribute
- Use privately

❌ **You cannot:**
- Hold liable
- Use trademark

📋 **You must:**
- Include license and copyright notice
- State changes made

---

## 🙏 Acknowledgments

### Technologies

- **[C2PA](https://c2pa.org/)** - Content Authenticity Initiative
- **[c2pa-python](https://github.com/contentauth/c2pa-python)** - C2PA Python library
- **[@contentauth/c2pa-node](https://www.npmjs.com/package/@contentauth/c2pa-node)** - C2PA Node.js library
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Next.js](https://nextjs.org/)** - React framework
- **[Hugging Face](https://huggingface.co/)** - AI model hosting

### Organizations

- **Content Authenticity Initiative (CAI)** - Leading C2PA adoption
- **200+ C2PA Coalition Members** - Building the future of content authenticity

### Community

- All contributors who have helped improve this project
- Users who report bugs and suggest features
- Everyone working towards content authenticity

---

## 📞 Support & Contact

### Get Help

- 📖 **Documentation:** [huminify.vercel.app/docs](https://huminify.vercel.app/docs)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/Yogesh1290/huminify-c2pa-detector/issues)
- 💡 **Feature Requests:** [GitHub Issues](https://github.com/Yogesh1290/huminify-c2pa-detector/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Yogesh1290/huminify-c2pa-detector/discussions)

### Resources

- **C2PA Specification:** https://c2pa.org/specifications/
- **Content Authenticity:** https://contentauthenticity.org/
- **Verify Tool:** https://verify.contentauthenticity.org/

---

## 🌟 Show Your Support

If you find Huminify useful, please consider:

- ⭐ **Star this repository** on GitHub
- 🐦 **Share on social media** - Help spread the word
- 📝 **Write a blog post** - Share your experience
- 🤝 **Contribute** - Submit PRs or report issues
- 💬 **Provide feedback** - Tell us what you think

---

<div align="center">

### Made with ❤️ for content authenticity and transparency

**[⬆ Back to Top](#-huminify)**

[![GitHub stars](https://img.shields.io/github/stars/Yogesh1290/huminify-c2pa-detector?style=social)](https://github.com/Yogesh1290/huminify-c2pa-detector/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Yogesh1290/huminify-c2pa-detector?style=social)](https://github.com/Yogesh1290/huminify-c2pa-detector/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Yogesh1290/huminify-c2pa-detector?style=social)](https://github.com/Yogesh1290/huminify-c2pa-detector/watchers)

**Star ⭐ this repo if you find it useful!**

</div>
