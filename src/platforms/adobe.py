"""
Adobe C2PA Extractor
Handles: Adobe Firefly, Photoshop, Illustrator
"""

from typing import Dict, List
from .base import BasePlatformExtractor


class AdobeExtractor(BasePlatformExtractor):
    """Extract C2PA metadata from Adobe products"""
    
    def __init__(self):
        super().__init__()
        self.company_name = "Adobe"
        self.markers = [
            "Adobe",
            "Firefly",
            "Adobe Firefly",
            "Photoshop",
            "Adobe Photoshop",
            "Illustrator",
            "Adobe Sensei"
        ]
        self.ai_indicators = [
            "firefly",
            "generative fill",
            "ai_generated"
        ]
    
    def extract_metadata(self, manifest: Dict, raw_data: bytes) -> Dict:
        """Extract Adobe-specific metadata"""
        metadata = {
            "company": self.company_name,
            "software": "Unknown",
            "version": "Unknown",
            "ai_feature": None,
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
                if "version" in gen_info:
                    metadata["version"] = gen_info["version"]
            
            # Check assertions for AI features
            assertions = manifest.get("assertions", [])
            for assertion in assertions:
                label = assertion.get("label", "")
                if "generative" in label.lower():
                    metadata["ai_feature"] = "Generative AI"
        
        # Fallback: Search raw data
        found_markers = self.search_raw_data(raw_data)
        if found_markers:
            metadata["detected_markers"] = found_markers
            
            # Identify specific product
            if "Firefly" in found_markers:
                metadata["software"] = "Adobe Firefly"
                metadata["ai_feature"] = "AI Image Generation"
            elif "Photoshop" in found_markers:
                metadata["software"] = "Adobe Photoshop"
        
        return metadata
    
    def is_ai_generated(self, metadata: Dict) -> bool:
        """Determine if Adobe content is AI-generated"""
        software = metadata.get("software", "").lower()
        ai_feature = metadata.get("ai_feature", "")
        
        # Firefly is always AI
        if "firefly" in software:
            return True
        
        # Check for AI features
        if ai_feature:
            return True
        
        # Photoshop/Illustrator without AI features = human-edited
        return False
