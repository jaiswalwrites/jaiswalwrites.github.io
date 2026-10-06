"""
Guardrail Engine — JSON Schema Validation and PII / Safety Filters.
"""
import json
import re
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

try:
    import jsonschema
    HAS_JSONSCHEMA = True
except ImportError:
    HAS_JSONSCHEMA = False

@dataclass
class ValidationResult:
    is_valid: bool
    schema_passed: bool
    pii_detected: bool
    safety_violations: List[str] = field(default_factory=list)
    errors: List[str] = field(default_factory=list)

class GuardrailEngine:
    """
    Enforces structural JSON schema validation, PII filtering (email, ssn, phone),
    and safety topic policy constraints on model outputs.
    """

    DEFAULT_PII_PATTERNS = {
        "email": r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
        "ssn": r'\b\d{3}-\d{2}-\d{4}\b',
        "phone": r'\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b',
    }

    def __init__(self, schema: Optional[Dict[str, Any]] = None, blocked_words: Optional[List[str]] = None):
        self.schema = schema
        self.blocked_words = [w.lower() for w in (blocked_words or [])]

    def validate(self, output: str) -> ValidationResult:
        errors = []
        safety_violations = []
        schema_passed = True
        pii_detected = False

        # 1. PII Check
        for pii_type, pattern in self.DEFAULT_PII_PATTERNS.items():
            if re.search(pattern, output):
                pii_detected = True
                safety_violations.append(f"PII Leak Detected ({pii_type})")

        # 2. Safety / Blocked Words Check
        output_lower = output.lower()
        for word in self.blocked_words:
            if word in output_lower:
                safety_violations.append(f"Blocked Keyword Detected ('{word}')")

        # 3. JSON Schema Validation
        if self.schema:
            try:
                data = json.loads(output)
                if HAS_JSONSCHEMA:
                    jsonschema.validate(instance=data, schema=self.schema)
                else:
                    # Basic keys check fallback
                    req_keys = self.schema.get("required", [])
                    for k in req_keys:
                        if k not in data:
                            raise ValueError(f"Missing required key '{k}'")
            except (json.JSONDecodeError, Exception) as e:
                schema_passed = False
                errors.append(f"JSON Schema Error: {e}")

        is_valid = schema_passed and not pii_detected and len(safety_violations) == 0

        return ValidationResult(
            is_valid=is_valid,
            schema_passed=schema_passed,
            pii_detected=pii_detected,
            safety_violations=safety_violations,
            errors=errors
        )
