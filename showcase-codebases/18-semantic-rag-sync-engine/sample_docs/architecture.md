# Architecture Specs

## Vector Database Sync
The RAG sync engine detects modified markdown files using a background watchdog daemon.
It re-indexes chunks on save, ensuring fresh LLM retrieval context without manual rebuilds.


## Incremental Chunking
Recursive chunking splits documents while preserving section headers.
