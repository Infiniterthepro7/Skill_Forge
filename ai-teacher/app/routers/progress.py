from fastapi import APIRouter, Depends
from .jwt_handler import verify_token

router = APIRouter()

@router.get("/progress/{username}")
def get_progress(username: str, current_user: str = Depends(verify_token)):
    if username != current_user:
        return {"error": "Access Denied"}
    # Dummy response
    return {"username": username, "progress": "Intermediate Level"}
