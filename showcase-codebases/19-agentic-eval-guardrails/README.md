# 🧪 Agentic Evaluation & Guardrails Suite

Automated evaluation harness implementing an **LLM-as-a-Judge** pipeline with structured JSON Schema output validation, pairwise model comparison metrics, and safety guardrails to benchmark multi-agent conversational accuracy and compliance.

## Architecture

```
                 +-----------------------+
                 |  Agent / LLM Output   |
                 +-----------+-----------+
                             |
             +---------------+---------------+
             |                               |
             v                               v
 +-----------------------+       +-----------------------+
 |  Guardrails Harness   |       |   LLM-as-a-Judge      |
 | (JSON Schema & Rules) |       |  Evaluation Engine    |
 +-----------+-----------+       +-----------+-----------+
             |                               |
             +---------------+---------------+
                             |
                             v
                 +-----------------------+
                 | Benchmark Report &    |
                 | Pairwise Leaderboard  |
                 +-----------------------+
```

## Features

- **LLM-as-a-Judge Evaluator**: Quantitative scoring for Faithfulness, Context Relevance, Hallucination Rate, and Task Completion.
- **JSON Schema Guardrails**: Validates structured agent outputs against predefined schemas; flags schema violations, PII leaks, and prohibited tokens.
- **Pairwise Comparison**: Side-by-side model output evaluation with preference scoring.
- **Jupyter Notebook**: Interactive notebook (`eval_demo.ipynb`) demonstrating benchmark runs and visual metrics.

## Quickstart

```bash
python example_usage.py
python -m unittest discover -s tests
```
