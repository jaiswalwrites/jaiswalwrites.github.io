"""
Recursive Document Chunker with Markdown Header Preservation.
"""
from __future__ import annotations
import re
from dataclasses import dataclass
from typing import List

@dataclass
class TextChunk:
    chunk_id: str
    file_path: str
    header: str
    content: str
    token_count: int

class RecursiveChunker:
    """
    Recursively splits markdown/text documents by section headers (#, ##, ###),
    paragraphs, and sentences while maintaining maximum chunk sizes and overlap.
    """

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def chunk_document(self, file_path: str, text: str) -> List[TextChunk]:
        """Split text into structured chunks."""
        sections = self._split_by_headers(text)
        chunks: List[TextChunk] = []
        chunk_idx = 0

        for header, content in sections:
            paragraphs = content.split("\n\n")
            current_buffer = []
            current_length = 0

            for para in paragraphs:
                para_len = len(para.split())
                if current_length + para_len > self.chunk_size and current_buffer:
                    chunk_text = "\n\n".join(current_buffer)
                    chunks.append(TextChunk(
                        chunk_id=f"{file_path}#{chunk_idx}",
                        file_path=file_path,
                        header=header,
                        content=chunk_text.strip(),
                        token_count=len(chunk_text.split())
                    ))
                    chunk_idx += 1
                    # Keep overlap
                    current_buffer = current_buffer[-1:] if self.chunk_overlap > 0 else []
                    current_length = sum(len(p.split()) for p in current_buffer)

                current_buffer.append(para)
                current_length += para_len

            if current_buffer:
                chunk_text = "\n\n".join(current_buffer)
                if chunk_text.strip():
                    chunks.append(TextChunk(
                        chunk_id=f"{file_path}#{chunk_idx}",
                        file_path=file_path,
                        header=header,
                        content=chunk_text.strip(),
                        token_count=len(chunk_text.split())
                    ))
                    chunk_idx += 1

        return chunks

    def _split_by_headers(self, text: str) -> List[tuple[str, str]]:
        """Separate markdown document into (header, content) blocks."""
        lines = text.split("\n")
        sections = []
        current_header = "Root"
        current_lines = []

        for line in lines:
            if re.match(r"^#{1,6}\s+", line):
                if current_lines:
                    sections.append((current_header, "\n".join(current_lines)))
                    current_lines = []
                current_header = line.strip("# ").strip()
            else:
                current_lines.append(line)

        if current_lines:
            sections.append((current_header, "\n".join(current_lines)))

        return sections
