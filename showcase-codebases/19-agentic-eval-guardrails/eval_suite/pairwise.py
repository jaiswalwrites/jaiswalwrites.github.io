"""
Pairwise Evaluator — Side-by-side model output evaluation.
"""
from dataclasses import dataclass
from eval_suite.judge import LLMJudge

@dataclass
class PairwiseResult:
    winner: str  # "Model A", "Model B", or "Tie"
    score_a: float
    score_b: float
    reasoning: str

class PairwiseEvaluator:
    """
    Compares outputs from two models/agents for a given prompt and context,
    determining the preferred response.
    """

    def __init__(self, judge: LLMJudge):
        self.judge = judge

    def compare(self, prompt: str, output_a: str, output_b: str, context: str = "") -> PairwiseResult:
        eval_a = self.judge.evaluate(prompt, output_a, context)
        eval_b = self.judge.evaluate(prompt, output_b, context)

        if abs(eval_a.overall_score - eval_b.overall_score) < 0.05:
            winner = "Tie"
            reason = f"Both models achieved comparable overall scores (A: {eval_a.overall_score}, B: {eval_b.overall_score})."
        elif eval_a.overall_score > eval_b.overall_score:
            winner = "Model A"
            reason = f"Model A outperformed Model B ({eval_a.overall_score} vs {eval_b.overall_score}) with higher faithfulness/relevance."
        else:
            winner = "Model B"
            reason = f"Model B outperformed Model A ({eval_b.overall_score} vs {eval_a.overall_score}) with higher faithfulness/relevance."

        return PairwiseResult(
            winner=winner,
            score_a=eval_a.overall_score,
            score_b=eval_b.overall_score,
            reasoning=reason
        )
