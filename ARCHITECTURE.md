# Architecture Documentation

## Overview
AI Content Detector uses a modular, scalable architecture with clear separation of concerns. Each component is in its own file, making the codebase easy to understand, maintain, and extend.

## System Architecture

### High-Level Design
```
┌─────────────────────────────────────────────────────────────┐
│                    Entry Points                              │
│  ai_content_detector.py  │  c2pa_api_server.py              │
└──────────────┬────────────┴──────────────┬──────────────────┘
               │                           │
               ▼                           ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│     Core Detection       │   │      API Server          │
│   (src/core/)            │   │   (src/api/)             │
│                          │   │                          │
│  • detector.py           │   │  • server.py             │
│  • c2pa_reader.py        │   │  • routes.py             │
│  • api_client.py         │   │  • models.py             │
└──────────┬───────────────┘   └──────────┬───────────────┘
           │                               │
           ▼                               ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   Platform Detection     │◄──┤   Platform Registry      │
│   (src/platforms/)       │   │   (src/platforms/)       │
│                          │   │                          │
│  • openai.py             │   │  • registry.py           │
│  • google.py             │   │  • base.py               │
│  • adobe.py              │   │                          │
│  • microsoft.py          │   │                          │
└──────────────────────────┘   └──────────────────────────┘
           │
           ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   AI Detection Models    │   │   Utilities              │
│   (src/models/)          │   │   (src/utils/)           │
│                          │   │                          │
│  • text_detector.py      │   │  • console.py            │
│  • image_detector.py     │   │                          │
└──────────────────────────┘   └──────────────────────────┘
```

## Module Details

### Entry Points

#### `ai_content_detector.py`
**Purpose**: Command-line interface for content detection

**Responsibilities**:
- Parse CLI arguments
- Initialize detector
- Display results

**Size**: ~50 lines

#### `c2pa_api_server.py`
**Purpose**: FastAPI server for C2PA validation

**Responsibilities**:
- Create FastAPI app
- Setup routes
- Start server

**Size**: ~50 lines

### Core Modules (`src/core/`)

#### `detector.py`
**Purpose**: Main detection orchestrator

**Key Classes**:
- `AIContentDetector`: Coordinates 3-layer detection system

**Responsibilities**:
- Layer 1: Check C2PA via API
- Layer 2: Check embedded C2PA with platform detection
- Layer 3: Fallback AI detection
- Return structured results

**Dependencies**:
- `c2pa_reader.py`
- `api_client.py`
- `src/platforms/registry.py`
- `src/models/text_detector.py`
- `src/models/image_detector.py`

#### `c2pa_reader.py`
**Purpose**: C2PA manifest operations

**Key Classes**:
- `C2PAReader`: Handles C2PA library operations

**Responsibilities**:
- Initialize C2PA library
- Read manifests from files
- Validate signatures

**Dependencies**:
- `c2pa` (external library)

#### `api_client.py`
**Purpose**: API server communication

**Key Classes**:
- `APIClient`: Handles HTTP requests to API server

**Responsibilities**:
- Send files to API server
- Handle connection errors
- Parse API responses

**Dependencies**:
- `requests` (external library)

### Model Modules (`src/models/`)

#### `text_detector.py`
**Purpose**: Text AI detection

**Key Classes**:
- `TextDetector`: Wraps text AI detection model

**Responsibilities**:
- Load text detection model
- Analyze text content
- Return confidence scores

**Dependencies**:
- `transformers` (external library)
- Model: `Hello-SimpleAI/chatgpt-detector-roberta`

#### `image_detector.py`
**Purpose**: Image AI detection

**Key Classes**:
- `ImageDetector`: Wraps image AI detection model

**Responsibilities**:
- Load image detection model
- Analyze image content
- Return confidence scores

**Dependencies**:
- `transformers` (external library)
- `PIL` (external library)
- Model: `umm-maybe/AI-image-detector`

### API Modules (`src/api/`)

#### `server.py`
**Purpose**: FastAPI application setup

**Key Functions**:
- `create_app()`: Creates and configures FastAPI app

**Responsibilities**:
- Initialize FastAPI
- Setup platform registry
- Configure app metadata

**Dependencies**:
- `fastapi` (external library)
- `src/platforms/registry.py`

#### `routes.py`
**Purpose**: API endpoint handlers

**Key Functions**:
- `root()`: API information
- `health()`: Health check
- `list_platforms()`: List supported platforms
- `validate_file()`: Validate uploaded file
- `validate_base64()`: Validate base64 data
- `validate_url()`: Validate from URL

**Responsibilities**:
- Handle HTTP requests
- Process file uploads
- Return JSON responses

**Dependencies**:
- `fastapi` (external library)
- `c2pa` (external library)
- `src/api/models.py`

#### `models.py`
**Purpose**: API request/response models

**Key Classes**:
- `Base64Request`: Base64 file upload model
- `URLRequest`: URL validation model

**Responsibilities**:
- Define request schemas
- Validate input data
- Generate API documentation

**Dependencies**:
- `pydantic` (external library)

### Platform Modules (`src/platforms/`)

#### `base.py`
**Purpose**: Base class for platform extractors

**Key Classes**:
- `BasePlatformExtractor`: Abstract base class

**Responsibilities**:
- Define extractor interface
- Provide common functionality
- Search raw data for markers

**Methods**:
- `extract_metadata()`: Extract platform-specific metadata
- `is_ai_generated()`: Determine if AI-generated
- `search_raw_data()`: Find markers in binary data

#### `registry.py`
**Purpose**: Platform detection and management

**Key Classes**:
- `PlatformRegistry`: Manages all platform extractors

**Responsibilities**:
- Register platform extractors
- Detect which platform created content
- Route to appropriate extractor

**Methods**:
- `detect_platform()`: Identify platform from manifest/data
- `extract_metadata()`: Extract using specific platform
- `is_ai_generated()`: Check if AI-generated
- `get_all_platforms()`: List supported platforms
- `add_platform()`: Register new platform

#### Platform Extractors

Each platform has its own file:

**`openai.py`**
- Company: OpenAI
- Products: ChatGPT, DALL-E, GPT-4, GPT-4o, Sora
- Markers: "OpenAI", "ChatGPT", "DALL-E", "GPT-4", "Truepic"

**`google.py`**
- Company: Google
- Products: Gemini, Pixel Camera, Google Photos
- Markers: "Google LLC", "Google Media Processing", "Pixel Camera"

**`adobe.py`**
- Company: Adobe
- Products: Firefly, Photoshop, Illustrator
- Markers: "Adobe", "Firefly", "Photoshop"

**`microsoft.py`**
- Company: Microsoft
- Products: Designer, Bing Image Creator, Copilot
- Markers: "Microsoft", "Designer", "Bing"

**`TEMPLATE.py`**
- Template for adding new platforms
- Copy and customize for new companies

### Utility Modules (`src/utils/`)

#### `console.py`
**Purpose**: Console output formatting

**Key Functions**:
- `print_result()`: Pretty print analysis results
- `print_initialization_status()`: Show startup status

**Responsibilities**:
- Format output for CLI
- Display detection results
- Show status messages

## Data Flow

### Detection Flow
```
1. User runs: python ai_content_detector.py image.png
2. CLI parses arguments
3. AIContentDetector initialized
4. analyze_file() called:
   
   Layer 1: API Check
   ├─ APIClient.check_manifest()
   ├─ If API available → return result
   └─ If API unavailable → continue to Layer 2
   
   Layer 2: Embedded C2PA
   ├─ C2PAReader.read_manifest()
   ├─ PlatformRegistry.detect_platform()
   ├─ PlatformExtractor.extract_metadata()
   ├─ PlatformExtractor.is_ai_generated()
   ├─ If C2PA found → return result
   └─ If no C2PA → continue to Layer 3
   
   Layer 3: AI Detection
   ├─ TextDetector.detect() OR ImageDetector.detect()
   └─ Return AI detection result

5. print_result() displays formatted output
```

### API Server Flow
```
1. User starts: python c2pa_api_server.py
2. create_app() initializes FastAPI
3. setup_routes() registers endpoints
4. Server listens on http://localhost:8000

Request Flow:
1. Client uploads file to /validate/file
2. routes.validate_file() receives upload
3. C2PAReader.read_manifest() reads C2PA
4. PlatformRegistry.detect_platform() identifies platform
5. PlatformExtractor.extract_metadata() extracts data
6. PlatformExtractor.is_ai_generated() checks AI
7. JSON response returned to client
```

## Design Principles

### 1. Separation of Concerns
Each module has a single, well-defined responsibility:
- Core: Detection logic
- Models: AI detection
- Platforms: Platform-specific extraction
- API: HTTP server
- Utils: Helper functions

### 2. Dependency Injection
Components receive dependencies rather than creating them:
```python
# Good
detector = AIContentDetector(api_endpoint="http://localhost:8000")

# Not
class AIContentDetector:
    def __init__(self):
        self.api_endpoint = "http://localhost:8000"  # Hardcoded
```

### 3. Interface-Based Design
Platform extractors implement common interface:
```python
class BasePlatformExtractor(ABC):
    @abstractmethod
    def extract_metadata(self, manifest, raw_data):
        pass
    
    @abstractmethod
    def is_ai_generated(self, metadata):
        pass
```

### 4. Registry Pattern
Platform registry manages extractors dynamically:
```python
registry = PlatformRegistry()
platform, extractor = registry.detect_platform(manifest, data)
metadata = extractor.extract_metadata(manifest, data)
```

### 5. Lazy Loading
Models loaded only when needed:
```python
class TextDetector:
    def __init__(self):
        self.detector = None  # Not loaded yet
    
    def _init_detector(self):
        # Load only when first used
        self.detector = pipeline(...)
```

## Extension Points

### Adding a New Platform
1. Create `src/platforms/new_company.py`
2. Inherit from `BasePlatformExtractor`
3. Implement required methods
4. Add to `PlatformRegistry`

### Adding a New Detection Layer
1. Create module in `src/models/`
2. Implement detector interface
3. Add to `AIContentDetector`

### Adding New API Endpoints
1. Add handler in `src/api/routes.py`
2. Add model in `src/api/models.py`
3. Test endpoint

## Testing Strategy

### Unit Tests
Each module can be tested independently:
```python
# Test C2PA reader
def test_c2pa_reader():
    reader = C2PAReader()
    manifest = reader.read_manifest("test.png")
    assert manifest is not None

# Test platform detection
def test_platform_detection():
    registry = PlatformRegistry()
    platform, extractor = registry.detect_platform(manifest, data)
    assert platform == "openai"
```

### Integration Tests
Test component interactions:
```python
def test_full_detection():
    detector = AIContentDetector()
    result = detector.analyze_file("test.png")
    assert result["final_verdict"] == "AI_DETECTED_C2PA"
```

### API Tests
Test HTTP endpoints:
```python
def test_validate_file_endpoint():
    response = client.post("/validate/file", files={"file": image})
    assert response.status_code == 200
    assert response.json()["isValid"] == True
```

## Performance Considerations

### Model Loading
- Models loaded once at startup
- Lazy loading for optional components
- Reuse model instances

### File Processing
- Stream large files
- Temporary files cleaned up
- Efficient binary search

### API Server
- Async endpoints for concurrency
- Connection pooling
- Request timeout handling

## Security Considerations

### File Upload
- Validate file types
- Limit file sizes
- Clean up temporary files

### API Endpoints
- Input validation with Pydantic
- Error handling
- Timeout protection

### Dependencies
- Pin versions in requirements.txt
- Regular security updates
- Minimal dependencies

## Conclusion

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Easy to understand and maintain
- ✅ Scalable for future growth
- ✅ Simple contribution process
- ✅ Testable components
- ✅ Production-ready code
