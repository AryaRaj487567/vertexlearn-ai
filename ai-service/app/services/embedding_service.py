from sentence_transformers import SentenceTransformer


_model = None


def get_model():
    global _model

    if _model is None:
        _model = SentenceTransformer(
            "all-MiniLM-L6-v2",
            device="cpu"
        )

    return _model


def generate_embeddings(chunks):

    model = get_model()

    embeddings = model.encode(
        chunks,
        convert_to_numpy=True
    )

    return embeddings