"""
Example usage script demonstrating Intent Routing, Context Resolution, and Tool Dispatch.
"""
import asyncio
import logging
from gateway.router import IntentRouter
from gateway.context import ContextResolver
from gateway.dispatcher import Dispatcher
from gateway.registry import ToolRegistry
from tools.doc_search import search_docs

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")

async def main():
    print("=" * 60)
    print("Global Context MCP Gateway - Live Execution Demo")
    print("=" * 60)

    # 1. Setup Registry and Register Tool
    registry = ToolRegistry()
    registry.register_fn(
        name="search_docs",
        fn=search_docs,
        description="Search documentation assets by query term"
    )

    # 2. Setup Components
    router = IntentRouter()
    dispatcher = Dispatcher(registry=registry)

    # 3. Test Queries
    queries = [
        "How do I set up Model Context Protocol intent routing?",
        "What is the API key rate limit configuration for user authentication?",
        "Show me the latest changelog updates for v2.0 release",
    ]

    for q in queries:
        print(f"\n[QUERY] User Query: '{q}'")
        intent = router.classify(tool_name="search_docs", args={"query": q})
        print(f"[INTENT] Classified Intent: {intent.cls.value} (Confidence: {intent.confidence:.2f})")
        print(f"[STRATEGY] Context Strategy: {intent.context_strategy}")

        # Resolve context directly
        context_str = dispatcher.resolver.resolve(intent)
        print(f"[CONTEXT] Context Resolved Length: {len(context_str)} characters")

        # Execute Dispatcher with auto context injection & fallback loop
        print("[DISPATCH] Dispatching tool call with injected context...")
        result = await dispatcher.dispatch(
            intent=intent,
            tool_name="search_docs",
            args={"query": q}
        )
        print(f"[RESULT] Context Injected into Tool: {result.get('context_injected')}")
        print(f"[RESULT] Results Returned: {len(result.get('results', []))} items")

    print("\n" + "=" * 60)
    print("Demo Completed Successfully!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(main())
