"""
Authentication routes for Google OAuth and token management
"""
import logging
from fastapi import APIRouter, Depends, HTTPException, status
from models.schemas import (
    TokenResponse, UserResponse, GoogleAuthCallbackRequest,
    RefreshTokenRequest
)
from services.auth_service import AuthService
from db.repositories import UserRepository, RefreshTokenRepository
from core.dependencies import get_auth_service, get_current_user
from core.config import get_google_auth_url

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.get("/google")
async def login_google():
    """
    Get Google OAuth login URL
    
    Returns:
        dict: Contains the Google OAuth authorization URL
    """
    try:
        auth_url = get_google_auth_url()
        return {"url": auth_url}
    except Exception as e:
        logger.error(f"Error generating Google auth URL: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate authentication URL"
        )


@router.post("/google/callback", response_model=TokenResponse)
async def auth_google_callback(
    request: GoogleAuthCallbackRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    """
    Handle Google OAuth callback
    
    Args:
        request: Contains the authorization code from Google
        auth_service: Authentication service
    
    Returns:
        TokenResponse: Contains access token, refresh token, and user info
    """
    try:
        result = await auth_service.handle_google_callback(request.code)
        
        if not result:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Failed to authenticate with Google"
            )
        
        return TokenResponse(
            access_token=result["access_token"],
            refresh_token=result["refresh_token"],
            token_type=result["token_type"],
            expires_in=30 * 60  # 30 minutes in seconds
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in Google callback: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Authentication failed"
        )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    request: RefreshTokenRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    """
    Refresh access token using refresh token
    
    Args:
        request: Contains the refresh token
        auth_service: Authentication service
    
    Returns:
        TokenResponse: Contains new access token
    """
    try:
        new_access_token = await auth_service.refresh_access_token(request.refresh_token)
        
        if not new_access_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token"
            )
        
        return TokenResponse(
            access_token=new_access_token,
            refresh_token=request.refresh_token,
            token_type="bearer",
            expires_in=30 * 60
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error refreshing token: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token refresh failed"
        )


@router.post("/logout")
async def logout(current_user = Depends(get_current_user), auth_service: AuthService = Depends(get_auth_service)):
    """
    Logout user by revoking all refresh tokens
    
    Args:
        current_user: Current authenticated user
        auth_service: Authentication service
    
    Returns:
        dict: Success message
    """
    try:
        success = await auth_service.logout(current_user.email)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Logout failed"
            )
        
        return {"message": "Successfully logged out"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error logging out: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Logout failed"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user = Depends(get_current_user)):
    """
    Get current user information
    
    Args:
        current_user: Current authenticated user
    
    Returns:
        UserResponse: Current user information
    """
    return current_user
