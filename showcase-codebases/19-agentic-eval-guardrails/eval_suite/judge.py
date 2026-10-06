"""
LLM-as-a-Judge Evaluation Pipeline.
"""
from dataclasses import dataclass
from eval_suite.metrics import compute_faithfulness, compute_relevance

@dataclass
class EvalScore:
    faithfulness: float
    relevance: float
    hallucination_rate: float
    overall_score: float
    verdict: str

class LLMJudge:
    """
    Automated LLM-as-a-Judge evaluator that benchmarks agent responses
    against ground truth context and user prompts.
    """

    def __init__(self, threshold: float = 0.65):
        self.threshold = threshold

    def evaluate(self, prompt: str, response: str, context: str = "") -> EvalScore:
        faithfulness = compute_faithfulness(response, context) if context else 1.0
        relevance = compute_relevance(response, prompt)
        hallucination_rate = round(1.0 - faithfulness, 4)

        overall = round((faithfulness * 0.5) + (relevance * 0.5), 4)
        verdict = "PASS" if overall >= self.threshold else "FAIL"

        return EvalScore(
            faithfulness=faithfulness,
            relevance=relevance,
            hallucination_rate=hallucination_rate,
            overall_score=overall,
            verdict=verdict
        )
