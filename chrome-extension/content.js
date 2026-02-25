// Content script - runs on all pages
let settings = {
  autoDetect: true,
  showBadges: true,
  apiUrl: 'http://localhost:3000' // Default API URL
};

let stats = {
  total: 0,
  ai: 0,
  human: 0,
  unknown: 0
};

// Cache for analyzed images
const analysisCache = new Map();

// Initialize
(function init() {
  // Load settings
  chrome.storage.sync.get({
    autoDetect: true,
    showBadges: true,
    apiUrl: 'http://localhost:3000'
  }, (result) => {
    settings = result;
    console.log('Huminify loaded with settings:', settings);
    if (settings.autoDetect) {
      setTimeout(scanPage, 2000);
    }
  });
})();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'scanPage') {
      scanPage();
      sendResponse({ success: true });
    } else if (request.action === 'clearBadges') {
      clearAllBadges();
      stats = { total: 0, ai: 0, human: 0, unknown: 0 };
      sendResponse({ success: true });
    } else if (request.action === 'getStats') {
      sendResponse(stats);
    } else if (request.action === 'updateSettings') {
      settings = { ...settings, ...request };
      if (request.showBadges === false) {
        clearAllBadges();
      } else if (request.autoDetect) {
        scanPage();
      }
      sendResponse({ success: true });
    } else if (request.action === 'checkMedia') {
      // Handle context menu check
      const img = document.querySelector(`img[src="${request.url}"]`);
      if (img) {
        analyzeImage(img);
      }
      sendResponse({ success: true });
    }
  } catch (error) {
    console.error('Message handler error:', error);
    sendResponse({ success: false, error: error.message });
  }
  return true;
});

// Scan all images on the page
async function scanPage() {
  console.log('Scanning page for images...');
  stats = { total: 0, ai: 0, human: 0, unknown: 0 };
  
  const images = Array.from(document.querySelectorAll('img'));
  const videos = Array.from(document.querySelectorAll('video'));
  
  // Filter valid images
  const validImages = images.filter(img => {
    return img.src && 
           !img.src.startsWith('data:') && 
           (img.src.startsWith('http') || img.src.startsWith('//')) &&
           img.complete && 
           img.naturalWidth > 0;
  });
  
  const validVideos = videos.filter(video => {
    return video.src && 
           !video.src.startsWith('data:') && 
           (video.src.startsWith('http') || video.src.startsWith('//'));
  });
  
  stats.total = validImages.length + validVideos.length;
  console.log(`Found ${validImages.length} valid images and ${validVideos.length} valid videos`);
  
  // Scan images
  for (const img of validImages) {
    await analyzeImage(img);
  }
  
  // Scan videos
  for (const video of validVideos) {
    await analyzeVideo(video);
  }
  
  console.log('Scan complete:', stats);
}

// Analyze image for C2PA metadata
async function analyzeImage(img) {
  try {
    // Check if already analyzed
    if (img.dataset.huminifyAnalyzed) {
      return;
    }
    
    img.dataset.huminifyAnalyzed = 'true';
    const imgUrl = img.src;
    
    // Check cache
    if (analysisCache.has(imgUrl)) {
      const cached = analysisCache.get(imgUrl);
      applyResult(img, cached);
      return;
    }
    
    console.log('Analyzing image:', imgUrl);
    
    // Strategy 1: Try background script fetch (bypasses CORS)
    let result = await tryBackgroundFetch(imgUrl);
    
    // Strategy 2: If background fetch fails, try direct fetch
    if (!result) {
      result = await tryDirectFetch(imgUrl);
    }
    
    // Strategy 3: Use heuristics based on URL patterns
    if (!result) {
      result = await tryHeuristicDetection(imgUrl, img);
    }
    
    // Strategy 4: Try API detection if available
    if (!result && settings.apiUrl) {
      result = await tryApiDetection(imgUrl);
    }
    
    // Apply result
    if (result) {
      analysisCache.set(imgUrl, result);
      applyResult(img, result);
    } else {
      // Fallback: unknown
      const fallback = { type: 'unknown', confidence: 0 };
      analysisCache.set(imgUrl, fallback);
      applyResult(img, fallback);
    }
    
  } catch (error) {
    console.error('Error analyzing image:', error);
    stats.unknown++;
    if (settings.showBadges) {
      addBadge(img, '?', 'unknown');
    }
  }
}

// Try fetching via background script (bypasses CORS)
async function tryBackgroundFetch(url) {
  try {
    const response = await chrome.runtime.sendMessage({
      action: 'fetchImage',
      url: url
    });
    
    if (response && response.success && response.data) {
      // Convert base64 to blob
      const byteString = atob(response.data.split(',')[1]);
      const mimeString = response.data.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      
      const hasC2PA = await checkC2PAMetadata(blob);
      if (hasC2PA) {
        return { type: 'ai', confidence: 0.9, method: 'c2pa' };
      }
    }
  } catch (error) {
    console.log('Background fetch failed:', error.message);
  }
  return null;
}

// Try direct fetch (may fail due to CORS)
async function tryDirectFetch(url) {
  try {
    const response = await fetch(url, { 
      mode: 'cors',
      cache: 'force-cache',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const blob = await response.blob();
    console.log('Fetched blob:', blob.size, 'bytes');
    
    // Need reasonable size to check (at least 1KB)
    if (blob.size < 1000) {
      console.log('Blob too small, skipping');
      return null;
    }
    
    const hasC2PA = await checkC2PAMetadata(blob);
    if (hasC2PA) {
      return { type: 'ai', confidence: 0.95, method: 'c2pa' };
    }
    
    // No C2PA found
    return { type: 'unknown', confidence: 0, method: 'no-c2pa' };
  } catch (error) {
    console.log('Direct fetch failed:', error.message);
    return null;
  }
}

// Heuristic detection based on URL patterns and image attributes
async function tryHeuristicDetection(url, img) {
  try {
    const urlLower = url.toLowerCase();
    
    // Known AI image platforms/patterns (high confidence)
    const aiPlatforms = [
      { pattern: 'openai.com', confidence: 0.95, name: 'OpenAI' },
      { pattern: 'oaidalleapiprodscus.blob.core.windows.net', confidence: 0.95, name: 'DALL-E' },
      { pattern: 'midjourney.com', confidence: 0.95, name: 'Midjourney' },
      { pattern: 'cdn.midjourney.com', confidence: 0.95, name: 'Midjourney' },
      { pattern: 'stability.ai', confidence: 0.95, name: 'Stability AI' },
      { pattern: 'stablediffusionapi.com', confidence: 0.95, name: 'Stable Diffusion' },
      { pattern: 'replicate.delivery', confidence: 0.9, name: 'Replicate' },
      { pattern: 'huggingface.co', confidence: 0.85, name: 'Hugging Face' },
      { pattern: 'bananaprompts.xyz', confidence: 0.9, name: 'AI Prompts' },
      { pattern: 'lexica.art', confidence: 0.9, name: 'Lexica' },
      { pattern: 'civitai.com', confidence: 0.9, name: 'CivitAI' },
      { pattern: 'prompthero.com', confidence: 0.9, name: 'PromptHero' },
      { pattern: 'arthub.ai', confidence: 0.9, name: 'ArtHub' },
      { pattern: 'playground.ai', confidence: 0.95, name: 'Playground AI' },
      { pattern: 'leonardo.ai', confidence: 0.95, name: 'Leonardo AI' },
      { pattern: 'nightcafe.studio', confidence: 0.95, name: 'NightCafe' },
      { pattern: 'craiyon.com', confidence: 0.95, name: 'Craiyon' },
      { pattern: 'dreamstudio.ai', confidence: 0.95, name: 'DreamStudio' }
    ];
    
    // Check platform patterns
    for (const platform of aiPlatforms) {
      if (urlLower.includes(platform.pattern)) {
        return { 
          type: 'ai', 
          confidence: platform.confidence, 
          method: 'url-pattern',
          platform: platform.name
        };
      }
    }
    
    // Check URL path patterns (medium confidence)
    const pathPatterns = [
      '/dalle/',
      '/midjourney/',
      '/stable-diffusion/',
      '/ai-generated/',
      '/ai-art/',
      '/generated/',
      '/prompt/',
      '/synthesis/'
    ];
    
    for (const pattern of pathPatterns) {
      if (urlLower.includes(pattern)) {
        return { type: 'ai', confidence: 0.7, method: 'url-path' };
      }
    }
    
    // Check image attributes for hints
    const alt = (img.alt || '').toLowerCase();
    const title = (img.title || '').toLowerCase();
    const aiKeywords = [
      'ai generated',
      'ai-generated', 
      'dall-e',
      'dall·e',
      'midjourney',
      'stable diffusion',
      'ai art',
      'ai image',
      'generated by ai',
      'artificial intelligence',
      'text-to-image',
      'prompt:'
    ];
    
    for (const keyword of aiKeywords) {
      if (alt.includes(keyword) || title.includes(keyword)) {
        return { type: 'ai', confidence: 0.75, method: 'metadata' };
      }
    }
    
    // Check parent elements for AI indicators
    let parent = img.parentElement;
    let depth = 0;
    while (parent && depth < 5) {
      const className = (parent.className || '').toString().toLowerCase();
      const id = (parent.id || '').toLowerCase();
      const dataAttrs = Array.from(parent.attributes || [])
        .filter(attr => attr.name.startsWith('data-'))
        .map(attr => attr.value.toLowerCase())
        .join(' ');
      
      const combinedText = `${className} ${id} ${dataAttrs}`;
      
      // Strong indicators
      if (combinedText.includes('ai-generated') || 
          combinedText.includes('ai_generated') ||
          combinedText.includes('dalle') ||
          combinedText.includes('midjourney') ||
          combinedText.includes('stable-diffusion')) {
        return { type: 'ai', confidence: 0.7, method: 'dom-context' };
      }
      
      // Weaker indicators
      if (combinedText.includes('ai-') || 
          combinedText.includes('generated') ||
          combinedText.includes('prompt') ||
          combinedText.includes('synthesis')) {
        return { type: 'ai', confidence: 0.5, method: 'dom-context' };
      }
      
      parent = parent.parentElement;
      depth++;
    }
    
    // Check page URL/domain context
    const pageUrl = window.location.href.toLowerCase();
    const pageDomain = window.location.hostname.toLowerCase();
    
    // If we're on a known AI platform site
    for (const platform of aiPlatforms) {
      if (pageDomain.includes(platform.pattern.replace('cdn.', ''))) {
        return { 
          type: 'ai', 
          confidence: 0.85, 
          method: 'site-context',
          platform: platform.name
        };
      }
    }
    
    // Check for AI-related keywords in page URL
    const pageKeywords = ['prompt', 'ai-art', 'generated', 'gallery', 'showcase'];
    for (const keyword of pageKeywords) {
      if (pageUrl.includes(keyword)) {
        return { type: 'ai', confidence: 0.6, method: 'page-context' };
      }
    }
    
  } catch (error) {
    console.log('Heuristic detection failed:', error.message);
  }
  return null;
}

// Try API-based detection
async function tryApiDetection(url) {
  try {
    // Send URL to backend API for analysis
    const response = await fetch(`${settings.apiUrl}/api/detect-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url })
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.isAI) {
        return { 
          type: 'ai', 
          confidence: data.confidence || 0.8, 
          method: 'api',
          platform: data.platform
        };
      } else if (data.isHuman) {
        return { 
          type: 'human', 
          confidence: data.confidence || 0.8, 
          method: 'api' 
        };
      }
    }
  } catch (error) {
    console.log('API detection failed:', error.message);
  }
  return null;
}

// Apply detection result to image
function applyResult(img, result) {
  if (result.type === 'ai') {
    stats.ai++;
    const methodLabel = result.method === 'c2pa' ? 'C2PA' : 
                       result.method === 'url-pattern' ? 'URL' :
                       result.method === 'site-context' ? 'Site' :
                       result.method === 'dom-context' ? 'DOM' :
                       result.method === 'metadata' ? 'Meta' :
                       result.method === 'api' ? 'API' : result.method;
    
    console.log(`✓ AI detected (${methodLabel}, ${Math.round(result.confidence * 100)}%):`, img.src);
    
    if (settings.showBadges) {
      let label = 'AI';
      if (result.platform) {
        label = `AI: ${result.platform}`;
      } else if (result.method === 'site-context') {
        // Extract domain name for label
        try {
          const domain = new URL(img.src).hostname.split('.')[0];
          label = `AI: ${domain}`;
        } catch (e) {
          label = 'AI';
        }
      }
      addBadge(img, label, 'ai', result.confidence);
    }
  } else if (result.type === 'human') {
    stats.human++;
    console.log(`✓ Human created (${result.method}):`, img.src);
    if (settings.showBadges) {
      addBadge(img, 'Human', 'human', result.confidence);
    }
  } else {
    stats.unknown++;
    console.log('? Unknown:', img.src);
    if (settings.showBadges) {
      addBadge(img, '?', 'unknown', 0);
    }
  }
}

// Analyze video for C2PA metadata
async function analyzeVideo(video) {
  try {
    if (video.dataset.huminifyAnalyzed) {
      console.log('Already analyzed video:', video.src);
      return;
    }
    
    video.dataset.huminifyAnalyzed = 'true';
    console.log('Analyzing video:', video.src);
    
    // For videos, mark as unknown (full C2PA check requires backend)
    stats.unknown++;
    if (settings.showBadges) {
      addBadge(video, '?', 'unknown');
    }
  } catch (error) {
    console.error('Error analyzing video:', error);
    stats.unknown++;
    if (settings.showBadges) {
      addBadge(video, '?', 'unknown');
    }
  }
}

// Enhanced C2PA metadata check with deeper analysis
async function checkC2PAMetadata(blob) {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Check file format
    const isPNG = uint8Array[0] === 0x89 && uint8Array[1] === 0x50 && 
                  uint8Array[2] === 0x4E && uint8Array[3] === 0x47;
    const isJPEG = uint8Array[0] === 0xFF && uint8Array[1] === 0xD8;
    
    if (isPNG) {
      if (hasPNGC2PA(uint8Array)) {
        console.log('Found PNG C2PA chunk');
        return true;
      }
    } else if (isJPEG) {
      if (hasJPEGJUMBF(uint8Array)) {
        console.log('Found JPEG JUMBF box');
        return true;
      }
    }
    
    // Deep scan for C2PA markers in entire file
    if (await deepScanC2PA(uint8Array)) {
      console.log('Found C2PA markers in deep scan');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking C2PA:', error);
    return false;
  }
}

// Deep scan for C2PA markers throughout the file
async function deepScanC2PA(data) {
  try {
    // Convert to string for pattern matching (scan entire file)
    const chunkSize = 50000;
    const totalChunks = Math.ceil(data.length / chunkSize);
    
    for (let chunk = 0; chunk < totalChunks; chunk++) {
      const start = chunk * chunkSize;
      const end = Math.min(start + chunkSize, data.length);
      let dataString = '';
      
      for (let i = start; i < end; i++) {
        dataString += String.fromCharCode(data[i]);
      }
      
      const lowerData = dataString.toLowerCase();
      
      // C2PA specific markers
      const c2paMarkers = [
        'c2pa',
        'c2pa.assertions',
        'c2pa.claim',
        'c2pa.signature',
        'c2pa.credentials',
        'contentauth',
        'contentcredentials',
        'urn:uuid:c2pa',
        'jumbf',
        'c2pa:',
        'cai:',
        'self#jumbf',
        'c2pa.hash.data',
        'c2pa.ingredient',
        'stds.schema-org.CreativeWork'
      ];
      
      for (const marker of c2paMarkers) {
        if (lowerData.includes(marker)) {
          // Verify it's not a false positive by checking context
          const index = lowerData.indexOf(marker);
          if (index > 0 && index < dataString.length - 10) {
            // Check surrounding bytes for binary structure
            const context = dataString.substring(Math.max(0, index - 20), Math.min(dataString.length, index + 50));
            // If we find structured data around it, it's likely real C2PA
            if (context.includes('http') || context.includes('uuid') || context.includes('assertion')) {
              return true;
            }
          }
        }
      }
      
      // Check for CBOR (C2PA uses CBOR format)
      if (hasCBORStructure(data, start, end)) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Deep scan error:', error);
    return false;
  }
}

// Check for CBOR structure (C2PA uses CBOR)
function hasCBORStructure(data, start, end) {
  for (let i = start; i < end - 10; i++) {
    // CBOR major types that C2PA uses
    const byte = data[i];
    
    // Check for CBOR map (major type 5) followed by text strings
    if ((byte & 0xE0) === 0xA0) {
      // Look for 'c2pa' text string nearby
      const slice = data.slice(i, Math.min(i + 100, end));
      const str = String.fromCharCode(...slice);
      if (str.toLowerCase().includes('c2pa') || str.toLowerCase().includes('jumbf')) {
        return true;
      }
    }
  }
  return false;
}

// Check for JPEG JUMBF box (enhanced)
function hasJPEGJUMBF(data) {
  // Look for APP11 marker (0xFFEB) which contains JUMBF
  for (let i = 0; i < data.length - 30; i++) {
    if (data[i] === 0xFF && data[i + 1] === 0xEB) {
      // Get segment length
      const length = (data[i + 2] << 8) | data[i + 3];
      
      // Check for JUMBF identifier in the segment
      const segment = data.slice(i + 4, Math.min(i + 4 + length, i + 100));
      const str = String.fromCharCode(...segment).toLowerCase();
      
      if (str.includes('jumbf') || str.includes('c2pa') || str.includes('contentauth')) {
        return true;
      }
    }
    
    // Also check for XMP with C2PA
    if (data[i] === 0xFF && data[i + 1] === 0xE1) {
      const length = (data[i + 2] << 8) | data[i + 3];
      const segment = data.slice(i + 4, Math.min(i + 4 + length, i + 200));
      const str = String.fromCharCode(...segment).toLowerCase();
      
      if (str.includes('c2pa') || str.includes('contentcredentials')) {
        return true;
      }
    }
  }
  return false;
}

// Check for PNG C2PA chunks (enhanced)
function hasPNGC2PA(data) {
  // PNG signature check
  if (data[0] !== 0x89 || data[1] !== 0x50 || data[2] !== 0x4E || data[3] !== 0x47) {
    return false;
  }
  
  // Scan all chunks
  let offset = 8; // Skip PNG signature
  
  while (offset < data.length - 12) {
    // Read chunk length (4 bytes, big-endian)
    const length = (data[offset] << 24) | (data[offset + 1] << 16) | 
                   (data[offset + 2] << 8) | data[offset + 3];
    
    // Read chunk type (4 bytes)
    const chunkType = String.fromCharCode(
      data[offset + 4],
      data[offset + 5],
      data[offset + 6],
      data[offset + 7]
    );
    
    // Check for C2PA chunks
    if (chunkType === 'caBX' || chunkType === 'c2pa' || chunkType === 'caMP') {
      return true;
    }
    
    // Check for text chunks with C2PA info
    if (chunkType === 'tEXt' || chunkType === 'iTXt' || chunkType === 'zTXt') {
      const chunkData = data.slice(offset + 8, offset + 8 + Math.min(length, 200));
      const str = String.fromCharCode(...chunkData).toLowerCase();
      if (str.includes('c2pa') || str.includes('contentcredentials')) {
        return true;
      }
    }
    
    // Move to next chunk (length + type + data + CRC)
    offset += 12 + length;
    
    // Safety check
    if (length > 10000000 || offset > data.length) {
      break;
    }
  }
  
  return false;
}

// Add badge to element
function addBadge(element, text, type, confidence = 0) {
  try {
    // Remove existing badge
    const existingBadge = element.parentElement?.querySelector('.huminify-badge');
    if (existingBadge) {
      existingBadge.remove();
    }
    
    // Create badge
    const badge = document.createElement('div');
    badge.className = `huminify-badge huminify-badge-${type}`;
    badge.textContent = text;
    
    // Set title based on type
    if (type === 'ai') {
      const confidenceText = confidence > 0 ? ` (${Math.round(confidence * 100)}% confidence)` : '';
      badge.title = `AI Generated${confidenceText}`;
    } else if (type === 'human') {
      badge.title = 'Human Created';
    } else {
      badge.title = 'Unable to determine origin';
    }
    
    // Position badge
    const parent = element.parentElement;
    if (parent) {
      const originalPosition = window.getComputedStyle(parent).position;
      if (originalPosition === 'static') {
        parent.style.position = 'relative';
      }
      parent.appendChild(badge);
    }
  } catch (error) {
    console.error('Error adding badge:', error);
  }
}

// Clear all badges
function clearAllBadges() {
  const badges = document.querySelectorAll('.huminify-badge');
  badges.forEach(badge => badge.remove());
  
  // Reset analyzed flags
  const elements = document.querySelectorAll('[data-huminify-analyzed]');
  elements.forEach(el => delete el.dataset.huminifyAnalyzed);
}

// Watch for new images added dynamically
const observer = new MutationObserver((mutations) => {
  if (settings.autoDetect) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'IMG') {
          analyzeImage(node);
        } else if (node.nodeName === 'VIDEO') {
          analyzeVideo(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll('img').forEach(analyzeImage);
          node.querySelectorAll('video').forEach(analyzeVideo);
        }
      });
    });
  }
});

// Start observing after page load
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
