"""
Metrics Module — Faithfulness, Relevance, and Hallucination Scoring algorithms.
"""
import re

def compute_faithfulness(response: str, context: str) -> float:
    """
    Measures the ratio of key claims in response supported by provided context.
    Returns score between 0.0 and 1.0.
    """
    if not response or not context:
        return 0.0

    words_resp = set(re.findall(r'\b\w{4,}\b', response.lower()))
    words_ctx = set(re.findall(r'\b\w{4,}\b', context.lower()))

    if not words_resp:
        return 1.0

    overlap = words_resp & words_ctx
    return round(len(overlap) / len(words_resp), 4)

def compute_relevance(response: str, prompt: str) -> float:
    """
    Measures how directly the response addresses the prompt query.
    Returns score between 0.0 and 1.0.
    """
    if not response or not prompt:
        return 0.0

    prompt_words = set(re.findall(r'\b\w{4,}\b', prompt.lower()))
    resp_words = set(re.findall(r'\b\w{4,}\b', response.lower()))

    if not prompt_words:
        return 1.0

    overlap = prompt_words & resp_words
    return round(len(overlap) / len(prompt_words), 4)
