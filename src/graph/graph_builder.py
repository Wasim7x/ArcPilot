from langgraph.graph import StateGraph, START, END
from src.llm.groq_llm import GroqLLM
from src.node.sdlc_node import SDLCNode
from src.state.sdlc_state import SDLCState
from langgraph.checkpoint.memory import MemorySaver
from src.node.worker import DesignNode, SecurityNode, deployment, tester, qa_testing, CodeNode

class GraphBuilder:
    def __init__(self, llm):
        self.llm = llm
        self.builder = StateGraph(SDLCState)
        self.memory = MemorySaver()

    def build_graph(self):
        """
            Configure the graph by adding nodes, edges
        """
        self.sdlc_node = SDLCNode(llm=self.llm)
        self.design_node = DesignNode(llm=self.llm)
        self.security_node = SecurityNode(llm=self.llm)
        self.deployment_node = deployment(llm=self.llm)
        self.tester_node = tester(llm=self.llm)
        self.qa_testing_node = qa_testing(llm=self.llm)
        self.code_node = CodeNode(llm=self.llm)

        # Nodes
        self.builder.add_node("project_initilization", self.sdlc_node.project_initilization)
        self.builder.add_node("get_requirements", self.sdlc_node.get_requirements)
        self.builder.add_node("auto_generate_user_stories", self.sdlc_node.auto_generate_user_stories)
        self.builder.add_node("product_owner_review_decision", self.sdlc_node.product_owner_review_decision) # Routing node
        self.builder.add_node("create_design_document", self.design_node.create_design_document)
        self.builder.add_node("design_review",self.design_node.design_review) # Routing Node
        self.builder.add_node("generate_code", self.code_node.generate_code)
        self.builder.add_node("code_review", self.code_node.code_review) # Routing Node
        
        self.builder.add_node("generate_security_recommendations", self.security_node.security_recommendations)
        self.builder.add_node("security_review", self.security_node.security_review) # Routing Node
        self.builder.add_node("generate_test_cases", self.tester_node.generate_test_cases)
        self.builder.add_node("test_cases_review", self.tester_node.test_cases_review) # Routing Node
        self.builder.add_node("qa_testing", self.qa_testing_node.qa_testing)
        self.builder.add_node("deployment", self.deployment_node.deployment)
        self.builder.add_node("qa_testing_review", self.qa_testing_node.qa_testing_review) # Routing Node

        # Edges
        self.builder.add_edge(START, "project_initilization")
        self.builder.add_edge("project_initilization", "get_requirements")
        self.builder.add_edge("get_requirements", "auto_generate_user_stories")
        self.builder.add_edge("auto_generate_user_stories", "product_owner_review_decision")
        self.builder.add_conditional_edges(
            "product_owner_review_decision",
            self.sdlc_node.product_decision_router,
            {
                "approved": "create_design_document",
                "feedback": "auto_generate_user_stories"
            }
        )
        self.builder.add_edge("create_design_document", "design_review")
        self.builder.add_conditional_edges(
            "design_review", 
            self.design_node.design_review_router,
            {
                "approved": "generate_code",
                "feedback": "create_design_document"
            }
        )

        self.builder.add_edge("generate_code", "code_review")
        self.builder.add_conditional_edges(
            "code_review",
            self.code_node.code_review_router,
            {
                "approved": "generate_security_recommendations",
                "feedback": "generate_code"
            }
        )

        self.builder.add_edge("generate_security_recommendations", "security_review")
        self.builder.add_conditional_edges(
            "security_review",
            self.security_node.security_review_router,
            {
                "approved": "generate_test_cases",
                "feedback": "generate_code"
            }
        )

        self.builder.add_edge("generate_test_cases", "test_cases_review")
        self.builder.add_conditional_edges(
            "test_cases_review",
            self.tester_node.test_cases_review_router,
            {
                "approved": "qa_testing",
                "feedback": "generate_test_cases"
            }
        )
        self.builder.add_edge("qa_testing", "qa_testing_review")
        self.builder.add_conditional_edges(
            "qa_testing_review",
            self.qa_testing_node.qa_testing_review_router,
            {
                "approved": "deployment",
                "feedback": "generate_code"
            }
        )
        self.builder.add_edge("deployment", END)

        return self.builder

    def setup_graph(self):
        self.graph = self.build_graph()
        return self.graph.compile(
            interrupt_before=[
                'get_requirements', 
                'product_owner_review_decision', 
                'design_review',
                'code_review',
                'security_review',
                'test_cases_review',
                'qa_testing_review'
            ], checkpointer=self.memory
        )