"""
Intent Router — Classifies incoming tool calls and maps them to
the appropriate context resolution strategy.
"""

from __future__ import annotations
from dataclasses import dataclass
from enum import Enum
from typing import Any


class IntentClass(str, Enum):
    DOC_SEARCH = "doc_search"
    API_LOOKUP = "api_lookup"
    CHANGELOG = "changelog"
    GENERAL = "general"
    UNKNOWN = "unknown"


@dataclass
class Intent:
    """Represents a classified routing intent."""
    cls: IntentClass
    confidence: float
    tool_name: str
    args: dict[str, Any]
    context_strategy: str  # which ContextResolver strategy to use

    def __repr__(self) -> str:
        return (
            f"Intent(cls={self.cls.value}, confidence={self.confidence:.2f}, "
            f"tool={self.tool_name}, strategy={self.context_strategy})"
        )


# Maps tool names to intent classes
TOOL_INTENT_MAP: dict[str, IntentClass] = {
    "search_docs": IntentClass.DOC_SEARCH,
    "doc_search": IntentClass.DOC_SEARCH,
    "lookup_api": IntentClass.API_LOOKUP,
    "api_lookup": IntentClass.API_LOOKUP,
    "get_api_reference": IntentClass.API_LOOKUP,
    "get_changelog": IntentClass.CHANGELOG,
    "changelog": IntentClass.CHANGELOG,
    "recent_changes": IntentClass.CHANGELOG,
}

# Maps intent classes to context resolution strategies
INTENT_STRATEGY_MAP: dict[IntentClass, str] = {
    IntentClass.DOC_SEARCH: "semantic_search",
    IntentClass.API_LOOKUP: "exact_match",
    IntentClass.CHANGELOG: "date_range_filter",
    IntentClass.GENERAL: "keyword_search",
    IntentClass.UNKNOWN: "passthrough",
}

# Keyword signals for fuzzy intent detection from arguments
KEYWORD_SIGNALS: dict[str, IntentClass] = {
    "install": IntentClass.DOC_SEARCH,
    "setup": IntentClass.DOC_SEARCH,
    "configure": IntentClass.DOC_SEARCH,
    "api": IntentClass.API_LOOKUP,
    "endpoint": IntentClass.API_LOOKUP,
    "reference": IntentClass.API_LOOKUP,
    "changelog": IntentClass.CHANGELOG,
    "release": IntentClass.CHANGELOG,
    "update": IntentClass.CHANGELOG,
    "version": IntentClass.CHANGELOG,
}


class IntentRouter:
    """
    Classifies incoming MCP tool calls into routing intents.

    Classification priority:
    1. Exact tool name match → high confidence (0.95)
    2. Keyword signal in arguments → medium confidence (0.70)
    3. Fallback to GENERAL → low confidence (0.40)
    """

    def classify(self, tool_name: str, args: dict[str, Any]) -> Intent:
        """Classify a tool call into an Intent."""
        # Priority 1: exact tool name match
        if tool_name in TOOL_INTENT_MAP:
            cls = TOOL_INTENT_MAP[tool_name]
            return Intent(
                cls=cls,
                confidence=0.95,
                tool_name=tool_name,
                args=args,
                context_strategy=INTENT_STRATEGY_MAP[cls],
            )

        # Priority 2: keyword signals from arguments
        args_text = " ".join(str(v) for v in args.values()).lower()
        for keyword, cls in KEYWORD_SIGNALS.items():
            if keyword in args_text:
                return Intent(
                    cls=cls,
                    confidence=0.70,
                    tool_name=tool_name,
                    args=args,
                    context_strategy=INTENT_STRATEGY_MAP[cls],
                )

        # Priority 3: fallback to GENERAL
        return Intent(
            cls=IntentClass.GENERAL,
            confidence=0.40,
            tool_name=tool_name,
            args=args,
            context_strategy=INTENT_STRATEGY_MAP[IntentClass.GENERAL],
        )
