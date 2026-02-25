"""
C2PA Reader Module
Handles C2PA manifest reading and validation
"""

from typing import Dict, Optional, Tuple


class C2PAReader:
    """Handles C2PA manifest reading operations"""
    
    def __init__(self):
        self.c2pa_available = False
        self.c2pa = None
        self._init_c2pa()
    
    def _init_c2pa(self):
        """Initialize C2PA library if available"""
        try:
            import c2pa
            self.c2pa = c2pa
            self.c2pa_available = True
        except ImportError:
            pass
    
    def is_available(self) -> bool:
        """Check if C2PA library is available"""
        return self.c2pa_available
    
    def read_manifest(self, file_path: str) -> Optional[Dict]:
        """
        Read C2PA manifest from file
        
        Args:
            file_path: Path to file
            
        Returns:
            Manifest dictionary or None if not found
        """
        if not self.c2pa_available:
            return None
        
        try:
            reader = self.c2pa.Reader(file_path)
            manifest = reader.get_active_manifest()
            return manifest
        except Exception:
            return None
    
    def validate_signature(self, file_path: str) -> Tuple[bool, Optional[Dict]]:
        """
        Validate C2PA signature
        
        Args:
            file_path: Path to file
            
        Returns:
            Tuple of (is_valid, validation_info)
        """
        if not self.c2pa_available:
            return False, None
        
        try:
            reader = self.c2pa.Reader(file_path)
            validation = reader.validate()
            is_valid = validation.get("valid", False)
            return is_valid, validation
        except Exception:
            return False, None
