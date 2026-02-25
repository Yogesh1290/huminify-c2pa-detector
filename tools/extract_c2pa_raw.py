#!/usr/bin/env python3
"""
Extract C2PA data even with invalid signatures
Uses raw JUMBF box reading
"""
import sys
import struct
from pathlib import Path

def find_jumbf_box(data):
    """Find JUMBF box in image data"""
    # Look for JUMBF signature
    jumbf_markers = [
        b'jumb',  # JUMBF box type
        b'c2pa',  # C2PA marker
        b'urn:c2pa',  # C2PA URN
    ]
    
    positions = []
    for marker in jumbf_markers:
        pos = data.find(marker)
        if pos != -1:
            positions.append((marker, pos))
    
    return positions

def extract_text_from_region(data, start, length=1000):
    """Extract readable text from binary data"""
    region = data[start:start+length]
    
    # Try to find JSON-like structures
    text_parts = []
    current = b''
    
    for byte in region:
        if 32 <= byte <= 126:  # Printable ASCII
            current += bytes([byte])
        else:
            if len(current) > 3:
                text_parts.append(current.decode('ascii', errors='ignore'))
            current = b''
    
    if len(current) > 3:
        text_parts.append(current.decode('ascii', errors='ignore'))
    
    return ' '.join(text_parts)

def main():
    if len(sys.argv) < 2:
        print("Usage: python extract_c2pa_raw.py <image_file>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    
    try:
        with open(file_path, 'rb') as f:
            data = f.read()
        
        print("="*70)
        print(f"RAW C2PA DATA EXTRACTION: {file_path}")
        print("="*70)
        
        positions = find_jumbf_box(data)
        
        if not positions:
            print("\n❌ No C2PA/JUMBF markers found in file")
            return
        
        print(f"\n✓ Found {len(positions)} C2PA markers:")
        
        for marker, pos in positions:
            print(f"\n📍 Marker: {marker.decode('ascii', errors='ignore')} at position {pos}")
            print("-" * 70)
            
            # Extract text around this position
            text = extract_text_from_region(data, max(0, pos-100), 2000)
            
            # Look for key fields
            keywords = ['Google', 'OpenAI', 'Adobe', 'Microsoft', 'ChatGPT', 
                       'Firefly', 'Designer', 'Gemini', 'claim_generator',
                       'software', 'issuer', 'creator', 'Media Processing']
            
            found_keywords = []
            for keyword in keywords:
                if keyword in text:
                    found_keywords.append(keyword)
            
            if found_keywords:
                print(f"🔍 Found keywords: {', '.join(found_keywords)}")
                print(f"\nContext (first 500 chars):")
                print(text[:500])
            else:
                print("No recognizable metadata found in this region")
        
        print("\n" + "="*70)
        print("Note: This is raw extraction. For full parsing, signature must be valid.")
        print("="*70)
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
