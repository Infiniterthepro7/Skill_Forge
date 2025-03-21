from fastapi import APIRouter

router = APIRouter()

@router.get("/progress/{username}")
def get_progress(username: str):
    # Temporary dummy data
    return {"username": username, "progress": "Intermediate Level"}
