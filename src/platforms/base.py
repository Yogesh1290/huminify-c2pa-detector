"""
Base class for platform-specific C2PA extractors
"""

from typing import Dict, List, Optional
from abc import ABC, abstractmethod


class BasePlatformExtractor(ABC):
    """Base class for all platform extractors"""
    
    def __init__(self):
        self.company_name = "Unknown"
        self.markers = []  # Text markers to search for
        self.ai_indicators = []  # AI-specific indicators
    
    @abstractmethod
    def extract_metadata(self, manifest: Dict, raw_data: bytes) -> Dict:
        """
        Extract platform-specific metadata
        
        Args:
            manifest: Parsed C2PA manifest (if available)
            raw_data: Raw file bytes for fallback extraction
            
        Returns:
            Dictionary with extracted metadata
        """
        pass
    
    @abstractmethod
    def is_ai_generated(self, metadata: Dict) -> bool:
        """
        Determine if content is AI-generated based on metadata
        
        Args:
            metadata: Extracted metadata
            
        Returns:
            True if AI-generated, False otherwise
        """
        pass
    
    def search_raw_data(self, raw_data: bytes) -> List[str]:
        """
        Search for company markers in raw binary data
        
        Args:
            raw_data: Raw file bytes
            
        Returns:
            List of found markers
        """
        try:
            text_data = raw_data.decode('latin-1', errors='ignore')
            found = []
            
            for marker in self.markers:
                if marker in text_data:
                    found.append(marker)
            
            return found
        except:
            return []
    
    def get_company_name(self) -> str:
        """Get the company name"""
        return self.company_name
