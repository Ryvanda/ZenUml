# Quick Start Guide - Refactored Backend

## 5 Minutes Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values
nano .env
```

**Required variables:**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=zenuml
JWT_SECRET_KEY=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
SESSION_SECRET=your-session-secret
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
```

### 3. Start the Server
```bash
python server_new.py
```

Server will start at `http://localhost:8000`

### 4. Verify It Works
```bash
# Health check
curl http://localhost:8000/health

# API docs
open http://localhost:8000/api/docs
```

---

## Running Tests

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest tests/test_auth.py

# Run with coverage
pytest --cov=.
```

---

## API Quick Reference

### Authentication Flow

1. **Get OAuth URL**
```bash
curl http://localhost:8000/api/auth/google
```

2. **Exchange code for tokens**
```bash
curl -X POST http://localhost:8000/api/auth/google/callback \
  -H "Content-Type: application/json" \
  -d '{"code": "authorization_code"}'
```

Response:
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

3. **Get user info**
```bash
curl http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer access_token"
```

4. **Refresh token**
```bash
curl -X POST http://localhost:8000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "refresh_token"}'
```

5. **Logout**
```bash
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer access_token"
```

---

## Project Structure

```
backend/
├── core/              # Configuration & dependencies
├── db/                # Database repositories
├── middleware/        # Logging & error handling
├── models/            # Pydantic schemas
├── routes/            # API endpoints
├── services/          # Business logic
├── tests/             # Unit tests
├── server_new.py      # Main app (use this!)
├── requirements.txt   # Dependencies
└── .env              # Environment variables
```

---

## Key Files

| File | Purpose |
|------|---------|
| `server_new.py` | Main FastAPI application |
| `core/config.py` | Configuration management |
| `core/dependencies.py` | Dependency injection |
| `services/auth_service.py` | Authentication logic |
| `db/repositories.py` | Database access |
| `routes/auth.py` | Auth endpoints |
| `models/schemas.py` | Data validation |

---

## Common Commands

```bash
# Start development server
python server_new.py

# Start with specific port
python -m uvicorn server_new:app --port 8001

# Run tests
pytest

# Format code
black .

# Check code style
flake8 .

# Type checking
mypy .

# Run with production settings
uvicorn server_new:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## Troubleshooting

### Port Already in Use
```bash
# Use different port
python -m uvicorn server_new:app --port 8001
```

### MongoDB Connection Failed
```bash
# Check connection string
echo $MONGO_URL

# Test connection
mongosh $MONGO_URL
```

### Import Errors
```bash
# Add backend to Python path
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

### Tests Fail
```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run with verbose output
pytest -v
```

---

## Documentation

- **API Reference**: `API_DOCUMENTATION.md`
- **Architecture**: `BACKEND_STRUCTURE.md`
- **Migration Guide**: `MIGRATION_GUIDE.md`
- **Full Summary**: `OPTIMIZATION_SUMMARY.md`

---

## Interactive API Docs

Once server is running, visit:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

---

## Next Steps

1. ✅ Start the server
2. ✅ Run the tests
3. ✅ Review API documentation
4. ✅ Update frontend with new endpoints
5. ✅ Deploy to production

---

## Need Help?

1. Check the logs: `tail -f server.log`
2. Review error messages
3. Read `API_DOCUMENTATION.md`
4. Check `MIGRATION_GUIDE.md`
5. Run tests to isolate issues

---

## Production Deployment

```bash
# Install production dependencies
pip install gunicorn

# Run with Gunicorn
gunicorn server_new:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000

# Or with Docker
docker build -t zenuml-backend .
docker run -p 8000:8000 zenuml-backend
```

---

**You're all set! Happy coding! 🚀**
