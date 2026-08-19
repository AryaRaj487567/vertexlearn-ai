import faiss
import numpy as np
import pickle
import os


VECTOR_FOLDER = "vectors"

os.makedirs(VECTOR_FOLDER, exist_ok=True)


def get_lecture_paths(course_id, lecture_id):
    course_folder = os.path.join(
        VECTOR_FOLDER,
        str(course_id)
    )

    os.makedirs(course_folder, exist_ok=True)

    index_path = os.path.join(
        course_folder,
        f"{lecture_id}.faiss"
    )

    chunks_path = os.path.join(
        course_folder,
        f"{lecture_id}.pkl"
    )

    return index_path, chunks_path


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