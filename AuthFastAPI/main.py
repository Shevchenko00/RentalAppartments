from fastapi import FastAPI
from api.v1 import auth

app = FastAPI(
    title="Auth Microservice",
    version="1.0.0"
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
