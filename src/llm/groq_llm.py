import sys
from pathlib import Path
sys.path[0] = str(Path(__file__).resolve().parent.parent)
from exception import MyException
from langchain_groq import ChatGroq

class GroqLLM:
    def __init__(self, api_key: str, model_name: str):
        self.api_key = api_key
        self.model_name = model_name

    def get_llm(self):
        try:
            llm = ChatGroq(api_key=self.api_key, model=self.model_name)
            return llm
        except Exception as e:
            raise MyException(e, sys)