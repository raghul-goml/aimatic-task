"""Feature discovery and registry for composed application modules."""

from __future__ import annotations

from typing import List
from app.core.feature_contract import FeatureModule
from app.api.endpoints.rag.api import FEATURE as RAG_FEATURE

ENABLED_FEATURES: List[FeatureModule] = [
    RAG_FEATURE,
]
