from src import logger
from src import exception
from src.state.sdlc_state import SDLCState

class security:
    def __init__(self, llm):
        self.llm = llm

    def security_recommendations(self, state: SDLCState):
        """
            Performs security review of the code generated
        """
        code_generated = state.get('code_generated', '')

        prompt = f"""
            You are a security expert. Please review the following Python code for potential security vulnerabilities:
            ```
            {code_generated}
            ```
            Focus on:
            1. Identifying potential security risks (e.g., SQL injection, XSS, insecure data handling).
            2. Providing recommendations to mitigate these risks.
            3. Highlighting any best practices that are missing.

            End your review with an explicit APPROVED or NEEDS_FEEDBACK status.
        """

        response = self.llm.invoke(prompt)
        security_review_comments = response.content

        return {
            **state,
            "current_node": "code_review",
            "next_required_input": "security_review",
            "security_review_comments": security_review_comments
        }
    