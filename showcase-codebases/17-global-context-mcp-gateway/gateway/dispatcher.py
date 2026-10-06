"""
Tool Dispatcher — Executes registered tools with context injection
and implements deterministic fallback loops on failure.
"""

from __future__ import annotations
import asyncio
import logging
from typing import Any

from gateway.router import Intent
from gateway.context import ContextResolver
from gateway.registry import ToolRegistry

logger = logging.getLogger("mcp-gateway.dispatcher")


class FallbackExhausted(Exception):
    """Raised when all fallback attempts fail."""
    pass


class Dispatcher:
    """
    Dispatches tool calls with:
    1. Context injection (enriches args with resolved doc context)
    2. Deterministic fallback loops (retry up to N times with degraded context)
    3. Structured error reporting on exhaustion
    """

    def __init__(self, registry: ToolRegistry):
        self.registry = registry
        self.resolver = ContextResolver()

    async def dispatch(
        self,
        intent: Intent,
        tool_name: str,
        args: dict[str, Any],
        fallback_limit: int = 3,
    ) -> Any:
        """
        Execute a tool with context injection.
        On failure, retry with progressively degraded context.
        """
        last_error = None

        for attempt in range(1, fallback_limit + 1):
            try:
                # Resolve context (degrades on each retry)
                context = self._resolve_with_degradation(intent, attempt)

                # Inject context into args
                enriched_args = {**args, "__context__": context} if context else args

                logger.info(
                    f"Dispatch attempt {attempt}/{fallback_limit} | "
                    f"tool={tool_name} | context_len={len(context)}"
                )

                # Execute the registered tool
                tool_fn = self.registry.get(tool_name)
                if asyncio.iscoroutinefunction(tool_fn):
                    result = await tool_fn(**enriched_args)
                else:
                    result = tool_fn(**enriched_args)

                logger.info(f"Tool '{tool_name}' succeeded on attempt {attempt}")
                return result

            except KeyError:
                raise ValueError(
                    f"Tool '{tool_name}' is not registered in the gateway. "
                    f"Available tools: {self.registry.list_names()}"
                )
            except Exception as e:
                last_error = e
                logger.warning(
                    f"Attempt {attempt} failed for '{tool_name}': {e}. "
                    f"{'Retrying...' if attempt < fallback_limit else 'All attempts exhausted.'}"
                )
                if attempt < fallback_limit:
                    await asyncio.sleep(0.5 * attempt)  # backoff

        raise FallbackExhausted(
            f"Tool '{tool_name}' failed after {fallback_limit} attempts. "
            f"Last error: {last_error}"
        )

    def _resolve_with_degradation(self, intent: Intent, attempt: int) -> str:
        """
        Degrade context resolution on each retry:
        - Attempt 1: full context resolution
        - Attempt 2: keyword-only search
        - Attempt 3+: no context (passthrough)
        """
        if attempt == 1:
            return self.resolver.resolve(intent)
        elif attempt == 2:
            # Degrade to keyword search
            from gateway.router import Intent as I, IntentClass
            degraded = I(
                cls=IntentClass.GENERAL,
                confidence=0.3,
                tool_name=intent.tool_name,
                args=intent.args,
                context_strategy="keyword_search",
            )
            return self.resolver.resolve(degraded)
        else:
            return ""  # no context on final attempt
