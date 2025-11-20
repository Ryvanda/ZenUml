from enum import Enum

class ErrorCode(str, Enum):
    """Centralized error codes for all backend errors"""
    
    # Auth errors (AUTH_XXX)
    AUTH_INVALID_CREDENTIALS = "AUTH_001"
    AUTH_SESSION_EXPIRED = "AUTH_002"
    AUTH_INVALID_TOKEN = "AUTH_003"
    AUTH_REFRESH_FAILED = "AUTH_004"
    AUTH_UNAUTHORIZED = "AUTH_005"
    
    # Validation errors (VAL_XXX)
    VAL_INVALID_EMAIL = "VAL_001"
    VAL_INVALID_PASSWORD = "VAL_002"
    VAL_MISSING_FIELD = "VAL_003"
    VAL_INVALID_FORMAT = "VAL_004"
    VAL_DUPLICATE_ENTRY = "VAL_005"
    
    # Resource errors (RES_XXX)
    RES_NOT_FOUND = "RES_001"
    RES_ALREADY_EXISTS = "RES_002"
    RES_PERMISSION_DENIED = "RES_003"
    RES_CONFLICT = "RES_004"
    RES_DELETED = "RES_005"
    
    # Server errors (SRV_XXX)
    SRV_INTERNAL_ERROR = "SRV_001"
    SRV_DATABASE_ERROR = "SRV_002"
    SRV_EXTERNAL_SERVICE_ERROR = "SRV_003"
    SRV_TIMEOUT = "SRV_004"
    SRV_RATE_LIMITED = "SRV_005"
