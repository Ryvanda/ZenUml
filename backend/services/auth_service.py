import os
import logging
from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple
import httpx
from jose import JWTError, jwt
from db.repositories import UserRepository, RefreshTokenRepository
from models.schemas import TokenData, TokenType

logger = logging.getLogger(__name__)

# JWT settings
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7


class AuthService:
    def __init__(self, user_repo: UserRepository, token_repo: RefreshTokenRepository):
        self.user_repo = user_repo
        self.token_repo = token_repo

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """Create JWT access token"""
        try:
            to_encode = data.copy()
            if expires_delta:
                expire = datetime.now(timezone.utc) + expires_delta
            else:
                expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            
            to_encode.update({"exp": expire, "type": TokenType.ACCESS.value})
            encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
            return encoded_jwt
        except Exception as e:
            logger.error(f"Error creating access token: {e}")
            raise

    def create_refresh_token(self, data: dict) -> str:
        """Create JWT refresh token"""
        try:
            to_encode = data.copy()
            expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
            to_encode.update({"exp": expire, "type": TokenType.REFRESH.value})
            encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
            return encoded_jwt
        except Exception as e:
            logger.error(f"Error creating refresh token: {e}")
            raise

    async def create_tokens(self, email: str) -> Tuple[str, str]:
        """Create both access and refresh tokens"""
        try:
            access_token = self.create_access_token({"sub": email})
            refresh_token = self.create_refresh_token({"sub": email})
            
            # Store refresh token in database
            expires_at = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
            await self.token_repo.create(email, refresh_token, expires_at)
            
            return access_token, refresh_token
        except Exception as e:
            logger.error(f"Error creating tokens: {e}")
            raise

    def verify_token(self, token: str, token_type: TokenType = TokenType.ACCESS) -> Optional[TokenData]:
        """Verify JWT token"""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            email: str = payload.get("sub")
            token_type_claim: str = payload.get("type")
            
            if email is None or token_type_claim != token_type.value:
                return None
            
            return TokenData(email=email, token_type=TokenType(token_type_claim))
        except JWTError as e:
            logger.error(f"Error verifying token: {e}")
            return None

    async def refresh_access_token(self, refresh_token: str) -> Optional[str]:
        """Generate new access token from refresh token"""
        try:
            # Verify refresh token
            token_data = self.verify_token(refresh_token, TokenType.REFRESH)
            if not token_data:
                return None
            
            # Check if token is in database and not revoked
            token_record = await self.token_repo.find_by_token(refresh_token)
            if not token_record:
                return None
            
            # Create new access token
            new_access_token = self.create_access_token({"sub": token_data.email})
            return new_access_token
        except Exception as e:
            logger.error(f"Error refreshing access token: {e}")
            return None

    async def handle_google_callback(self, code: str) -> Optional[dict]:
        """Handle Google OAuth callback"""
        try:
            token_url = "https://oauth2.googleapis.com/token"
            
            async with httpx.AsyncClient() as client:
                # Exchange authorization code for tokens
                token_response = await client.post(
                    token_url,
                    data={
                        'code': code,
                        'client_id': os.getenv('GOOGLE_CLIENT_ID'),
                        'client_secret': os.getenv('GOOGLE_CLIENT_SECRET'),
                        'redirect_uri': os.getenv('GOOGLE_REDIRECT_URI'),
                        'grant_type': 'authorization_code',
                    },
                    headers={"Content-Type": "application/x-www-form-urlencoded"}
                )
                
                if token_response.status_code != 200:
                    logger.error(f"Google token exchange failed: {token_response.text}")
                    return None
                
                tokens = token_response.json()
                
                # Get user info
                userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
                userinfo_response = await client.get(
                    userinfo_url,
                    headers={"Authorization": f"Bearer {tokens['access_token']}"}
                )
                
                if userinfo_response.status_code != 200:
                    logger.error(f"Failed to get user info: {userinfo_response.text}")
                    return None
                
                user_info = userinfo_response.json()
                
                # Create or update user
                user = await self.user_repo.find_by_email(user_info["email"])
                if not user:
                    user = await self.user_repo.create(
                        email=user_info["email"],
                        name=user_info.get("name", ""),
                        picture=user_info.get("picture", "")
                    )
                else:
                    # Update user info if changed
                    user = await self.user_repo.update(
                        email=user_info["email"],
                        name=user_info.get("name", ""),
                        picture=user_info.get("picture", "")
                    )
                
                # Create tokens
                access_token, refresh_token = await self.create_tokens(user_info["email"])
                
                return {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "token_type": "bearer",
                    "user": {
                        "email": user_info["email"],
                        "name": user_info.get("name", ""),
                        "picture": user_info.get("picture", "")
                    }
                }
        except Exception as e:
            logger.error(f"Error handling Google callback: {e}")
            return None

    async def logout(self, email: str) -> bool:
        """Logout user by revoking all refresh tokens"""
        try:
            await self.token_repo.revoke_all_for_user(email)
            return True
        except Exception as e:
            logger.error(f"Error logging out user: {e}")
            return False
