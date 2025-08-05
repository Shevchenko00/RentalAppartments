from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from jose import jwt, JWTError

from db.sessions import Session
from db.models import User
from db.sessions import get_db
from services.auth import verify_password, create_access_token, create_refresh_token, hash_password
from fastapi import Path
from schemas.user import UserPublicSchema
from schemas.user import UserRegisterSchema, LoginSchema

from services.auth import SECRET_KEY, ALGORITHM

router = APIRouter()


@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=15)
    )
    refresh_token = create_refresh_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(days=5)
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post("/register")
def register(user_data: UserRegisterSchema, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=user_data.email,
        password=hash_password(user_data.password),
        city=user_data.city,
        country=user_data.country,
        phone_number=user_data.phone_number,
        phone_country_code=user_data.phone_country_code,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        date_birth=user_data.date_birth,
        is_landlord=user_data.is_landlord,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=15)
    )
    refresh_token = create_refresh_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(days=5)
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user_id": user.id,
    }


@router.post("/refresh")
def refresh_token(refresh_token: str):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        new_token = create_access_token({"sub": user_id})
        return {"access_token": new_token, "token_type": "bearer"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

@router.get("/users/{user_id}", response_model=UserPublicSchema)
def get_user_info(
    user_id: int = Path(..., description="ID пользователя"),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
