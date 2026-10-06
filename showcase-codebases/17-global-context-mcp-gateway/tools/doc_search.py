"""Sample tool implementations for the MCP Gateway."""

from gateway.registry import ToolRegistry

registry = ToolRegistry()


@registry.register(
    name="search_docs",
    description="Search the documentation for a given query and product.",
    schema={
        "description": "Search documentation chunks by natural language query.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The search query"},
                "product": {"type": "string", "description": "Product name (optional)"},
            },
            "required": ["query"],
        }
    }
)
def search_docs(query: str, product: str = "", **kwargs) -> dict:
    """Search documentation by query."""
    context = kwargs.get("__context__", "")
    return {
        "tool": "search_docs",
        "query": query,
        "product": product,
        "context_injected": bool(context),
        "results": [
            {"title": "Getting Started Guide", "excerpt": f"Documentation matching: {query}"},
            {"title": "API Reference", "excerpt": f"API details for: {product or 'all products'}"},
        ]
    }
