import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.lanterns import router as lanterns_router
from database import connect_db, close_db

app = FastAPI(
    title="LanternSky API",
    description="Backend for the LanternSky wish-sharing experience",
    version="1.0.0"
)

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await close_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://lanternsky.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lanterns_router, prefix="/lanterns", tags=["lanterns"])

@app.get("/")
async def root():
    return {"message": "🕯️ LanternSky API is alive"}

@app.get("/health")
async def health():
    return {"status": "ok"}