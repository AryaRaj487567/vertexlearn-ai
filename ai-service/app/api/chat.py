from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.search_service import search_chunks
from app.services.gemini_service import generate_answer


router = APIRouter()


class ChatRequest(BaseModel):
    question: str
    top_k: int = 3
    user_id: str | None = None
    course_id: str | None = None
    lecture_id: str | None = None

@router.post("/chat")
async def chat(request: ChatRequest):

    if not request.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty"
        )

    try:

        # Retrieve relevant chunks from FAISS
        results = search_chunks(
            request.question,
            request.top_k,
            request.course_id,
            request.lecture_id
        )

        # Combine retrieved chunks into context
        context = "\n\n".join(
            result["chunk"]
            for result in results
        )

        # Generate answer using Gemini
        answer = generate_answer(
            request.question,
            context
        )

        return {
            "success": True,
            "question": request.question,
            "answer": answer,
            "sources": results
        }

    except FileNotFoundError as error:

        raise HTTPException(
            status_code=404,
            detail=str(error)
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )