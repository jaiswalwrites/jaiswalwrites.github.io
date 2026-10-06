"""
RAG Sync Engine — Main coordinator for ingestion, indexing, and retrieval.
"""
from __future__ import annotations
import os
import logging
from typing import List
from rag_sync.chunker import RecursiveChunker
from rag_sync.vector_store import VectorStore, SearchResult
from rag_sync.watcher import DocWatcher

logger = logging.getLogger("rag-sync.engine")

class RAGSyncEngine:
    """
    Automated document ingestion and synchronization engine for RAG pipelines.
    Supports directory scanning, real-time change synchronization, and semantic query retrieval.
    """

    def __init__(self, watch_dir: str, chunk_size: int = 500, chunk_overlap: int = 50):
        self.watch_dir = os.path.abspath(watch_dir)
        self.chunker = RecursiveChunker(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        self.vector_store = VectorStore()
        self.watcher = DocWatcher(watch_dir=self.watch_dir, callback=self.on_file_event)
        self.sync_count = 0

    def ingest_directory(self):
        """Perform initial bulk ingestion of all document files in watch_dir."""
        logger.info(f"Scanning directory for documents: {self.watch_dir}")
        for root, _, files in os.walk(self.watch_dir):
            for file in files:
                if file.endswith((".md", ".txt", ".json", ".rst")):
                    full_path = os.path.join(root, file)
                    self.ingest_file(full_path)

    def ingest_file(self, file_path: str):
        """Chunk and index a single document file."""
        if not os.path.exists(file_path):
            return
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            chunks = self.chunker.chunk_document(file_path=file_path, text=content)
            self.vector_store.remove_file_chunks(file_path)
            self.vector_store.add_chunks(chunks)
            self.sync_count += 1
            logger.info(f"Indexed {len(chunks)} chunks from '{os.path.basename(file_path)}'")
        except Exception as e:
            logger.error(f"Failed to ingest file '{file_path}': {e}")

    def on_file_event(self, event_type: str, file_path: str):
        """Callback triggered by DocWatcher when a document changes."""
        logger.info(f"File event: {event_type} -> {file_path}")
        if event_type in ("created", "modified"):
            self.ingest_file(file_path)
        elif event_type == "deleted":
            self.vector_store.remove_file_chunks(file_path)
            self.sync_count += 1
            logger.info(f"Removed chunks for deleted file '{file_path}'")

    def query(self, prompt: str, top_k: int = 3) -> List[SearchResult]:
        """Perform semantic search query over RAG index."""
        return self.vector_store.search(prompt, top_k=top_k)

    def start_sync(self):
        """Start daemon file watcher for automated background sync."""
        self.watcher.start()

    def stop_sync(self):
        """Stop daemon file watcher."""
        self.watcher.stop()
