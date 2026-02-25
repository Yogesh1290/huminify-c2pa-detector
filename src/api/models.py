"""
API Request/Response Models
"""

from typing import Optional
from pydantic import BaseModel


class Base64Request(BaseModel):
    """Request model for base64-encoded file data"""
    fileData: str
    format: Optional[str] = "image/jpeg"


class URLRequest(BaseModel):
    """Request model for URL-based validation"""
    url: str
