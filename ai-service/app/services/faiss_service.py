import faiss
import numpy as np
import pickle
import os

VECTOR_FOLDER = "vectors"

os.makedirs(VECTOR_FOLDER, exist_ok=True)

def save_embeddings(
    chunks,
    embeddings,
    course_id,
    lecture_id
):

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(
        np.array(embeddings).astype("float32")
    )

    faiss.write_index(
        index,
        os.path.join(
            VECTOR_FOLDER,
            "course_index.faiss"
        )
    )

    metadata = []

    for chunk in chunks:

        metadata.append({
            "chunk": chunk,
            "course_id": course_id,
            "lecture_id": lecture_id
        })

    with open(
        os.path.join(
            VECTOR_FOLDER,
            "chunks.pkl"
        ),
        "wb"
    ) as file:

        pickle.dump(
            metadata,
            file
        )

    return len(chunks)