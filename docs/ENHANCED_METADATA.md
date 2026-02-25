# Enhanced C2PA Metadata Extraction

## What Was Added

The C2PA API server and detector now extract comprehensive metadata from C2PA manifests, matching the detail level of https://verify.contentauthenticity.org/

### New Metadata Fields Extracted

1. **Software Agent** - The application that created/edited the content
   - Extracted from `claim_generator_info[0].name`
   - Example: "ChatGPT", "Adobe Firefly", "Microsoft Designer"

2. **Organization/Company** - The organization behind the content
   - Extracted from `signature_info.issuer`
   - Example: "OpenAI", "Adobe", "Microsoft"

3. **Certificate Name** - The signing certificate common name
   - Extracted from `signature_info.common_name`
   - Example: "Truepic Lens CLI in Sora"

4. **Creator/Author** - Content creator information
   - Extracted from `claim.dc:creator` or assertion data
   - Falls back to "Unknown" if not present

5. **Producer** - Content producer information
   - Extracted from `claim.dc:publisher`
   - Falls back to "Unknown" if not present

6. **Claim Generator Info** - Detailed generator metadata
   - Full object with name, version, and other details

7. **Assertion Details** - Full assertion data (not just labels)
   - Shows the actual data payload for each assertion
   - Includes action parameters, ingredients, etc.

8. **Signature Algorithm** - Cryptographic algorithm used
   - Example: "Es256"

### Enhanced AI Detection

The system now detects AI generation from multiple sources:

1. **Explicit AI Assertions** - Standard C2PA AI flags
   - `c2pa.ai_generated`, `c2pa.synthetic`, etc.

2. **Software Agent Detection** - Recognizes known AI generators
   - ChatGPT, DALL-E, Midjourney, Stable Diffusion
   - Adobe Firefly, Microsoft Designer, Bing Image Creator
   - Gemini, Bard, Claude, GPT, Copilot, Sora

3. **Claim Generator Detection** - Checks claim_generator field
   - Same AI generator list as above

### Example Output

```
🌐 C2PA API: ai_confirmed_api
   🤖 AI GENERATION DETECTED!
   Title: image.png
   Software: ChatGPT
   Organization: OpenAI
   Certificate: Truepic Lens CLI in Sora
   Generator Name: ChatGPT
   Assertions: c2pa.actions.v2

   📝 Assertion Details:
      • c2pa.actions.v2
        - actions: {'action': 'c2pa.opened', ...}
   
   AI Assertions: AI Generator: ChatGPT
   Signature: ✗ Invalid/Expired
   Message: AI-generated content detected

🎯 VERDICT: AI_DETECTED_C2PA_API
   Confidence: high
```

## Files Modified

1. **c2pa_api_server.py**
   - Enhanced manifest parsing to extract all available fields
   - Added AI generator detection by software name
   - Returns comprehensive metadata in API responses

2. **ai_content_detector.py**
   - Updated display logic to show all new metadata fields
   - Added assertion detail display
   - Shows certificate and organization information

## Testing

Test with your ChatGPT image:
```bash
venv\Scripts\python.exe ai_content_detector.py ChatGPT_Image.png
```

The system now shows:
- ✅ Software: ChatGPT
- ✅ Organization: OpenAI
- ✅ Certificate: Truepic Lens CLI in Sora
- ✅ AI Detection: Correctly identifies as AI-generated
- ✅ Detailed assertion data

## Debug Tool

Use `inspect_manifest.py` to see the raw C2PA manifest structure:
```bash
venv\Scripts\python.exe inspect_manifest.py ChatGPT_Image.png
```

This dumps the complete JSON structure for debugging.
