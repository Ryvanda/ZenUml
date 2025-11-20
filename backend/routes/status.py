"""
Status check routes for monitoring
"""
import logging
from fastapi import APIRouter, Depends
from typing import List
from models.schemas import StatusCheck, StatusCheckCreate
from db.repositories import StatusCheckRepository
from core.dependencies import get_status_repo

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/status", tags=["status"])


@router.get("/", response_model=List[StatusCheck])
async def get_status_checks(status_repo: StatusCheckRepository = Depends(get_status_repo)):
    """
    Get all status checks
    
    Returns:
        List[StatusCheck]: List of all status check records
    """
    try:
        status_checks = await status_repo.find_all()
        return status_checks
    except Exception as e:
        logger.error(f"Error fetching status checks: {e}")
        raise


@router.post("/", response_model=StatusCheck)
async def create_status_check(
    input: StatusCheckCreate,
    status_repo: StatusCheckRepository = Depends(get_status_repo)
):
    """
    Create a new status check record
    
    Args:
        input: Status check data
        status_repo: Status check repository
    
    Returns:
        StatusCheck: Created status check record
    """
    try:
        status_check = await status_repo.create(input.client_name)
        return status_check
    except Exception as e:
        logger.error(f"Error creating status check: {e}")
        raise
