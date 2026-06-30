"""Tal Executive Runtime read-only POC entrypoint."""

from __future__ import annotations

import argparse

from schemas import (
    CandidateCapability,
    Decision,
    EvidenceState,
    EvidenceStatus,
    ExecutiveDecisionReport,
)
from tools import read_github_state, read_project_brain, read_project_sync, read_runtime_map


def build_dry_run_report() -> ExecutiveDecisionReport:
    github = read_github_state()
    project_brain = read_project_brain()
    project_sync = read_project_sync()
    runtime_map = read_runtime_map()

    evidence = EvidenceState(
        github=EvidenceStatus.USED if github.get("latest_commit") else EvidenceStatus.UNKNOWN,
        project_brain=EvidenceStatus.USED if project_brain.get("current_task") else EvidenceStatus.UNKNOWN,
        project_sync=EvidenceStatus.USED if project_sync.get("state") else EvidenceStatus.UNKNOWN,
        runtime=EvidenceStatus.USED if runtime_map.get("routes") else EvidenceStatus.UNKNOWN,
        database=EvidenceStatus.NOT_NEEDED,
    )

    candidates = [
        CandidateCapability(
            name="Approval-ready ServiceReport to BusinessDocument loop",
            business_value=10,
            revenue_impact=10,
            manual_work_reduction=9,
            customer_value=8,
            risk_reduction=8,
            future_leverage=10,
            development_cost=4,
            complexity=5,
            time_to_deliver=8,
            confidence=9,
            reason="Closest path from completed service work to revenue-ready internal documents.",
        ),
        CandidateCapability(
            name="Asset Workspace / Asset Timeline",
            business_value=8,
            revenue_impact=6,
            manual_work_reduction=7,
            customer_value=7,
            risk_reduction=7,
            future_leverage=8,
            development_cost=5,
            complexity=6,
            time_to_deliver=7,
            confidence=7,
            reason="Useful operational context, but less direct revenue impact than draft throughput.",
        ),
        CandidateCapability(
            name="Maven / Invoice4U adapter readiness",
            business_value=8,
            revenue_impact=9,
            manual_work_reduction=8,
            customer_value=8,
            risk_reduction=5,
            future_leverage=9,
            development_cost=8,
            complexity=9,
            time_to_deliver=4,
            confidence=5,
            reason="High value later, but external-system evidence and approvals are not ready.",
        ),
    ]

    return ExecutiveDecisionReport(
        company_objective="Convert service work into revenue faster with less manual coordination.",
        candidates=candidates,
        evidence=evidence,
        decision=Decision.APPROVE,
        minimal_next_slice=(
            "Validate one real ServiceReport through the existing internal "
            "BusinessDocument draft loop with no external side effects."
        ),
    )


def print_report(report: ExecutiveDecisionReport) -> None:
    print("Company Objective")
    print(report.company_objective)
    print()

    print("Candidate capabilities")
    for candidate in report.candidates:
        print(f"- {candidate.name}: {candidate.reason}")
    print()

    print("Evidence status")
    print(f"- GitHub: {report.evidence.github.value}")
    print(f"- Project Brain: {report.evidence.project_brain.value}")
    print(f"- PROJECT_SYNC: {report.evidence.project_sync.value}")
    print(f"- Runtime: {report.evidence.runtime.value}")
    print(f"- Database: {report.evidence.database.value}")
    print()

    print(f"Decision: {report.decision.value}")
    print()

    print("Minimal next slice")
    print(report.minimal_next_slice)


def main() -> int:
    parser = argparse.ArgumentParser(description="Tal Executive Runtime POC")
    parser.add_argument("--dry-run", action="store_true", help="Run without API calls or mutations")
    args = parser.parse_args()

    if not args.dry_run:
        parser.error("Phase 1 supports --dry-run only")

    print_report(build_dry_run_report())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
