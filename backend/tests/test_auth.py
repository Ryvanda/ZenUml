"""
Unit tests for authentication service
"""
import pytest
from datetime import datetime, timedelta, timezone
from unittest.mock import AsyncMock, MagicMock, patch
from services.auth_service import AuthService
from models.schemas import TokenType, TokenData
from db.repositories import UserRepository, RefreshTokenRepository


@pytest.fixture
def mock_user_repo():
    """Mock user repository"""
    return AsyncMock(spec=UserRepository)


@pytest.fixture
def mock_token_repo():
    """Mock token repository"""
    return AsyncMock(spec=RefreshTokenRepository)


@pytest.fixture
def auth_service(mock_user_repo, mock_token_repo):
    """Create auth service with mocked repositories"""
    return AuthService(mock_user_repo, mock_token_repo)


class TestAuthService:
    """Test cases for AuthService"""
    
    def test_create_access_token(self, auth_service):
        """Test access token creation"""
        token = auth_service.create_access_token({"sub": "test@example.com"})
        assert token is not None
        assert isinstance(token, str)
    
    def test_create_refresh_token(self, auth_service):
        """Test refresh token creation"""
        token = auth_service.create_refresh_token({"sub": "test@example.com"})
        assert token is not None
        assert isinstance(token, str)
    
    def test_verify_access_token(self, auth_service):
        """Test access token verification"""
        # Create token
        token = auth_service.create_access_token({"sub": "test@example.com"})
        
        # Verify token
        token_data = auth_service.verify_token(token, TokenType.ACCESS)
        assert token_data is not None
        assert token_data.email == "test@example.com"
        assert token_data.token_type == TokenType.ACCESS
    
    def test_verify_invalid_token(self, auth_service):
        """Test verification of invalid token"""
        token_data = auth_service.verify_token("invalid_token", TokenType.ACCESS)
        assert token_data is None
    
    def test_verify_refresh_token(self, auth_service):
        """Test refresh token verification"""
        # Create refresh token
        token = auth_service.create_refresh_token({"sub": "test@example.com"})
        
        # Verify token
        token_data = auth_service.verify_token(token, TokenType.REFRESH)
        assert token_data is not None
        assert token_data.email == "test@example.com"
        assert token_data.token_type == TokenType.REFRESH
    
    @pytest.mark.asyncio
    async def test_create_tokens(self, auth_service, mock_token_repo):
        """Test creating both access and refresh tokens"""
        mock_token_repo.create.return_value = {"token": "refresh_token"}
        
        access_token, refresh_token = await auth_service.create_tokens("test@example.com")
        
        assert access_token is not None
        assert refresh_token is not None
        mock_token_repo.create.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_refresh_access_token(self, auth_service, mock_token_repo):
        """Test refreshing access token"""
        # Create refresh token
        refresh_token = auth_service.create_refresh_token({"sub": "test@example.com"})
        
        # Mock token repository
        mock_token_repo.find_by_token.return_value = {"token": refresh_token}
        
        # Refresh token
        new_access_token = await auth_service.refresh_access_token(refresh_token)
        
        assert new_access_token is not None
        assert isinstance(new_access_token, str)
    
    @pytest.mark.asyncio
    async def test_refresh_invalid_token(self, auth_service, mock_token_repo):
        """Test refreshing with invalid token"""
        mock_token_repo.find_by_token.return_value = None
        
        result = await auth_service.refresh_access_token("invalid_token")
        
        assert result is None
    
    @pytest.mark.asyncio
    async def test_logout(self, auth_service, mock_token_repo):
        """Test logout functionality"""
        mock_token_repo.revoke_all_for_user.return_value = 2
        
        result = await auth_service.logout("test@example.com")
        
        assert result is True
        mock_token_repo.revoke_all_for_user.assert_called_once_with("test@example.com")
