from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum


class TokenType(str, Enum):
    ACCESS = "access"
    REFRESH = "refresh"


class TokenData(BaseModel):
    email: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None
    token_type: TokenType = TokenType.ACCESS


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class UserCreate(BaseModel):
    email: EmailStr
    name: str
    picture: Optional[str] = None

    @validator('name')
    def name_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()


class UserResponse(BaseModel):
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime


class GoogleAuthCallbackRequest(BaseModel):
    code: str

    @validator('code')
    def code_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Authorization code is required')
        return v.strip()


class RefreshTokenRequest(BaseModel):
    refresh_token: str

    @validator('refresh_token')
    def token_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Refresh token is required')
        return v.strip()


class StatusCheckCreate(BaseModel):
    client_name: str

    @validator('client_name')
    def client_name_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Client name cannot be empty')
        return v.strip()


class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(__import__('uuid').uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(__import__('timezone').utc))

    class Config:
        extra = "ignore"
