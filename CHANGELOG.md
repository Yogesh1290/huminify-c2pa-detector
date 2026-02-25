# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2025-02-25

### Added
- 🚀 **TypeScript Version** - Complete TypeScript/Node.js implementation
- ⚡ **Express Server** - Standalone API server with TypeScript
- 🔥 **Next.js Support** - Serverless API routes for Next.js projects
- 📦 **Separate Package** - Independent TypeScript project in `typescript-api/`
- 🛠️ **C2PA CLI Integration** - Uses C2PA CLI tool for metadata reading
- 📝 **Type Safety** - Full TypeScript type definitions
- 🎯 **Clean Architecture** - Modular structure with services, routes, utils
- 📚 **TypeScript Docs** - Complete README and setup guide

### Features
- Express server with CORS and file upload support
- Next.js API route template for serverless deployment
- Platform detection (OpenAI, Google, Adobe, Microsoft)
- C2PA signature validation
- Image and video support (C2PA only)
- Health check and platform listing endpoints

### Notes
- TypeScript version focuses on C2PA detection only (no AI model fallback)
- Requires C2PA CLI tool installation (cargo install c2pa-tool)
- Lighter weight than Python version (~500MB RAM vs 2GB)
- Perfect for serverless deployments

## [2.0.0] - 2025-02-25

### Added
- ✨ **Video Support** - C2PA detection for `.mp4`, `.mov`, `.avi`, `.webm`, `.mkv`, `.flv`, `.wmv`
- 🏗️ **Complete Modular Architecture** - Clean separation into 15+ focused modules
- 📁 **Organized Structure** - `bin/`, `src/`, `docs/`, `examples/`, `tools/` folders
- 🔧 **Platform Extractors** - Separate modules for OpenAI, Google, Adobe, Microsoft
- 📊 **Enhanced Metadata** - Software, generator, organization, certificate extraction
- 🚀 **activate.bat** - Easy virtual environment activation
- 📚 **Comprehensive Docs** - Architecture guides and detailed documentation

### Changed
- 🔄 **Refactored Architecture** - From 2 monolithic files to 15+ modules
- 📂 **Entry Points** - Moved to `bin/detector.py` and `bin/server.py`
- 💬 **Console Output** - Detailed C2PA information display
- 📖 **Documentation** - Updated for clarity and completeness
- 🎯 **Focus on C2PA** - Reliable, verifiable detection

### Removed
- ❌ **Text Detection** - Unreliable and inconsistent (even OpenAI shut theirs down)
- 🗑️ **Text Samples** - Removed 3 text example files
- 📄 **Redundant Docs** - Cleaned up 9 temporary documentation files
- 📁 **Empty Folders** - Removed unused `src/detectors/` and `src/extractors/`

### Fixed
- ✅ Invalid C2PA signature handling
- ✅ Platform detection from raw binary data
- ✅ Console output display logic
- ✅ PowerShell batch file syntax

## [1.0.0] - 2025-02-20

### Added
- 🎉 Initial release
- 3-layer AI detection system
- C2PA API server (FastAPI)
- Embedded C2PA reading
- Platform detection (OpenAI, Google, Adobe, Microsoft)
- AI detection models (text + image)
- Example images with C2PA metadata
- Comprehensive documentation

---

## Supported File Types

### v2.0.0
- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp` (C2PA + AI fallback)
- **Videos**: `.mp4`, `.mov`, `.avi`, `.webm`, `.mkv`, `.flv`, `.wmv` (C2PA only)
- **Text**: Not supported (unreliable)

### v1.0.0
- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **Text**: `.txt`, `.md`, `.json`, `.html` (removed in v2.0.0)

---

## Migration Guide: v1.0.0 → v2.0.0

### File Paths Changed
```bash
# Old (v1.0.0)
python ai_content_detector.py image.png
python c2pa_api_server.py

# New (v2.0.0)
python bin/detector.py image.png
python bin/server.py
```

### Text Detection Removed
- Text files no longer supported
- Focus on reliable C2PA detection
- Image AI detection still available as fallback

### Video Support Added
```bash
# New in v2.0.0
python bin/detector.py video.mp4
```

---

## Why Version 2.0.0?

**Major Breaking Changes:**
- Complete architecture refactoring
- File paths changed (`bin/` folder)
- Text detection removed
- Video support added

This represents a fundamental shift in project structure and philosophy, warranting a major version bump.

---

## Links

- [GitHub Repository](https://github.com/yourusername/ai-content-detector)
- [C2PA Specification](https://c2pa.org/specifications/)
- [Content Credentials](https://contentcredentials.org/)
