from src import logger
from src import exception
from src.state.sdlc_state import SDLCState

class tester:
    def __init__(self, llm):
        self.llm = llm

    def generate_test_cases(self, state: SDLCState):
        """
            Generates the test cases based on the generated code and code review comments
        """
        print("----- Generating Test Cases ----")
    
        # Get the generated code and code review comments from the state
        code_generated = state.get('code_generated', '')
        code_review_comments = state.get('code_review_comments', '')

         # Create a prompt for the LLM to generate test cases
        prompt = f"""
            You are a software testing expert. Based on the following Python code and its review comments, generate comprehensive test cases:
            
            ### Code:
            ```
                {code_generated}
                ```

                ### Code Review Comments:
                {code_review_comments}

                Focus on:
                1. Covering all edge cases and boundary conditions.
                2. Ensuring functional correctness of the code.
                3. Including both positive and negative test cases.
                4. Writing test cases in Python's `unittest` framework format.

                Provide the test cases in Python code format, ready to be executed.
        """

         # Invoke the LLM to generate the test cases
        response = self.llm.invoke(prompt)
        test_cases = response.content

        # Update the state with the generated test cases
        return {
            **state,
            "current_node": "generate_test_cases",
            "next_required_input": "test_cases_review",
            "test_cases": test_cases,
        }
    
    def test_cases_review(self, state: SDLCState):
        """
            Process the human decision from the UI
        """
        print("----- Test cases Review -----")
        # Mark that human input is required.
        # return {
        #     "human_input_required": True,
        #     "timestamp": datetime.now().isoformat()
        # }
        pass
    
    def test_cases_review_router(self, state: SDLCState):
        """
            Evaluates tests cases review is required or not.
        """
        return state['test_case_review_status']