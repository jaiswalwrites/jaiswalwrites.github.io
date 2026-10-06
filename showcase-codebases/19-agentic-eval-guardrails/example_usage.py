"""
Example usage script demonstrating the Agentic Evaluation & Guardrails Suite.
"""
import json
import logging
from eval_suite.judge import LLMJudge
from eval_suite.guardrails import GuardrailEngine
from eval_suite.pairwise import PairwiseEvaluator

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")

def main():
    print("=" * 60)
    print("Agentic Evaluation & Guardrails Suite - Live Execution")
    print("=" * 60)

    # 1. Setup LLM-as-a-Judge
    judge = LLMJudge(threshold=0.60)
    prompt = "Explain how intent routing works in Model Context Protocol."
    context = "Model Context Protocol uses an intent router to classify incoming tool calls into strategies like semantic search or exact match."
    response = "The Model Context Protocol classifies incoming tool calls with an intent router using semantic search or exact match strategies."

    print(f"\n[EVAL 1] Evaluating Agent Output against Context...")
    score = judge.evaluate(prompt, response, context)
    print(f"  -> Faithfulness: {score.faithfulness}")
    print(f"  -> Relevance: {score.relevance}")
    print(f"  -> Hallucination Rate: {score.hallucination_rate}")
    print(f"  -> Verdict: {score.verdict} (Overall: {score.overall_score})")

    # 2. Setup Guardrails Engine with JSON Schema & PII checks
    schema = {
        "type": "object",
        "properties": {
            "status": {"type": "string"},
            "intent": {"type": "string"},
            "confidence": {"type": "number"}
        },
        "required": ["status", "intent", "confidence"]
    }
    guardrails = GuardrailEngine(schema=schema, blocked_words=["confidential", "secret"])

    test_output_valid = json.dumps({"status": "success", "intent": "doc_search", "confidence": 0.95})
    print(f"\n[GUARDRAIL 1] Validating structured JSON response...")
    res1 = guardrails.validate(test_output_valid)
    print(f"  -> Valid: {res1.is_valid} | Schema Passed: {res1.schema_passed} | PII Leak: {res1.pii_detected}")

    test_output_pii = json.dumps({"status": "success", "intent": "user_lookup", "confidence": 0.8, "user_email": "admin@company.com"})
    print(f"\n[GUARDRAIL 2] Testing PII Leak Detection...")
    res2 = guardrails.validate(test_output_pii)
    print(f"  -> Valid: {res2.is_valid} | PII Leak: {res2.pii_detected} | Violations: {res2.safety_violations}")

    # 3. Pairwise Comparison
    print(f"\n[PAIRWISE] Pairwise Evaluation (Model A vs Model B)...")
    pairwise = PairwiseEvaluator(judge)
    out_a = "Intent routing classifies tools into strategies using Model Context Protocol."
    out_b = "I don't know what intent routing is."
    p_res = pairwise.compare(prompt, out_a, out_b, context)
    print(f"  -> Winner: {p_res.winner}")
    print(f"  -> Score Model A: {p_res.score_a} | Score Model B: {p_res.score_b}")
    print(f"  -> Reasoning: {p_res.reasoning}")

    print("\n" + "=" * 60)
    print("Evaluation Suite Demo Completed Successfully!")
    print("=" * 60)

if __name__ == "__main__":
    main()
