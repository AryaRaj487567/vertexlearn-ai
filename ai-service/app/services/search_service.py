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


def search_chunks(
    query: str,
    top_k: int = 3,
    course_id: str | None = None,
    lecture_id: str | None = None
):

    if not os.path.exists(INDEX_PATH):
        raise FileNotFoundError("FAISS index not found")

    if not os.path.exists(CHUNKS_PATH):
        raise FileNotFoundError("Chunks file not found")

    index = faiss.read_index(INDEX_PATH)

    with open(CHUNKS_PATH, "rb") as file:
        chunks = pickle.load(file)

        print("========== FAISS DEBUG ==========")
        print("Requested course_id:", course_id)
        print("Requested lecture_id:", lecture_id)
        print("Total stored chunks:", len(chunks))

        if len(chunks) > 0:
            print("First stored metadata:")
            print(chunks[0])

        print("=================================")

    query_embedding = model.encode(
        [query],
        convert_to_numpy=True
    )

    query_embedding = np.array(
        query_embedding
    ).astype("float32")

    # Search more candidates because some may
    # belong to other courses/lectures.
    search_k = min(
        index.ntotal,
        max(top_k * 10, 50)
    )

    distances, indices = index.search(
        query_embedding,
        search_k
    )

    results = []

    for distance, index_position in zip(
        distances[0],
        indices[0],
    ):

        print("========== SEARCH RESULTS ==========")
        print("FAISS indices:", indices[0])
        print("FAISS distances:", distances[0])
        print("====================================")

        if index_position == -1:
            continue

        metadata = chunks[index_position]
        print("Checking metadata:")
        print(metadata)
        print("Course match:", metadata.get("course_id") == course_id)
        print("Requested lecture_id:", repr(lecture_id))
        print("Stored lecture_id:", repr(metadata.get("lecture_id")))

        print(
            "Requested lecture_id length:",
            len(lecture_id) if lecture_id else None
        )

        print(
            "Stored lecture_id length:",
            len(metadata.get("lecture_id"))
            if metadata.get("lecture_id")
            else None
        )

        print(
            "Lecture match:",
            metadata.get("lecture_id") == lecture_id
        )

        # Filter by course if provided
        if course_id is not None:
            if metadata.get("course_id") != course_id:
                continue

        # Filter by lecture if provided
        if lecture_id is not None:
            if metadata.get("lecture_id") != lecture_id:
                continue

        results.append({
            "chunk": metadata["chunk"],
            "course_id": metadata.get("course_id"),
            "lecture_id": metadata.get("lecture_id"),
            "distance": float(distance)
        })

        if len(results) >= top_k:
            break

    return results