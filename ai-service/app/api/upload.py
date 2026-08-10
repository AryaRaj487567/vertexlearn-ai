from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.services.pdf_service import extract_text_from_pdf
from app.services.pdf_service import (
    extract_text_from_pdf,
    create_chunks,
)
from app.services.embedding_service import generate_embeddings
from app.services.faiss_service import save_embeddings
import os
import shutil

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    course_id: str = Form(...),
    lecture_id: str = Form(...),
):

    if not course_id.strip():
        raise HTTPException(
           status_code=400,
           detail="Course ID is required"
        )

    if not lecture_id.strip():
        raise HTTPException(
           status_code=400,
           detail="Lecture ID is required"
    )

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    chunks = create_chunks(extracted_text)

    embeddings = generate_embeddings(chunks)

    stored_chunks = save_embeddings(
    chunks,
    embeddings,
    course_id,
    lecture_id
)

    return {
    "success": True,
    "filename": file.filename,
    "course_id": course_id,
    "lecture_id": lecture_id,
    "characters": len(extracted_text),
    "chunks": stored_chunks,
    "embedding_dimension": embeddings.shape[1],
    "message": "PDF indexed successfully"
}