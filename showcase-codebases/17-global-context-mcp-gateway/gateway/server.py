"""
MCP Gateway Server — Entrypoint
Starts the Model Context Protocol server and registers all tools.
"""

import asyncio
import logging

try:
    from mcp.server import Server
    from mcp.server.stdio import stdio_server
    from mcp import types
    HAS_MCP = True
except ImportError:
    HAS_MCP = False
    class Server:
        def __init__(self, name: str):
            self.name = name
        def list_tools(self):
            return lambda fn: fn
        def call_tool(self):
            return lambda fn: fn

from gateway.registry import ToolRegistry
from gateway.router import IntentRouter
from gateway.dispatcher import Dispatcher
from gateway.telemetry import GatewayTelemetry

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mcp-gateway")

# Initialize core components
registry = ToolRegistry()
router = IntentRouter()
dispatcher = Dispatcher(registry=registry)
telemetry = GatewayTelemetry()

# Create MCP server instance
server = Server("global-context-mcp-gateway")


@server.list_tools()
async def list_tools() -> list:
    """Return all registered tools to the MCP client."""
    return registry.list_mcp_tools()


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list:
    """
    Handle an incoming MCP tool call.
    1. Classify intent from tool name + arguments
    2. Resolve documentation context
    3. Dispatch with fallback loop
    """
    logger.info(f"Incoming tool call: {name} | args: {arguments}")

    with telemetry.trace(tool_name=name) as span:
        try:
            # Step 1: Classify intent
            intent = router.classify(tool_name=name, args=arguments)
            span.set_intent(intent)

            # Step 2: Dispatch with context injection + fallback
            result = await dispatcher.dispatch(
                intent=intent,
                tool_name=name,
                args=arguments,
                fallback_limit=3,
            )

            span.set_success()
            if HAS_MCP:
                return [types.TextContent(type="text", text=str(result))]
            return [{"type": "text", "text": str(result)}]

        except Exception as e:
            span.set_error(e)
            logger.error(f"Error handling tool call '{name}': {e}")
            if HAS_MCP:
                return [types.TextContent(type="text", text=f"Error: {e}")]
            return [{"type": "text", "text": f"Error: {e}"}]


async def run_server():
    """Run server on stdio transport."""
    if not HAS_MCP:
        logger.warning("MCP SDK not installed (`pip install mcp`). Running in standalone mock mode.")
        return
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, server.create_initialization_options())


if __name__ == "__main__":
    asyncio.run(run_server())
