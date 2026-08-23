import faiss
import numpy as np
import pickle
import os


from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
VECTOR_FOLDER = BASE_DIR / "vectors"


def get_lecture_paths(course_id, lecture_id):
    course_folder = VECTOR_FOLDER / str(course_id)

    course_folder.mkdir(parents=True, exist_ok=True)

    index_path = course_folder / f"{lecture_id}.faiss"
    chunks_path = course_folder / f"{lecture_id}.pkl"

    return str(index_path), str(chunks_path)


def save_embeddings(
    chunks,
    embeddings,
    course_id,
    lecture_id
):

    index_path, chunks_path = get_lecture_paths(
        course_id,
        lecture_id
    )

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(
        np.array(embeddings).astype("float32")
    )

    faiss.write_index(
        index,
        index_path
    )

    metadata = []

    for chunk in chunks:

        metadata.append({
            "chunk": chunk,
            "course_id": course_id,
            "lecture_id": lecture_id
        })

    with open(
        chunks_path,
        "wb"
    ) as file:

        pickle.dump(
            metadata,
            file
        )

    return len(chunks)