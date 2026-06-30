"""Schemas for the Tal Executive Runtime read-only POC."""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class Decision(str, Enum):
    APPROVE = "APPROVE"
    NEEDS_FIX = "NEEDS_FIX"
    BLOCKED = "BLOCKED"


class EvidenceStatus(str, Enum):
    USED = "USED"
    NOT_NEEDED = "NOT_NEEDED"
    UNKNOWN = "UNKNOWN"


@dataclass(frozen=True)
class EvidenceState:
    github: EvidenceStatus = EvidenceStatus.UNKNOWN
    project_brain: EvidenceStatus = EvidenceStatus.UNKNOWN
    project_sync: EvidenceStatus = EvidenceStatus.UNKNOWN
    runtime: EvidenceStatus = EvidenceStatus.UNKNOWN
    database: EvidenceStatus = EvidenceStatus.NOT_NEEDED


@dataclass(frozen=True)
class CandidateCapability:
    name: str
    business_value: int
    revenue_impact: int
    manual_work_reduction: int
    customer_value: int
    risk_reduction: int
    future_leverage: int
    development_cost: int
    complexity: int
    time_to_deliver: int
    confidence: int
    reason: str


@dataclass(frozen=True)
class ExecutiveDecisionReport:
    company_objective: str
    candidates: list[CandidateCapability] = field(default_factory=list)
    evidence: EvidenceState = field(default_factory=EvidenceState)
    decision: Decision = Decision.NEEDS_FIX
    minimal_next_slice: str = ""
