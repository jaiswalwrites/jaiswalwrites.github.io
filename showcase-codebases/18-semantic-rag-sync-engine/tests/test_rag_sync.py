"""Unittests for RAG Sync Engine components."""
import unittest
import os
import shutil
import tempfile
from rag_sync.chunker import RecursiveChunker
from rag_sync.vector_store import VectorStore
from rag_sync.engine import RAGSyncEngine

class TestRAGSyncEngine(unittest.TestCase):
    def setUp(self):
        self.test_dir = tempfile.mkdtemp()
        self.doc_path = os.path.join(self.test_dir, "test_doc.md")
        with open(self.doc_path, "w", encoding="utf-8") as f:
            f.write("# Introduction\n\nThis is a test document for vector indexing and chunking.\n")

    def tearDown(self):
        shutil.rmtree(self.test_dir)

    def test_recursive_chunker(self):
        chunker = RecursiveChunker(chunk_size=100)
        chunks = chunker.chunk_document(self.doc_path, "# Header\n\nContent paragraph 1.\n\nContent paragraph 2.")
        self.assertTrue(len(chunks) >= 1)
        self.assertEqual(chunks[0].header, "Header")

    def test_vector_store(self):
        chunker = RecursiveChunker()
        chunks = chunker.chunk_document(self.doc_path, "# Intro\n\nMachine learning vector embeddings for RAG retrieval.")
        store = VectorStore()
        store.add_chunks(chunks)
        results = store.search("vector embeddings", top_k=1)
        self.assertEqual(len(results), 1)
        self.assertTrue(results[0].score > 0.0)

    def test_engine_ingest_and_query(self):
        engine = RAGSyncEngine(watch_dir=self.test_dir)
        engine.ingest_directory()
        results = engine.query("vector indexing test document", top_k=1)
        self.assertEqual(len(results), 1)

if __name__ == "__main__":
    unittest.main()
