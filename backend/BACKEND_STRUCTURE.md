# ZenUML Backend - Refactored Structure

## Overview

The backend has been refactored from a monolithic `server.py` to a modular, scalable architecture following best practices for FastAPI applications.

## Directory Structure

```
backend/
├── core/
│   ├── config.py           # Configuration and utility functions
│   └── dependencies.py     # Dependency injection setup
├── db/
│   └── repositories.py     # Database access layer (DAOs)
├── middleware/
│   ├── error_handler.py    # Global error handling
│   └── logging_middleware.py # Request/response logging
├── models/
│   └── schemas.py          # Pydantic models and validators
├── routes/
│   ├── auth.py            # Authentication endpoints
│   ├── status.py          # Status check endpoints
│   └── health.py          # Health check endpoints
├── services/
│   └── auth_service.py    # Business logic for authentication
├── tests/
│   ├── conftest.py        # Pytest configuration
│   ├── test_auth.py       # Auth service tests
│   └── test_repositories.py # Repository tests
├── server_new.py          # Main application (refactored)
├── auth.py                # Legacy auth module (keep for reference)
├── server.py              # Legacy server (keep for reference)
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables
```

## Key Improvements

### 1. **Separation of Concerns**
- **Routes**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Repositories**: Handle database operations
- **Models**: Define data structures with validation
- **Middleware**: Cross-cutting concerns (logging, error handling)

### 2. **Input Validation**
All Pydantic models include validators:
- `GoogleAuthCallbackRequest`: Validates authorization code
- `RefreshTokenRequest`: Validates refresh token
- `StatusCheckCreate`: Validates client name
- `UserCreate`: Validates email and name

### 3. **Error Handling**
- Global exception handlers for validation errors
- JWT error handling with proper HTTP status codes
- Comprehensive logging for debugging

### 4. **Refresh Token Implementation**
- Separate refresh token endpoint: `POST /api/auth/refresh`
- Tokens stored in MongoDB with expiration
- Token revocation on logout
- Automatic token validation

### 5. **Dependency Injection**
- Clean dependency management using FastAPI's `Depends`
- Repositories injected into services
- Services injected into routes
- Database instance managed globally

### 6. **Logging**
- Request/response logging middleware
- Structured logging with timestamps
- Error tracking with full stack traces

### 7. **Testing**
- Unit tests for auth service
- Repository tests with mocked database
- Async test support with pytest-asyncio

## API Endpoints

### Authentication
- `GET /api/auth/google` - Get Google OAuth URL
- `POST /api/auth/google/callback` - Handle OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Status
- `GET /api/status` - Get all status checks
- `POST /api/status` - Create status check

### Health
- `GET /health` - Health check

## Environment Variables

```env
# MongoDB
MONGO_URL=mongodb://localhost:27017
DB_NAME=zenuml

# JWT
JWT_SECRET_KEY=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

# Session
SESSION_SECRET=your-session-secret

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8000

# Server
PORT=8000
```

## Running the Server

### Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
python server_new.py
```

### Production
```bash
uvicorn server_new:app --host 0.0.0.0 --port 8000 --workers 4
```

## Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test file
pytest tests/test_auth.py

# Run with verbose output
pytest -v
```

## Migration from Old Structure

### Old Code
```python
# Old: server.py
@app.get("/auth/google")
async def login_google():
    auth_url = get_google_auth_url()
    return {"url": auth_url}
```

### New Code
```python
# New: routes/auth.py
@router.get("/google")
async def login_google():
    """Get Google OAuth login URL"""
    auth_url = get_google_auth_url()
    return {"url": auth_url}
```

## Service Layer Example

### Old Approach (Mixed concerns)
```python
@app.get("/auth/google/callback")
async def auth_google_callback(code: str):
    # All logic in route
    token_response = await client.post(...)
    user_info = await client.get(...)
    # ... more logic
```

### New Approach (Separated concerns)
```python
# Route handles HTTP
@router.post("/google/callback")
async def auth_google_callback(request: GoogleAuthCallbackRequest, auth_service: AuthService = Depends(get_auth_service)):
    result = await auth_service.handle_google_callback(request.code)
    return TokenResponse(...)

# Service handles business logic
class AuthService:
    async def handle_google_callback(self, code: str):
        # OAuth logic
        # User creation/update
        # Token generation
```

## Database Repositories

### User Repository
```python
user_repo = UserRepository(db)
user = await user_repo.find_by_email("user@example.com")
user = await user_repo.create("user@example.com", "User Name")
user = await user_repo.update("user@example.com", name="New Name")
```

### Refresh Token Repository
```python
token_repo = RefreshTokenRepository(db)
token = await token_repo.create("user@example.com", token_value, expires_at)
token = await token_repo.find_by_token(token_value)
await token_repo.revoke(token_value)
await token_repo.revoke_all_for_user("user@example.com")
```

## Next Steps

1. **Deploy new server**: Replace `server.py` with `server_new.py`
2. **Update frontend**: Update API endpoints if needed
3. **Database migration**: Create indexes for better performance
4. **Monitoring**: Set up logging aggregation
5. **Rate limiting**: Add rate limiting middleware
6. **Caching**: Add Redis caching for frequently accessed data

## Performance Optimizations

### Implemented
- Async/await for non-blocking operations
- Connection pooling with Motor
- Proper error handling to prevent crashes
- Logging for debugging

### Recommended
- Add MongoDB indexes on frequently queried fields
- Implement Redis caching for user data
- Add rate limiting on auth endpoints
- Use connection pooling for external APIs
- Implement request validation at middleware level
