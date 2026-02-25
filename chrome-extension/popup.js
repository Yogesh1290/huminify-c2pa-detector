// Popup script
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load settings
    const settings = await chrome.storage.sync.get({
      autoDetect: true,
      showBadges: true
    });

    document.getElementById('autoDetect').checked = settings.autoDetect;
    document.getElementById('showBadges').checked = settings.showBadges;

    // Load stats
    loadStats();

    // Save settings on change
    document.getElementById('autoDetect').addEventListener('change', async (e) => {
      await chrome.storage.sync.set({ autoDetect: e.target.checked });
      sendMessageToTab({ action: 'updateSettings', autoDetect: e.target.checked });
    });

    document.getElementById('showBadges').addEventListener('change', async (e) => {
      await chrome.storage.sync.set({ showBadges: e.target.checked });
      sendMessageToTab({ action: 'updateSettings', showBadges: e.target.checked });
    });

    // Scan button
    document.getElementById('scanBtn').addEventListener('click', () => {
      sendMessageToTab({ action: 'scanPage' });
      setTimeout(loadStats, 1000);
    });

    // Clear button
    document.getElementById('clearBtn').addEventListener('click', () => {
      sendMessageToTab({ action: 'clearBadges' });
      updateStats({ total: 0, ai: 0, human: 0, unknown: 0 });
    });
  } catch (error) {
    console.error('Popup error:', error);
  }
});

async function loadStats() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      chrome.tabs.sendMessage(tab.id, { action: 'getStats' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log('Could not connect to tab:', chrome.runtime.lastError.message);
          updateStats({ total: 0, ai: 0, human: 0, unknown: 0 });
          return;
        }
        if (response) {
          updateStats(response);
        }
      });
    }
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

function updateStats(stats) {
  document.getElementById('totalImages').textContent = stats.total || 0;
  document.getElementById('aiImages').textContent = stats.ai || 0;
  document.getElementById('humanImages').textContent = stats.human || 0;
  document.getElementById('unknownImages').textContent = stats.unknown || 0;
}

async function sendMessageToTab(message) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      chrome.tabs.sendMessage(tab.id, message, (response) => {
        if (chrome.runtime.lastError) {
          console.log('Message error:', chrome.runtime.lastError.message);
        }
      });
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
