"""
Console Output Utilities
Pretty printing for analysis results
"""

from typing import Dict


def print_result(result: Dict):
    """
    Pretty print analysis results
    
    Args:
        result: Analysis result dictionary
    """
    print("\n" + "="*60)
    print(f"FILE: {result['file']}")
    print("="*60)
    
    if not result["exists"]:
        print("❌ File not found")
        return
    
    # Check if it's a video file
    file_ext = result['file'].split('.')[-1].lower() if '.' in result['file'] else ''
    is_video = file_ext in ['mp4', 'mov', 'avi', 'webm', 'mkv', 'flv', 'wmv']
    
    if is_video and result['final_verdict'] == 'NO_C2PA_FOUND':
        print("\n📹 Video File Detected")
        print("   C2PA detection only (no AI fallback for videos)")
        print("\n❌ No C2PA metadata found")
        print("   This video does not contain C2PA credentials")
        print("\n🎯 VERDICT: NO_C2PA_FOUND")
        print("   Note: Video AI detection is not available")
        print("="*60 + "\n")
        return
    
    # API status
    if result.get("api_status") and result["api_status"] != "api_unavailable":
        print(f"\n🌐 C2PA API: {result['api_status']}")
        if result["api_info"]:
            info = result["api_info"]
            
            # Show AI detection status
            if info.get("aiDetected"):
                print("   🤖 AI GENERATION DETECTED!")
            
            # Show platform and company
            if info.get("platform"):
                print(f"   Platform: {info['platform'].title()}")
            if info.get("company"):
                print(f"   Company: {info['company']}")
            
            # Show metadata details
            if info.get("metadata"):
                metadata = info["metadata"]
                
                # Show detected markers
                if metadata.get("detected_markers"):
                    markers = metadata["detected_markers"][:5]
                    print(f"   🔍 Detected: {', '.join(markers)}")
                
                # Show software/generator
                if metadata.get("software"):
                    print(f"   Software: {metadata['software']}")
                if metadata.get("generator"):
                    print(f"   Generator: {metadata['generator']}")
                
                # Show organization
                if metadata.get("organization"):
                    print(f"   Organization: {metadata['organization']}")
                
                # Show certificate
                if metadata.get("certificate"):
                    print(f"   Certificate: {metadata['certificate']}")
                
                # Show creator/author
                if metadata.get("creator"):
                    print(f"   Creator: {metadata['creator']}")
                if metadata.get("author"):
                    print(f"   Author: {metadata['author']}")
            
            # Show signature status
            if "signatureValid" in info:
                if info["signatureValid"]:
                    print("   Signature: ✓ Valid")
                else:
                    print("   Signature: ✗ Invalid/Expired")
            
            # Show message
            if info.get("message"):
                print(f"   Message: {info['message']}")
    
    # C2PA embedded status
    print(f"\n📋 C2PA Embedded: {result['c2pa_status']}")
    if result["c2pa_info"]:
        info = result["c2pa_info"]
        if info.get("platform"):
            print(f"   Platform: {info['platform'].title()}")
        if info.get("company"):
            print(f"   Company: {info['company']}")
        if info.get("metadata"):
            metadata = info["metadata"]
            if metadata.get("detected_markers"):
                print(f"   🔍 Detected: {', '.join(metadata['detected_markers'][:5])}")
        if info.get("ai_generated"):
            print(f"   🤖 AI GENERATION DETECTED!")
    
    # AI detection
    if result["detection_status"]:
        print(f"\n🔍 AI Detection: {result['detection_status']}")
        if result["detection_score"] > 0:
            # Score is always AI probability
            ai_pct = result['detection_score'] * 100
            human_pct = 100 - ai_pct
            print(f"   AI: {ai_pct:.1f}% | Human: {human_pct:.1f}%")
    
    print(f"\n🎯 VERDICT: {result['final_verdict']}")
    print(f"   Confidence: {result['confidence']}")
    print("="*60 + "\n")


def print_initialization_status(c2pa_available: bool, detector_available: bool):
    """
    Print initialization status
    
    Args:
        c2pa_available: Whether C2PA library is available
        detector_available: Whether image detector is available
    """
    if c2pa_available:
        print("✓ C2PA library loaded")
    else:
        print("⚠ C2PA library not found. Install: pip install c2pa-python")
    
    if detector_available:
        print("✓ Image AI detector loaded")
    else:
        print("⚠ Image detector not found. Install: pip install transformers torch pillow timm")
