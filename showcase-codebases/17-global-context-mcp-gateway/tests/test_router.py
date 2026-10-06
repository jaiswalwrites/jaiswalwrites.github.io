"""Unittest suite for IntentRouter."""
import unittest
from gateway.router import IntentRouter, IntentClass

class TestIntentRouter(unittest.TestCase):
    def setUp(self):
        self.router = IntentRouter()

    def test_exact_tool_name_doc_search(self):
        intent = self.router.classify("search_docs", {"query": "install kloudfuse"})
        self.assertEqual(intent.cls, IntentClass.DOC_SEARCH)
        self.assertEqual(intent.confidence, 0.95)
        self.assertEqual(intent.context_strategy, "semantic_search")

    def test_exact_tool_name_api_lookup(self):
        intent = self.router.classify("api_lookup", {"endpoint": "/metrics"})
        self.assertEqual(intent.cls, IntentClass.API_LOOKUP)
        self.assertEqual(intent.confidence, 0.95)
        self.assertEqual(intent.context_strategy, "exact_match")

    def test_exact_tool_name_changelog(self):
        intent = self.router.classify("get_changelog", {"version": "4.2"})
        self.assertEqual(intent.cls, IntentClass.CHANGELOG)
        self.assertEqual(intent.context_strategy, "date_range_filter")

    def test_keyword_signal_api(self):
        intent = self.router.classify("unknown_tool", {"query": "api endpoint reference"})
        self.assertEqual(intent.cls, IntentClass.API_LOOKUP)
        self.assertEqual(intent.confidence, 0.70)

    def test_keyword_signal_install(self):
        intent = self.router.classify("helper", {"query": "how to install the product"})
        self.assertEqual(intent.cls, IntentClass.DOC_SEARCH)
        self.assertEqual(intent.confidence, 0.70)

    def test_fallback_to_general(self):
        intent = self.router.classify("unknown_tool", {"data": "some irrelevant content"})
        self.assertEqual(intent.cls, IntentClass.GENERAL)
        self.assertEqual(intent.confidence, 0.40)
        self.assertEqual(intent.context_strategy, "keyword_search")

    def test_intent_repr(self):
        intent = self.router.classify("search_docs", {"query": "test"})
        self.assertIn("doc_search", repr(intent))
        self.assertIn("semantic_search", repr(intent))

if __name__ == "__main__":
    unittest.main()
