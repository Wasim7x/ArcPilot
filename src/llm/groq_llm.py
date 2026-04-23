import os 
import sys
from dotenv import load_dotenv
from pathlib import Path
sys.path[0] = str(Path(__file__).resolve().parent.parent)
from exception import MyException
from langchain_groq import ChatGroq

class GroqLLM:
    def __init__(self):
        load_dotenv()

    def get_llm(self):
        try: 
            self.groq_api_key = os.getenv("GROQ_API_KEY")
            llm = ChatGroq(api_key=self.groq_api_key, model='qwen/qwen3-32b')
            return llm
        except Exception as e:
            raise MyException(e, sys)
        