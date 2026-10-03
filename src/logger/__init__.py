import logging
import os
import re
from datetime import datetime
from logging.handlers import RotatingFileHandler
from pathlib import Path

LOG_DIR = 'logs'
LOG_FILE = f"{datetime.now().strftime('%m_%d_%Y_%H_%M_%S')}.log"
MAX_LOG_SIZE = 5 * 1024 * 1024  # 5 MB
BACKUP_COUNT = 3

# Resolve workspace root safely without external from_root dependency
def get_project_root() -> Path:
    # 3 levels up from src/logger/__init__.py is workspace root
    return Path(__file__).resolve().parent.parent.parent

log_dir_path = get_project_root() / LOG_DIR
log_dir_path.mkdir(parents=True, exist_ok=True)
log_file_path = log_dir_path / LOG_FILE

class SensitiveDataFilter(logging.Filter):
    """Mask potential secrets and API keys from logs."""
    PATTERNS = [
        re.compile(r'(api[-_]?key["\']?\s*[:=]\s*["\']?)([^"\'\s]{8,})', re.IGNORECASE),
        re.compile(r'(bearer\s+)([\w\.-]{10,})', re.IGNORECASE),
        re.compile(r'(secret["\']?\s*[:=]\s*["\']?)([^"\'\s]{6,})', re.IGNORECASE),
        re.compile(r'(password["\']?\s*[:=]\s*["\']?)([^"\'\s]{4,})', re.IGNORECASE),
        re.compile(r'(gsk_[a-zA-Z0-9_-]{20,})', re.IGNORECASE),
        re.compile(r'(sk-[a-zA-Z0-9_-]{20,})', re.IGNORECASE),
        re.compile(r'(AIza[0-9A-Za-z-_]{35})', re.IGNORECASE),
    ]

    def filter(self, record: logging.LogRecord) -> bool:
        if isinstance(record.msg, str):
            for pattern in self.PATTERNS:
                record.msg = pattern.sub(r'\1***REDACTED***' if r'\1' in pattern.pattern else '***REDACTED***', record.msg)
        return True

def configure_logger():
    """Configures logging with a rotating file handler and a console handler."""
    logger = logging.getLogger("ArcPilot")
    log_level_name = os.getenv("LOG_LEVEL", "INFO").upper()
    level = getattr(logging, log_level_name, logging.INFO)
    logger.setLevel(level)

    if logger.handlers:
        return logger

    formatter = logging.Formatter("[ %(asctime)s ] %(name)s - %(levelname)s - %(message)s")
    sensitive_filter = SensitiveDataFilter()

    try:
        file_handler = RotatingFileHandler(
            str(log_file_path),
            maxBytes=MAX_LOG_SIZE,
            backupCount=BACKUP_COUNT,
            encoding="utf-8"
        )
        file_handler.setFormatter(formatter)
        file_handler.setLevel(logging.DEBUG)
        file_handler.addFilter(sensitive_filter)
        logger.addHandler(file_handler)
    except Exception as e:
        print(f"Warning: Could not initialize file handler for logging: {e}")

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    console_handler.setLevel(level)
    console_handler.addFilter(sensitive_filter)
    logger.addHandler(console_handler)

    return logger

logger = configure_logger()