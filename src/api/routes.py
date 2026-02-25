"""
API Route Handlers
"""

import os
import base64
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

from .models import Base64Request, URLRequest


def setup_routes(app: FastAPI):
    """
    Setup all API routes
    
    Args:
        app: FastAPI application instance
    """
    
    @app.get("/")
    async def root():
        """API root endpoint"""
        platform_registry = app.state.platform_registry
        return {
            "service": "C2PA Verification API",
            "version": "2.0.0",
            "architecture": "modular",
            "supported_platforms": platform_registry.get_all_platforms(),
            "endpoints": {
                "validate_file": "POST /validate/file",
                "validate_base64": "POST /validate/base64",
                "validate_url": "POST /validate/url",
                "platforms": "GET /platforms",
                "health": "GET /health"
            }
        }
    
    @app.get("/health")
    async def health():
        """Health check endpoint"""
        platform_registry = app.state.platform_registry
        return {
            "status": "healthy",
            "c2pa_available": True,
            "platforms": len(platform_registry.get_all_platforms())
        }
    
    @app.get("/platforms")
    async def list_platforms():
        """List all supported platforms"""
        platform_registry = app.state.platform_registry
        return {
            "platforms": platform_registry.get_all_platforms(),
            "count": len(platform_registry.get_all_platforms())
        }
    
    @app.post("/validate/file")
    async def validate_file(file: UploadFile = File(...)):
        """Validate C2PA manifest from uploaded file"""
        import c2pa
        
        platform_registry = app.state.platform_registry
        temp_path = None
        
        try:
            # Read file content
            content = await file.read()
            
            # Save temporarily
            temp_path = f"temp_{file.filename}"
            with open(temp_path, 'wb') as f:
                f.write(content)
            
            # Try to read C2PA manifest
            try:
                reader = c2pa.Reader(temp_path)
                manifest = reader.get_active_manifest()
            except Exception:
                manifest = None
            
            # Detect platform
            platform_name, extractor = platform_registry.detect_platform(manifest, content)
            
            if platform_name == "unknown":
                return JSONResponse({
                    "isValid": False,
                    "message": "No C2PA manifest or platform not recognized",
                    "aiDetected": None,
                    "signatureValid": False
                })
            
            # Extract metadata using platform extractor
            metadata = extractor.extract_metadata(manifest, content)
            
            # Check if AI-generated
            is_ai = extractor.is_ai_generated(metadata)
            
            # Validate signature
            signature_valid = False
            if manifest:
                try:
                    validation = reader.validate()
                    signature_valid = validation.get("valid", False)
                except:
                    pass
            
            return JSONResponse({
                "isValid": True,
                "platform": platform_name,
                "company": metadata.get("company", "Unknown"),
                "metadata": metadata,
                "aiDetected": is_ai,
                "signatureValid": signature_valid,
                "message": "AI-generated content detected" if is_ai else "Human-created content"
            })
                
        except Exception as e:
            import traceback
            error_detail = traceback.format_exc()
            print(f"ERROR in validate_file: {error_detail}")
            return JSONResponse(
                status_code=500,
                content={"error": str(e), "detail": error_detail}
            )
        finally:
            # Cleanup temp file
            if temp_path and os.path.exists(temp_path):
                try:
                    os.remove(temp_path)
                except:
                    pass
    
    @app.post("/validate/base64")
    async def validate_base64(request: Base64Request):
        """Validate C2PA manifest from base64-encoded file data"""
        import c2pa
        
        platform_registry = app.state.platform_registry
        
        try:
            # Decode base64
            file_data = base64.b64decode(request.fileData)
            
            # Save temporarily
            temp_path = "temp_base64_file"
            with open(temp_path, 'wb') as f:
                f.write(file_data)
            
            try:
                # Try to read C2PA manifest
                try:
                    reader = c2pa.Reader(temp_path)
                    manifest = reader.get_active_manifest()
                except Exception:
                    manifest = None
                
                # Detect platform
                platform_name, extractor = platform_registry.detect_platform(manifest, file_data)
                
                if platform_name == "unknown":
                    return JSONResponse({
                        "isValid": False,
                        "message": "No C2PA manifest or platform not recognized",
                        "aiDetected": None
                    })
                
                # Extract metadata
                metadata = extractor.extract_metadata(manifest, file_data)
                
                # Check if AI-generated
                is_ai = extractor.is_ai_generated(metadata)
                
                # Validate signature
                signature_valid = False
                if manifest:
                    try:
                        validation = reader.validate()
                        signature_valid = validation.get("valid", False)
                    except:
                        pass
                
                return JSONResponse({
                    "isValid": True,
                    "platform": platform_name,
                    "company": metadata.get("company", "Unknown"),
                    "metadata": metadata,
                    "aiDetected": is_ai,
                    "signatureValid": signature_valid
                })
                
            finally:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                    
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.post("/validate/url")
    async def validate_url(request: URLRequest):
        """Validate C2PA manifest from URL"""
        import c2pa
        import requests
        
        platform_registry = app.state.platform_registry
        
        try:
            # Fetch file from URL
            response = requests.get(request.url, timeout=30)
            response.raise_for_status()
            
            file_data = response.content
            
            # Save temporarily
            temp_path = "temp_url_file"
            with open(temp_path, 'wb') as f:
                f.write(file_data)
            
            try:
                # Try to read C2PA manifest
                try:
                    reader = c2pa.Reader(temp_path)
                    manifest = reader.get_active_manifest()
                except Exception:
                    manifest = None
                
                # Detect platform
                platform_name, extractor = platform_registry.detect_platform(manifest, file_data)
                
                if platform_name == "unknown":
                    return JSONResponse({
                        "isValid": False,
                        "message": "No C2PA manifest or platform not recognized",
                        "aiDetected": None
                    })
                
                # Extract metadata
                metadata = extractor.extract_metadata(manifest, file_data)
                
                # Check if AI-generated
                is_ai = extractor.is_ai_generated(metadata)
                
                return JSONResponse({
                    "isValid": True,
                    "platform": platform_name,
                    "company": metadata.get("company", "Unknown"),
                    "metadata": metadata,
                    "aiDetected": is_ai,
                    "url": request.url
                })
                
            finally:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
                    
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
