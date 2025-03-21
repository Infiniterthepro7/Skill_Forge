from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

# Request model
class UserRequest(BaseModel):
    username: str
    language: str

# Sample route
@app.get("/")
def home():
    return {"message": "Welcome to AI Teacher API"}

# AI Teaching route
@app.post("/ai-teacher/")
def teach(request: UserRequest):
    tips = {
        "Python": ["Practice with small projects", "Understand list comprehensions", "Learn error handling"],
        "Java": ["Master OOP concepts", "Practice coding patterns", "Understand JVM internals"],
        "C++": ["Grasp pointers well", "Understand memory management", "Practice STL usage"]
    }
    language = request.language
    if language in tips:
        return {"username": request.username, "tips": random.choice(tips[language])}
    else:
        return {"message": "Language not found"}
from routers import progress
app.include_router(progress.router)
