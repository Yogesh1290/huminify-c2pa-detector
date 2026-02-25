#!/usr/bin/env python3
"""
Setup Verification Script
Checks if all dependencies are installed correctly
"""

import sys
import importlib

def check_module(module_name, package_name=None):
    """Check if a Python module is installed"""
    try:
        importlib.import_module(module_name)
        print(f"✓ {package_name or module_name}")
        return True
    except ImportError:
        print(f"✗ {package_name or module_name} - NOT INSTALLED")
        return False

def main():
    print("="*60)
    print("AI Content Detector - Setup Verification")
    print("="*60)
    print()
    
    print("Checking Python version...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"✓ Python {version.major}.{version.minor}.{version.micro}")
    else:
        print(f"✗ Python {version.major}.{version.minor}.{version.micro} - Need 3.8+")
        return False
    
    print("\nChecking required packages...")
    
    required = [
        ("fastapi", "fastapi"),
        ("uvicorn", "uvicorn"),
        ("c2pa", "c2pa-python"),
        ("transformers", "transformers"),
        ("torch", "torch"),
        ("PIL", "Pillow"),
        ("requests", "requests"),
        ("pydantic", "pydantic"),
    ]
    
    all_installed = True
    for module, package in required:
        if not check_module(module, package):
            all_installed = False
    
    print()
    print("="*60)
    
    if all_installed:
        print("✅ All dependencies installed correctly!")
        print()
        print("Next steps:")
        print("1. Start API server: start_api_server.bat")
        print("2. Test detection: run.bat examples\\ChatGPT_Image.png")
    else:
        print("❌ Some dependencies are missing!")
        print()
        print("To fix:")
        print("1. Activate venv: venv\\Scripts\\activate")
        print("2. Install: pip install -r requirements.txt")
    
    print("="*60)
    
    return all_installed

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
