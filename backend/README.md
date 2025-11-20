# ZenUML Backend - Refactored & Optimized

> A production-ready FastAPI backend with modular architecture, comprehensive error handling, refresh token system, and full test coverage.

## 🎯 Quick Links

- **[Quick Start Guide](QUICKSTART.md)** - Get running in 5 minutes
- **[API Documentation](API_DOCUMENTATION.md)** - Complete endpoint reference
- **[Architecture Guide](ARCHITECTURE.md)** - System design and data flow
- **[Backend Structure](BACKEND_STRUCTURE.md)** - Code organization
- **[Migration Guide](MIGRATION_GUIDE.md)** - Frontend integration steps
- **[Optimization Summary](OPTIMIZATION_SUMMARY.md)** - What was improved

---

## ✨ Key Features

### 1. **Modular Architecture**
- Clean separation of concerns
- Routes → Services → Repositories → Database
- Easy to maintain and extend

### 2. **Comprehensive Error Handling**
- Validation error details
- JWT error handling
- Structured error responses
- Request logging with performance metrics

### 3. **Dual-Token Authentication**
- Access tokens (30 minutes)
- Refresh tokens (7 days)
- Token revocation on logout
- Stateful token management

### 4. **Input Validation**
- Automatic Pydantic validation
- Field validators for data integrity
- Clear error messages

### 5. **Production Ready**
- Unit tests (16 test cases)
- Comprehensive documentation
- Error handling and logging
- Best practices implemented

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start Server
```bash
python server_new.py
```

### 4. View API Docs
```
http://localhost:8000/api/docs
```

---

## 📁 Project Structure

```
backend/
├── core/                      # Configuration & dependency injection
│   ├── __init__.py
│   ├── config.py             # Configuration management
│   └── dependencies.py       # Dependency injection setup
│
├── db/                        # Database layer
│   ├── __init__.py
│   └── repositories.py       # UserRepository, TokenRepository, StatusRepository
│
├── middleware/                # HTTP middleware
│   ├── __init__.py
│   ├── logging_middleware.py # Request/response logging
│   └── error_handler.py      # Global error handling
│
├── models/                    # Data models
│   ├── __init__.py
│   └── schemas.py            # Pydantic schemas with validators
│
├── routes/                    # API endpoints
│   ├── __init__.py
│   ├── auth.py               # Authentication endpoints
│   ├── status.py             # Status check endpoints
│   └── health.py             # Health check endpoints
│
├── services/                  # Business logic
│   ├── __init__.py
│   └── auth_service.py       # Authentication service
│
├── tests/                     # Unit tests
│   ├── __init__.py
│   ├── conftest.py           # Pytest configuration
│   ├── test_auth.py          # Auth service tests
│   └── test_repositories.py  # Repository tests
│
├── server_new.py             # Main FastAPI application ⭐ USE THIS
├── requirements.txt          # Python dependencies
├── pytest.ini                # Pytest configuration
├── .env.example              # Environment variables template
│
└── Documentation/
    ├── README.md             # This file
    ├── QUICKSTART.md         # 5-minute setup guide
    ├── API_DOCUMENTATION.md  # Complete API reference
    ├── ARCHITECTURE.md       # System design & diagrams
    ├── BACKEND_STRUCTURE.md  # Code organization
    ├── MIGRATION_GUIDE.md    # Frontend integration
    └── OPTIMIZATION_SUMMARY.md # What was improved
```

---

## 🔌 API Endpoints

### Authentication
- `GET /api/auth/google` - Get OAuth URL
- `POST /api/auth/google/callback` - Handle OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Status
- `GET /api/status` - Get all status checks
- `POST /api/status` - Create status check

### Health
- `GET /health` - Health check

---

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test file
pytest tests/test_auth.py -v

# Run with verbose output
pytest -v
```

**Test Coverage**: 16 test cases
- Auth service: 8 tests
- Repositories: 8 tests

---

## 📊 Performance Improvements

| Aspect | Before | After |
|--------|--------|-------|
| Code Organization | Monolithic | Modular |
| Error Handling | Basic | Comprehensive |
| Logging | Basic | Structured |
| Testing | None | 16 tests |
| Token Management | Single | Dual tokens |
| Validation | Manual | Automatic |
| Database Layer | Direct queries | Repository pattern |

---

## 🔐 Security Features

1. **Shorter-lived Access Tokens** (30 minutes)
2. **Refresh Token Revocation** (stateful logout)
3. **Input Validation** (prevents injection attacks)
4. **Error Handling** (doesn't leak sensitive info)
5. **Structured Logging** (security monitoring)

---

## 🛠️ Development

### Code Style
```bash
# Format code
black .

# Check style
flake8 .

# Type checking
mypy .

# Sort imports
isort .
```

### Running Server
```bash
# Development with auto-reload
python server_new.py

# Production with Gunicorn
gunicorn server_new:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup guide |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Complete API reference |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design & diagrams |
| [BACKEND_STRUCTURE.md](BACKEND_STRUCTURE.md) | Code organization |
| [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) | Frontend integration |
| [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) | Improvements made |

---

## 🔄 Frontend Integration

### Required Changes

1. **Store Refresh Token**
```javascript
localStorage.setItem('refresh_token', response.data.refresh_token);
```

2. **Add Refresh Logic**
```javascript
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  }
);
```

3. **Update Logout**
```javascript
async function logout() {
  await axios.post('/api/auth/logout');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
```

See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for detailed steps.

---

## 📦 Dependencies

### Core
- FastAPI 0.110.1
- Uvicorn 0.25.0
- Pydantic 2.6.4

### Database
- MongoDB 4.5.0
- Motor 3.3.1 (async driver)

### Authentication
- PyJWT 2.10.1
- python-jose 3.3.0

### Testing
- pytest 8.0.0
- pytest-asyncio 0.23.0

### Code Quality
- black 24.1.1
- flake8 7.0.0
- mypy 1.8.0

See [requirements.txt](requirements.txt) for complete list.

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
python -m uvicorn server_new:app --port 8001
```

### MongoDB Connection Failed
```bash
echo $MONGO_URL
mongosh $MONGO_URL
```

### Import Errors
```bash
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

### Tests Fail
```bash
pip install pytest pytest-asyncio
pytest -v
```

---

## 📋 Deployment Checklist

- [ ] All tests pass: `pytest`
- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] Frontend updated with new endpoints
- [ ] Refresh token logic implemented
- [ ] Error handling updated
- [ ] Logout functionality tested
- [ ] API documentation reviewed
- [ ] Monitoring set up
- [ ] Backup created
- [ ] Rollback plan documented

---

## 🎯 Next Steps

### Immediate
1. Deploy `server_new.py`
2. Update frontend with new endpoints
3. Run tests: `pytest`
4. Monitor logs

### Short Term
1. Add rate limiting (SlowAPI)
2. Add Redis caching
3. Create database indexes
4. Set up monitoring (Sentry)

### Long Term
1. Email/password authentication
2. GitHub OAuth integration
3. Two-factor authentication
4. User profile management

---

## 📞 Support

### Getting Help
1. Check [QUICKSTART.md](QUICKSTART.md)
2. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
3. Check logs: `tail -f server.log`
4. Run tests: `pytest -v`

### Common Issues
- See [QUICKSTART.md](QUICKSTART.md) Troubleshooting section
- See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for frontend issues

---

## 📊 Statistics

- **Total Files**: 20+
- **Total Lines of Code**: ~2000+
- **Test Cases**: 16
- **Documentation Pages**: 6
- **API Endpoints**: 8

---

## ✅ Optimization Summary

All 5 recommended optimizations have been implemented:

✅ **Refactored Backend Structure** - Modular, scalable architecture
✅ **Middleware for Logging & Error Handling** - Comprehensive monitoring
✅ **Refresh Token Implementation** - Better security and UX
✅ **Input Validation with Pydantic** - Automatic validation
✅ **API Documentation & Tests** - Production-ready code

---

## 📄 License

This project is part of ZenUML.

---

## 🎉 Ready to Deploy!

The backend is now production-ready with:
- ✅ Modular architecture
- ✅ Comprehensive error handling
- ✅ Refresh token system
- ✅ Input validation
- ✅ Unit tests
- ✅ Complete documentation

**Start with [QUICKSTART.md](QUICKSTART.md) to get running in 5 minutes!**

---

**Last Updated**: November 18, 2024
**Version**: 1.0.0
**Status**: Production Ready 🚀
