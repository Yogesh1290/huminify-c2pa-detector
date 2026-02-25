# Extension Icons

The extension currently works without icons, but you can add them for a better appearance.

## Required Icon Sizes

Place PNG icon files in this folder:
- `icon16.png` - 16x16 pixels (toolbar)
- `icon32.png` - 32x32 pixels (toolbar retina)
- `icon48.png` - 48x48 pixels (extension management)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

## Creating Icons

### Option 1: Use Online Tools
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/
- Upload a logo and download all sizes

### Option 2: Use Design Software
- Figma, Photoshop, or GIMP
- Create a 128x128 design
- Export at different sizes

### Option 3: Use the Huminify Logo
- Use the logo from `typescript-api/example-nextjs-app/public/android-chrome-512x512.png`
- Resize to required dimensions

## Recommended Design

- **Background**: Teal gradient (oklch(69.6% .17 162.48))
- **Icon**: Magnifying glass or shield symbol
- **Style**: Modern, clean, recognizable at small sizes

## After Adding Icons

Update `manifest.json` to include icon references:

```json
{
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "32": "icons/icon32.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "icons": {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

Then reload the extension in Chrome.
