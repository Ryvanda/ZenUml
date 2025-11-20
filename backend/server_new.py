"""
ZenUML Backend Server
Main application entry point with refactored structure
"""
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import logging
import os

# Import routes
from routes import auth, status as status_routes, health
from middleware.logging_middleware import LoggingMiddleware
from middleware.error_handler import validation_exception_handler
from core.dependencies import set_db
from core.config import get_database_url, get_database_name, get_cors_origins

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="ZenUML API",
    description="Backend API for ZenUML diagram tool",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# MongoDB connection
mongo_url = get_database_url()
db_name = get_database_name()
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Set database instance for dependency injection
set_db(db)

# Add middleware
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv('SESSION_SECRET', 'your-secret-key-123'),
    session_cookie="zenuml_session"
)

app.add_middleware(LoggingMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=get_cors_origins(),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
app.add_exception_handler(RequestValidationError, validation_exception_handler)


# Include routers
app.include_router(health.router)
app.include_router(auth.router, prefix="/api")
app.include_router(status_routes.router, prefix="/api")


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "ZenUML API",
        "version": "1.0.0",
        "docs": "/api/docs"
    }


# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize on startup"""
    logger.info("Starting ZenUML API server")
    logger.info(f"Connected to MongoDB: {db_name}")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Shutting down ZenUML API server")
    client.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server_new:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
