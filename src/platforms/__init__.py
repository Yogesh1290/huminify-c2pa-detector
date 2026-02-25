"""
Platform-specific C2PA extractors
Each company has its own module for easy maintenance
"""

from .openai import OpenAIExtractor
from .google import GoogleExtractor
from .adobe import AdobeExtractor
from .microsoft import MicrosoftExtractor
from .base import BasePlatformExtractor

__all__ = [
    'OpenAIExtractor',
    'GoogleExtractor',
    'AdobeExtractor',
    'MicrosoftExtractor',
    'BasePlatformExtractor'
]
