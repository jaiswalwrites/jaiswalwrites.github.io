"""
In-Memory Vector Store with Cosine Similarity & TF-IDF Embeddings.
"""
from __future__ import annotations
import math
import re
from collections import Counter
from dataclasses import dataclass
from typing import List, Dict
from rag_sync.chunker import TextChunk

@dataclass
class SearchResult:
    chunk: TextChunk
    score: float

class VectorStore:
    """
    Lightweight Vector Store performing term-frequency vector embeddings
    and cosine similarity queries with incremental index management.
    """

    def __init__(self):
        self._chunks: Dict[str, TextChunk] = {}
        self._doc_vectors: Dict[str, Dict[str, float]] = {}
        self._idf: Dict[str, float] = {}

    def add_chunks(self, chunks: List[TextChunk]):
        """Index or update chunks in the vector store."""
        for chunk in chunks:
            self._chunks[chunk.chunk_id] = chunk
            tf = self._compute_tf(chunk.content)
            self._doc_vectors[chunk.chunk_id] = tf
        self._recompute_idf()

    def remove_file_chunks(self, file_path: str):
        """Remove all indexed chunks belonging to a deleted file."""
        to_delete = [cid for cid, chunk in self._chunks.items() if chunk.file_path == file_path]
        for cid in to_delete:
            del self._chunks[cid]
            del self._doc_vectors[cid]
        if to_delete:
            self._recompute_idf()

    def search(self, query: str, top_k: int = 3) -> List[SearchResult]:
        """Perform cosine similarity search against query vector."""
        if not self._chunks:
            return []

        query_tf = self._compute_tf(query)
        query_vec = {word: tf * self._idf.get(word, 1.0) for word, tf in query_tf.items()}

        results = []
        for cid, chunk in self._chunks.items():
            doc_tf = self._doc_vectors[cid]
            doc_vec = {word: tf * self._idf.get(word, 1.0) for word, tf in doc_tf.items()}
            score = self._cosine_similarity(query_vec, doc_vec)
            if score > 0.0:
                results.append(SearchResult(chunk=chunk, score=score))

        results.sort(key=lambda x: x.score, reverse=True)
        return results[:top_k]

    def _compute_tf(self, text: str) -> Dict[str, float]:
        words = re.findall(r'\b\w+\b', text.lower())
        total = len(words) or 1
        counts = Counter(words)
        return {word: count / total for word, count in counts.items()}

    def _recompute_idf(self):
        num_docs = len(self._chunks) or 1
        doc_counts = Counter()
        for doc_tf in self._doc_vectors.values():
            for word in doc_tf.keys():
                doc_counts[word] += 1
        self._idf = {word: math.log(1.0 + (num_docs / count)) for word, count in doc_counts.items()}

    def _cosine_similarity(self, vec_a: Dict[str, float], vec_b: Dict[str, float]) -> float:
        common_words = set(vec_a.keys()) & set(vec_b.keys())
        if not common_words:
            return 0.0
        dot_product = sum(vec_a[w] * vec_b[w] for w in common_words)
        norm_a = math.sqrt(sum(v ** 2 for v in vec_a.values()))
        norm_b = math.sqrt(sum(v ** 2 for v in vec_b.values()))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot_product / (norm_a * norm_b)
