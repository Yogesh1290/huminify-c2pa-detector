"""
Google C2PA Extractor
Handles: Google Media Processing Services, Gemini, Pixel Camera
"""

from typing import Dict, List
from .base import BasePlatformExtractor


class GoogleExtractor(BasePlatformExtractor):
    """Extract C2PA metadata from Google products"""
    
    def __init__(self):
        super().__init__()
        self.company_name = "Google"
        self.markers = [
            "Google LLC",
            "Google Media Processing",
            "Google Media Processing Services",
            "Gemini",
            "Bard",
            "Imagen",
            "Pixel Camera",
            "Google Photos",
            "Google AI"
        ]
        self.ai_indicators = [
            "ai_generated",
            "synthetic",
            "generative"
        ]
    
    def extract_metadata(self, manifest: Dict, raw_data: bytes) -> Dict:
        """Extract Google-specific metadata"""
        metadata = {
            "company": self.company_name,
            "software": "Unknown",
            "service": "Unknown",
            "certificate": "Unknown",
            "detected_markers": []
        }
        
        # Extract from manifest if available
        if manifest:
            # Get claim generator info
            claim_gen = manifest.get("claim_generator_info", [])
            if claim_gen and len(claim_gen) > 0:
                gen_info = claim_gen[0]
                if "name" in gen_info:
                    metadata["software"] = gen_info["name"]
            
            # Get signature info
            sig_info = manifest.get("signature_info", {})
            if sig_info:
                if "issuer" in sig_info:
                    if "Google" in sig_info["issuer"]:
                        metadata["company"] = sig_info["issuer"]
                if "common_name" in sig_info:
                    metadata["certificate"] = sig_info["common_name"]
        
        # Fallback: Search raw data
        found_markers = self.search_raw_data(raw_data)
        if found_markers:
            metadata["detected_markers"] = found_markers
            
            # Identify specific service
            if "Google Media Processing" in str(found_markers):
                metadata["service"] = "Google Media Processing Services"
                metadata["software"] = "Google AI"
            if "Gemini" in found_markers:
                metadata["software"] = "Gemini"
            if "Pixel Camera" in found_markers:
                metadata["software"] = "Pixel Camera"
        
        return metadata
    
    def is_ai_generated(self, metadata: Dict) -> bool:
        """Determine if Google content is AI-generated"""
        # Google Media Processing Services = AI
        service = metadata.get("service", "").lower()
        software = metadata.get("software", "").lower()
        
        ai_services = [
            "media processing",
            "gemini",
            "imagen",
            "google ai"
        ]
        
        # Pixel Camera is NOT AI (real photos)
        if "pixel camera" in software:
            return False
        
        # Check if it's an AI service
        return any(ai_service in service or ai_service in software 
                   for ai_service in ai_services)
