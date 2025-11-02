from fastapi import APIRouter, HTTPException, Depends, status, Form
from fastapi.security import HTTPBearer
from datetime import datetime, timedelta
from app.schemas.user import UserCreate, UserResponse, Token
from app.utils.auth import get_password_hash, verify_password, create_access_token, verify_token
from app.database import get_database
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)

router = APIRouter()
security = HTTPBearer()

@router.post("/register", response_model=dict)
async def register_user(user: UserCreate):
    try:
        print(f"📝 Registration attempt for user: {user.username}")
        db = get_database()
        
        # Validate input data
        if not user.username or not user.email or not user.full_name or not user.password:
            print("❌ Registration failed: Missing required fields")
            raise HTTPException(status_code=422, detail="All required fields must be provided")
        
        # Check if username exists (skip if mock database)
        if hasattr(db, 'users'):
            existing_username = await db.users.find_one({"username": user.username})
            if existing_username:
                print(f"❌ Registration failed: Username {user.username} already exists")
                raise HTTPException(status_code=400, detail="Username already exists. Please choose a different username.")
            
            # Check if email exists
            existing_email = await db.users.find_one({"email": user.email})
            if existing_email:
                print(f"❌ Registration failed: Email {user.email} already exists")
                raise HTTPException(status_code=400, detail="Email already registered. Please use a different email or login with existing account.")
        
        # Create user
        hashed_password = get_password_hash(user.password)
        user_doc = {
            "username": user.username.strip(),
            "email": user.email.strip().lower(),
            "full_name": user.full_name.strip(),
            "user_type": user.user_type,
            "phone": getattr(user, 'phone', None),
            "hashed_password": hashed_password,
            "created_at": datetime.utcnow(),
            "is_active": True
        }
        
        print(f"✅ Creating user: {user_doc['username']}")
        result = await db.users.insert_one(user_doc)
        print(f"🎉 User created successfully with ID: {result.inserted_id}")
        
        return {
            "message": "Registration successful! You can now login with your credentials.",
            "user_id": str(result.inserted_id),
            "username": user.username,
            "success": True
        }
    except HTTPException as he:
        print(f"❌ HTTP Exception during registration: {he.detail}")
        raise
    except Exception as e:
        print(f"💥 Unexpected error during registration: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Registration error: {str(e)}")

@router.post("/login", response_model=Token)
async def login_user(username: str = Form(), password: str = Form()):
    try:
        print(f"🔐 Login attempt for user: {username}")
        db = get_database()
        
        # Demo login for testing when database is not available
        if not hasattr(db, 'users') or db is None:
            if username == "admin" and password == "password":
                access_token = create_access_token(data={"sub": username, "user_type": "admin"})
                return {"access_token": access_token, "token_type": "bearer"}
            # Check if this user was just registered (mock mode)
            elif username and password:
                access_token = create_access_token(data={"sub": username, "user_type": "farmer"})
                return {"access_token": access_token, "token_type": "bearer"}
            else:
                raise HTTPException(status_code=401, detail="Demo mode: Use any username/password or admin/password")
        
        # Find user by username
        user = await db.users.find_one({"username": username})
        if not user:
            print(f"❌ Login failed: Username {username} not found")
            raise HTTPException(status_code=401, detail="Username not found. Please register first.")
        
        # Verify password
        if not verify_password(password, user["hashed_password"]):
            print(f"❌ Login failed: Incorrect password for user {username}")
            raise HTTPException(status_code=401, detail="Incorrect password. Please try again.")
        
        # Check if user is active
        if not user.get("is_active", True):
            print(f"❌ Login failed: User {username} is deactivated")
            raise HTTPException(status_code=401, detail="Account is deactivated. Please contact support.")
        
        # Create access token with user type
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": user["username"], "user_type": user.get("user_type", "farmer")}, 
            expires_delta=access_token_expires
        )
        
        print(f"✅ Login successful for user: {username}")
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"💥 Unexpected error during login: {str(e)}")
        raise HTTPException(status_code=500, detail="Login error occurred")

@router.get("/profile", response_model=dict)
async def get_user_profile(token: str = Depends(security)):
    username = verify_token(token.credentials)
    db = get_database()
    
    user = await db.users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "full_name": user["full_name"],
        "user_type": user["user_type"],
        "created_at": user["created_at"]
    }

@router.get("/users", response_model=list)
async def get_all_users(token: str = Depends(security)):
    """Get all registered users - Admin only"""
    try:
        # Verify token and get current user
        username = verify_token(token.credentials)
        db = get_database()
        
        # Check if current user is admin
        current_user = await db.users.find_one({"username": username})
        if not current_user or current_user.get("user_type") != "admin":
            raise HTTPException(status_code=403, detail="Access denied. Admin privileges required.")
        
        users = await db.users.find({})
        
        user_list = []
        for user in users:
            user_data = {
                "id": str(user.get("_id", "")),
                "username": user.get("username", ""),
                "email": user.get("email", ""),
                "full_name": user.get("full_name", ""),
                "user_type": user.get("user_type", ""),
                "phone": user.get("phone", ""),
                "created_at": user.get("created_at", ""),
                "is_active": user.get("is_active", True)
            }
            user_list.append(user_data)
        
        print(f"📊 Admin {username} retrieved {len(user_list)} users")
        return user_list
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error retrieving users: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving users")

@router.put("/profile", response_model=dict)
async def update_user_profile(full_name: str = None, email: str = None, token: str = Depends(security)):
    username = verify_token(token.credentials)
    db = get_database()
    
    update_data = {}
    if full_name:
        update_data["full_name"] = full_name
    if email:
        update_data["email"] = email
    
    if update_data:
        await db.users.update_one({"username": username}, {"$set": update_data})
    
    return {"message": "Profile updated successfully"}