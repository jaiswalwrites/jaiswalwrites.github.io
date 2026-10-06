"""Unittests for Agentic Evaluation & Guardrails Suite."""
import unittest
import json
from eval_suite.judge import LLMJudge
from eval_suite.guardrails import GuardrailEngine
from eval_suite.pairwise import PairwiseEvaluator
from eval_suite.metrics import compute_faithfulness, compute_relevance

class TestEvalSuite(unittest.TestCase):
    def test_metrics(self):
        ctx = "Model Context Protocol supports intent routing and vector search."
        resp = "Intent routing and vector search are supported."
        faithfulness = compute_faithfulness(resp, ctx)
        self.assertTrue(faithfulness > 0.5)

        relevance = compute_relevance("Explain intent routing", "How does intent routing work?")
        self.assertTrue(relevance > 0.0)

    def test_llm_judge(self):
        judge = LLMJudge(threshold=0.5)
        res = judge.evaluate(
            prompt="How to configure database?",
            response="Database setup requires database configuration settings.",
            context="Database setup steps."
        )
        self.assertIn(res.verdict, ["PASS", "FAIL"])

    def test_guardrails_json_schema(self):
        schema = {
            "type": "object",
            "properties": {"action": {"type": "string"}},
            "required": ["action"]
        }
        engine = GuardrailEngine(schema=schema)

        valid_out = json.dumps({"action": "deploy"})
        res_valid = engine.validate(valid_out)
        self.assertTrue(res_valid.is_valid)

        invalid_out = "not json"
        res_invalid = engine.validate(invalid_out)
        self.assertFalse(res_invalid.is_valid)

    def test_guardrails_pii(self):
        engine = GuardrailEngine()
        res = engine.validate("Contact user at john.doe@example.com for help.")
        self.assertTrue(res.pii_detected)
        self.assertFalse(res.is_valid)

    def test_pairwise_evaluator(self):
        judge = LLMJudge()
        evaluator = PairwiseEvaluator(judge)
        res = evaluator.compare(
            prompt="What is Python?",
            output_a="Python is a high-level programming language.",
            output_b="Irrelevant random response text.",
            context="Python is a programming language."
        )
        self.assertEqual(res.winner, "Model A")

if __name__ == "__main__":
    unittest.main()
