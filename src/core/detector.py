"""
Main Detector Module
Orchestrates 3-layer AI detection system
"""

import os
from pathlib import Path
from typing import Dict, Optional

from .c2pa_reader import C2PAReader
from .api_client import APIClient
from ..platforms.registry import PlatformRegistry
from ..models.image_detector import ImageDetector


class AIContentDetector:
    """Multi-layered AI content detection using C2PA and image detection"""
    
    def __init__(self, api_endpoint: Optional[str] = None):
        self.api_client = APIClient(api_endpoint or "http://localhost:8000")
        self.c2pa_reader = C2PAReader()
        self.platform_registry = PlatformRegistry()
        self.image_detector = ImageDetector()
    
    def check_c2pa_api(self, file_path: str) -> tuple:
        """Check C2PA via API server (Layer 1 - Priority)"""
        return self.api_client.check_manifest(file_path)
    
    def check_c2pa_embedded(self, file_path: str) -> tuple:
        """Check embedded C2PA with platform detection (Layer 2)"""
        if not self.c2pa_reader.is_available():
            return "unavailable", {}
        
        try:
            # Read file for platform detection
            with open(file_path, 'rb') as f:
                raw_data = f.read()
            
            # Try to read C2PA manifest
            manifest = self.c2pa_reader.read_manifest(file_path)
            
            # Detect platform using modular system
            platform_name, extractor = self.platform_registry.detect_platform(manifest, raw_data)
            
            if platform_name == "unknown":
                return "no_platform_detected", {}
            
            # Extract metadata using platform-specific extractor
            metadata = extractor.extract_metadata(manifest, raw_data)
            
            # Check if AI-generated
            is_ai = extractor.is_ai_generated(metadata)
            
            # Validate signature if manifest available
            signature_valid = False
            if manifest:
                signature_valid, _ = self.c2pa_reader.validate_signature(file_path)
            
            result = {
                "platform": platform_name,
                "company": metadata.get("company", "Unknown"),
                "metadata": metadata,
                "ai_generated": is_ai,
                "signature_valid": signature_valid
            }
            
            if is_ai:
                if signature_valid:
                    return "ai_confirmed", result
                else:
                    return "ai_confirmed_unsigned", result
            else:
                if signature_valid:
                    return "human_verified", result
                else:
                    return "signature_invalid", result
                    
        except Exception as e:
            return "error", {"error": str(e)}
    
    def analyze_file(self, file_path: str) -> Dict:
        """Main analysis function - 3-layer detection"""
        result = {
            "file": file_path,
            "exists": os.path.exists(file_path),
            "api_status": None,
            "api_info": {},
            "c2pa_status": None,
            "c2pa_info": {},
            "detection_status": None,
            "detection_score": 0.0,
            "final_verdict": None,
            "confidence": None
        }
        
        if not result["exists"]:
            result["final_verdict"] = "file_not_found"
            return result
        
        # LAYER 1: Check C2PA API
        api_status, api_info = self.check_c2pa_api(file_path)
        result["api_status"] = api_status
        result["api_info"] = api_info
        
        if api_status == "api_success":
            if api_info.get('aiDetected'):
                result["final_verdict"] = "AI_DETECTED_C2PA_API"
                result["confidence"] = "high"
                return result
            else:
                result["final_verdict"] = "HUMAN_VERIFIED_C2PA_API"
                result["confidence"] = "high"
                return result
        
        # LAYER 2: Check embedded C2PA with platform detection
        c2pa_status, c2pa_info = self.check_c2pa_embedded(file_path)
        result["c2pa_status"] = c2pa_status
        result["c2pa_info"] = c2pa_info
        
        if c2pa_status in ["ai_confirmed", "ai_confirmed_unsigned"]:
            result["final_verdict"] = "AI_DETECTED_C2PA"
            result["confidence"] = "high" if c2pa_status == "ai_confirmed" else "medium-high"
            return result
        elif c2pa_status == "human_verified":
            result["final_verdict"] = "HUMAN_VERIFIED"
            result["confidence"] = "high"
            return result
        
        # LAYER 3: Fallback AI detection (images only)
        file_ext = Path(file_path).suffix.lower()
        
        # Video files - C2PA only, no fallback
        if file_ext in [".mp4", ".mov", ".avi", ".webm", ".mkv", ".flv", ".wmv"]:
            result["final_verdict"] = "NO_C2PA_FOUND"
            result["confidence"] = "none"
            return result
        
        # Image files - C2PA + AI fallback
        if file_ext in [".jpg", ".jpeg", ".png", ".webp"]:
            detection_status, score = self.image_detector.detect(file_path)
            result["detection_status"] = detection_status
            result["detection_score"] = score
            
            if detection_status == "ai_likely":
                result["final_verdict"] = "AI_LIKELY"
                result["confidence"] = "medium"
            elif detection_status == "human_likely":
                result["final_verdict"] = "HUMAN_LIKELY"
                result["confidence"] = "medium"
            else:
                result["final_verdict"] = "UNCERTAIN"
                result["confidence"] = "low"
        
        else:
            result["final_verdict"] = "UNSUPPORTED_FORMAT"
            result["confidence"] = "none"
        
        return result
