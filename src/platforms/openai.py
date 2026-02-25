"""
OpenAI / ChatGPT C2PA Extractor
Handles: ChatGPT, DALL-E, GPT-4, Sora
"""

from typing import Dict, List
from .base import BasePlatformExtractor


class OpenAIExtractor(BasePlatformExtractor):
    """Extract C2PA metadata from OpenAI products"""
    
    def __init__(self):
        super().__init__()
        self.company_name = "OpenAI"
        self.markers = [
            "OpenAI",
            "ChatGPT",
            "GPT-4",
            "GPT-4o",
            "DALL-E",
            "DALL·E",
            "Truepic",  # OpenAI uses Truepic for signing
            "Sora"
        ]
        self.ai_indicators = [
            "trainedAlgorithmicMedia",
            "c2pa.ai_generated",
            "generativeType"
        ]
    
    def extract_metadata(self, manifest: Dict, raw_data: bytes) -> Dict:
        """Extract OpenAI-specific metadata"""
        metadata = {
            "company": self.company_name,
            "software": None,
            "generator": None,
            "model": None,
            "certificate": None,
            "organization": None,
            "creator": None,
            "author": None,
            "producer": None,
            "detected_markers": [],
            "assertions": []
        }
        
        # Extract from manifest if available
        if manifest:
            # Get title
            if "title" in manifest:
                metadata["title"] = manifest["title"]
            
            # Get claim generator info
            claim_gen = manifest.get("claim_generator_info", [])
            if claim_gen and len(claim_gen) > 0:
                gen_info = claim_gen[0]
                if "name" in gen_info:
                    metadata["generator"] = gen_info["name"]
                    metadata["software"] = gen_info["name"]
                if "version" in gen_info:
                    metadata["version"] = gen_info["version"]
            
            # Get signature info
            sig_info = manifest.get("signature_info", {})
            if sig_info:
                if "common_name" in sig_info:
                    metadata["certificate"] = sig_info["common_name"]
                if "issuer" in sig_info:
                    metadata["organization"] = sig_info["issuer"]
                if "organization" in sig_info:
                    metadata["organization"] = sig_info["organization"]
            
            # Get creator/author info
            if "creator" in manifest:
                metadata["creator"] = manifest["creator"]
            if "author" in manifest:
                metadata["author"] = manifest["author"]
            if "producer" in manifest:
                metadata["producer"] = manifest["producer"]
            
            # Check assertions for model info and AI indicators
            assertions = manifest.get("assertions", [])
            assertion_labels = []
            for assertion in assertions:
                label = assertion.get("label", "")
                if label:
                    assertion_labels.append(label)
                
                data = assertion.get("data", {})
                if isinstance(data, dict):
                    # Check for software agent
                    actions = data.get("actions", [])
                    for action in actions:
                        if "softwareAgent" in action:
                            agent = action["softwareAgent"]
                            metadata["model"] = agent
                            if "GPT" in agent or "DALL" in agent:
                                metadata["software"] = agent
                    
                    # Check for AI generation indicators
                    if "trainedAlgorithmicMedia" in data:
                        metadata["ai_indicator"] = "trainedAlgorithmicMedia"
                    if "generativeType" in data:
                        metadata["generative_type"] = data["generativeType"]
            
            if assertion_labels:
                metadata["assertions"] = assertion_labels
        
        # Fallback: Search raw data
        found_markers = self.search_raw_data(raw_data)
        if found_markers:
            metadata["detected_markers"] = found_markers
            
            # Try to identify specific product
            if "ChatGPT" in found_markers:
                if not metadata["software"]:
                    metadata["software"] = "ChatGPT"
                if not metadata["generator"]:
                    metadata["generator"] = "ChatGPT"
            if any("GPT-4" in m for m in found_markers):
                if not metadata["model"]:
                    metadata["model"] = "GPT-4"
            if "DALL" in str(found_markers):
                if not metadata["software"]:
                    metadata["software"] = "DALL-E"
            if "Truepic" in found_markers:
                if not metadata["certificate"]:
                    metadata["certificate"] = "Truepic"
        
        return metadata
    
    def is_ai_generated(self, metadata: Dict) -> bool:
        """OpenAI products are always AI-generated"""
        # If we detected any OpenAI markers, it's AI
        if metadata.get("detected_markers"):
            return True
        
        # Check software/model names
        software = metadata.get("software", "").lower()
        model = metadata.get("model", "").lower()
        
        ai_keywords = ["chatgpt", "gpt", "dall-e", "sora"]
        
        return any(keyword in software or keyword in model for keyword in ai_keywords)
