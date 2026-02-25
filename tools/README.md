# Utility Tools

Additional tools for C2PA analysis and debugging.

## Tools Overview

### 1. extract_c2pa_raw.py
Extract C2PA data even when signatures are invalid.

**Usage:**
```bash
venv\Scripts\python.exe tools\extract_c2pa_raw.py examples\test2.png
```

**Output:**
- Finds C2PA markers in binary data
- Extracts readable text (company names, software, etc.)
- Works even with expired/invalid certificates

**When to use:**
- Signature validation fails
- Want to see raw C2PA data
- Debugging C2PA issues

---

### 2. inspect_manifest.py
View complete C2PA manifest structure in JSON format.

**Usage:**
```bash
venv\Scripts\python.exe tools\inspect_manifest.py examples\ChatGPT_Image.png
```

**Output:**
- Full manifest JSON
- All assertions and metadata
- Validation information

**When to use:**
- Need complete manifest details
- Debugging metadata extraction
- Understanding C2PA structure

---

### 3. download_test_images.py
Guide for obtaining test images from various C2PA-enabled platforms.

**Usage:**
```bash
venv\Scripts\python.exe tools\download_test_images.py
```

**Output:**
- List of C2PA-enabled platforms
- Instructions for each platform
- Status of C2PA implementation

**When to use:**
- Need test images
- Want to try different platforms
- Learning about C2PA adoption

---

## Examples

### Extract Raw Data from Invalid Signature
```bash
venv\Scripts\python.exe tools\extract_c2pa_raw.py examples\test2.png
```

**Output:**
```
✓ Found 3 C2PA markers:
🔍 Found keywords: Google, Media Processing
```

### Inspect Full Manifest
```bash
venv\Scripts\python.exe tools\inspect_manifest.py examples\ChatGPT_Image.png
```

**Output:**
```json
{
  "claim_generator_info": [
    {
      "name": "ChatGPT",
      "org.contentauth.c2pa_rs": "0.0.0"
    }
  ],
  "title": "image.png",
  ...
}
```

### Get Platform Guide
```bash
venv\Scripts\python.exe tools\download_test_images.py
```

**Output:**
```
✅ CURRENTLY WORKING (Confirmed C2PA):
   ✓ Adobe Firefly
   ✓ OpenAI ChatGPT/DALL-E
   ✓ Microsoft Designer
   ✓ Google Media Processing Services
```

---

## Tips

1. **Use extract_c2pa_raw.py** when main detector shows "signature_error"
2. **Use inspect_manifest.py** to see all available metadata fields
3. **Use download_test_images.py** to find platforms for testing
4. All tools work independently - no API server needed

---

## Troubleshooting

### "No manifest found"
- File doesn't have C2PA data
- Try with examples/ChatGPT_Image.png first

### "Signature invalid"
- Normal for older images
- Use extract_c2pa_raw.py to see data anyway

### "Module not found"
- Activate virtual environment first
- Run: `venv\Scripts\activate`
