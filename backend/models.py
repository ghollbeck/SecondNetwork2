# backend/models.py

from pydantic import BaseModel, EmailStr
from typing import Optional

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
    bio: Optional[str] = None

class TokenData(BaseModel):
    email: Optional[str] = None




