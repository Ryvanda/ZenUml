# ZenUML API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Endpoints

### Health Check

#### GET /health
Check if the API is running.

**Response:**
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

---

### Authentication

#### GET /auth/google
Get the Google OAuth authorization URL.

**Response:**
```json
{
  "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

---

#### POST /auth/google/callback
Handle Google OAuth callback after user authorization.

**Request Body:**
```json
{
  "code": "authorization_code_from_google"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

**Error Response (401):**
```json
{
  "detail": "Failed to authenticate with Google",
  "error_type": "auth_error"
}
```

---

#### POST /auth/refresh
Refresh the access token using a refresh token.

**Request Body:**
```json
{
  "refresh_token": "your_refresh_token"
}
```

**Response:**
```json
{
  "access_token": "new_access_token",
  "refresh_token": "your_refresh_token",
  "token_type": "bearer",
  "expires_in": 1800
}
```

**Error Response (401):**
```json
{
  "detail": "Invalid or expired refresh token",
  "error_type": "jwt_error"
}
```

---

#### POST /auth/logout
Logout the current user by revoking all refresh tokens.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "Successfully logged out"
}
```

**Error Response (401):**
```json
{
  "detail": "Invalid or expired token",
  "error_type": "jwt_error"
}
```

---

#### GET /auth/me
Get information about the current authenticated user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://example.com/picture.jpg",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Error Response (401):**
```json
{
  "detail": "Invalid or expired token",
  "error_type": "jwt_error"
}
```

---

### Status Checks

#### GET /status
Get all status check records.

**Response:**
```json
[
  {
    "id": "uuid-1",
    "client_name": "web-client",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  {
    "id": "uuid-2",
    "client_name": "mobile-client",
    "timestamp": "2024-01-15T10:31:00Z"
  }
]
```

---

#### POST /status
Create a new status check record.

**Request Body:**
```json
{
  "client_name": "web-client"
}
```

**Response:**
```json
{
  "id": "uuid-1",
  "client_name": "web-client",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Error Response (422):**
```json
{
  "detail": "Validation error",
  "errors": [
    {
      "loc": ["body", "client_name"],
      "msg": "Client name cannot be empty",
      "type": "value_error"
    }
  ]
}
```

---

## Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 422 | Unprocessable Entity | Validation error |
| 500 | Internal Server Error | Server error |

---

## Error Response Format

All error responses follow this format:

```json
{
  "detail": "Error message",
  "error_type": "error_type_name"
}
```

For validation errors:

```json
{
  "detail": "Validation error",
  "errors": [
    {
      "loc": ["body", "field_name"],
      "msg": "Error message",
      "type": "error_type"
    }
  ]
}
```

---

## Request/Response Headers

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <access_token>  (for protected endpoints)
X-Request-ID: unique-request-id      (optional)
```

### Response Headers
```
Content-Type: application/json
X-Process-Time: 0.123                (request processing time in seconds)
X-Request-ID: unique-request-id      (echo of request ID or generated)
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. This is recommended for production:

- Auth endpoints: 5 requests per minute per IP
- Status endpoints: 100 requests per minute per IP
- Other endpoints: 1000 requests per minute per IP

---

## Token Details

### Access Token
- **Type**: JWT (JSON Web Token)
- **Algorithm**: HS256
- **Expiration**: 30 minutes
- **Claims**:
  - `sub`: User email
  - `exp`: Expiration timestamp
  - `type`: "access"

### Refresh Token
- **Type**: JWT (JSON Web Token)
- **Algorithm**: HS256
- **Expiration**: 7 days
- **Claims**:
  - `sub`: User email
  - `exp`: Expiration timestamp
  - `type`: "refresh"
- **Storage**: MongoDB `refresh_tokens` collection

---

## Examples

### Complete Authentication Flow

1. **Get OAuth URL**
```bash
curl http://localhost:8000/api/auth/google
```

2. **User authorizes and gets code from Google**
(Handled by frontend)

3. **Exchange code for tokens**
```bash
curl -X POST http://localhost:8000/api/auth/google/callback \
  -H "Content-Type: application/json" \
  -d '{"code": "authorization_code"}'
```

4. **Use access token to access protected resources**
```bash
curl http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer access_token"
```

5. **Refresh access token when expired**
```bash
curl -X POST http://localhost:8000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "refresh_token"}'
```

6. **Logout**
```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer access_token"
```

---

## Interactive API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI Schema**: http://localhost:8000/api/openapi.json

---

## Changelog

### Version 1.0.0 (Current)
- Initial release with refactored structure
- Google OAuth integration
- JWT token management with refresh tokens
- Status check endpoints
- Comprehensive error handling
- Request logging middleware
- Unit tests
