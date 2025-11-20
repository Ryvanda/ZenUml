from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
import logging

logger = logging.getLogger(__name__)


class UserRepository:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.users

    async def find_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Find user by email"""
        try:
            user = await self.collection.find_one({"email": email})
            return user
        except Exception as e:
            logger.error(f"Error finding user by email: {e}")
            raise

    async def create(self, email: str, name: str, picture: Optional[str] = None) -> Dict[str, Any]:
        """Create a new user"""
        try:
            user_data = {
                "email": email,
                "name": name,
                "picture": picture or "",
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }
            result = await self.collection.insert_one(user_data)
            user_data["_id"] = result.inserted_id
            return user_data
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise

    async def update(self, email: str, **kwargs) -> Optional[Dict[str, Any]]:
        """Update user information"""
        try:
            update_data = {**kwargs, "updated_at": datetime.now(timezone.utc).isoformat()}
            result = await self.collection.find_one_and_update(
                {"email": email},
                {"$set": update_data},
                return_document=True
            )
            return result
        except Exception as e:
            logger.error(f"Error updating user: {e}")
            raise


class RefreshTokenRepository:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.refresh_tokens

    async def create(self, email: str, token: str, expires_at: datetime) -> Dict[str, Any]:
        """Store refresh token"""
        try:
            token_data = {
                "email": email,
                "token": token,
                "expires_at": expires_at.isoformat(),
                "created_at": datetime.now(timezone.utc).isoformat(),
                "is_revoked": False,
            }
            result = await self.collection.insert_one(token_data)
            token_data["_id"] = result.inserted_id
            return token_data
        except Exception as e:
            logger.error(f"Error creating refresh token: {e}")
            raise

    async def find_by_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Find refresh token"""
        try:
            token_data = await self.collection.find_one({"token": token, "is_revoked": False})
            return token_data
        except Exception as e:
            logger.error(f"Error finding refresh token: {e}")
            raise

    async def revoke(self, token: str) -> bool:
        """Revoke a refresh token"""
        try:
            result = await self.collection.update_one(
                {"token": token},
                {"$set": {"is_revoked": True}}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error revoking refresh token: {e}")
            raise

    async def revoke_all_for_user(self, email: str) -> int:
        """Revoke all refresh tokens for a user"""
        try:
            result = await self.collection.update_many(
                {"email": email},
                {"$set": {"is_revoked": True}}
            )
            return result.modified_count
        except Exception as e:
            logger.error(f"Error revoking all tokens for user: {e}")
            raise


class StatusCheckRepository:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.status_checks

    async def create(self, client_name: str) -> Dict[str, Any]:
        """Create a status check record"""
        try:
            status_data = {
                "client_name": client_name,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
            result = await self.collection.insert_one(status_data)
            status_data["_id"] = result.inserted_id
            return status_data
        except Exception as e:
            logger.error(f"Error creating status check: {e}")
            raise

    async def find_all(self, limit: int = 1000) -> List[Dict[str, Any]]:
        """Get all status checks"""
        try:
            status_checks = await self.collection.find({}, {"_id": 0}).to_list(limit)
            return status_checks
        except Exception as e:
            logger.error(f"Error finding status checks: {e}")
            raise
