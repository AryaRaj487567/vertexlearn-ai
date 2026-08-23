import faiss
import pickle
import numpy as np
import os

from app.services.embedding_service import get_model
from app.services.faiss_service import get_lecture_paths


def search_chunks(
    query: str,
    top_k: int = 3,
    course_id: str | None = None,
    lecture_id: str | None = None
):

    if not course_id:
        raise ValueError(
            "course_id is required for lecture-specific search"
        )

    if not lecture_id:
        raise ValueError(
            "lecture_id is required for lecture-specific search"
        )

    index_path, chunks_path = get_lecture_paths(
        course_id,
        lecture_id
    )

    print("========== VECTOR PATH DEBUG ==========")
    print("Current working directory:", os.getcwd())
    print("Index path:", index_path)
    print("Chunks path:", chunks_path)
    print("Index exists:", os.path.exists(index_path))
    print("Chunks exists:", os.path.exists(chunks_path))

    if os.path.exists(os.path.dirname(index_path)):
        print("Files in course folder:", os.listdir(os.path.dirname(index_path)))
    else:
        print("Course folder does not exist")

    print("=======================================")

    if not os.path.exists(index_path):
        raise FileNotFoundError(
            "No vector index found for this lecture"
        )

    if not os.path.exists(chunks_path):
        raise FileNotFoundError(
            "No chunks found for this lecture"
        )

    index = faiss.read_index(index_path)

    with open(chunks_path, "rb") as file:
        chunks = pickle.load(file)

    print("========== FAISS DEBUG ==========")
    print("Course ID:", course_id)
    print("Lecture ID:", lecture_id)
    print("Stored chunks:", len(chunks))
    print("=================================")

    query_embedding = get_model().encode(
        [query],
        convert_to_numpy=True
    )

    query_embedding = np.array(
        query_embedding
    ).astype("float32")

    search_k = min(
        index.ntotal,
        max(top_k, 1)
    )

    distances, indices = index.search(
        query_embedding,
        search_k
    )

    results = []

    for distance, index_position in zip(
        distances[0],
        indices[0]
    ):

        if index_position == -1:
            continue

        metadata = chunks[index_position]

        results.append({
            "chunk": metadata["chunk"],
            "course_id": metadata["course_id"],
            "lecture_id": metadata["lecture_id"],
            "distance": float(distance)
        })

    return results