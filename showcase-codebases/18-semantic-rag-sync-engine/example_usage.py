"""
Example usage script demonstrating the RAG Sync Engine.
"""
import os
import time
import logging
from rag_sync.engine import RAGSyncEngine

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")

def main():
    print("=" * 60)
    print("Semantic Ingestion Pipeline & Dynamic RAG Sync Engine")
    print("=" * 60)

    demo_dir = os.path.join(os.path.dirname(__file__), "sample_docs")
    os.makedirs(demo_dir, exist_ok=True)

    file_a = os.path.join(demo_dir, "architecture.md")
    with open(file_a, "w", encoding="utf-8") as f:
        f.write(
            "# Architecture Specs\n\n"
            "## Vector Database Sync\n"
            "The RAG sync engine detects modified markdown files using a background watchdog daemon.\n"
            "It re-indexes chunks on save, ensuring fresh LLM retrieval context without manual rebuilds.\n"
        )

    file_b = os.path.join(demo_dir, "guardrails.md")
    with open(file_b, "w", encoding="utf-8") as f:
        f.write(
            "# Safety & Evaluation\n\n"
            "## LLM-as-a-Judge\n"
            "Evaluates multi-agent conversation outputs against structured JSON schema guardrails.\n"
        )

    # Initialize Engine
    engine = RAGSyncEngine(watch_dir=demo_dir)
    engine.ingest_directory()

    # Search Query 1
    print("\n[QUERY 1] 'How does the watchdog daemon sync vector database context?'")
    results = engine.query("watchdog daemon vector database", top_k=2)
    for res in results:
        print(f"  -> Score: {res.score:.4f} | File: {os.path.basename(res.chunk.file_path)} | Header: {res.chunk.header}")
        print(f"     Content: {res.chunk.content[:100]}...")

    # Modify file live to test dynamic re-indexing
    print("\n[LIVE UPDATE] Appending new documentation to architecture.md...")
    with open(file_a, "a", encoding="utf-8") as f:
        f.write("\n\n## Incremental Chunking\nRecursive chunking splits documents while preserving section headers.\n")

    engine.ingest_file(file_a)  # Trigger sync update

    # Search Query 2
    print("\n[QUERY 2] 'What is incremental recursive chunking?'")
    results2 = engine.query("incremental recursive chunking", top_k=2)
    for res in results2:
        print(f"  -> Score: {res.score:.4f} | File: {os.path.basename(res.chunk.file_path)} | Header: {res.chunk.header}")
        print(f"     Content: {res.chunk.content[:100]}...")

    print("\n" + "=" * 60)
    print("RAG Sync Engine Demo Completed Successfully!")
    print("=" * 60)

if __name__ == "__main__":
    main()
