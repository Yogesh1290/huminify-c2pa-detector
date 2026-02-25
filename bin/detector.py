#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI Content Detector with C2PA Verification
===========================================

A comprehensive 3-layer AI content detection system using modular architecture.

Author: AI Content Detector Contributors
License: MIT
Repository: https://github.com/yourusername/ai-content-detector
"""

import sys
import os

# Add parent directory to path so we can import src
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Fix Windows console encoding
if sys.platform == "win32":
    import codecs
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

from src.core.detector import AIContentDetector
from src.utils.console import print_result, print_initialization_status


def main():
    """CLI interface"""
    if len(sys.argv) < 2:
        print("Usage: python ai_content_detector.py <file_path>")
        print("\nExample:")
        print("  python ai_content_detector.py examples/ChatGPT_Image.png")
        sys.exit(1)
    
    file_path = sys.argv[1]
    
    print("Initializing AI Content Detector...")
    detector = AIContentDetector()
    
    # Print initialization status
    print_initialization_status(
        detector.c2pa_reader.is_available(),
        detector.image_detector.is_available()
    )
    
    print(f"\nAnalyzing: {file_path}")
    result = detector.analyze_file(file_path)
    print_result(result)


if __name__ == "__main__":
    main()
