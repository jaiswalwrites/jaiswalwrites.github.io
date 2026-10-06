"""Telemetry — Routing span tracking for the MCP Gateway."""

from __future__ import annotations
import time
import logging
from contextlib import contextmanager
from dataclasses import dataclass, field
from typing import Generator

logger = logging.getLogger("mcp-gateway.telemetry")


@dataclass
class Span:
    tool_name: str
    start_time: float = field(default_factory=time.monotonic)
    intent_cls: str = ""
    success: bool = False
    error: str = ""
    fallback_count: int = 0

    def set_intent(self, intent) -> None:
        self.intent_cls = intent.cls.value

    def set_success(self) -> None:
        self.success = True

    def set_error(self, msg: str) -> None:
        self.error = msg

    @property
    def latency_ms(self) -> float:
        return (time.monotonic() - self.start_time) * 1000


class GatewayTelemetry:
    """Tracks and logs routing spans."""

    def __init__(self):
        self.spans: list[Span] = []

    @contextmanager
    def trace(self, tool_name: str) -> Generator[Span, None, None]:
        span = Span(tool_name=tool_name)
        try:
            yield span
        finally:
            self.spans.append(span)
            status = "✅ OK" if span.success else f"❌ ERROR: {span.error}"
            logger.info(
                f"[TELEMETRY] tool={tool_name} | intent={span.intent_cls} | "
                f"latency={span.latency_ms:.1f}ms | {status}"
            )
