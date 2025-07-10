import os

from fastapi import FastAPI
from api.v1 import auth
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Auth Microservice",
    version="1.0.0"
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
cors_origins = os.getenv("CORS_ORIGINS", "")
origins = [origin.strip() for origin in cors_origins.split(",") if origin.strip()]
# Добавляем CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
async def ping():
    return {"message": "pong"}
