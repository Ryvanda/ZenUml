"""
Dependency injection for routes
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from motor.motor_asyncio import AsyncIOMotorDatabase
from db.repositories import UserRepository, RefreshTokenRepository, StatusCheckRepository
from services.auth_service import AuthService
from models.schemas import TokenData, TokenType
import logging

logger = logging.getLogger(__name__)

# Global database instance (will be set in main app)
_db_instance: AsyncIOMotorDatabase = None

security = HTTPBearer()


def set_db(db: AsyncIOMotorDatabase):
    """Set the global database instance"""
    global _db_instance
    _db_instance = db


def get_db() -> AsyncIOMotorDatabase:
    """Get database instance"""
    if _db_instance is None:
        raise RuntimeError("Database not initialized")
    return _db_instance


def get_user_repo(db: AsyncIOMotorDatabase = Depends(get_db)) -> UserRepository:
    """Get user repository"""
    return UserRepository(db)


def get_token_repo(db: AsyncIOMotorDatabase = Depends(get_db)) -> RefreshTokenRepository:
    """Get refresh token repository"""
    return RefreshTokenRepository(db)


def get_status_repo(db: AsyncIOMotorDatabase = Depends(get_db)) -> StatusCheckRepository:
    """Get status check repository"""
    return StatusCheckRepository(db)


def get_auth_service(
    user_repo: UserRepository = Depends(get_user_repo),
    token_repo: RefreshTokenRepository = Depends(get_token_repo)
) -> AuthService:
    """Get authentication service"""
    return AuthService(user_repo, token_repo)


async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security),
    auth_service: AuthService = Depends(get_auth_service),
    user_repo: UserRepository = Depends(get_user_repo)
) -> TokenData:
    """
    Get current authenticated user
    
    Args:
        credentials: Bearer token from request
        auth_service: Authentication service
        user_repo: User repository
    
    Returns:
        TokenData: Current user data
    
    Raises:
        HTTPException: If token is invalid or user not found
    """
    token = credentials.credentials
    
    # Verify token
    token_data = auth_service.verify_token(token, TokenType.ACCESS)
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    # Get user from database
    user = await user_repo.find_by_email(token_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    # Return user data
    token_data.name = user.get("name")
    token_data.picture = user.get("picture")
    
    return token_data
