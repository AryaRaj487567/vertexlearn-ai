from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):

    embeddings = model.encode(
        chunks,
        convert_to_numpy=True
    )

    return embeddings