"""
TEMPLATE for Adding New Platform
Copy this file and rename it to your platform name (e.g., midjourney.py)
"""

from typing import Dict, List
from .base import BasePlatformExtractor


class NewPlatformExtractor(BasePlatformExtractor):
    """
    Extract C2PA metadata from [PLATFORM NAME]
    
    TODO: Update this docstring with platform details
    """
    
    def __init__(self):
        super().__init__()
        
        # TODO: Set your company name
        self.company_name = "YourCompany"
        
        # TODO: Add text markers to search for in binary data
        self.markers = [
            "CompanyName",
            "ProductName",
            "SoftwareName"
        ]
        
        # TODO: Add AI-specific indicators
        self.ai_indicators = [
            "ai_generated",
            "synthetic",
            "generative"
        ]
    
    def extract_metadata(self, manifest: Dict, raw_data: bytes) -> Dict:
        """
        Extract platform-specific metadata
        
        TODO: Implement your extraction logic
        """
        metadata = {
            "company": self.company_name,
            "software": "Unknown",
            "detected_markers": []
        }
        
        # Extract from manifest if available
        if manifest:
            # TODO: Extract from claim_generator_info
            claim_gen = manifest.get("claim_generator_info", [])
            if claim_gen and len(claim_gen) > 0:
                gen_info = claim_gen[0]
                if "name" in gen_info:
                    metadata["software"] = gen_info["name"]
            
            # TODO: Extract from signature_info
            sig_info = manifest.get("signature_info", {})
            if sig_info:
                if "issuer" in sig_info:
                    metadata["company"] = sig_info["issuer"]
            
            # TODO: Extract from assertions
            assertions = manifest.get("assertions", [])
            for assertion in assertions:
                label = assertion.get("label", "")
                data = assertion.get("data", {})
                # Add your logic here
        
        # Fallback: Search raw data
        found_markers = self.search_raw_data(raw_data)
        if found_markers:
            metadata["detected_markers"] = found_markers
            
            # TODO: Identify specific products based on markers
            if "YourProduct" in found_markers:
                metadata["software"] = "Your Product Name"
        
        return metadata
    
    def is_ai_generated(self, metadata: Dict) -> bool:
        """
        Determine if content is AI-generated
        
        TODO: Implement your AI detection logic
        """
        software = metadata.get("software", "").lower()
        
        # TODO: Add your AI product names
        ai_products = ["ai_product1", "ai_product2"]
        
        return any(product in software for product in ai_products)


# TODO: After creating your extractor:
# 1. Add import to src/platforms/__init__.py
# 2. Add to registry in src/platforms/registry.py
# 3. Test with your platform's images
# 4. Update documentation
