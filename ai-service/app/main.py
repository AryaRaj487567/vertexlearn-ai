from fastapi import FastAPI

app = FastAPI(
    title="VertexLearn AI Service",
    version="1.0.0",
    description="AI Tutor Backend for VertexLearn LMS"
)


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