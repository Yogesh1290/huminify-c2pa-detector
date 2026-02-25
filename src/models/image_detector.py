"""
Image AI Detection Model
Wrapper for image-based AI detection
"""

from typing import Tuple


class ImageDetector:
    """AI detection for image content"""
    
    def __init__(self):
        self.detector = None
        self.available = False
        self._init_detector()
    
    def _init_detector(self):
        """Initialize image detection model"""
        try:
            from transformers import pipeline
            
            self.detector = pipeline(
                "image-classification",
                model="umm-maybe/AI-image-detector",
                device=-1
            )
            self.available = True
        except ImportError:
            pass
        except Exception:
            pass
    
    def is_available(self) -> bool:
        """Check if detector is available"""
        return self.available
    
    def detect(self, file_path: str) -> Tuple[str, float]:
        """
        Detect if image is AI-generated
        
        Args:
            file_path: Path to image file
            
        Returns:
            Tuple of (status, confidence_score)
        """
        if not self.available:
            return "unavailable", 0.0
        
        try:
            from PIL import Image
            
            image = Image.open(file_path).convert('RGB')
            results = self.detector(image)
            
            result = results[0]
            label = result["label"].lower()
            score = result["score"]
            
            if "artificial" in label or "ai" in label or "fake" in label:
                ai_score = score
            else:
                ai_score = 1 - score
            
            threshold = 0.55
            if ai_score >= threshold:
                return "ai_likely", ai_score
            elif ai_score <= (1 - threshold):
                return "human_likely", 1 - ai_score
            else:
                return "uncertain", ai_score
                
        except Exception:
            return "error", 0.0
