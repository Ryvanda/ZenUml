from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

class LocaleMiddleware(BaseHTTPMiddleware):
    """Middleware to detect and set user locale"""
    
    async def dispatch(self, request: Request, call_next):
        # Get locale from header, query param, or cookie
        locale = (
            request.query_params.get('lang') or
            request.headers.get('Accept-Language', 'en').split(',')[0].split('-')[0] or
            request.cookies.get('ascend_locale', 'en')
        )
        
        request.state.locale = locale
        response = await call_next(request)
        response.set_cookie("ascend_locale", locale, max_age=31536000)
        return response
