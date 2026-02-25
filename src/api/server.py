"""
FastAPI Server Initialization
"""

from fastapi import FastAPI
from ..platforms.registry import PlatformRegistry


def create_app() -> FastAPI:
    """
    Create and configure FastAPI application
    
    Returns:
        Configured FastAPI app instance
    """
    app = FastAPI(
        title="C2PA Verification API",
        description="Local API for C2PA manifest validation with platform detection",
        version="2.0.0"
    )
    
    # Initialize platform registry
    app.state.platform_registry = PlatformRegistry()
    
    return app
