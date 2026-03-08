from src import logger
from src import exception
from src.llm.groq__llm import GroqLLM
from src.llm.openai_llm import OpenAILLM
from src.state.sdlc_state import SDLCState, DesignDocument

class DesignNode:
    """ This node is responsible for designing the software architecture and components based on the requirements. 
    """
    def __init__(self, llm):
        self.llm = llm

    def create_design_document(self, state: SDLCState):
        """
        Generates the Design document functional and technical
        """
        logger.info("Creating design document based on the requirements and user stories.")
        requirements = state.get('requirements', '')
        user_stories = state.get('user_stories', '')
        project_name = state.get('project_name', '')
        design_feedback = None
        if 'design_documents' in state:
            design_feedback = state.get('design_documents','')['feedback_reason']

        functional_documents = self.generate_functional_design(
            project_name=project_name,
            requirements=requirements,
            user_stories=user_stories,
            design_feedback=design_feedback
        )

        technical_documents = self.generate_technical_design(
            project_name=project_name,
            requirements=requirements,
            user_stories=user_stories,
            design_feedback=design_feedback
        )

        design_documents = DesignDocument(
            functional=functional_documents,
            technical = technical_documents
        )

        return {
            **state,
            "current_node": "create_design_document",
            "next_required_input": "design_review",
            "design_documents": design_documents,
            "technical_documents": technical_documents
        }    