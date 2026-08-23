from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.search_service import search_chunks


router = APIRouter()


class SearchRequest(BaseModel):
    query: str
    top_k: int = 3
    course_id: str
    lecture_id: str


@router.post("/search")
async def search(request: SearchRequest):

    if not request.query.strip():
        raise HTTPException(
            status_code=400,
            detail="Query cannot be empty"
        )

    try:

        results = search_chunks(
            request.query,
            request.top_k,
            request.course_id,
            request.lecture_id
        )

        return {
            "success": True,
            "query": request.query,
            "results": results
        }

    except FileNotFoundError as error:

        raise HTTPException(
            status_code=404,
            detail=str(error)
        )

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )