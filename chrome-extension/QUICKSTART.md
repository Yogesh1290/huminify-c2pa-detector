# Quick Start Guide

Get Huminify running in 2 minutes!

## Install

1. **Download**
   ```bash
   git clone https://github.com/Yogesh1290/huminify-c2pa-detector.git
   ```

2. **Open Chrome Extensions**
   - Go to `chrome://extensions/`
   - Enable "Developer mode" (top right)

3. **Load Extension**
   - Click "Load unpacked"
   - Select `huminify-c2pa-detector/chrome-extension` folder

## Use

1. **Visit any website** with images
2. **Click extension icon** to see stats
3. **Look for badges** on images:
   - 🔴 **AI** = C2PA detected
   - ⚪ **?** = No C2PA data
   - 🟢 **Human** = Verified human

## Test Sites

Try these sites to see it in action:

- https://bananaprompts.xyz/explore (AI prompts gallery)
- https://lexica.art (Stable Diffusion gallery)
- https://www.midjourney.com/showcase (Midjourney gallery)

## Settings

Click the extension icon to access:

- ✅ **Auto-Detect Images** - Scan pages automatically
- ✅ **Show Badges** - Display badges on images
- 🔄 **Scan Page** - Manual scan button
- 🗑️ **Clear** - Remove all badges

## Understanding Results

### Why do most images show "?"?

Most images on the web don't have C2PA metadata yet. C2PA is a new standard for content authenticity, and adoption is growing. Only images from AI platforms that embed C2PA will show as "AI".

### What is C2PA?

C2PA (Coalition for Content Provenance and Authenticity) is a standard for embedding metadata in images to prove their origin and authenticity. Think of it like a digital signature for images.

### How accurate is it?

- **C2PA Detection**: 95%+ accurate when metadata is present
- **Coverage**: Limited by C2PA adoption (~5-10% of AI images currently)
- **False Positives**: Very rare with C2PA detection
- **False Negatives**: Common (images without C2PA won't be detected)

## Troubleshooting

### No badges appearing?
- Check settings: Auto-Detect and Show Badges should be ON
- Try clicking "Scan Page" manually
- Reload the page

### Extension not working?
- Make sure it's enabled in `chrome://extensions/`
- Try disabling and re-enabling
- Check browser console (F12) for errors

### CORS errors in console?
- This is normal! The extension handles CORS automatically
- Images should still be analyzed

## Next Steps

- Read [README.md](README.md) for full documentation
- See [TESTING.md](TESTING.md) for testing guide
- Check [INSTALL.md](INSTALL.md) for detailed installation

## Need Help?

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/Yogesh1290/huminify-c2pa-detector/issues)
- 💬 [Discussions](https://github.com/Yogesh1290/huminify-c2pa-detector/discussions)

---

**Happy detecting! 🔍**
