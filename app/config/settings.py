"""Composed application settings and feature discovery."""

from __future__ import annotations

import os
from functools import lru_cache
from typing import List

from pydantic import Field, AliasChoices
from pydantic_settings import BaseSettings, SettingsConfigDict

from app.config.base_settings import BaseAppSettings
from app.config.model_gateway_settings import ModelGatewaySettings
from app.config.rag.settings import RAGSettings


class Settings(BaseAppSettings, ModelGatewaySettings, RAGSettings):
    """Unified application settings combining base, model gateway, and RAG configuration."""

    # Provide alias/defaults mapping for MODEL_ID / BEDROCK_MODEL_ID
    MODEL_ID: str = Field(
        default="minimax.minimax-m2.5",
        validation_alias=AliasChoices("BEDROCK_MODEL_ID", "MODEL_ID"),
    )
    EMBEDDING_MODEL_ID: str = Field(
        default="amazon.titan-embed-text-v2:0",
        validation_alias=AliasChoices("BEDROCK_EMBEDDING_MODEL_ID", "EMBEDDING_MODEL_ID"),
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
        populate_by_name=True,
    )


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
