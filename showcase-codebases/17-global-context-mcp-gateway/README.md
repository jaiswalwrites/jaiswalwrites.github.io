# 🌐 Global Context MCP Gateway

An intent-routing gateway built on the **Model Context Protocol (MCP)** that dynamically routes context and documentation assets between external tools and AI agents.

## Overview

This gateway intercepts tool calls from AI agents, resolves the appropriate documentation context, and dispatches execution with deterministic fallback loops — ensuring AI agents always receive accurate, up-to-date product knowledge.

```
External Tool Call → MCP Intent Router → Context Resolver → LLM Reasoning Layer → Tool Execution → Fallback Loop
```

## Features

- 🔀 **Intent-based routing** — classifies incoming queries and routes to the right documentation context
- 📚 **Context injection** — enriches agent prompts with structured product docs before tool execution
- 🔁 **Deterministic fallback loops** — retries with degraded context on failure, never leaves agent hanging
- 🧩 **Modular tool registry** — register/deregister tools at runtime without restarting the server
- 📊 **Routing telemetry** — logs every dispatch with latency, intent class, and fallback count

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   MCP Client (AI Agent)             │
└────────────────────┬────────────────────────────────┘
                     │ MCP Tool Call
                     ▼
┌─────────────────────────────────────────────────────┐
│              Intent Router (router.py)              │
│  - Classifies intent from tool name + arguments     │
│  - Maps intent → ContextResolver strategy           │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│           Context Resolver (context.py)             │
│  - Fetches relevant doc chunks from local store     │
│  - Formats context block for prompt injection       │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│          Tool Dispatcher (dispatcher.py)            │
│  - Executes registered tool with enriched context   │
│  - On failure: triggers FallbackLoop (up to 3x)     │
└─────────────────────────────────────────────────────┘
```

## Project Structure

```
global-context-mcp-gateway/
├── gateway/
│   ├── __init__.py
│   ├── server.py          # MCP server entrypoint
│   ├── router.py          # Intent classification & routing
│   ├── context.py         # Context resolution & injection
│   ├── dispatcher.py      # Tool execution & fallback loops
│   ├── registry.py        # Tool registry (register/deregister)
│   └── telemetry.py       # Routing telemetry & logging
├── tools/
│   ├── __init__.py
│   ├── doc_search.py      # Search documentation chunks
│   ├── api_lookup.py      # Fetch API reference entries
│   └── changelog.py       # Query recent changelog entries
├── context_store/
│   └── sample_docs.json   # Sample documentation context store
├── tests/
│   ├── test_router.py
│   ├── test_context.py
│   └── test_dispatcher.py
├── requirements.txt
├── pyproject.toml
└── README.md
```

## Setup

```bash
# Clone the repo
git clone https://github.com/jaiswalwrites/global-context-mcp-gateway.git
cd global-context-mcp-gateway

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the MCP gateway server
python -m gateway.server
```

## Usage

### Register a Tool

```python
from gateway.registry import ToolRegistry

registry = ToolRegistry()

@registry.register("search_docs")
def search_docs(query: str, product: str) -> dict:
    # Your implementation
    return {"results": [...]}
```

### Run a Routed Call

```python
from gateway.router import IntentRouter
from gateway.dispatcher import Dispatcher

router = IntentRouter()
dispatcher = Dispatcher()

intent = router.classify(tool_name="search_docs", args={"query": "install kloudfuse"})
result = dispatcher.dispatch(intent, fallback_limit=3)
```

## Requirements

- Python 3.11+
- `mcp` SDK (`pip install mcp`)
- `openai` or compatible LLM client
- `pydantic` for schema validation

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Protocol | Model Context Protocol (MCP) |
| Language | Python 3.11+ |
| Validation | Pydantic v2 |
| LLM Client | OpenAI / Anthropic (pluggable) |
| Telemetry | structlog |

## Author

**Manish Jaiswal** — Senior Technical Writer & Docs Architect  
[github.com/jaiswalwrites](https://github.com/jaiswalwrites) · [jaiswalwrites.github.io](https://jaiswalwrites.github.io)
