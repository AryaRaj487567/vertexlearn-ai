from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_service import extract_text_from_pdf
from app.services.pdf_service import (
    extract_text_from_pdf,
    create_chunks,
)
import os
import shutil

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

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

    return {
    "success": True,
    "filename": file.filename,
    "characters": len(extracted_text),
    "chunks": len(chunks),
    "first_chunk": chunks[0]
}