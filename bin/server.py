#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
C2PA Verification API Server
=============================

Local FastAPI server for C2PA manifest validation using modular architecture.

Author: AI Content Detector Contributors
License: MIT
"""

import sys
import os

# Add parent directory to path so we can import src
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Fix Windows console encoding
if sys.platform == "win32":
    import codecs
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

try:
    import uvicorn
    import c2pa
except ImportError:
    print("Missing dependencies. Install with:")
    print("pip install fastapi uvicorn c2pa-python")
    sys.exit(1)

from src.api.server import create_app
from src.api.routes import setup_routes


def main():
    """Run the API server"""
    # Create app
    app = create_app()
    
    # Setup routes
    setup_routes(app)
    
    # Print startup info
    print("="*60)
    print("C2PA Verification API Server v2.0 (Modular)")
    print("="*60)
    print(f"\nSupported Platforms: {', '.join(app.state.platform_registry.get_all_platforms())}")
    print("\nStarting server at http://localhost:8000")
    print("\nEndpoints:")
    print("  - POST /validate/file    (upload file)")
    print("  - POST /validate/base64  (send base64 data)")
    print("  - POST /validate/url     (validate from URL)")
    print("  - GET  /platforms        (list platforms)")
    print("  - GET  /health           (health check)")
    print("\nAPI Docs: http://localhost:8000/docs")
    print("="*60 + "\n")
    
    # Run server
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")


if __name__ == "__main__":
    main()
