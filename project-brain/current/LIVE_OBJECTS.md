# LIVE OBJECTS

Status: Current object tracking file

Current phase:
Wave 2 Service Workflow Layer complete; real Maven execution gate pending explicit approval

Verification note:
Values below are preserved from the last known project state unless marked `UNKNOWN`. Do not invent missing IDs.

## Service Report

ReportCounter: 5806
ReportId: 1e25bbb1

## Business Document

BusinessDocumentId: NEXT-AI-DRAFT-5806 / 1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb
DocumentStatus: APPROVED
ApprovalStatus: APPROVED
ApprovedBy: Liad Approval Smoke - override
ApprovedAt: 2026-06-25T13:54:01.257Z
SourceStatusText: Approved with explicit review override

## Business Document Logs

CreationLogId: acc98388-60ac-4d85-8256-0f3ddf5ecb8a
ReturnToReviewLogId: e4e1ce1a-f327-4e26-b7ff-6ec9af844835
ApprovalLogId: 006dd5bf-e832-42b5-91a4-01ba7d4386e5
BusinessDocumentLogCount: 3
LineResolutionSmokeTestLogIds: a3c0f56b-bb70-4c85-999d-30b26075ac67, 7a8a2933-a591-441b-ab11-fafbf0bae1db, 534763b1-29b5-4258-9214-0121d51e32da, 66ecc9ec-e2cd-4d0c-bb7e-7ff26313ad9c, 1f76221b-0f9c-4039-a096-699b7da314a9
BusinessDocumentLogCountAfterLineResolutionSmokeTest: 8

## Business Document Items

LineResolutionSmokeTestFinalItems:
- Air Filter: quantity 3, unit price 120, total 360, needsPriceApproval false
- Technician Visit / Travel: quantity 1, unit price 300, total 300, needsPriceApproval false
- Oil Filter: quantity 3, unit price 90, total 270, needsPriceApproval false
- 3L SKR oil top-up: quantity 9, unit price 45, total 405, needsPriceApproval false
- Labor + Service: quantity 2, unit price 275, total 550, needsPriceApproval false
LineResolutionSmokeTestBlockerCount: 0

## Automation Command

AutomationCommandId: NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806 / db12ee97-0960-4f85-bdd5-f9fa30780885
CommandStatus: PENDING
CreateMavenDraftCommandCountForBusinessDocument: 1
DryRunResult: DRY_RUN_VALIDATED
DryRunKey: dry-run:db12ee97-0960-4f85-bdd5-f9fa30780885:maven-draft:1d7f8500-1cb7-4d81-ad3a-b7d5d8b453eb
DryRunValidatedAt: 2026-06-25 Line Resolution POST Smoke Test
DryRunBlockers: none
DryRunBlockerCount: 0
ExternalStateChanged: false
ProcessedAt: null
CompletedAt: null

## Maven Execution Readiness

ReadinessStatus: READY_FOR_EXPLICIT_APPROVAL_GATE
RealMavenExecutionApproved: false
ExecutionGate: APPROVAL_REQUIRED
RequiredBeforeExecution:
- Explicit Liad approval for real Maven execution of NEXT-MAVEN-CMD-NEXT-AI-DRAFT-5806
- Confirm single executor ownership before any Maven call
- Re-read AutomationCommand and BusinessDocument immediately before execution
- Re-run dry-run and require DRY_RUN_VALIDATED with blocker count 0
- Review final would-send Maven payload with Liad
- Confirm manual/test pricing evidence is acceptable for real Maven draft creation or replace it with trusted production evidence
- Confirm target Maven environment and credentials
- Confirm idempotency and no existing Maven output fields
- Define allowed post-execution internal updates and failure handling
- Keep email/customer-facing action and inventory deduction separately gated

## Maven Draft

MavenDocumentId: 102451, 102452, 102453
MavenDocumentNumber: UNKNOWN

## Last Update

2026-06-25

## Source Rule

Use this file only for verified active IDs or explicit `UNKNOWN` values. Current project phase and task state come from `project-brain/CURRENT_TASK.md` and `project-brain/roadmap/ROADMAP.md`.

Current ID source:
`project-brain/CURRENT_TASK.md`, Wave 2 Line Resolution POST Smoke Test, Wave 2 Approval Workflow POST Smoke Test, Wave 2 end-to-end staging smoke test, `project-brain/AI_DRAFT_READINESS_RECHECK.md`, and `project-brain/AI_DRAFT_RECOMMENDATION_READINESS_DECISION_PACKET.md`.

Closeout rule:
If no new work occurred, preserve these IDs and report this source. Do not downgrade known IDs to `UNKNOWN`. If another canonical file reports different active IDs, report the conflict and source files instead of overwriting.
