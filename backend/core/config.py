"""
Configuration and utility functions
"""
import os
from urllib.parse import urlencode


def get_google_auth_url() -> str:
    """Generate Google OAuth authorization URL"""
    params = {
        'client_id': os.getenv('GOOGLE_CLIENT_ID'),
        'redirect_uri': os.getenv('GOOGLE_REDIRECT_URI'),
        'response_type': 'code',
        'scope': 'openid email profile',
        'access_type': 'offline',
        'prompt': 'consent',
    }
    return f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"


def get_database_url() -> str:
    """Get MongoDB connection URL"""
    return os.environ.get('MONGO_URL', 'mongodb://localhost:27017')


def get_database_name() -> str:
    """Get database name"""
    return os.environ.get('DB_NAME', 'zenuml')


def get_cors_origins() -> list:
    """Get CORS allowed origins"""
    origins = os.environ.get('CORS_ORIGINS', '*')
    return origins.split(',') if origins != '*' else ['*']
