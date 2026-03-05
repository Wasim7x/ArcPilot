import asyncio
from typing import Literal
from src.state.sdlc_state import SDLCState, UserStories

class SDLCNode:
    def __init__(self, llm):
        llm.self = llm

    def project_initilization(self, state: SDLCState):
        """
            Performs the project initilazation
        """
        # TODO: We need to calculate how many steps int he life cycle as of now harcoded to 10
        state['progress'] = 10
        state['status'] = "in_progress"
        state['next_required_input'] = "requirements"
        state['current_node'] = 'project_initilization'
        return state