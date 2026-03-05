from langgraph.graph import StateGraph, START, END
from src.state.sdlc_state import SDLCState


class GraphBuilder:
    def __init__(self, llm):
        self.llm = llm
        self.builder = StateGraph(SDLCState)


    def build_graph(self):
        """
            Configure the graph by adding nodes, edges
        """
        self.builder.add_node(START, "project_initialization")
        self.builder.add_node("project_initialization", "requirements_gathering")    

    def setup_graph(self):
        self.graph = self.build_graph()      

    