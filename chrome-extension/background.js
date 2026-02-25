// Background service worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('Huminify extension installed');
  
  // Set default settings
  chrome.storage.sync.set({
    autoDetect: true,
    showBadges: true
  }).catch(err => console.error('Storage error:', err));
  
  // Create context menu
  try {
    chrome.contextMenus.create({
      id: 'huminify-check',
      title: 'Check with Huminify',
      contexts: ['image', 'video']
    });
  } catch (error) {
    console.error('Context menu error:', error);
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'huminify-check' && tab && tab.id) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'checkMedia',
      url: info.srcUrl
    }).catch(err => console.error('Message error:', err));
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeImage') {
    sendResponse({ success: true });
  } else if (request.action === 'fetchImage') {
    // Fetch image in background to bypass CORS
    fetchImageData(request.url)
      .then(data => sendResponse({ success: true, data: data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
  return true;
});

// Fetch image data as base64 (bypasses CORS in background context)
async function fetchImageData(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'force-cache'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const blob = await response.blob();
    
    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Background fetch error:', error);
    throw error;
  }
}
