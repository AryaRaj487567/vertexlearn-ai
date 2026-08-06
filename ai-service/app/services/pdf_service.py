import fitz

from langchain_text_splitters import RecursiveCharacterTextSplitter


def extract_text_from_pdf(pdf_path: str):

    document = fitz.open(pdf_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return text


def create_chunks(text: str):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
    )

    chunks = splitter.split_text(text)

    return chunks