import logging
from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from jose import JWTError

logger = logging.getLogger(__name__)


class ErrorResponse:
    def __init__(self, status_code: int, detail: str, error_type: str = None):
        self.status_code = status_code
        self.detail = detail
        self.error_type = error_type or "error"


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    logger.warning(f"Validation error on {request.url}: {exc.errors()}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": "Validation error",
            "errors": exc.errors()
        }
    )


async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions"""
    logger.error(f"Unexpected error on {request.url}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": "Internal server error",
            "error_type": "internal_error"
        }
    )


async def jwt_exception_handler(request: Request, exc: JWTError):
    """Handle JWT errors"""
    logger.warning(f"JWT error on {request.url}: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content={
            "detail": "Invalid or expired token",
            "error_type": "jwt_error"
        },
        headers={"WWW-Authenticate": "Bearer"}
    )
