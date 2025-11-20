from fastapi import APIRouter, Depends, HTTPException
from ..i18n.translator import Translator
from ..i18n.locale_config import SUPPORTED_LOCALES
from ..core.dependencies import get_current_user

router = APIRouter(prefix="/api/i18n", tags=["i18n"])

@router.post("/language")
async def set_user_language(
    language: str,
    current_user = Depends(get_current_user)
):
    """Set user's preferred language"""
    if language not in SUPPORTED_LOCALES:
        raise HTTPException(status_code=400, detail="Unsupported language")
    
    return {"language": language}

@router.get("/language")
async def get_user_language(current_user = Depends(get_current_user)):
    """Get user's preferred language"""
    return {"language": current_user.get("language", "en")}

@router.get("/supported-languages")
async def get_supported_languages():
    """Get list of supported languages"""
    return {"languages": SUPPORTED_LOCALES}
