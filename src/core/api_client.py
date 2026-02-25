"""
API Client Module
Handles communication with C2PA API server
"""

from typing import Dict, Tuple
from pathlib import Path


class APIClient:
    """Client for C2PA API server communication"""
    
    def __init__(self, endpoint: str = "http://localhost:8000"):
        self.endpoint = endpoint
    
    def check_manifest(self, file_path: str) -> Tuple[str, Dict]:
        """
        Check C2PA manifest via API server
        
        Args:
            file_path: Path to file
            
        Returns:
            Tuple of (status, result_dict)
        """
        try:
            import requests
            
            url = f"{self.endpoint}/validate/file"
            
            with open(file_path, 'rb') as f:
                files = {'file': (Path(file_path).name, f, 'application/octet-stream')}
                response = requests.post(url, files=files, timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                
                if result.get('isValid'):
                    return "api_success", result
                else:
                    return "no_manifest_api", {"message": result.get('message', 'No manifest')}
            else:
                return "api_error", {"status_code": response.status_code}
                
        except Exception as e:
            if "ConnectionError" in str(type(e).__name__):
                return "api_unavailable", {}
            return "api_error", {"error": str(e)}
