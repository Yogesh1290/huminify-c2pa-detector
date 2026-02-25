# Installation Guide

## Quick Install (5 minutes)

### Step 1: Download the Extension

```bash
git clone https://github.com/Yogesh1290/huminify-c2pa-detector.git
cd huminify-c2pa-detector/chrome-extension
```

Or download the ZIP from GitHub and extract it.

### Step 2: Open Chrome Extensions

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Or click Menu (⋮) → More Tools → Extensions

### Step 3: Enable Developer Mode

1. Look for "Developer mode" toggle in the top right
2. Click to enable it
3. New buttons will appear: "Load unpacked", "Pack extension", "Update"

### Step 4: Load the Extension

1. Click "Load unpacked" button
2. Navigate to the `chrome-extension` folder
3. Select the folder and click "Select Folder" (or "Open")
4. The extension should now appear in your extensions list

### Step 5: Verify Installation

1. Look for the extension in your toolbar (puzzle piece icon)
2. Click the extension icon to open the popup
3. You should see the Huminify interface with settings

### Step 6: Test It

1. Visit a website with images (e.g., https://bananaprompts.xyz/explore)
2. The extension will automatically scan images
3. Look for badges on images (AI, ?, or Human)
4. Check the browser console (F12) for detection logs

## Troubleshooting

### Extension Not Showing

- Make sure Developer mode is enabled
- Try reloading the extension (click refresh icon)
- Check for errors in the extension details

### No Badges Appearing

- Click the extension icon
- Make sure "Auto-Detect Images" is enabled
- Make sure "Show Badges" is enabled
- Try clicking "Scan Page" manually

### Console Errors

- Open DevTools (F12)
- Check Console tab for errors
- Common issues:
  - CORS errors (expected, extension handles them)
  - "Extension context invalidated" (reload extension)

## Updating the Extension

### Method 1: Git Pull

```bash
cd huminify-c2pa-detector
git pull origin main
```

Then click the refresh icon on the extension in `chrome://extensions/`

### Method 2: Manual Update

1. Download the latest version
2. Extract to the same folder (overwrite files)
3. Go to `chrome://extensions/`
4. Click the refresh icon on the Huminify extension

## Uninstalling

1. Go to `chrome://extensions/`
2. Find Huminify extension
3. Click "Remove"
4. Confirm removal

## Optional: Backend API Setup

For advanced ML-based detection:

### Python API

```bash
cd huminify-c2pa-detector
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/api/server.py
```

### TypeScript API

```bash
cd huminify-c2pa-detector/typescript-api
npm install
npm start
```

The extension will automatically use `http://localhost:3000` for API detection.

## Browser Compatibility

| Browser | Supported | Notes |
|---------|-----------|-------|
| Chrome | ✅ Yes | Fully supported |
| Edge | ✅ Yes | Chromium-based |
| Brave | ✅ Yes | Chromium-based |
| Opera | ✅ Yes | Chromium-based |
| Firefox | ❌ No | Requires Manifest V2 port |
| Safari | ❌ No | Different extension format |

## Need Help?

- Check [README.md](README.md) for detailed documentation
- See [TESTING.md](TESTING.md) for testing guide
- Open an issue: https://github.com/Yogesh1290/huminify-c2pa-detector/issues
