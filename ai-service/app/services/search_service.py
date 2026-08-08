import faiss
import pickle
import numpy as np
import os

from app.services.embedding_service import model


VECTOR_FOLDER = "vectors"

INDEX_PATH = os.path.join(
    VECTOR_FOLDER,
    "course_index.faiss"
)

CHUNKS_PATH = os.path.join(
    VECTOR_FOLDER,
    "chunks.pkl"
)


def search_chunks(query: str, top_k: int = 3):

    if not os.path.exists(INDEX_PATH):
        raise FileNotFoundError("FAISS index not found")

    if not os.path.exists(CHUNKS_PATH):
        raise FileNotFoundError("Chunks file not found")

    index = faiss.read_index(INDEX_PATH)

    with open(CHUNKS_PATH, "rb") as file:
        chunks = pickle.load(file)

    query_embedding = model.encode(
        [query],
        convert_to_numpy=True
    )

    query_embedding = np.array(
        query_embedding
    ).astype("float32")

    distances, indices = index.search(
        query_embedding,
        top_k
    )

    results = []

    for distance, index_position in zip(
        distances[0],
        indices[0]
    ):

        if index_position == -1:
            continue

        results.append({
            "chunk": chunks[index_position],
            "distance": float(distance)
        })

    return results