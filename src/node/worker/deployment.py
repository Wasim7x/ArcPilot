import sys
from src import logger
from src import exception
from src.state.sdlc_state import SDLCState

class deployment:
    def __init__(self, llm):
        self.llm = llm

    def deployment(self, state: SDLCState):
        """
            Performs teh deployment
        """
        logger.info("----- Starting Deployment -----")
        # Get the generated code and deployment status from the state

        # Get the generated code and QA testing status from the state
        code_generated = state.get('code_generated', '')
        qa_testing_status = state.get('qa_testing_status', '')

        # Create a prompt for the LLM to simulate deployment
        prompt = f"""
            You are a DevOps expert. Based on the following Python code, simulate the deployment process and provide feedback:
            
            ### Code:
            ```
            {code_generated}
            ```

            Focus on:
            1. Identifying potential deployment issues (e.g., missing dependencies, configuration errors).
            2. Providing recommendations to resolve any issues.
            3. Confirming whether the deployment is successful or needs further action.

            Provide the results in the following format:
            - Deployment Status: [Success/Failed]
            - Feedback: [Detailed feedback on the deployment process]
        """

        # Invoke the LLM to simulate deployment
        response = self.llm.invoke(prompt)
        deployment_feedback = response.content

         # Determine the deployment status based on the feedback
        if "SUCCESS" in deployment_feedback.upper():
            deployment_status = "success"
        else:
            deployment_status = "failed"

        # Update the state with the deployment results
        return {
            **state,
            "current_node": "deployment",
            "next_required_input": "end" if deployment_status == "success" else "qa_testing",
            "deployment_status": deployment_status,
            "deployment_feedback": deployment_feedback
        }