# Ascend Rebrand: Part 3 - System-Wide Updates & Documentation

**Version:** 1.0  
**Date:** November 2025  
**Status:** Production Implementation Guide

---

## 1. Error Codes & Error Messages Update

### 1.1 Centralized Error Code System

**backend/i18n/error_codes.py:**

```python
from enum import Enum

class ErrorCode(str, Enum):
    """Centralized error codes - used across all layers"""
    
    # Authentication (AUTH_XXX)
    AUTH_INVALID_CREDENTIALS = "AUTH_001"
    AUTH_SESSION_EXPIRED = "AUTH_002"
    AUTH_INVALID_TOKEN = "AUTH_003"
    AUTH_REFRESH_FAILED = "AUTH_004"
    AUTH_GOOGLE_FAILED = "AUTH_005"
    AUTH_UNAUTHORIZED = "AUTH_006"
    
    # Validation (VAL_XXX)
    VAL_INVALID_EMAIL = "VAL_001"
    VAL_INVALID_PASSWORD = "VAL_002"
    VAL_MISSING_FIELD = "VAL_003"
    VAL_INVALID_FORMAT = "VAL_004"
    VAL_DUPLICATE_EMAIL = "VAL_005"
    
    # Resources (RES_XXX)
    RES_NOT_FOUND = "RES_001"
    RES_ALREADY_EXISTS = "RES_002"
    RES_PERMISSION_DENIED = "RES_003"
    RES_DELETED = "RES_004"
    
    # Server (SRV_XXX)
    SRV_INTERNAL_ERROR = "SRV_001"
    SRV_DATABASE_ERROR = "SRV_002"
    SRV_EXTERNAL_API_ERROR = "SRV_003"
    SRV_TIMEOUT = "SRV_004"
```

### 1.2 Error Message Files (i18n)

**backend/locales/en/errors.json:**

```json
{
  "errors": {
    "AUTH_001": "Invalid email or password",
    "AUTH_002": "Your session has expired. Please log in again",
    "AUTH_003": "Invalid or expired token",
    "AUTH_004": "Failed to refresh token",
    "AUTH_005": "Google authentication failed",
    "AUTH_006": "You are not authorized to perform this action",
    "VAL_001": "Invalid email format",
    "VAL_002": "Password must be at least 8 characters",
    "VAL_003": "Missing required field: {{field}}",
    "VAL_004": "Invalid format for {{field}}",
    "VAL_005": "Email already registered",
    "RES_001": "{{resource}} not found",
    "RES_002": "{{resource}} already exists",
    "RES_003": "You don't have permission to access {{resource}}",
    "RES_004": "{{resource}} has been deleted",
    "SRV_001": "An internal server error occurred",
    "SRV_002": "Database connection error",
    "SRV_003": "External service error",
    "SRV_004": "Request timeout"
  }
}
```

**backend/locales/id/errors.json:**

```json
{
  "errors": {
    "AUTH_001": "Email atau password tidak valid",
    "AUTH_002": "Sesi Anda telah berakhir. Silakan masuk kembali",
    "AUTH_003": "Token tidak valid atau telah kadaluarsa",
    "AUTH_004": "Gagal menyegarkan token",
    "AUTH_005": "Autentikasi Google gagal",
    "AUTH_006": "Anda tidak berwenang untuk melakukan tindakan ini",
    "VAL_001": "Format email tidak valid",
    "VAL_002": "Password harus minimal 8 karakter",
    "VAL_003": "Field yang diperlukan hilang: {{field}}",
    "VAL_004": "Format tidak valid untuk {{field}}",
    "VAL_005": "Email sudah terdaftar",
    "RES_001": "{{resource}} tidak ditemukan",
    "RES_002": "{{resource}} sudah ada",
    "RES_003": "Anda tidak memiliki izin untuk mengakses {{resource}}",
    "RES_004": "{{resource}} telah dihapus",
    "SRV_001": "Terjadi kesalahan server internal",
    "SRV_002": "Kesalahan koneksi database",
    "SRV_003": "Kesalahan layanan eksternal",
    "SRV_004": "Permintaan waktu habis"
  }
}
```

### 1.3 Backend Error Handler Integration

**backend/middleware/error_handler.py:**

```python
from fastapi import Request, status
from fastapi.responses import JSONResponse
from ..i18n.error_codes import ErrorCode
from ..i18n.translator import Translator

async def error_exception_handler(request: Request, exc: Exception):
    """Global error handler with i18n support"""
    
    # Get user's language preference
    user_language = request.headers.get('Accept-Language', 'en').split(',')[0]
    translator = Translator(user_language)
    
    # Map exception to error code
    if isinstance(exc, ValidationError):
        error_code = ErrorCode.VAL_INVALID_FORMAT
    elif isinstance(exc, HTTPException):
        error_code = ErrorCode.SRV_INTERNAL_ERROR
    else:
        error_code = ErrorCode.SRV_INTERNAL_ERROR
    
    # Get translated message
    message = translator.get_error_message(error_code)
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": error_code,
                "message": message,
                "timestamp": datetime.now().isoformat()
            }
        }
    )
```

### 1.4 Frontend Error Messages

**frontend/public/locales/en/errors.json:**

```json
{
  "errors": {
    "AUTH_001": "Invalid email or password",
    "AUTH_002": "Your session has expired. Please log in again",
    "AUTH_003": "Invalid or expired token",
    "AUTH_004": "Failed to refresh token",
    "AUTH_005": "Google authentication failed",
    "AUTH_006": "You are not authorized",
    "VAL_001": "Invalid email format",
    "VAL_002": "Password must be at least 8 characters",
    "VAL_003": "Missing required field: {{field}}",
    "VAL_004": "Invalid format for {{field}}",
    "VAL_005": "Email already registered",
    "RES_001": "{{resource}} not found",
    "RES_002": "{{resource}} already exists",
    "RES_003": "You don't have permission to access {{resource}}",
    "RES_004": "{{resource}} has been deleted",
    "SRV_001": "An internal server error occurred",
    "SRV_002": "Database connection error",
    "SRV_003": "External service error",
    "SRV_004": "Request timeout",
    "network": "Network error. Please check your connection",
    "unknown": "An unknown error occurred"
  }
}
```

---

## 2. Branding Constants Update

### 2.1 Frontend Branding Constants

**frontend/src/constants/branding.js:**

```javascript
// Old branding constants (DEPRECATED)
export const ZENUML_BRANDING = {
  appName: 'ZenUML',
  appDescription: 'Modern UML Diagramming Tool',
  logoUrl: '/assets/logos/v1/zenuml-logo.svg',
  faviconUrl: '/favicon-v1.ico'
};

// New branding constants (CURRENT)
export const ASCEND_BRANDING = {
  appName: 'Ascend',
  appDescription: 'Modern UML Diagramming Tool',
  tagline: 'Design, Collaborate, Elevate',
  logoUrl: '/assets/logos/v2/ascend-logo-full.svg',
  logoMarkUrl: '/assets/logos/v2/ascend-logo-mark.svg',
  faviconUrl: '/assets/favicons/favicon-v2.svg',
  colors: {
    primary: '#6B46C1',
    secondary: '#1E1B4B',
    accent: '#8B5CF6'
  },
  socialLinks: {
    twitter: 'https://twitter.com/ascendio',
    github: 'https://github.com/ascendio',
    discord: 'https://discord.gg/ascendio'
  }
};

// Use new branding by default
export const BRANDING = ASCEND_BRANDING;
```

### 2.2 Backend Branding Configuration

**backend/core/config.py:**

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Ascend"
    APP_DESCRIPTION: str = "Modern UML Diagramming Tool"
    APP_VERSION: str = "2.0.0"
    
    # Branding
    LOGO_URL: str = "/assets/logos/v2/ascend-logo-full.svg"
    LOGO_MARK_URL: str = "/assets/logos/v2/ascend-logo-mark.svg"
    FAVICON_URL: str = "/assets/favicons/favicon-v2.svg"
    
    # Colors
    PRIMARY_COLOR: str = "#6B46C1"
    SECONDARY_COLOR: str = "#1E1B4B"
    
    # URLs
    FRONTEND_URL: str = "http://localhost:3000"
    BACKEND_URL: str = "http://localhost:8000"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

---

## 3. Documentation Updates

### 3.1 README.md Update

**Before:**
```markdown
# ZenUML

A modern, web-based UML diagramming tool inspired by Figma.
```

**After:**
```markdown
# Ascend

A modern, web-based UML diagramming tool for seamless collaboration and design.

## About

Ascend is a powerful, intuitive platform for creating, sharing, and collaborating on UML diagrams. 
Formerly known as ZenUML, Ascend represents our commitment to helping teams elevate their design process.

### Key Features
- Real-time collaboration
- Intuitive drag-and-drop interface
- Support for all UML diagram types
- Multi-language support (6 languages)
- Cloud-based storage
```

### 3.2 API Documentation Update

**backend/API_DOCUMENTATION.md:**

```markdown
# Ascend API Documentation

**Base URL:** `https://api.ascend.io/api`  
**Version:** 2.0.0  
**Last Updated:** November 2025

## Overview

The Ascend API provides endpoints for:
- User authentication and management
- Diagram creation and collaboration
- Real-time updates
- Multi-language support

## Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "code": "AUTH_001",
    "message": "Invalid email or password",
    "timestamp": "2025-11-20T10:30:00Z"
  }
}
```

See [Error Codes Reference](#error-codes) for complete list.
```

### 3.3 Developer Guide Update

**Create: DEVELOPER_GUIDE.md**

```markdown
# Ascend Developer Guide

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB 4.4+

### Installation

1. Clone repository
```bash
git clone https://github.com/ascendio/ascend.git
cd ascend
```

2. Setup frontend
```bash
cd frontend
npm install
npm start
```

3. Setup backend
```bash
cd backend
pip install -r requirements.txt
python server_new.py
```

## Project Structure

```
ascend/
├── frontend/          # React application
├── backend/           # FastAPI backend
├── docs/              # Documentation
└── tests/             # Test suite
```

## Key Concepts

### Multi-Language Support
Ascend supports 6 languages: English, Indonesian, Chinese, Japanese, Portuguese, Spanish.

See [i18n Guide](../ASCEND_REBRAND_PART1_I18N.md) for details.

### Branding
All branding assets are in `frontend/public/assets/logos/v2/`.

See [Logo Guide](../ASCEND_REBRAND_PART2_LOGO.md) for details.

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Run tests: `npm test` (frontend), `pytest` (backend)
4. Submit pull request

## Code Style

- Frontend: ESLint + Prettier
- Backend: Black + Flake8

```bash
# Format code
npm run format        # Frontend
black .              # Backend
```
```

---

## 4. Configuration Files Update

### 4.1 package.json Update

**Before:**
```json
{
  "name": "frontend",
  "description": "ZenUML - Modern UML Diagramming Tool"
}
```

**After:**
```json
{
  "name": "ascend-frontend",
  "version": "2.0.0",
  "description": "Ascend - Modern UML Diagramming Tool",
  "homepage": "https://ascend.io",
  "repository": {
    "type": "git",
    "url": "https://github.com/ascendio/ascend.git"
  },
  "author": "Ascend Team",
  "license": "MIT"
}
```

### 4.2 Backend requirements.txt

**Before:**
```
# ZenUML Backend Dependencies
fastapi==0.110.1
uvicorn==0.25.0
```

**After:**
```
# Ascend Backend Dependencies
# Version: 2.0.0
fastapi==0.110.1
uvicorn==0.25.0
pydantic==2.6.4
pydantic-settings==2.1.0
pymongo==4.5.0
motor==3.3.1
pyjwt==2.10.1
python-jose==3.3.0
python-multipart==0.0.6
babel==2.14.0
pytest==8.0.0
pytest-asyncio==0.23.0
```

### 4.3 Environment Variables

**backend/.env.example:**

```env
# Application
APP_NAME=Ascend
APP_VERSION=2.0.0
ENVIRONMENT=development

# Database
MONGO_URL=mongodb://localhost:27017/ascend
DATABASE_NAME=ascend

# Authentication
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256

# Frontend
FRONTEND_URL=http://localhost:3000

# Branding
APP_LOGO_URL=/assets/logos/v2/ascend-logo-full.svg
FAVICON_URL=/assets/favicons/favicon-v2.svg

# i18n
DEFAULT_LANGUAGE=en
SUPPORTED_LANGUAGES=en,id,zh,ja,pt,es
```

---

## 5. Code References Update

### 5.1 Search & Replace Commands

```bash
# Frontend
grep -r "ZenUML" frontend/src --include="*.jsx" --include="*.js"
grep -r "zenuml" frontend/src --include="*.jsx" --include="*.js"
grep -r "ZENUML" frontend/src --include="*.jsx" --include="*.js"

# Backend
grep -r "ZenUML" backend --include="*.py"
grep -r "zenuml" backend --include="*.py"

# Documentation
grep -r "ZenUML" . --include="*.md"
```

### 5.2 Bulk Replace Script

**scripts/rebrand.sh:**

```bash
#!/bin/bash

# Rebrand ZenUML to Ascend
# Usage: ./scripts/rebrand.sh

echo "Starting rebrand from ZenUML to Ascend..."

# Frontend
find frontend/src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i 's/ZenUML/Ascend/g' {} \;
find frontend/src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i 's/zenuml/ascend/g' {} \;

# Backend
find backend -type f -name "*.py" -exec sed -i 's/ZenUML/Ascend/g' {} \;
find backend -type f -name "*.py" -exec sed -i 's/zenuml/ascend/g' {} \;

# Documentation
find . -type f -name "*.md" -exec sed -i 's/ZenUML/Ascend/g' {} \;

# Config files
sed -i 's/ZenUML/Ascend/g' frontend/package.json
sed -i 's/ZenUML/Ascend/g' backend/requirements.txt
sed -i 's/zenuml/ascend/g' docker-compose.yml

echo "Rebrand complete!"
```

---

## 6. Database Migration

### 6.1 MongoDB Schema Update

**Migration Script: backend/migrations/001_rebrand_to_ascend.py**

```python
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

async def migrate_to_ascend():
    """Migrate database from ZenUML to Ascend"""
    
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["ascend"]  # Rename database
    
    # Update user preferences
    await db.users.update_many(
        {},
        {
            "$set": {
                "app_name": "Ascend",
                "migrated_at": datetime.now(),
                "migration_version": "2.0.0"
            }
        }
    )
    
    # Create indexes for new features
    await db.users.create_index("language")
    await db.diagrams.create_index("created_at")
    
    print("Migration complete!")

# Run migration
if __name__ == "__main__":
    import asyncio
    asyncio.run(migrate_to_ascend())
```

---

## 7. CI/CD Pipeline Updates

### 7.1 GitHub Actions Workflow

**.github/workflows/deploy.yml:**

```yaml
name: Deploy Ascend

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Frontend
        run: |
          cd frontend
          npm install
          npm run build
          
      - name: Build Backend
        run: |
          cd backend
          pip install -r requirements.txt
          pytest
          
      - name: Deploy to Production
        run: |
          echo "Deploying Ascend v2.0.0"
          # Add deployment commands
```

### 7.2 Docker Configuration

**Dockerfile (Frontend):**

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

LABEL app="Ascend" version="2.0.0"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:80"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8000
    labels:
      - "app=ascend"
      - "version=2.0.0"

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "8000:8000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/ascend
      - APP_NAME=Ascend
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## 8. Migration Checklist

### Phase 1: Preparation (Week 1)
- [ ] Create all documentation files
- [ ] Update error codes and messages
- [ ] Create branding constants
- [ ] Set up feature flags

### Phase 2: Code Updates (Week 2)
- [ ] Update frontend components
- [ ] Update backend configuration
- [ ] Update API responses
- [ ] Update error handlers

### Phase 3: Documentation (Week 2-3)
- [ ] Update README files
- [ ] Update API documentation
- [ ] Create developer guide
- [ ] Update deployment docs

### Phase 4: Testing (Week 3)
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Manual QA

### Phase 5: Deployment (Week 4)
- [ ] Deploy with feature flag (10%)
- [ ] Monitor for issues
- [ ] Increase rollout (50%)
- [ ] Full rollout (100%)

---

## 9. Rollback Plan

**If critical issues occur:**

1. **Disable Feature Flag:**
   ```bash
   FEATURE_FLAG_ASCEND_REBRAND=false
   ```

2. **Revert Database:**
   ```bash
   # Restore from backup
   mongorestore --archive=backup.archive
   ```

3. **Revert Code:**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

4. **Clear Cache:**
   ```bash
   npm run cache:clear
   ```

---

## 10. Post-Deployment Monitoring

### Metrics to Track
- Error rates by error code
- Language distribution
- Logo load times
- User feedback
- Performance metrics

### Monitoring Dashboard

```bash
# Monitor error logs
tail -f logs/error.log | grep "AUTH_\|VAL_\|RES_\|SRV_"

# Monitor language usage
db.users.aggregate([
  { $group: { _id: "$language", count: { $sum: 1 } } }
])

# Monitor logo performance
curl -I https://api.ascend.io/assets/logos/v2/ascend-logo-full.svg
```

---

## Next Steps

1. Execute rebrand script
2. Update all configuration files
3. Run migration script
4. Deploy with feature flag
5. Monitor and collect feedback

See **ASCEND_REBRAND_IMPLEMENTATION_CHECKLIST.md** for detailed task list.
