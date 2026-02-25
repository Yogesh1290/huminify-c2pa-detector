# Changelog

All notable changes to the Huminify Chrome Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-02-26

### Added
- Initial release of Huminify Chrome Extension
- C2PA metadata detection for JPEG and PNG images
- Deep binary scanning for C2PA markers
- JPEG JUMBF box detection (APP11 markers)
- PNG C2PA chunk detection (caBX, c2pa, caMP)
- CBOR structure detection
- XMP metadata scanning for C2PA credentials
- Background script image fetching to bypass CORS
- Smart caching system to prevent re-analysis
- Visual badge system (AI/Human/Unknown)
- Confidence score display
- Real-time detection for dynamically loaded images
- MutationObserver for DOM changes
- Context menu integration
- Settings popup with toggles
- Auto-detect and show badges options
- Manual scan button
- Clear badges functionality
- Statistics display (total, AI, human, unknown)
- API integration support for backend ML detection
- Comprehensive error handling
- Console logging for debugging

### Technical Details
- Manifest V3 compliance
- Service worker background script
- Content script injection
- Chrome Storage API for settings
- Chrome Runtime messaging
- Blob and ArrayBuffer processing
- Binary format parsing
- Pattern matching algorithms
- Async/await throughout
- Memory-efficient chunked scanning

### Documentation
- Comprehensive README.md
- Installation guide (INSTALL.md)
- Testing guide (TESTING.md)
- Technical improvements doc (IMPROVEMENTS.md)
- Icon creation guide
- Inline code comments

### Known Limitations
- Most images don't have C2PA metadata yet (expected)
- Some CORS restrictions may still apply
- Large images may take time to analyze
- Video detection requires backend API
- No Firefox or Safari support yet

## [Unreleased]

### Planned Features
- Extension icons (16x16, 32x32, 48x48, 128x128)
- Chrome Web Store publication
- Settings UI for API URL configuration
- WebP and AVIF format support
- Enhanced video C2PA detection
- Batch API calls for performance
- Export detection reports
- Domain whitelist/blacklist
- Statistics dashboard
- Firefox Manifest V2 port
- Safari extension port

### Planned Improvements
- Faster binary scanning algorithms
- Better CORS handling
- Reduced memory usage
- Improved badge positioning
- Dark mode support
- Internationalization (i18n)
- Keyboard shortcuts
- Notification system

---

## Version History

- **1.0.0** (2024-02-26): Initial release with C2PA detection

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to contribute to this project.

## Support

For issues, questions, or suggestions:
- GitHub Issues: https://github.com/Yogesh1290/huminify-c2pa-detector/issues
- GitHub Discussions: https://github.com/Yogesh1290/huminify-c2pa-detector/discussions
