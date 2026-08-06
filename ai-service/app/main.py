from fastapi import FastAPI
from app.api.upload import router as upload_router

app = FastAPI(
    title="VertexLearn AI Service",
    version="1.0.0",
    description="AI Tutor Backend for VertexLearn LMS"
)

app.include_router(upload_router)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "VertexLearn AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }