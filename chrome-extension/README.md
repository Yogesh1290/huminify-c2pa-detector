# Huminify Chrome Extension

A Chrome extension that detects AI-generated images on any webpage using C2PA metadata analysis and intelligent pattern recognition.

## Features

- **C2PA Metadata Detection**: Analyzes JPEG JUMBF boxes and PNG chunks for Content Authenticity Initiative markers
- **Deep Binary Scanning**: Thoroughly scans image files for C2PA signatures, CBOR structures, and content credentials
- **CORS Bypass**: Uses background script to fetch images from any domain
- **Smart Caching**: Prevents re-analyzing the same images
- **Visual Badges**: Shows AI/Human/Unknown badges on detected images
- **Real-time Detection**: Automatically detects dynamically loaded images
- **Confidence Scores**: Displays detection confidence levels
- **API Integration**: Optional backend API support for advanced ML-based detection

## Installation

### From Source (Development)

1. Clone the repository:
```bash
git clone https://github.com/Yogesh1290/huminify-c2pa-detector.git
cd huminify-c2pa-detector/chrome-extension
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top right)

4. Click "Load unpacked" and select the `chrome-extension` folder

5. The extension icon should appear in your toolbar

### From Chrome Web Store

Coming soon!

## Usage

### Quick Start

1. Click the extension icon to open the popup
2. Enable "Auto-Detect Images" (enabled by default)
3. Enable "Show Badges" to display detection results
4. Visit any webpage with images
5. The extension will automatically scan and badge images

### Manual Scanning

- Click "Scan Page" button to manually trigger detection
- Right-click any image → "Check with Huminify" (context menu)
- Click "Clear" to remove all badges

### Understanding Results

- **AI Badge (Red)**: C2PA metadata detected, image is AI-generated
- **? Badge (Gray)**: No C2PA metadata found, origin unknown
- **Human Badge (Green)**: Verified human-created content (rare)

## How It Works

### Detection Strategy

The extension uses a multi-layered approach:

1. **Background Fetch**: Fetches images via background script to bypass CORS restrictions
2. **C2PA Analysis**: Deep scans for Content Authenticity Initiative metadata
3. **Binary Format Parsing**: Checks JPEG APP11/XMP segments and PNG chunks
4. **Pattern Recognition**: Analyzes CBOR structures and C2PA markers
5. **API Fallback**: Optional backend API for ML-based detection

### C2PA Detection

The extension checks for:

- **JPEG**: APP11 markers (0xFFEB) containing JUMBF boxes
- **PNG**: caBX, c2pa, caMP chunks and text chunks with credentials
- **Markers**: c2pa, contentauth, jumbf, urn:uuid:c2pa, and more
- **CBOR**: Binary structures used by C2PA format
- **Context**: Surrounding data to verify authenticity

### Supported Formats

- JPEG/JPG images with JUMBF boxes
- PNG images with C2PA chunks
- Images with XMP metadata containing C2PA info

## Configuration

### Settings

Access settings via the popup:

- **Auto-Detect Images**: Automatically scan pages on load
- **Show Badges**: Display visual badges on images
- **API URL**: Backend API endpoint (default: http://localhost:3000)

### Backend API (Optional)

For advanced ML-based detection:

1. Start the backend server:
```bash
# Python API
cd ..
python src/api/server.py

# OR TypeScript API
cd ../typescript-api
npm start
```

2. The extension will automatically use the API as a fallback

## Privacy & Security

- All C2PA detection happens locally in your browser
- No data is sent to external servers (unless API is enabled)
- Images are fetched only for analysis, not stored
- No tracking, analytics, or data collection
- Open source - audit the code yourself

## Troubleshooting

### Images Not Being Detected

**Issue**: Most images show "?" badge

**Reason**: Most images on the web don't have C2PA metadata yet. C2PA is a new standard and adoption is growing.

**Solution**: This is expected behavior. Only images from AI platforms that embed C2PA will show as "AI".

### CORS Errors

**Issue**: Console shows CORS errors

**Reason**: Some sites block cross-origin requests

**Solution**: The extension uses background script fetching to bypass most CORS issues automatically.

### Extension Not Working

1. Check extension is enabled in `chrome://extensions/`
2. Reload the page after enabling the extension
3. Check browser console (F12) for errors
4. Try disabling and re-enabling the extension
5. Clear cache and reload

### Small Images Skipped

Images smaller than 1KB are skipped as they're unlikely to contain C2PA metadata.

## Development

### File Structure

```
chrome-extension/
├── manifest.json       # Extension configuration
├── background.js       # Background service worker (CORS bypass)
├── content.js          # Main detection logic
├── content.css         # Badge styles
├── popup.html          # Extension popup UI
├── popup.js            # Popup logic
├── icons/              # Extension icons (add your own)
├── README.md           # This file
├── TESTING.md          # Testing guide
└── IMPROVEMENTS.md     # Technical improvements doc
```

### Key Functions

**content.js**:
- `analyzeImage(img)`: Main detection orchestrator
- `checkC2PAMetadata(blob)`: C2PA metadata parser
- `deepScanC2PA(data)`: Deep binary scan for C2PA markers
- `hasJPEGJUMBF(data)`: JPEG JUMBF box detector
- `hasPNGC2PA(data)`: PNG C2PA chunk detector
- `hasCBORStructure(data)`: CBOR format detector

**background.js**:
- `fetchImageData(url)`: Fetch images bypassing CORS

### Testing

See [TESTING.md](TESTING.md) for comprehensive testing guide.

### Adding Icons

1. Create icons in sizes: 16x16, 32x32, 48x48, 128x128
2. Place in `icons/` folder
3. Update `manifest.json` with icon paths
4. See `icons/README.md` for details

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Edge (Chromium-based)
- ✅ Brave
- ✅ Opera
- ❌ Firefox (requires Manifest V2 port)
- ❌ Safari (requires different extension format)

## Known Limitations

1. **C2PA Adoption**: Most images don't have C2PA metadata yet
2. **CORS**: Some sites may still block image fetching
3. **Performance**: Large images may take time to analyze
4. **False Negatives**: Images without C2PA won't be detected as AI
5. **Video Support**: Limited video detection (requires backend)

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit (`git commit -m 'Add amazing feature'`)
6. Push (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Roadmap

- [ ] Add extension icons
- [ ] Publish to Chrome Web Store
- [ ] Add settings UI for API configuration
- [ ] Support more image formats (WebP, AVIF)
- [ ] Add video C2PA detection
- [ ] Batch API calls for better performance
- [ ] Export detection reports
- [ ] Whitelist/blacklist domains
- [ ] Statistics dashboard

## License

MIT License - see [LICENSE](../LICENSE) file for details

## Credits

- Built with [C2PA](https://c2pa.org) technology
- Part of the [Huminify](https://github.com/Yogesh1290/huminify-c2pa-detector) project
- Developed by [Yogesh1290](https://github.com/Yogesh1290)

## Support

- **Issues**: https://github.com/Yogesh1290/huminify-c2pa-detector/issues
- **Discussions**: https://github.com/Yogesh1290/huminify-c2pa-detector/discussions
- **Documentation**: See main project README

## Changelog

### v1.0.0 (Current)

- Initial release
- C2PA metadata detection for JPEG and PNG
- Deep binary scanning with CBOR detection
- CORS bypass via background script
- Smart caching system
- Visual badge system
- Confidence scoring
- API integration support
- Real-time dynamic content detection

---

**Note**: This extension detects C2PA metadata, which is a new standard for content authenticity. As adoption grows, more AI-generated images will be detectable. Currently, most images on the web don't have C2PA metadata.
