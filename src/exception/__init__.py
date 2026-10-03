import logging
import sys


def error_message_detail(error: Exception, error_detail: sys) -> str:
    """
    Extracts detailed error information including file name, line number, and the error message.
    Safely handles cases where traceback is not available.
    """
    try:
        exc_type, exc_value, exc_tb = error_detail.exc_info()
        if exc_tb is not None:
            file_name = exc_tb.tb_frame.f_code.co_filename
            line_number = exc_tb.tb_lineno
            error_message = f"Error in [{file_name}] at line [{line_number}]: {error!s}"
        else:
            error_message = f"Error: {error!s}"
    except Exception:
        error_message = f"Error: {error!s}"

    logging.getLogger("ArcPilot").error(error_message)
    return error_message

class ArcPilotException(Exception):
    """
    Custom exception class for ArcPilot SDLC orchestration platform.
    """
    def __init__(self, error_message: Exception | str, error_detail: sys = sys):
        super().__init__(str(error_message))
        self.error_message = error_message_detail(error_message, error_detail)

    def __str__(self) -> str:
        return self.error_message

# Backward compatibility alias
MyException = ArcPilotException