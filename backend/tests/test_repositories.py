"""
Unit tests for database repositories
"""
import pytest
from datetime import datetime, timedelta, timezone
from unittest.mock import AsyncMock, MagicMock
from db.repositories import UserRepository, RefreshTokenRepository, StatusCheckRepository


@pytest.fixture
def mock_db():
    """Mock database"""
    return MagicMock()


@pytest.fixture
def user_repo(mock_db):
    """Create user repository with mocked database"""
    return UserRepository(mock_db)


@pytest.fixture
def token_repo(mock_db):
    """Create token repository with mocked database"""
    return RefreshTokenRepository(mock_db)


@pytest.fixture
def status_repo(mock_db):
    """Create status repository with mocked database"""
    return StatusCheckRepository(mock_db)


class TestUserRepository:
    """Test cases for UserRepository"""
    
    @pytest.mark.asyncio
    async def test_find_by_email(self, user_repo, mock_db):
        """Test finding user by email"""
        mock_collection = AsyncMock()
        mock_collection.find_one.return_value = {
            "email": "test@example.com",
            "name": "Test User"
        }
        mock_db.users = mock_collection
        
        user = await user_repo.find_by_email("test@example.com")
        
        assert user is not None
        assert user["email"] == "test@example.com"
        mock_collection.find_one.assert_called_once_with({"email": "test@example.com"})
    
    @pytest.mark.asyncio
    async def test_find_by_email_not_found(self, user_repo, mock_db):
        """Test finding non-existent user"""
        mock_collection = AsyncMock()
        mock_collection.find_one.return_value = None
        mock_db.users = mock_collection
        
        user = await user_repo.find_by_email("nonexistent@example.com")
        
        assert user is None
    
    @pytest.mark.asyncio
    async def test_create_user(self, user_repo, mock_db):
        """Test creating a new user"""
        mock_collection = AsyncMock()
        mock_collection.insert_one.return_value = MagicMock(inserted_id="user_id")
        mock_db.users = mock_collection
        
        user = await user_repo.create(
            email="test@example.com",
            name="Test User",
            picture="http://example.com/pic.jpg"
        )
        
        assert user is not None
        assert user["email"] == "test@example.com"
        assert user["name"] == "Test User"
        mock_collection.insert_one.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_update_user(self, user_repo, mock_db):
        """Test updating user information"""
        mock_collection = AsyncMock()
        mock_collection.find_one_and_update.return_value = {
            "email": "test@example.com",
            "name": "Updated Name"
        }
        mock_db.users = mock_collection
        
        user = await user_repo.update(
            email="test@example.com",
            name="Updated Name"
        )
        
        assert user is not None
        assert user["name"] == "Updated Name"
        mock_collection.find_one_and_update.assert_called_once()


class TestRefreshTokenRepository:
    """Test cases for RefreshTokenRepository"""
    
    @pytest.mark.asyncio
    async def test_create_token(self, token_repo, mock_db):
        """Test creating refresh token"""
        mock_collection = AsyncMock()
        mock_collection.insert_one.return_value = MagicMock(inserted_id="token_id")
        mock_db.refresh_tokens = mock_collection
        
        expires_at = datetime.now(timezone.utc) + timedelta(days=7)
        token = await token_repo.create(
            email="test@example.com",
            token="refresh_token_value",
            expires_at=expires_at
        )
        
        assert token is not None
        assert token["email"] == "test@example.com"
        mock_collection.insert_one.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_find_by_token(self, token_repo, mock_db):
        """Test finding token by value"""
        mock_collection = AsyncMock()
        mock_collection.find_one.return_value = {
            "token": "refresh_token_value",
            "email": "test@example.com"
        }
        mock_db.refresh_tokens = mock_collection
        
        token = await token_repo.find_by_token("refresh_token_value")
        
        assert token is not None
        assert token["token"] == "refresh_token_value"
    
    @pytest.mark.asyncio
    async def test_revoke_token(self, token_repo, mock_db):
        """Test revoking a token"""
        mock_collection = AsyncMock()
        mock_collection.update_one.return_value = MagicMock(modified_count=1)
        mock_db.refresh_tokens = mock_collection
        
        result = await token_repo.revoke("refresh_token_value")
        
        assert result is True
        mock_collection.update_one.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_revoke_all_for_user(self, token_repo, mock_db):
        """Test revoking all tokens for a user"""
        mock_collection = AsyncMock()
        mock_collection.update_many.return_value = MagicMock(modified_count=3)
        mock_db.refresh_tokens = mock_collection
        
        count = await token_repo.revoke_all_for_user("test@example.com")
        
        assert count == 3
        mock_collection.update_many.assert_called_once()


class TestStatusCheckRepository:
    """Test cases for StatusCheckRepository"""
    
    @pytest.mark.asyncio
    async def test_create_status_check(self, status_repo, mock_db):
        """Test creating status check"""
        mock_collection = AsyncMock()
        mock_collection.insert_one.return_value = MagicMock(inserted_id="check_id")
        mock_db.status_checks = mock_collection
        
        check = await status_repo.create("test_client")
        
        assert check is not None
        assert check["client_name"] == "test_client"
        mock_collection.insert_one.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_find_all_status_checks(self, status_repo, mock_db):
        """Test finding all status checks"""
        mock_collection = AsyncMock()
        mock_cursor = AsyncMock()
        mock_cursor.to_list.return_value = [
            {"client_name": "client1", "timestamp": "2024-01-01T00:00:00"},
            {"client_name": "client2", "timestamp": "2024-01-02T00:00:00"}
        ]
        mock_collection.find.return_value = mock_cursor
        mock_db.status_checks = mock_collection
        
        checks = await status_repo.find_all()
        
        assert len(checks) == 2
        assert checks[0]["client_name"] == "client1"
