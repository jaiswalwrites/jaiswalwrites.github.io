"""
Context Resolver — Fetches and formats relevant documentation context
based on the routing intent's strategy.
"""

from __future__ import annotations
import json
import re
from pathlib import Path
from typing import Any

from gateway.router import Intent, IntentClass

# Load local documentation context store
_STORE_PATH = Path(__file__).parent.parent / "context_store" / "sample_docs.json"


def _load_store() -> list[dict]:
    if _STORE_PATH.exists():
        with open(_STORE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


class ContextResolver:
    """
    Resolves documentation context for an intent using one of:
    - semantic_search: keyword overlap scoring
    - exact_match: field equality lookup
    - date_range_filter: filter by date metadata
    - keyword_search: broad keyword scan
    - passthrough: no context injection (raw pass-through)
    """

    def __init__(self):
        self._store: list[dict] = _load_store()

    def resolve(self, intent: Intent) -> str:
        """Return a formatted context block for prompt injection."""
        strategy = intent.context_strategy

        if strategy == "semantic_search":
            chunks = self._semantic_search(intent.args)
        elif strategy == "exact_match":
            chunks = self._exact_match(intent.args)
        elif strategy == "date_range_filter":
            chunks = self._date_range_filter(intent.args)
        elif strategy == "keyword_search":
            chunks = self._keyword_search(intent.args)
        else:
            return ""  # passthrough — no context

        if not chunks:
            return ""

        return self._format_context_block(chunks, intent.cls.value)

    # ── Strategies ──────────────────────────────────────────────────────────

    def _semantic_search(self, args: dict, top_k: int = 3) -> list[dict]:
        """Score docs by keyword overlap with query args."""
        query_tokens = set(
            re.findall(r'\w+', " ".join(str(v) for v in args.values()).lower())
        )
        scored = []
        for doc in self._store:
            doc_tokens = set(re.findall(r'\w+', doc.get("content", "").lower()))
            overlap = len(query_tokens & doc_tokens)
            if overlap > 0:
                scored.append((overlap, doc))
        scored.sort(key=lambda x: x[0], reverse=True)
        return [doc for _, doc in scored[:top_k]]

    def _exact_match(self, args: dict) -> list[dict]:
        """Match docs by exact field values (e.g. endpoint path)."""
        results = []
        for key, value in args.items():
            for doc in self._store:
                if str(value).lower() in doc.get("content", "").lower():
                    results.append(doc)
                    break
        return results[:3]

    def _date_range_filter(self, args: dict) -> list[dict]:
        """Filter changelog entries by date metadata."""
        version = args.get("version", "")
        results = [
            doc for doc in self._store
            if doc.get("type") == "changelog"
            and (not version or version in doc.get("content", ""))
        ]
        return results[:3]

    def _keyword_search(self, args: dict) -> list[dict]:
        """Broad scan for any keyword match."""
        keywords = [str(v).lower() for v in args.values()]
        results = []
        for doc in self._store:
            content = doc.get("content", "").lower()
            if any(kw in content for kw in keywords):
                results.append(doc)
        return results[:3]

    # ── Formatting ───────────────────────────────────────────────────────────

    def _format_context_block(self, chunks: list[dict], intent_cls: str) -> str:
        lines = [
            f"[CONTEXT — {intent_cls.upper().replace('_', ' ')}]",
            f"The following {len(chunks)} documentation chunk(s) are relevant:",
            "",
        ]
        for i, chunk in enumerate(chunks, 1):
            lines.append(f"--- Chunk {i}: {chunk.get('title', 'Untitled')} ---")
            lines.append(chunk.get("content", "").strip())
            lines.append("")
        lines.append("[END CONTEXT]")
        return "\n".join(lines)
