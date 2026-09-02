"""Shared exception-handler registration."""

from fastapi import FastAPI

def add_exception_handlers(app: FastAPI) -> None:
    try:
        from slowapi import _rate_limit_exceeded_handler
        from slowapi.errors import RateLimitExceeded
        app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    except ImportError:
        pass
