FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Verify vector files are present inside the Docker image
RUN echo "===== VECTOR FILE CHECK =====" && \
    find /app/vectors -type f -maxdepth 3 -print && \
    echo "============================="

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}"]