# Testing Guide for Huminify Chrome Extension

## Quick Test

1. Load the extension in Chrome (`chrome://extensions/` → Load unpacked)
2. Visit test pages with AI-generated images
3. Check the console (F12) for detection logs
4. Verify badges appear on images

## Test Sites

### Sites with AI Images

1. **ChatGPT/DALL-E**
   - Visit: https://chat.openai.com
   - Generate an image with DALL-E
   - Expected: Should detect as AI (URL pattern or C2PA)

2. **Midjourney Gallery**
   - Visit: https://www.midjourney.com/showcase
   - Expected: Should detect as AI (URL pattern)

3. **Stability AI**
   - Visit: https://stability.ai/
   - Expected: Should detect AI images (URL pattern)

4. **Hugging Face**
   - Visit: https://huggingface.co/spaces
   - Try image generation spaces
   - Expected: Should detect as AI

### Sites with Regular Images

1. **Wikipedia**
   - Visit: https://en.wikipedia.org/wiki/Photography
   - Expected: Most images marked as Unknown (no C2PA)

2. **Unsplash**
   - Visit: https://unsplash.com
   - Expected: Human photos marked as Unknown (no C2PA yet)

## Console Debugging

Open browser console (F12) and look for:

```
Huminify loaded with settings: {autoDetect: true, showBadges: true, apiUrl: "..."}
Scanning page for images...
Found X valid images and Y valid videos
Analyzing image: https://...
✓ AI detected (url-pattern, 70%): https://...
? Unknown: https://...
```

## Detection Method Testing

### Test C2PA Detection

1. Use images from `examples/` folder with C2PA metadata
2. Host them locally or upload to a test server
3. Load in browser
4. Expected: Should detect C2PA markers

### Test URL Pattern Detection

1. Visit OpenAI, Midjourney, or Stability AI sites
2. Expected: Images should be detected by URL pattern
3. Console should show: `AI detected (url-pattern, 70%)`

### Test Heuristic Detection

1. Create a test HTML page:
```html
<img src="test.jpg" alt="AI generated image by DALL-E">
<img src="test2.jpg" title="Midjourney artwork">
<div class="ai-generated-content">
  <img src="test3.jpg">
</div>
```

2. Expected: Images should be detected by metadata/DOM context
3. Console should show: `AI detected (metadata, 60%)` or `AI detected (dom-context, 50%)`

### Test API Detection

1. Start the backend API:
```bash
cd typescript-api
npm start
```

2. Visit any page with images
3. Expected: Extension should try API detection as fallback
4. Console should show: `AI detected (api, 80%)` or `API detection failed`

## CORS Testing

### Test Background Fetch

1. Visit a site with CORS-protected images (e.g., Google Images)
2. Check console for:
```
Analyzing image: https://...
Fetched blob: XXXX bytes
```

3. If you see "Fetch failed (CORS?)", the background fetch should still work
4. Expected: Background script bypasses CORS

### Test Direct Fetch Fallback

1. Visit a site with open CORS (e.g., Unsplash)
2. Expected: Direct fetch should work
3. Console: `Fetched blob: XXXX bytes`

## Performance Testing

### Large Pages

1. Visit image-heavy sites (Pinterest, Instagram, Google Images)
2. Check that:
   - Extension doesn't freeze the page
   - Images are analyzed progressively
   - Cache prevents re-analysis

### Dynamic Content

1. Visit sites with infinite scroll (Twitter, Instagram)
2. Scroll down to load more images
3. Expected: New images are automatically detected
4. Console: `Analyzing image: ...` for each new image

## Badge Testing

### Visual Verification

1. Enable "Show Badges" in popup
2. Visit test sites
3. Verify badges appear:
   - AI badge: Red background, "AI" or "AI (platform)"
   - Human badge: Green background, "Human"
   - Unknown badge: Gray background, "?"

### Badge Positioning

1. Test on different layouts:
   - Fixed-size images
   - Responsive images
   - Images in flexbox/grid
   - Images with existing positioning

2. Expected: Badges should appear in top-right corner

## Settings Testing

### Auto-Detect Toggle

1. Disable "Auto-Detect Images"
2. Reload page
3. Expected: No automatic scanning
4. Click "Scan Page" button
5. Expected: Manual scan works

### Show Badges Toggle

1. Disable "Show Badges"
2. Scan page
3. Expected: Detection happens but no badges shown
4. Check console for detection logs
5. Enable "Show Badges"
6. Expected: Badges appear on already-detected images

## Error Handling

### Network Errors

1. Disconnect internet
2. Try scanning a page
3. Expected: Graceful failure, no crashes
4. Console: Error messages but extension continues

### Invalid Images

1. Test with:
   - Broken image links
   - Data URLs
   - SVG images
   - Very small images (<100 bytes)

2. Expected: Extension skips invalid images gracefully

### Malformed Data

1. Test with corrupted image files
2. Expected: Detection fails gracefully
3. Console: Error logged but extension continues

## Browser Compatibility

Test in:
- Chrome (latest)
- Edge (Chromium-based)
- Brave
- Opera

Expected: Works in all Chromium-based browsers

## Known Limitations

1. **CORS**: Some sites may still block background fetch
2. **C2PA Adoption**: Most images don't have C2PA metadata yet
3. **False Positives**: URL pattern matching may have false positives
4. **Performance**: Very large images may take time to analyze

## Reporting Issues

When reporting bugs, include:
1. Browser version
2. Extension version
3. Test URL
4. Console logs (F12 → Console)
5. Expected vs actual behavior
6. Screenshots if applicable

## Success Criteria

Extension is working correctly if:
- ✅ Loads without errors
- ✅ Detects images on test sites
- ✅ Shows appropriate badges
- ✅ Console logs show detection process
- ✅ Settings persist across sessions
- ✅ Handles CORS gracefully
- ✅ Doesn't freeze or crash pages
- ✅ Cache prevents duplicate analysis
