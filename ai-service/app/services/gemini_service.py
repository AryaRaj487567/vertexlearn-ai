import os

from dotenv import load_dotenv
from google import genai


load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not configured")


client = genai.Client(api_key=api_key)


def generate_answer(question: str, context: str):

    prompt = f"""
You are VertexLearn AI Tutor.

Answer the user's question using ONLY the provided context.

Rules:
1. Do not invent information.
2. Do not use outside knowledge.
3. If the context does not contain the answer, say:
"I don't have enough information in the provided course material."
4. Give a clear and concise answer.

Context:
{context}

Question:
{question}

Answer:
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text