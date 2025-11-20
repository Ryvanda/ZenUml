# Migration Guide: Old Server to New Refactored Server

## Quick Start

1. **Backup current setup**
   ```bash
   cp server.py server_backup.py
   ```

2. **Install new dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Test new server**
   ```bash
   python server_new.py
   ```

4. **Update frontend API calls** (if needed)

5. **Deploy new server**

## What Changed

### File Structure
```
OLD:
- server.py (183 lines, mixed concerns)
- auth.py (62 lines, basic auth)

NEW:
- server_new.py (main app)
- core/config.py (configuration)
- core/dependencies.py (dependency injection)
- db/repositories.py (database layer)
- services/auth_service.py (business logic)
- routes/auth.py (HTTP endpoints)
- routes/status.py (HTTP endpoints)
- routes/health.py (HTTP endpoints)
- middleware/error_handler.py (error handling)
- middleware/logging_middleware.py (request logging)
- models/schemas.py (data validation)
- tests/ (unit tests)
```

### API Endpoints (No Breaking Changes)

#### Authentication
| Endpoint | Old | New | Status |
|----------|-----|-----|--------|
| GET /auth/google | ✓ | ✓ | Same |
| GET /auth/google/callback | ✓ | POST /api/auth/google/callback | Changed to POST |
| POST /api/auth/refresh | ✗ | ✓ | **NEW** |
| POST /api/auth/logout | ✗ | ✓ | **NEW** |
| GET /api/auth/me | ✓ | ✓ | Same |

#### Status
| Endpoint | Old | New | Status |
|----------|-----|-----|--------|
| GET /api/status | ✓ | ✓ | Same |
| POST /api/status | ✓ | ✓ | Same |

### Response Format Changes

#### Old Google Callback Response
```json
{
  "access_token": "...",
  "token_type": "bearer",
  "user": {
    "email": "...",
    "name": "...",
    "picture": "..."
  }
}
```

#### New Google Callback Response
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

**Frontend Update Required**: Store `refresh_token` and use it to refresh access tokens.

### New Features

#### 1. Refresh Token Endpoint
```bash
curl -X POST http://localhost:8000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "your_refresh_token"}'
```

Response:
```json
{
  "access_token": "new_access_token",
  "refresh_token": "your_refresh_token",
  "token_type": "bearer",
  "expires_in": 1800
}
```

#### 2. Logout Endpoint
```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer your_access_token"
```

Response:
```json
{
  "message": "Successfully logged out"
}
```

#### 3. Health Check Endpoint
```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

### Frontend Changes Required

#### 1. Update API Base URL
```javascript
// Old
const API_URL = 'http://localhost:8000';

// New (same, but endpoints changed)
const API_URL = 'http://localhost:8000/api';
```

#### 2. Handle Refresh Token
```javascript
// Store refresh token
localStorage.setItem('refresh_token', response.data.refresh_token);

// Refresh access token when expired
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await axios.post('/auth/refresh', {
    refresh_token: refreshToken
  });
  localStorage.setItem('access_token', response.data.access_token);
  return response.data.access_token;
}
```

#### 3. Update Axios Interceptor
```javascript
// Add refresh token logic to 401 handler
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshAccessToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(error.config);
      } catch (e) {
        // Redirect to login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

#### 4. Update Logout
```javascript
// Old
async function logout() {
  localStorage.removeItem('access_token');
}

// New
async function logout() {
  try {
    await axios.post('/auth/logout');
  } catch (e) {
    console.error('Logout error:', e);
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }
}
```

### Database Changes

#### New Collections
- `refresh_tokens` - Stores refresh tokens with expiration and revocation status

#### New Fields in Users Collection
- `updated_at` - Timestamp of last update

### Error Handling Changes

#### Old Error Response
```json
{
  "detail": "Could not validate credentials"
}
```

#### New Error Response
```json
{
  "detail": "Invalid or expired token",
  "error_type": "jwt_error"
}
```

### Logging Changes

#### Old
- Basic logging to console

#### New
- Structured logging with timestamps
- Request ID tracking
- Performance metrics (X-Process-Time header)
- Separate error logging

### Testing

#### Run Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run all tests
pytest

# Run specific test file
pytest tests/test_auth.py

# Run with coverage
pytest --cov=.
```

## Rollback Plan

If issues occur:

```bash
# Stop new server
# Ctrl+C

# Restore old server
cp server_backup.py server.py

# Restart old server
python server.py
```

## Verification Checklist

- [ ] New server starts without errors
- [ ] Health check endpoint works: `GET /health`
- [ ] Google OAuth login works
- [ ] Access token is returned
- [ ] Refresh token is returned
- [ ] Refresh token endpoint works
- [ ] Logout endpoint works
- [ ] Protected endpoints require valid token
- [ ] Status check endpoints work
- [ ] Frontend can authenticate
- [ ] Frontend can refresh tokens
- [ ] Frontend can logout

## Performance Comparison

| Metric | Old | New | Improvement |
|--------|-----|-----|-------------|
| Code organization | Monolithic | Modular | Better maintainability |
| Error handling | Basic | Comprehensive | Better debugging |
| Logging | Basic | Structured | Better monitoring |
| Testing | None | Unit tests | Better reliability |
| Token management | Single token | Dual tokens | Better security |
| Database layer | Direct queries | Repository pattern | Better scalability |

## Support

For issues during migration:
1. Check logs: `tail -f server.log`
2. Verify environment variables
3. Check MongoDB connection
4. Review error messages in console
5. Run tests to isolate issues

## Timeline

- **Phase 1**: Deploy new server alongside old server
- **Phase 2**: Test all endpoints with frontend
- **Phase 3**: Monitor for issues
- **Phase 4**: Switch traffic to new server
- **Phase 5**: Decommission old server
