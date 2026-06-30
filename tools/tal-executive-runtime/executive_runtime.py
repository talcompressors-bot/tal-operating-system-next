"""Tal Executive Runtime read-only POC entrypoint."""

from __future__ import annotations

import argparse

from schemas import (
    CandidateCapability,
    Decision,
    EvidenceReport,
    EvidenceState,
    EvidenceStatus,
    ExecutiveDecisionReport,
    GitEvidence,
    ObserveStatus,
    SourceEvidence,
)
from tools import (
    read_company_objectives,
    read_github_state,
    read_project_brain,
    read_project_sync,
    read_runtime_map,
)


def _source_status(value: str) -> EvidenceStatus:
    if not value or value == "UNKNOWN" or value.startswith("MISSING:"):
        return EvidenceStatus.UNKNOWN
    return EvidenceStatus.USED


def observe() -> EvidenceReport:
    github = read_github_state()
    project_brain = read_project_brain()
    project_sync = read_project_sync()
    runtime_map = read_runtime_map()
    company_objectives = read_company_objectives()

    missing_evidence: list[str] = []
    warnings: list[str] = []

    required_sources = {
        "Git evidence": github.get("latest_commit", ""),
        "Project Brain evidence": project_brain.get("summary", ""),
        "PROJECT_SYNC evidence": project_sync.get("summary", ""),
        "Runtime evidence": runtime_map.get("summary", ""),
    }
    for label, value in required_sources.items():
        if _source_status(value) is EvidenceStatus.UNKNOWN:
            missing_evidence.append(label)

    if github.get("working_tree") != "clean":
        warnings.append("Git working tree is dirty; decisions should account for uncommitted local evidence.")

    sync_text = "\n".join([project_sync.get("state", ""), project_sync.get("tasks", "")])
    if "Architect Mediation Phase 2" in sync_text:
        warnings.append(
            "PROJECT_SYNC still names Architect Mediation Phase 2 as current/latest sync task; "
            "newer commits may make the compact sync layer stale."
        )

    if _source_status(company_objectives.get("summary", "")) is EvidenceStatus.UNKNOWN:
        missing_evidence.append("Company objectives")

    if any(item != "Company objectives" for item in missing_evidence):
        overall_status = ObserveStatus.RED
    elif missing_evidence or warnings:
        overall_status = ObserveStatus.YELLOW
    else:
        overall_status = ObserveStatus.GREEN

    return EvidenceReport(
        git=GitEvidence(
            branch=github.get("branch", "UNKNOWN"),
            latest_commit=github.get("latest_commit", "UNKNOWN"),
            working_tree=github.get("working_tree", "UNKNOWN"),
            is_clean=github.get("working_tree") == "clean",
        ),
        project_brain=SourceEvidence(
            status=_source_status(project_brain.get("summary", "")),
            summary=project_brain.get("summary", "UNKNOWN"),
        ),
        project_sync=SourceEvidence(
            status=_source_status(project_sync.get("summary", "")),
            summary=project_sync.get("summary", "UNKNOWN"),
        ),
        runtime=SourceEvidence(
            status=_source_status(runtime_map.get("summary", "")),
            summary=runtime_map.get("summary", "UNKNOWN"),
        ),
        company_objectives=SourceEvidence(
            status=_source_status(company_objectives.get("summary", "")),
            summary=company_objectives.get("summary", "UNKNOWN"),
        ),
        missing_evidence=missing_evidence,
        warnings=warnings,
        overall_status=overall_status,
    )


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


def print_observe_report(report: EvidenceReport) -> None:
    print("Git evidence")
    print(f"- Branch: {report.git.branch}")
    print(f"- Latest commit: {report.git.latest_commit}")
    print(f"- Working tree: {report.git.working_tree}")
    print()

    print("Project Brain evidence")
    print(f"- Status: {report.project_brain.status.value}")
    print(f"- Summary: {report.project_brain.summary}")
    print()

    print("PROJECT_SYNC evidence")
    print(f"- Status: {report.project_sync.status.value}")
    print(f"- Summary: {report.project_sync.summary}")
    print()

    print("Runtime evidence")
    print(f"- Status: {report.runtime.status.value}")
    print(f"- Summary: {report.runtime.summary}")
    print()

    print("Company objectives evidence")
    print(f"- Status: {report.company_objectives.status.value}")
    print(f"- Summary: {report.company_objectives.summary}")
    print()

    print("Missing evidence")
    if report.missing_evidence:
        for item in report.missing_evidence:
            print(f"- {item}")
    else:
        print("- none")
    print()

    print("Stale/conflict warnings")
    if report.warnings:
        for warning in report.warnings:
            print(f"- {warning}")
    else:
        print("- none")
    print()

    print(f"Overall Observe Status: {report.overall_status.value}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Tal Executive Runtime POC")
    parser.add_argument("--dry-run", action="store_true", help="Run without API calls or mutations")
    parser.add_argument("--observe", action="store_true", help="Collect evidence without an AI decision")
    args = parser.parse_args()

    if not args.dry_run:
        parser.error("Phase 1 supports --dry-run only")

    if args.observe:
        print_observe_report(observe())
        return 0

    print_report(build_dry_run_report())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
