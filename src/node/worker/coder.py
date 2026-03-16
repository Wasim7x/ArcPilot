import sys
from src import logger
from src import exception
from src.state.sdlc_state import SDLCState
class Code:
    def __init__(self, llm):
        self.llm = llm  

    def generate_code(self, state: SDLCState):
            """
                Generates the code for the requirements in the design document
            """
            logger.info("Generating code based on the SDLC state")
            prompt = f"""
            Generate Python code based on the following SDLC state:

                Project Name: {state['project_name']}

                ### Requirements:
                {"".join([f"- {req}\n" for req in state['requirements']])}

                ### User Stories:
                {"".join([f"- {story['title']}: {story['description']}\n" for story in state['user_stories']])}

                ### Functional Design Document:
                {state['design_documents']['functional']}

                ### Technical Design Document:
                {state['design_documents']['technical']}

                The generated Python code should include:

                1. **Comments for Requirements**: Add each requirement as a comment in the generated code.
                2. **User Stories Implementation**: Include placeholders for each user story, with its description and acceptance criteria as comments.
                3. **Functional Design Reference**: Incorporate the functional design document content as a comment in the relevant section.
                4. **Technical Design Reference**: Include the technical design document details in a comment under its section.
                5. **Modularity**: Structure the code to include placeholders for different functionalities derived from the SDLC state, with clear comments indicating where each functionality should be implemented.
                6. **Python Formatting**: The generated code should follow Python syntax and best practices.

                Ensure the output code is modular, well-commented, and ready for development.
            """
            try:     
                response = self.llm.invoke(prompt)
            except Exception as e:
                raise exception.MyException(e, sys)                
            next_required_input = "code_review" if state['design_documents']['review_status'] == "approved" else "create_design_document"
            code_review_comments = self.get_code_review_comments(code=response.content)
            return {
                    'code_generated': response.content, 
                    'next_required_input': next_required_input, 
                    'current_node': 'generate_code',
                    'code_review_comments': code_review_comments
                }
    
    def get_code_review_comments(self, code: str):
        """
        Generate code review comments for the provided code
        """
        print("----- Generating code review comments ----")
        
        # Create a prompt for the LLM to review the code
        prompt = f"""
            You are a coding expert. Please review the following code and provide detailed feedback:
            ```
            {code}
            ```
            Focus on:
            1. Code quality and best practices
            2. Potential bugs or edge cases
            3. Performance considerations
            4. Security concerns
            
            End your review with an explicit APPROVED or NEEDS_FEEDBACK status.
        """
        
        # Get the review from the LLM
        response = self.llm.invoke(prompt)
        review_comments = response.content
        return review_comments
    
    def code_review(self, state: SDLCState):
        """
            Performs the Design review
        """
        pass

    def code_review_router(self, state: SDLCState):
        """
            Evaluates design review is required or not.
        """
        return state['code_review_status']