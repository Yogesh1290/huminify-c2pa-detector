"""
Microsoft C2PA Extractor
Handles: Microsoft Designer, Bing Image Creator, Copilot
"""

from typing import Dict, List
from .base import BasePlatformExtractor


class MicrosoftExtractor(BasePlatformExtractor):
    """Extract C2PA metadata from Microsoft products"""
    
    def __init__(self):
        super().__init__()
        self.company_name = "Microsoft"
        self.markers = [
            "Microsoft",
            "Microsoft Designer",
            "Designer",
            "Bing Image Creator",
            "Copilot",
            "Microsoft Copilot"
        ]
        self.ai_indicators = [
            "ai_generated",
            "designer",
            "copilot"
        ]
    
    def extract_metadata(self, manifest: Dict, raw_data: bytes) -> Dict:
        """Extract Microsoft-specific metadata"""
        metadata = {
            "company": self.company_name,
            "software": "Unknown",
            "service": "Unknown",
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
                    if "Microsoft" in sig_info["issuer"]:
                        metadata["company"] = sig_info["issuer"]
        
        # Fallback: Search raw data
        found_markers = self.search_raw_data(raw_data)
        if found_markers:
            metadata["detected_markers"] = found_markers
            
            # Identify specific product
            if "Designer" in found_markers:
                metadata["software"] = "Microsoft Designer"
                metadata["service"] = "AI Design Tool"
            if "Bing Image Creator" in found_markers:
                metadata["software"] = "Bing Image Creator"
                metadata["service"] = "AI Image Generation"
            if "Copilot" in found_markers:
                metadata["software"] = "Microsoft Copilot"
        
        return metadata
    
    def is_ai_generated(self, metadata: Dict) -> bool:
        """Microsoft Designer and Bing Image Creator are always AI"""
        software = metadata.get("software", "").lower()
        
        ai_products = ["designer", "bing image creator", "copilot"]
        
        return any(product in software for product in ai_products)
