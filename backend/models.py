# backend/models.py

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from bson import ObjectId

class PyObjectId(ObjectId):
    """Custom Pydantic ObjectId type to handle MongoDB ObjectIds."""
    
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return ObjectId(v)
    
    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str
    bio: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    username: Optional[str]
    bio: Optional[str]

class User(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    bio: Optional[str] = None
    friends: List[PyObjectId] = Field(default_factory=list)
    friend_requests_sent: List[PyObjectId] = Field(default_factory=list)
    friend_requests_received: List[PyObjectId] = Field(default_factory=list)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "_id": "60f7f9c2d6e8f2a1b4c8d4e5",
                "email": "john.doe@example.com",
                "username": "johndoe",
                "bio": "Hello, I'm John!",
                "friends": [],
                "friend_requests_sent": [],
                "friend_requests_received": []
            }
        }

class TokenData(BaseModel):
    email: Optional[str] = None
