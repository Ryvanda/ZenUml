from fastapi import APIRouter
from ..core.branding import get_branding

router = APIRouter(prefix="/api/branding", tags=["branding"])

@router.get("/config")
async def get_branding_config():
    """Get branding configuration"""
    return get_branding()

@router.get("/colors")
async def get_colors():
    """Get color palette"""
    branding = get_branding()
    return {"colors": branding["colors"]}

@router.get("/links")
async def get_links():
    """Get important links"""
    branding = get_branding()
    return {"links": branding["links"]}

@router.get("/social")
async def get_social():
    """Get social media links"""
    branding = get_branding()
    return {"social": branding["social"]}
