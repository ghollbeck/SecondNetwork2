# backend/database.py

from pymongo import MongoClient
from passlib.context import CryptContext

# Replace 'mongodb://localhost:27017/' with your MongoDB connection string if needed
client = MongoClient('mongodb://gabor_hollbeck:1001@localhost:27018/')
db = client['mydatabase']  # Change 'mydatabase' to your database name

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(email: str):
    return db.users.find_one({'email': email})

def create_user(user):
    if db.users.find_one({'username': user.username}):
        raise ValueError("Username already taken")
    hashed_password = pwd_context.hash(user.password)
    user_dict = user.dict()
    user_dict['hashed_password'] = hashed_password
    del user_dict['password']
    print(f"Inserting user: {user_dict}")  # Add this line
    db.users.insert_one(user_dict)
    return user_dict['_id']


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
