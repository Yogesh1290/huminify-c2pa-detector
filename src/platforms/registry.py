"""
Platform Registry
Manages all platform extractors and provides unified interface
"""

from typing import Dict, List, Optional, Tuple
from .base import BasePlatformExtractor
from .openai import OpenAIExtractor
from .google import GoogleExtractor
from .adobe import AdobeExtractor
from .microsoft import MicrosoftExtractor


class PlatformRegistry:
    """Registry for all platform extractors"""
    
    def __init__(self):
        self.extractors = {
            "openai": OpenAIExtractor(),
            "google": GoogleExtractor(),
            "adobe": AdobeExtractor(),
            "microsoft": MicrosoftExtractor()
        }
    
    def detect_platform(self, manifest: Optional[Dict], raw_data: bytes) -> Tuple[str, BasePlatformExtractor]:
        """
        Detect which platform created the content
        
        Args:
            manifest: Parsed C2PA manifest (if available)
            raw_data: Raw file bytes
            
        Returns:
            Tuple of (platform_name, extractor_instance)
        """
        # Try each extractor
        for platform_name, extractor in self.extractors.items():
            # Search for markers in raw data
            found_markers = extractor.search_raw_data(raw_data)
            
            if found_markers:
                return platform_name, extractor
            
            # Also check manifest if available
            if manifest:
                claim_gen = manifest.get("claim_generator_info", [])
                if claim_gen:
                    gen_name = claim_gen[0].get("name", "").lower()
                    if extractor.company_name.lower() in gen_name:
                        return platform_name, extractor
        
        return "unknown", None
    
    def extract_metadata(self, platform_name: str, manifest: Optional[Dict], raw_data: bytes) -> Dict:
        """
        Extract metadata using specific platform extractor
        
        Args:
            platform_name: Name of the platform
            manifest: Parsed C2PA manifest
            raw_data: Raw file bytes
            
        Returns:
            Extracted metadata dictionary
        """
        if platform_name in self.extractors:
            extractor = self.extractors[platform_name]
            return extractor.extract_metadata(manifest, raw_data)
        
        return {"company": "Unknown", "error": "Platform not found"}
    
    def is_ai_generated(self, platform_name: str, metadata: Dict) -> bool:
        """
        Check if content is AI-generated
        
        Args:
            platform_name: Name of the platform
            metadata: Extracted metadata
            
        Returns:
            True if AI-generated
        """
        if platform_name in self.extractors:
            extractor = self.extractors[platform_name]
            return extractor.is_ai_generated(metadata)
        
        return False
    
    def get_all_platforms(self) -> List[str]:
        """Get list of all supported platforms"""
        return list(self.extractors.keys())
    
    def add_platform(self, name: str, extractor: BasePlatformExtractor):
        """
        Add a new platform extractor
        
        Args:
            name: Platform name
            extractor: Extractor instance
        """
        self.extractors[name] = extractor
