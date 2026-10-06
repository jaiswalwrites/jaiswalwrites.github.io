"""Tool Registry — Register, deregister, and lookup MCP tools at runtime."""

from __future__ import annotations
import logging
from typing import Any, Callable

try:
    from mcp import types
except ImportError:
    class DummyTypes:
        class Tool:
            def __init__(self, name: str, description: str = "", inputSchema: dict | None = None):
                self.name = name
                self.description = description
                self.inputSchema = inputSchema or {}
    types = DummyTypes()

logger = logging.getLogger("mcp-gateway.registry")


class ToolRegistry:
    """
    Runtime registry for MCP tools.
    Tools can be registered via decorator or directly.
    """

    def __init__(self):
        self._tools: dict[str, Callable] = {}
        self._schemas: dict[str, dict] = {}

    def register(self, name: str, description: str = "", schema: dict | None = None):
        """Decorator to register a tool function."""
        def decorator(fn: Callable) -> Callable:
            self._tools[name] = fn
            self._schemas[name] = schema or {}
            logger.info(f"Tool registered: '{name}'")
            return fn
        return decorator

    def register_fn(self, name: str, fn: Callable, description: str = "", schema: dict | None = None):
        """Directly register a callable."""
        self._tools[name] = fn
        self._schemas[name] = schema or {"description": description}
        logger.info(f"Tool registered: '{name}'")

    def deregister(self, name: str) -> bool:
        """Remove a tool from the registry."""
        if name in self._tools:
            del self._tools[name]
            self._schemas.pop(name, None)
            logger.info(f"Tool deregistered: '{name}'")
            return True
        return False

    def get(self, name: str) -> Callable:
        """Get a tool by name. Raises KeyError if not found."""
        if name not in self._tools:
            raise KeyError(f"Tool '{name}' not registered.")
        return self._tools[name]

    def list_names(self) -> list[str]:
        return list(self._tools.keys())

    def list_mcp_tools(self) -> list[Any]:
        """Return tools in MCP Tool format for list_tools() response."""
        tools = []
        for name, schema in self._schemas.items():
            tools.append(types.Tool(
                name=name,
                description=schema.get("description", f"Tool: {name}"),
                inputSchema=schema.get("input_schema", {
                    "type": "object",
                    "properties": {},
                }),
            ))
        return tools
