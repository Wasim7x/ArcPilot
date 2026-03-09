import os
import sys
from dotenv import load_dotenv
from pathlib import Path

sys.path[0] = str(Path(__file__).resolve().parent.parent)

from exception import MyException
from langchain_google_genai import ChatGoogleGenerativeAI


class GeminiLLM:
    def __init__(self):
        load_dotenv()

    def get_llm(self):
        try:
            self.gemini_api_key = os.getenv("GEMINI_API_KEY")

            llm = ChatGoogleGenerativeAI(
                google_api_key=self.gemini_api_key,
                model="gemini-1.5-flash",   # cheap + fast model
                temperature=0.7
            )

            return llm

        except Exception as e:
            raise MyException(e, sys)