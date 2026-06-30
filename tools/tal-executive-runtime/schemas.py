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


class ObserveStatus(str, Enum):
    GREEN = "GREEN"
    YELLOW = "YELLOW"
    RED = "RED"


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


@dataclass(frozen=True)
class GitEvidence:
    branch: str
    latest_commit: str
    working_tree: str
    is_clean: bool


@dataclass(frozen=True)
class SourceEvidence:
    status: EvidenceStatus
    summary: str


@dataclass(frozen=True)
class EvidenceReport:
    git: GitEvidence
    project_brain: SourceEvidence
    project_sync: SourceEvidence
    runtime: SourceEvidence
    company_objectives: SourceEvidence
    missing_evidence: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    overall_status: ObserveStatus = ObserveStatus.RED
