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
    
    def generate_functional_design(self, project_name, requirements, user_stories, design_feedback):
        """
        Helper node to generate functional design document
        """
        logger.info("Creating Functional Design Document")
        prompt = f"""
            Create a comprehensive functional design document for {project_name} in Markdown format.
    
            The document should use proper Markdown syntax with headers (# for main titles, ## for sections, etc.), 
            bullet points, tables, and code blocks where appropriate.
            
            Requirements:
            {self._format_list(requirements)}
            
            User Stories:
            {self._format_user_stories(user_stories)}

             {f"When creating this functional design document, please incorporate the following feedback about the requirements: {design_feedback}" if design_feedback else ""}
            
            The functional design document should include the following sections, each with proper Markdown formatting:
            
            # Functional Design Document: {project_name}
            
            ## 1. Introduction and Purpose
            ## 2. Project Scope
            ## 3. User Roles and Permissions
            ## 4. Functional Requirements Breakdown
            ## 5. User Interface Design Guidelines
            ## 6. Business Process Flows
            ## 7. Data Entities and Relationships
            ## 8. Validation Rules
            ## 9. Reporting Requirements
            ## 10. Integration Points
            
            Make sure to maintain proper Markdown formatting throughout the document.
        """
        try:
            response = self.llm.invoke(prompt)

        except Exception as e:
            logger.error(f"Error generating functional design document: {str(e)}")
            raise exception.MyException(error_message=str(e), error_detail=exception.sys)            

        return response.content   