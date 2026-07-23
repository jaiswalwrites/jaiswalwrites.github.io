# Developer Self-Service Portal with RAG

A LangChain + ChromaDB backend that ingests Docusaurus markdown files, chunks them, and answers developer questions contextually to reduce support tickets.

## Usage
```bash
python ingest.py ./docs
python chat.py "How do I authenticate the API?"
```