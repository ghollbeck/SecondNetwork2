# backend/main.py

from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from auth import get_current_user, create_access_token
from models import UserCreate, UserLogin, UserUpdate, User
from database import db, get_user_by_email, create_user, verify_password
from pydantic import BaseModel, Field
import uvicorn
import gridfs
from fastapi.responses import StreamingResponse
from bson import ObjectId
from typing import List, Dict
import friends  # Import the friends module

app = FastAPI()

# CORS middleware
origins = [
    "http://localhost:3000",  # Existing frontend URL
    "http://localhost:3002",  # Added frontend URL
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Updated origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize GridFS for handling file storage
fs = gridfs.GridFS(db)

# Existing endpoints (register, login, profile, PDF upload/download, etc.)
@app.post("/register")
async def register(user: UserCreate):
    try:
        user_id = create_user(user)
        return {"message": "User created successfully", "user_id": user_id}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

@app.post("/login")
async def login(user: UserLogin):
    db_user = get_user_by_email(user.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(user.password, db_user['hashed_password']):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": db_user['email']})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/profile", response_model=User)
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@app.put("/profile", response_model=User)
async def update_profile(user_update: UserUpdate, current_user: User = Depends(get_current_user)):
    db.users.update_one({'_id': ObjectId(current_user.id)}, {'$set': user_update.dict(exclude_unset=True)})
    updated_user = get_user_by_email(current_user.email)
    return User(**updated_user)

# Friend Management Endpoints
@app.get("/users/search", response_model=List[User])
async def search_users_endpoint(query: str, current_user: User = Depends(get_current_user)):
    return friends.search_users(query, current_user)

@app.post("/friend_request/{user_id}")
async def send_friend_request_endpoint(user_id: str, current_user: User = Depends(get_current_user)):
    try:
        friends.send_friend_request(current_user.id, user_id)
        return {"message": "Friend request sent."}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

@app.post("/friend_request/{requester_id}/accept")
async def accept_friend_request_endpoint(requester_id: str, current_user: User = Depends(get_current_user)):
    try:
        friends.accept_friend_request(current_user.id, requester_id)
        return {"message": "Friend request accepted."}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

@app.post("/friend_request/{requester_id}/reject")
async def reject_friend_request_endpoint(requester_id: str, current_user: User = Depends(get_current_user)):
    try:
        friends.reject_friend_request(current_user.id, requester_id)
        return {"message": "Friend request rejected."}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

@app.delete("/friend/{friend_id}")
async def remove_friend_endpoint(friend_id: str, current_user: User = Depends(get_current_user)):
    try:
        friends.remove_friend(current_user.id, friend_id)
        return {"message": "Friend removed."}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

@app.get("/friends", response_model=List[User])
async def list_friends_endpoint(current_user: User = Depends(get_current_user)):
    friends_list = db.users.find({'_id': {'$in': current_user.friends}})
    return [User(**friend) for friend in friends_list]

@app.get("/friend_requests", response_model=Dict[str, List[User]])
async def list_friend_requests_endpoint(current_user: User = Depends(get_current_user)):
    incoming = db.users.find({'_id': {'$in': current_user.friend_requests_received}})
    outgoing = db.users.find({'_id': {'$in': current_user.friend_requests_sent}})
    return {
        "incoming": [User(**user) for user in incoming],
        "outgoing": [User(**user) for user in outgoing]
    }

# PDF and Bio Endpoints (Existing Code)
# ... [Your existing code remains unchanged here] ...

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
