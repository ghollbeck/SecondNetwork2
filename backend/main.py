# backend/main.py

from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from auth import get_current_user, create_access_token
from models import UserCreate, UserLogin, UserUpdate, User
from database import db, get_user_by_email, create_user, verify_password
import uvicorn
import gridfs
from pymongo import MongoClient
from fastapi.responses import StreamingResponse  # Add this import



from pydantic import BaseModel

class BioUpdate(BaseModel):
    bio: str




app = FastAPI()

# CORS middleware
origins = [
    "http://localhost:3000",  # Adjust according to your frontend URL
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, consider restricting this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize GridFS for handling file storage
fs = gridfs.GridFS(db)



@app.post("/register")
async def register(user: UserCreate):
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    create_user(user)
    return {"message": "User created successfully"}

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
    db.users.update_one({'email': current_user.email}, {'$set': user_update.dict(exclude_unset=True)})
    updated_user = get_user_by_email(current_user.email)
    return User(**updated_user)





@app.post("/register")
async def register(user: UserCreate):
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    create_user(user)
    return {"message": "User created successfully"}





@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    try:
        print("Starting PDF upload process.")
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")

        # Store the PDF in GridFS
        pdf_id = fs.put(file.file, filename=file.filename, content_type=file.content_type)
        print(f"PDF uploaded to GridFS with ID: {pdf_id}")

        # Update the user's profile to store the reference to the PDF file
        db.users.update_one(
            {"email": current_user.email},
            {"$set": {"pdf_id": pdf_id, "pdf_filename": file.filename}}
        )
        print("User profile updated with PDF ID.")

        return {"message": "PDF uploaded successfully", "pdf_id": str(pdf_id)}
    except Exception as e:
        print(f"Error during PDF upload: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload PDF.")



@app.get("/download_pdf")
async def download_pdf(current_user: User = Depends(get_current_user)):
    try:
        print("Starting PDF download process.")
        user = get_user_by_email(current_user.email)
        if not user or "pdf_id" not in user:
            print("No PDF associated with this user.")
            raise HTTPException(status_code=404, detail="No PDF associated with this user.")

        pdf_id = user["pdf_id"]
        grid_out = fs.get(pdf_id)
        print("PDF found and ready for download.")

        return StreamingResponse(grid_out, media_type="application/pdf", headers={
            "Content-Disposition": f"attachment; filename={user['pdf_filename']}"
        })
    except Exception as e:
        print(f"Error during PDF download: {e}")
        raise HTTPException(status_code=500, detail="Failed to download PDF.")


@app.get("/check_pdf")
async def check_pdf(current_user: User = Depends(get_current_user)):
    """Check if a user has already uploaded a PDF."""
    user = get_user_by_email(current_user.email)
    if not user or "pdf_id" not in user:
        return {"has_pdf": False}
    return {"has_pdf": True, "pdf_filename": user.get("pdf_filename", "")}




@app.put("/update_bio")
async def update_bio(bio_update: BioUpdate, current_user: User = Depends(get_current_user)):
    # Update user bio
    db.users.update_one({'email': current_user.email}, {'$set': {'bio': bio_update.bio}})
    print(f"Updated bio for user: {current_user.email}")
    updated_user = get_user_by_email(current_user.email)
    return {"message": "Bio updated successfully", "bio": updated_user["bio"]}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
