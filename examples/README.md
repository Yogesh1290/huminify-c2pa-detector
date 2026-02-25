# Example Files

This folder contains sample images for testing the AI Content Detector.

## Image Samples

### ChatGPT_Image.png
- **Source**: OpenAI ChatGPT/DALL-E
- **C2PA**: Yes (invalid signature)
- **Expected Result**: AI_DETECTED_C2PA
- **Markers**: OpenAI, ChatGPT, GPT-4, Truepic

### test2.png
- **Source**: Google Media Processing
- **C2PA**: Yes (invalid signature)
- **Expected Result**: AI_DETECTED_C2PA
- **Markers**: Google LLC, Google Media Processing

### Other Images
- `alady.png`, `mybudy3.png`, `test_photo.jpg` - Additional test images
- `license_my.png` - License test image

## Usage

### Test C2PA Detection
```bash
# PowerShell
.\run.bat examples\ChatGPT_Image.png
.\run.bat examples\test2.png

# Direct
venv\Scripts\python.exe bin\detector.py examples\ChatGPT_Image.png
```

## Detection Layers

1. **Layer 1**: C2PA API (if server running) - **Most Reliable**
2. **Layer 2**: Embedded C2PA reading - **Reliable**
3. **Layer 3**: Image AI detection models (fallback) - **Less Reliable**

## Supported File Types

- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`
  - C2PA detection (if metadata present)
  - Fallback AI detection (if no C2PA)

- **Videos**: `.mp4`, `.mov`, `.avi`, `.webm`, `.mkv`, `.flv`, `.wmv`
  - C2PA detection only (if metadata present)
  - No fallback detection (video AI detection not reliable)
  - If no C2PA found, verdict will be "NO_C2PA_FOUND"

- **Text files**: Not supported
  - Text AI detection is unreliable
  - Focus on C2PA which is verifiable

## Get More Test Files

### Images

#### Adobe Firefly
1. Visit: https://firefly.adobe.com/
2. Generate an image
3. Download and test

#### Microsoft Designer
1. Visit: https://designer.microsoft.com/
2. Create a design
3. Download and test

#### OpenAI ChatGPT
1. Visit: https://chat.openai.com/
2. Generate an image with DALL-E
3. Download and test

### Videos

#### OpenAI Sora
1. Visit: https://sora.com/ (when available)
2. Generate a video
3. Download and test

#### Adobe Premiere Pro
1. Export video with C2PA credentials
2. Test with detector

### Verify Tool
1. Visit: https://verify.contentauthenticity.org/
2. Use sample images/videos provided
3. Download and test

## Notes

- **C2PA Detection**: Most reliable method - verifiable proof of origin
- **Image AI Detection**: Fallback for images without C2PA (~70-85% accuracy)
- **Video Detection**: C2PA only - no AI fallback available
- **Text Detection**: Removed - unreliable and inconsistent across models
- C2PA signatures may expire over time
- Invalid signatures don't mean fake data - just unverifiable
- Always compare with https://verify.contentauthenticity.org/

## Why No Video AI Detection?

Video AI detection is even less reliable than text detection:
- No good models available
- Computationally expensive
- Inconsistent results
- Focus on C2PA which works for videos

## Why No Text Detection?

Text AI detection is fundamentally unreliable:
- Different models give different results
- Even OpenAI shut down their text detector
- No verifiable proof like C2PA
- Focus on what works: C2PA for images and videos

**C2PA is the future of content verification!**
