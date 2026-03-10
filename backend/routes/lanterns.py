from fastapi import APIRouter, HTTPException, Query
from datetime import datetime
import uuid
import random

from database import get_db
from models import LanternCreate, LanternResponse, LanternsListResponse

router = APIRouter()


def serialize_lantern(doc: dict) -> dict:
    doc["id"] = str(doc.get("_id", doc.get("id", "")))
    doc.pop("_id", None)
    return doc


@router.get("", response_model=LanternsListResponse)
async def list_lanterns(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, le=50),
    mood: str = Query(default=None),
):
    db = get_db()
    query = {}
    if mood:
        query["mood"] = mood

    skip = (page - 1) * limit
    total = await db.lanterns.count_documents(query)
    cursor = db.lanterns.find(query).sort("created_at", -1).skip(skip).limit(limit)
    docs = await cursor.to_list(length=limit)

    return LanternsListResponse(
        lanterns=[LanternResponse(**serialize_lantern(d)) for d in docs],
        total=total,
        page=page,
        limit=limit,
    )


@router.post("", response_model=LanternResponse, status_code=201)
async def create_lantern(data: LanternCreate):
    db = get_db()
    lantern = {
        "id": str(uuid.uuid4()),
        "message": data.message,
        "name": data.name or "anonymous",
        "mood": data.mood,
        "warmth_count": 0,
        "created_at": datetime.utcnow().isoformat(),
    }
    await db.lanterns.insert_one({**lantern, "_id": lantern["id"]})
    return LanternResponse(**lantern)


@router.get("/random", response_model=LanternResponse)
async def get_random_lantern(mood: str = Query(default=None)):
    db = get_db()
    query = {}
    if mood:
        query["mood"] = mood

    count = await db.lanterns.count_documents(query)
    if count == 0:
        raise HTTPException(status_code=404, detail="No lanterns found")

    skip = random.randint(0, count - 1)
    doc = await db.lanterns.find_one(query, skip=skip)
    if not doc:
        raise HTTPException(status_code=404, detail="Lantern not found")

    return LanternResponse(**serialize_lantern(doc))


@router.get("/{lantern_id}", response_model=LanternResponse)
async def get_lantern(lantern_id: str):
    db = get_db()
    doc = await db.lanterns.find_one({"id": lantern_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Lantern not found")
    return LanternResponse(**serialize_lantern(doc))


@router.post("/{lantern_id}/warmth", status_code=200)
async def send_warmth(lantern_id: str):
    db = get_db()
    result = await db.lanterns.update_one(
        {"id": lantern_id},
        {"$inc": {"warmth_count": 1}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lantern not found")
    return {"message": "Warmth sent ❤️"}