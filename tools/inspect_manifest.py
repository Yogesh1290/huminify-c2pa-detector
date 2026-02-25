#!/usr/bin/env python3
"""
Debug script to inspect full C2PA manifest structure
"""
import sys
import json
import c2pa

if len(sys.argv) < 2:
    print("Usage: python inspect_manifest.py <image_file>")
    sys.exit(1)

file_path = sys.argv[1]

try:
    reader = c2pa.Reader(file_path)
    manifest = reader.get_active_manifest()
    
    if not manifest:
        print("No manifest found")
        sys.exit(1)
    
    print("="*80)
    print("FULL C2PA MANIFEST STRUCTURE")
    print("="*80)
    print(json.dumps(manifest, indent=2, default=str))
    print("="*80)
    
    # Also try to get validation info
    print("\nVALIDATION INFO:")
    try:
        validation = reader.validate()
        print(json.dumps(validation, indent=2, default=str))
    except Exception as e:
        print(f"Validation error: {e}")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
