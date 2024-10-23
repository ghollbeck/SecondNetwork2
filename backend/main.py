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
from bson import ObjectId  # Ensure you're using bson for ObjectId

# Initialize FastAPI app
app = FastAPI()

# CORS middleware
origins = [
    "http://localhost:3000",  # Frontend URL
    "http://localhost:3002",  # Frontend alternative port if used
    # "http://localhost:8000",  # Backend URL (usually not needed here)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize GridFS for handling file storage
fs = gridfs.GridFS(db)

# Models for updating bio and custom fields
class BioUpdate(BaseModel):
    bio: str

class CustomField(BaseModel):
    title: str
    text: str
    isPublic: bool = Field(default=True)

class CustomFieldsUpdate(BaseModel):
    custom_fields: list[CustomField]

# User Registration
@app.post("/register")
async def register(user: UserCreate):
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    try:
        create_user(user)  # Pass the UserCreate object directly
        return {"message": "User created successfully"}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        print(f"Error during registration: {e}")
        raise HTTPException(status_code=500, detail="Failed to register user.")

# User Login
@app.post("/login")
async def login(user: UserLogin):
    db_user = get_user_by_email(user.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(user.password, db_user['hashed_password']):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": db_user['email']})
    return {"access_token": access_token, "token_type": "bearer"}

# Get Profile
@app.get("/profile", response_model=User)
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

# Update Profile
@app.put("/profile", response_model=User)
async def update_profile(user_update: UserUpdate, current_user: User = Depends(get_current_user)):
    try:
        db.users.update_one({'email': current_user.email}, {'$set': user_update.dict(exclude_unset=True)})
        updated_user = get_user_by_email(current_user.email)
        return User(**updated_user)
    except Exception as e:
        print(f"Error updating profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to update profile.")

# Upload PDF
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
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error during PDF upload: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload PDF.")

# Download PDF
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
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error during PDF download: {e}")
        raise HTTPException(status_code=500, detail="Failed to download PDF.")

# Check PDF
@app.get("/check_pdf")
async def check_pdf(current_user: User = Depends(get_current_user)):
    """Check if a user has already uploaded a PDF."""
    try:
        user = get_user_by_email(current_user.email)
        if not user or "pdf_id" not in user:
            return {"has_pdf": False}
        return {"has_pdf": True, "pdf_filename": user.get("pdf_filename", "")}
    except Exception as e:
        print(f"Error checking PDF: {e}")
        raise HTTPException(status_code=500, detail="Failed to check PDF.")

# Delete PDF
@app.delete("/delete_pdf")
async def delete_pdf(current_user: User = Depends(get_current_user)):
    try:
        # Fetch user from the database
        user = get_user_by_email(current_user.email)
        if not user or "pdf_id" not in user:
            raise HTTPException(status_code=404, detail="No PDF associated with this user.")

        # Get the PDF's GridFS ID
        pdf_id = user["pdf_id"]

        # Remove the file from GridFS
        fs.delete(pdf_id)
        print(f"PDF with ID {pdf_id} deleted successfully from GridFS.")

        # Remove the PDF reference from the user's profile
        db.users.update_one({"email": current_user.email}, {"$unset": {"pdf_id": "", "pdf_filename": ""}})
        print(f"User profile updated, PDF reference removed for user: {current_user.email}")

        return {"message": "PDF deleted successfully"}
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"Error during PDF deletion: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete PDF.")

# Update Bio
@app.put("/update_bio")
async def update_bio(bio_update: BioUpdate, current_user: User = Depends(get_current_user)):
    try:
        # Update user bio
        db.users.update_one({'email': current_user.email}, {'$set': {'bio': bio_update.bio}})
        print(f"Updated bio for user: {current_user.email}")
        updated_user = get_user_by_email(current_user.email)
        return {"message": "Bio updated successfully", "bio": updated_user.get("bio", "")}
    except Exception as e:
        print(f"Error updating bio: {e}")
        raise HTTPException(status_code=500, detail="Failed to update bio.")

# Update Custom Fields
@app.put("/update_custom_fields")
async def update_custom_fields(custom_fields_update: CustomFieldsUpdate, current_user: User = Depends(get_current_user)):
    try:
        # Convert CustomField Pydantic model to dictionary before storing in MongoDB
        custom_fields_dicts = [field.dict() for field in custom_fields_update.custom_fields]
        
        # Add or update the user's custom fields
        db.users.update_one(
            {'email': current_user.email},
            {'$set': {'custom_fields': custom_fields_dicts}}
        )
        print(f"Custom fields updated for user: {current_user.email}")
        return {"message": "Custom fields updated successfully"}
    except Exception as e:
        print(f"Error updating custom fields: {e}")
        raise HTTPException(status_code=500, detail="Failed to update custom fields.")

# Delete Custom Field
@app.delete("/delete_custom_field/{field_title}")
async def delete_custom_field(field_title: str, current_user: User = Depends(get_current_user)):
    try:
        # Remove a specific custom field by title
        db.users.update_one(
            {'email': current_user.email},
            {'$pull': {'custom_fields': {'title': field_title}}}
        )
        print(f"Custom field '{field_title}' deleted for user: {current_user.email}")
        return {"message": "Custom field deleted successfully"}
    except Exception as e:
        print(f"Error deleting custom field: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete custom field")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
