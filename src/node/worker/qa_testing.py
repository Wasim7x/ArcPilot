from src import logger
from src import exception   
from src.state.sdlc_state import SDLCState

class qa_testing:
    def __init__(self, llm):
        self.llm = llm

    def qa_testing(self, state: SDLCState):
        """
            Performs QA testing based on the generated code and test cases
        """
        logger.info("----- Starting QA Testing -----")
       
        code_generated = state.get('code_generated', '')
        test_cases = state.get('test_cases', '')

        prompt = f"""
            You are a QA testing expert. Based on the following Python code and test cases, simulate running the test cases and provide feedback:
            
            ### Code:
            ```
            {code_generated}
            ```

            ### Test Cases:
            ```
            {test_cases}
            ```

            Focus on:
            1. Identifying which test cases pass and which fail.
            2. Providing detailed feedback for any failed test cases, including the reason for failure.
            3. Suggesting improvements to the code or test cases if necessary.

            Provide the results in the following format:
            - Test Case ID: [ID]
            Status: [Pass/Fail]
            Feedback: [Detailed feedback if failed]
        """

        try:
            response = self.llm.invoke(prompt)
        except Exception as e:
            logger.error(f"Error generating functional qa testing document: {str(e)}")
            raise exception.MyException(error_message=str(e), error_detail=exception.sys)            

        qa_testing_comments = response.content

        return {
            **state,
            "current_node": "qa_testing",
            "next_required_input": "qa_testing_review" if state['test_case_review_status'] == "approved" else "generate_test_cases",
            "qa_testing_status": state['test_case_review_status'],
            "qa_testing_comments": qa_testing_comments
        }
    
    def qa_testing_review(self, state: SDLCState):
        """
            Process the human decision from the UI
        """
        logger.info("----- QA Testing Review -----")
        # Mark that human input is required.
        # return {
        #     "human_input_required": True,
        #     "timestamp": datetime.now().isoformat()
        # }
        pass

    def qa_testing_review_router(self, state: SDLCState):
        """
            Evaluates tests cases review is required or not.
        """
        return state['qa_testing_status']
