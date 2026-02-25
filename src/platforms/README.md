# Platform Extractors

This directory contains platform-specific C2PA metadata extractors. Each company/platform has its own module for easy maintenance and contribution.

## Structure

```
platforms/
├── __init__.py          # Exports all extractors
├── base.py              # Base class for all extractors
├── registry.py          # Platform registry and detection
├── TEMPLATE.py          # Template for new platforms
├── openai.py            # OpenAI (ChatGPT, DALL-E)
├── google.py            # Google (Gemini, Pixel)
├── adobe.py             # Adobe (Firefly, Photoshop)
├── microsoft.py         # Microsoft (Designer, Copilot)
└── README.md            # This file
```

## Supported Platforms

| Platform | Products | Status |
|----------|----------|--------|
| **OpenAI** | ChatGPT, DALL-E, GPT-4, Sora | ✅ Implemented |
| **Google** | Gemini, Pixel Camera, Media Processing | ✅ Implemented |
| **Adobe** | Firefly, Photoshop, Illustrator | ✅ Implemented |
| **Microsoft** | Designer, Bing Image Creator, Copilot | ✅ Implemented |

## Adding a New Platform

### Step 1: Create Extractor File

Copy `TEMPLATE.py` to `yourplatform.py`:

```bash
cp TEMPLATE.py midjourney.py
```

### Step 2: Implement the Extractor

```python
from typing import Dict
from .base import BasePlatformExtractor

class MidjourneyExtractor(BasePlatformExtractor):
    def __init__(self):
        super().__init__()
        self.company_name = "Midjourney"
        self.markers = ["Midjourney", "MJ"]
        self.ai_indicators = ["ai_generated"]
    
    def extract_metadata(self, manifest: Dict, raw_data: bytes) -> Dict:
        # Your extraction logic
        pass
    
    def is_ai_generated(self, metadata: Dict) -> bool:
        # Your AI detection logic
        return True  # Midjourney is always AI
```

### Step 3: Register the Platform

Add to `__init__.py`:
```python
from .midjourney import MidjourneyExtractor

__all__ = [
    # ... existing
    'MidjourneyExtractor'
]
```

Add to `registry.py`:
```python
from .midjourney import MidjourneyExtractor

class PlatformRegistry:
    def __init__(self):
        self.extractors = {
            # ... existing
            "midjourney": MidjourneyExtractor()
        }
```

### Step 4: Test

```bash
python -m pytest tests/test_midjourney.py
```

### Step 5: Document

Update this README with your platform details.

## Extractor Interface

All extractors must implement:

### `extract_metadata(manifest, raw_data) -> Dict`
Extract platform-specific metadata from C2PA manifest and/or raw file data.

**Parameters:**
- `manifest`: Parsed C2PA manifest dictionary (may be None)
- `raw_data`: Raw file bytes for fallback extraction

**Returns:**
Dictionary with extracted metadata:
```python
{
    "company": "CompanyName",
    "software": "ProductName",
    "version": "1.0.0",
    "detected_markers": ["Marker1", "Marker2"],
    # ... platform-specific fields
}
```

### `is_ai_generated(metadata) -> bool`
Determine if content is AI-generated based on extracted metadata.

**Parameters:**
- `metadata`: Dictionary returned by `extract_metadata()`

**Returns:**
- `True` if AI-generated
- `False` if human-created

## Best Practices

### 1. Specific Markers
Use specific, unique markers for your platform:
```python
self.markers = [
    "Adobe Firefly",  # Good - specific
    "Adobe"           # Bad - too generic
]
```

### 2. Fallback Extraction
Always implement raw data extraction as fallback:
```python
# Try manifest first
if manifest:
    # Extract from manifest
    pass

# Fallback to raw data
found_markers = self.search_raw_data(raw_data)
if found_markers:
    # Use markers to identify product
    pass
```

### 3. AI Detection Logic
Be specific about what constitutes AI generation:
```python
def is_ai_generated(self, metadata: Dict) -> bool:
    software = metadata.get("software", "").lower()
    
    # Firefly = AI
    if "firefly" in software:
        return True
    
    # Photoshop without AI features = human
    if "photoshop" in software:
        return metadata.get("ai_feature") is not None
    
    return False
```

### 4. Error Handling
Handle missing data gracefully:
```python
def extract_metadata(self, manifest: Dict, raw_data: bytes) -> Dict:
    metadata = {
        "company": self.company_name,
        "software": "Unknown",  # Default values
        "detected_markers": []
    }
    
    try:
        # Extraction logic
        pass
    except Exception as e:
        metadata["error"] = str(e)
    
    return metadata
```

## Testing

Each platform should have tests:

```python
# tests/test_openai.py
def test_openai_extraction():
    extractor = OpenAIExtractor()
    
    # Test with manifest
    manifest = {...}
    metadata = extractor.extract_metadata(manifest, b"")
    assert metadata["company"] == "OpenAI"
    
    # Test with raw data
    raw_data = b"...ChatGPT..."
    metadata = extractor.extract_metadata(None, raw_data)
    assert "ChatGPT" in metadata["detected_markers"]
    
    # Test AI detection
    assert extractor.is_ai_generated(metadata) == True
```

## Contributing

1. Fork the repository
2. Create your platform extractor
3. Add tests
4. Update documentation
5. Submit pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for details.

## Platform-Specific Notes

### OpenAI
- Uses Truepic for certificate signing
- Look for "GPT-4", "ChatGPT", "DALL-E" markers
- Always AI-generated

### Google
- "Google Media Processing Services" = AI
- "Pixel Camera" = Real photos (NOT AI)
- Check service name carefully

### Adobe
- Firefly = Always AI
- Photoshop/Illustrator = Check for AI features
- Look for "generative" in assertions

### Microsoft
- Designer = Always AI
- Bing Image Creator = Always AI
- Copilot = AI-assisted

## Future Platforms

Planned additions:
- [ ] Midjourney
- [ ] Stability AI (Stable Diffusion)
- [ ] Leonardo.AI
- [ ] Runway
- [ ] Meta AI
- [ ] Anthropic (Claude)

Want to add one? See TEMPLATE.py!
