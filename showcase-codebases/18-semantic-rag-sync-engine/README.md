# 🔄 Semantic Ingestion Pipeline & Dynamic RAG Sync Engine

An automated document ingestion engine that combines **recursive chunking**, **vector embeddings**, and a **watchdog file-watcher daemon** to keep AI retrieval systems perpetually fresh.

## Overview

This engine solves the #1 problem with RAG systems: **doc drift** — where the AI retrieves stale content because the vector store hasn't caught up with documentation changes.

```
File Save / Git Commit → Watchdog Daemon → Change Detection → Recursive Chunker → Embedding Generator → Vector Store Re-index
```

## Features

- 👁️ **Watchdog daemon** — monitors file system for `.md`, `.mdx`, `.rst`, `.txt` changes in real-time
- ✂️ **Recursive chunker** — splits docs by headers, paragraphs, and sentences with configurable overlap
- 🔢 **Vector embeddings** — generates dense embeddings using `sentence-transformers` (pluggable)
- 💾 **ChromaDB / FAISS** — persists vectors locally; swap backends with a single config change
- 🔄 **Incremental re-index** — only re-processes changed files (SHA256 hash diffing), not the full corpus
- 📊 **Ingestion metrics** — tracks chunk count, embedding latency, and drift events per run

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   File System / Git Repo                     │
│           docs/*.md   docs/*.mdx   docs/*.rst                │
└──────────────────────┬───────────────────────────────────────┘
                       │ inotify / watchdog event
                       ▼
┌──────────────────────────────────────────────────────────────┐
│              Watchdog Daemon (watcher.py)                    │
│   - Monitors configured directories for file events          │
│   - Debounces rapid saves (300ms window)                     │
│   - Emits ChangeEvent to the ingestion queue                 │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│             Change Detector (differ.py)                      │
│   - SHA256 hashes current file vs stored hash                │
│   - Skips unchanged files (zero re-work)                     │
│   - Flags deleted files for vector store removal             │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│            Recursive Chunker (chunker.py)                    │
│   - Splits by H1/H2/H3 → paragraphs → sentences             │
│   - Configurable chunk size (default: 512 tokens)            │
│   - Sliding window overlap (default: 50 tokens)              │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│           Embedding Generator (embedder.py)                  │
│   - sentence-transformers (default: all-MiniLM-L6-v2)        │
│   - Pluggable: swap to OpenAI / Cohere with config change    │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│           Vector Store Manager (store.py)                    │
│   - ChromaDB (default) or FAISS backend                      │
│   - Upserts embeddings with rich metadata                    │
│   - Handles deletions and collection management              │
└──────────────────────────────────────────────────────────────┘
```

## Project Structure

```
semantic-rag-sync-engine/
├── engine/
│   ├── __init__.py
│   ├── watcher.py         # Watchdog daemon & event handler
│   ├── differ.py          # SHA256-based change detection
│   ├── chunker.py         # Recursive document chunker
│   ├── embedder.py        # Embedding generation (pluggable)
│   ├── store.py           # Vector store manager (Chroma/FAISS)
│   └── metrics.py         # Ingestion telemetry & drift tracking
├── config/
│   └── settings.py        # Centralized configuration
├── sample_docs/
│   ├── getting-started.md
│   ├── api-reference.md
│   └── changelog.md
├── tests/
│   ├── test_chunker.py
│   ├── test_differ.py
│   └── test_embedder.py
├── main.py                # CLI entrypoint
├── requirements.txt
└── README.md
```

## Setup

```bash
git clone https://github.com/jaiswalwrites/semantic-rag-sync-engine.git
cd semantic-rag-sync-engine

python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

pip install -r requirements.txt

# Run full ingestion on sample docs
python main.py ingest --docs-dir ./sample_docs

# Start the watchdog daemon (watches for live changes)
python main.py watch --docs-dir ./sample_docs
```

## Configuration

Edit `config/settings.py` or set environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `DOCS_DIR` | `./docs` | Directory to watch |
| `CHUNK_SIZE` | `512` | Max tokens per chunk |
| `CHUNK_OVERLAP` | `50` | Sliding window overlap |
| `EMBEDDING_MODEL` | `all-MiniLM-L6-v2` | sentence-transformers model |
| `VECTOR_BACKEND` | `chroma` | `chroma` or `faiss` |
| `COLLECTION_NAME` | `docs` | Vector store collection |
| `DEBOUNCE_MS` | `300` | Watchdog debounce window |

## Requirements

- Python 3.11+
- `watchdog` — file system monitoring
- `sentence-transformers` — embedding generation
- `chromadb` — vector storage
- `tiktoken` — token counting
- `rich` — CLI output

## Author

**Manish Jaiswal** — Senior Technical Writer & Docs Architect  
[github.com/jaiswalwrites](https://github.com/jaiswalwrites) · [jaiswalwrites.github.io](https://jaiswalwrites.github.io)
