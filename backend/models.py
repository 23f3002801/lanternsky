from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime


MoodType = Literal["hopeful", "nostalgic", "healing", "dream", "gratitude"]


class LanternCreate(BaseModel):
    message: str = Field(..., min_length=4, max_length=280)
    name: Optional[str] = Field(default="anonymous", max_length=50)
    mood: MoodType = Field(default="hopeful")


class LanternResponse(BaseModel):
    id: str
    message: str
    name: str
    mood: MoodType
    warmth_count: int
    created_at: str


class LanternsListResponse(BaseModel):
    lanterns: list[LanternResponse]
    total: int
    page: int
    limit: int