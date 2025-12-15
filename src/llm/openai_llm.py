import sys
import os 
from pathlib import Path
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
sys.path[0] = str(Path(__file__).resolve().parent.parent)
from exception import MyException
from logger import Logger

class OpenAILLM:
    def __init__(self):
        load_dotenv()

    def get_llm(self):
        try: 
            self.openai_api_key = os.getenv("OPENAI_API_KEY")
            llm = ChatOpenAI(api_key=self.openai_api_key, model='gpt-4o')
            return llm
        except Exception as e:
            raise ValueError(f"Error occurred with exception: {e}")