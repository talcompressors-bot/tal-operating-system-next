# Project Brain Knowledge Base Consolidation Report

Date: 2026-06-25
Mode: documentation refactor only
Runtime impact: none

## Goal

Refactor Project Brain from case-specific documentation into reusable knowledge bases without losing information.

## Archived Files

The following one-time/case-specific documents were moved to `project-brain/archive/research/`:

| Original file | Archive path | Reason |
|---|---|---|
| `project-brain/SCR_40PM_INVENTORY_EVIDENCE_PACKET.md` | `project-brain/archive/research/SCR_40PM_INVENTORY_EVIDENCE_PACKET.md` | Model/report-specific inventory evidence |
| `project-brain/SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md` | `project-brain/archive/research/SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md` | Model-specific service-kit evidence |
| `project-brain/SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md` | `project-brain/archive/research/SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md` | Report-specific commercial evidence |
| `project-brain/SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md` | `project-brain/archive/research/SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md` | Replaced by reusable service-Maven mapping KB |

No knowledge was deleted; archived files remain available for audit trail and source evidence.

## Consolidated Knowledge Bases

| Knowledge base | Purpose |
|---|---|
| `project-brain/MANUFACTURER_PARTS_REGISTRY.md` | Manufacturer part numbers, compatible models, source file/sheet/row evidence |
| `project-brain/MANUFACTURER_SERVICE_KITS.md` | Service interval kit rules and reusable model/service part sets |
| `project-brain/SERVICE_COMMERCIAL_RULES.md` | Commercial line rules, pricing boundaries, approval flags, reusable report-5806 lessons |
| `project-brain/SERVICE_MAVEN_MAPPING.md` | ServiceReport/ReportEquipmentItem to Maven document/item link confidence model |
| `project-brain/DOCUMENT_ENGINE.md` | BusinessDocument, payment, preview/PDF, and external-output boundaries |
| `project-brain/SKU_MATCHING_RULES.md` | SKU matching priority, confidence, display, and runtime seed rules |

## Consolidated Source Material

Reusable knowledge was extracted from:

- `SCR_40PM_INVENTORY_EVIDENCE_PACKET.md`
- `SCR_40PM_SERVICE_KIT_EVIDENCE_PACKET.md`
- `SERVICE_REPORT_5806_COMMERCIAL_EVIDENCE_PACKET.md`
- `SERVICE_REPORT_MAVEN_LINK_REGISTRY_SPEC.md`
- `MANUFACTURER_KNOWLEDGE_BASE.md`
- `PARTS_SKU_INTELLIGENCE_SPEC.md`
- `INTERNAL_MANUFACTURER_SKU_REGISTRY_SPEC.md`
- `PART_COMPATIBILITY_REGISTRY.md`
- `PRICING_EVIDENCE_ENGINE_SPEC.md`
- `CURRENT_TASK.md`
- `TASK_BOARD.md`
- `DECISION_LOG.md`

## Broken References Fixed

References to permanent case-specific documents were updated to point to the reusable KBs and/or archive paths in:

- `project-brain/AI_DRAFT_RECOMMENDATION_READINESS_DECISION_PACKET.md`
- `project-brain/ACTION_SERVER_KNOWLEDGE_ACCESS_AUDIT.md`
- `project-brain/EMAIL_DOCUMENT_INTAKE_AGENT_SPEC.md`
- `project-brain/EMAIL_INTAKE_EVIDENCE_PACKET_SCHEMA.md`
- `project-brain/KNOWLEDGE_GRAPH_VALIDATION.md`
- `project-brain/SERVICE_PATTERN_INTELLIGENCE_REGISTRY.md`
- `project-brain/TASK_BOARD.md`
- `project-brain/CURRENT_TASK.md`
- `PROJECT_INDEX.md`
- `PROJECT_OPERATING_PROTOCOL.md`

## Governance Rule Added

Permanent knowledge must live in reusable Knowledge Bases.

Case-specific documents may exist only temporarily during research. Permanent knowledge must be consolidated into reusable Knowledge Bases. Future work should extend the reusable KBs instead of creating permanent `*_EVIDENCE_PACKET`, `*_DISCOVERY`, `*_SPEC`, per-model, or per-service-report documents.

## Validation

- File inventory confirmed the named case-specific documents were moved to archive.
- Reference search confirmed no active Project Brain file still points to the old root paths for the archived documents.
- `git diff --check` passed with CRLF warnings only.

## Boundaries

- No runtime files changed.
- No DB writes.
- No schema changes.
- No Prisma commands.
- No Maven/Invoice4U call.
- No email/customer-facing action.
- No inventory action.
- No source-system or production action.
