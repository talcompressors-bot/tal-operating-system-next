# PROJECT MASTER CONTEXT

Last updated: 2026-06-10

## Purpose

This file is the high-level project context for `TalCompressors-ServiceReports-AI`.

It consolidates the current repository state, Project Brain memory, stable production flows, System Health infrastructure, AI Draft roadmap, and active blockers so future work can resume without relying on chat history or screenshots.

This file is documentation only. It does not replace Project Brain, Google Sheets, Apps Script, or git history as operational sources of truth.

## Project Vision

Build a controlled business automation platform for service reports, business documents, approvals, AI-assisted draft creation, Google Drive document handling, Maven integration, and future invoicing/ERP workflows.

The long-term direction is a multi-tenant, registry-driven platform where company-specific behavior is configuration, not hardcoded code.

## Business Goals

- Manage service reports from AppSheet and Google Sheets.
- Save signed service reports and HTML/PDF outputs to Google Drive reliably.
- Create approved business documents and Maven drafts through a queue-based workflow.
- Prevent duplicate executions, duplicate customer folders, duplicate report files, and duplicate Maven drafts.
- Add AI Draft recommendations using approved, inspectable preview logic before any document creation.
- Add System Health infrastructure to detect broken flows, missing files, stuck queues, schema drift, and automation failures.
- Prepare the architecture for future Invoice4u, Gmail, Calendar, supplier Excel, inventory, purchase order, and collection workflows.

## Current Architecture

Current operating stack:

- AppSheet is the UI and approval layer.
- Google Sheets is the operational data store.
- Apps Script is the execution and validation layer.
- Google Drive stores service report outputs and customer folders.
- Maven API creates and syncs business documents.
- Invoice4u is planned for future invoicing flows.

Current critical flow:

```text
ServiceReports / BusinessDocuments
-> AutomationCommands
-> AppSheet Bot
-> Apps Script webhook
-> Maven API
-> status/log updates
```

## Stable Production Flows

Protect these flows unless a specific change plan is approved:

- AutomationCommands queue architecture.
- BusinessDocuments workflow.
- Maven draft creation.
- Report counter logic.
- Drive folder logic.
- Signed report / HTML file save logic.
- AppSheet Bot and Apps Script row update boundaries.

Critical rule:

```text
Never allow AppSheet Bot and Apps Script to update the same row simultaneously.
Use AutomationCommands queue architecture.
```

## Known Active IDs

From `project-brain/current/LIVE_OBJECTS.md`:

- `ReportCounter`: `5824`
- `ReportId`: `UNKNOWN`
- `BusinessDocumentId`: `UNKNOWN`
- `AutomationCommandId`: `UNKNOWN`
- `MavenDocumentId`: `UNKNOWN`
- `MavenDocumentNumber`: `UNKNOWN`

Never invent missing IDs.

## Git Checkpoints

Recent relevant commits:

- `2dfcb01` Add SystemHealthLog validation layer
- `75df29a` Add SystemHealthLog setup foundation
- `e1eb5bb` Add HealthCheckRegistry setup foundation
- `9ecc095` Add AutomationRegistry validation layer
- `f88a0f2` Add REGISTRY_SCHEMA support
- `565c745` Add AutomationRegistry setup foundation
- `1cd781f` WIP AI Draft preview generator
- `88265b8` Add AI Draft flow map and dependency analysis
- `d07d3e4` Add system health agent plan

Older important checkpoint:

- `585ef51a02ae8709cb1c4ccd0e39967d39a9bd29` added BusinessDocument-level idempotency guard to the Maven queue flow.

## System Health Infrastructure Status

System Health planning and foundational code are committed locally.

Committed local Apps Script files:

- `apps-script/SystemHealthSetup.js`
- `apps-script/SystemHealthRegistryValidation.js`
- `apps-script/SystemHealthLogValidation.js`

Important status:

- The local repository contains System Health setup and validation code.
- The remote Apps Script cloud project does not yet contain these System Health files.
- `setupAutomationRegistrySheet()` could not run because the cloud Apps Script project could not find the function.
- No setup functions have successfully run.
- No validators have been run against the new registries/logs.
- No System Health sheets have been created yet.

Required next operational step before setup:

1. Review remote-vs-local Apps Script differences.
2. Decide whether `clasp push` is safe.
3. Only then push cloud source, if approved.
4. Only then run setup functions one by one.

## AutomationRegistry Status

Local committed code includes:

- `setupAutomationRegistrySheet()`
- `validateAutomationRegistrySchema()`

Design intent:

- `AutomationRegistry` is the source of truth for AppSheet actions, AppSheet bots, AutomationCommands, Apps Script functions, Drive effects, Maven/API effects, expected results, health checks, failure signals, root cause detection, suggested fixes, ownership, safety rules, source attribution, versioning, and enabled/disabled status.

Current execution status:

- Sheet does not exist in the target Google Sheet as of the last inspection.
- Setup function is create-only.
- Existing sheet branch returns with `created: false`, `modified: false`, and performs no writes.
- Setup cannot run until `SystemHealthSetup.js` exists in the remote Apps Script project.

## HealthCheckRegistry Status

Local committed code includes:

- `setupHealthCheckRegistrySheet()`

Design intent:

- `HealthCheckRegistry` defines all future system health checks.
- Includes schema row `HC_REGISTRY_SCHEMA`.
- Includes `HC-SYSTEM-001 VerifyAutomationRegistrySchema`.
- Includes Drive, Maven, AutomationCommands, BusinessDocuments, permissions, duplicate detection, and completion checks.

Current execution status:

- Sheet does not exist in the target Google Sheet as of the last inspection.
- Setup function is create-only.
- Existing sheet branch returns with `created: false`, `modified: false`, and performs no writes.
- Setup cannot run until `SystemHealthSetup.js` exists in the remote Apps Script project.

## SystemHealthLog Status

Local committed code includes:

- `setupSystemHealthLogSheet()`
- `validateSystemHealthLogSchema()`

Design intent:

- `SystemHealthLog` stores execution results for every health check.
- Includes `SHL_REGISTRY_SCHEMA`.
- Includes `RecordType`, `ParentLogId`, `ConfidenceScore` on a `0-100` scale, `CorrelationId`, `ResolutionStatus`, and schema/version metadata.

Current execution status:

- Sheet does not exist in the target Google Sheet as of the last inspection.
- Setup function is create-only.
- Existing sheet branch returns with `created: false`, `modified: false`, and performs no writes.
- Setup cannot run until `SystemHealthSetup.js` exists in the remote Apps Script project.

## Remote Backup Strategy

Before any `clasp push`, back up the current cloud Apps Script project.

Current remote backup path:

```text
C:\Users\משתמש\Desktop\AppsScriptBackups\SystemHealthRemoteBackup-20260610-180622
```

Remote backup files found:

- `.clasp.json`
- `AIDraftHistory.js`
- `appsscript.json`
- `EmailSender.js`
- `MavenAPI.js`
- `Report.html`
- `טופס HTML דוחות שירות.js`

Remote-vs-local comparison summary:

- `EmailSender.js`: matches
- `MavenAPI.js`: matches
- `Report.html`: matches
- `appsscript.json`: matches
- `טופס HTML דוחות שירות.js`: differs
- `AIDraftHistory.js`: differs

Current `clasp push` status:

```text
BLOCKED
```

Reason:

- `clasp push` uploads all tracked local Apps Script files, not only new System Health files.
- Pushing now would overwrite two production-sensitive remote files with local versions.

Files requiring manual review:

- `טופס HTML דוחות שירות.js`: remote has a `debugReport5852()` helper missing locally.
- `AIDraftHistory.js`: local has large AI Draft preview additions missing remotely.

## Multi-Tenant Roadmap

Approved architectural direction:

- Use `TenantId` as the primary isolation key.
- Keep `CompanyId` as optional business metadata or alias.
- Add tenant-aware configuration across registries and logs.
- Use persisted `ExecutionContextLog` snapshots for auditability and isolation.
- Keep platform logic separate from tenant-specific mappings.

Planned platform tables:

- `PlatformRegistry`
- `TenantRegistry`
- `IntegrationRegistry`
- `AutomationRegistry`
- `HealthCheckRegistry`
- `SystemHealthLog`
- `ExecutionContextLog`

Important rule:

```text
Tal Compressors should become the first tenant, not the platform identity.
```

## PlatformRegistry Status

Design approved.

Purpose:

- Platform-level governance for multi-tenant architecture.
- Defines platform version, runner compatibility, tenant isolation rules, connector compatibility, schema versions, feature flags, migration policy, rollback policy, and SaaS deployment strategy.

No PlatformRegistry code or sheet has been created yet.

## SystemHealthRunner v1 Status

Design approved at the execution-engine level.

Runner assumptions:

- `PlatformRegistry` exists.
- `TenantRegistry` exists.
- `IntegrationRegistry` exists.
- `AutomationRegistry` exists.
- `HealthCheckRegistry` exists.
- `SystemHealthLog` exists.
- `ExecutionContextLog` exists.

Runner v1 goal:

- Generic, read-only, tenant-isolated execution engine.
- Load platform and tenant config.
- Build execution context.
- Execute enabled health checks.
- Log results.

Excluded from v1:

- Auto-repair.
- Migrations.
- Registry creation.
- Tenant onboarding automation.
- Billing.
- Credential management implementation.

## AI Draft Roadmap

Current AI Draft direction:

- Analyze ServiceReports.
- Use ProductsCatalog first.
- Use same equipment history.
- Use same customer history.
- Use similar customers.
- Generate AI/business document recommendations.
- Require user approval before Maven draft creation.

Current local code status:

- `AIDraftHistory.js` contains committed local AI Draft preview work.
- Remote Apps Script version is much shorter and does not contain the full local preview implementation.

Important fixed pricing rules from Project Brain:

- Technician hour: `275 NIS`
- Visit: `300 NIS`

Current AI Draft blocker:

- Local AI Draft preview code must be manually reviewed before `clasp push`, because it would be uploaded to the cloud script.

## Known Risks

- `clasp push` can overwrite remote cloud script files.
- Remote cloud script has production-only debug code not present locally.
- Local AI Draft code has large committed additions not present remotely.
- Setup functions cannot run until remote Apps Script contains `SystemHealthSetup.js`.
- Drive save auto-flow remains an open production bug.
- Maven sync remains stuck around `InvoiceMavenDocumentItems`.
- Report counter synchronization has known historical risk around duplicate numbering.
- ProcessingCommandId is not auto-cleared when AutomationCommands enters Error.
- AppSheet Bot and Apps Script row update conflict must never be reintroduced.

## Lessons Learned

- Use AutomationCommands queue architecture to prevent duplicate executions.
- Never allow AppSheet Bot and Apps Script to update the same row simultaneously.
- Analyze first; change one thing at a time.
- Do not rewrite stable flows before proving root cause.
- Use stable identifiers before creating Drive folders/files.
- Do not rewrite Maven sync from scratch.
- No production deployment without checkpoint and backup.

## Approved Decisions

- Use AutomationCommands queue architecture.
- Apps Script is the main execution and validation layer.
- Git, VS Code, and Codex CLI are the primary development workflow.
- Create Project Brain startup protocol.
- Create System Health Check concept.
- AutomationRegistry schema v1 approved.
- HealthCheckRegistry v1 approved.
- SystemHealthLog v1 approved.
- Multi-tenant architecture direction approved.
- PlatformRegistry design approved.
- SystemHealthRunner v1 design approved.

## Current Blocking Issues

1. `clasp push` is blocked pending manual review of two differing Apps Script files.
2. Remote Apps Script project does not contain `SystemHealthSetup.js`.
3. System Health setup functions cannot run until remote source is synced.
4. System Health sheets do not exist yet in the target spreadsheet.
5. Google Sheet backup is confirmed, but cloud Apps Script push safety is not yet approved.

## Exact Next Steps

1. Decide whether to preserve or remove remote-only `debugReport5852()` from `טופס HTML דוחות שירות.js`.
2. Decide whether local `AIDraftHistory.js` preview implementation is approved to push to cloud.
3. If both file differences are approved, run `clasp.cmd push` from `apps-script/`.
4. Confirm remote Apps Script project contains `SystemHealthSetup.js`.
5. Run setup functions one at a time:
   - `setupAutomationRegistrySheet()`
   - `setupHealthCheckRegistrySheet()`
   - `setupSystemHealthLogSheet()`
6. Inspect created sheet names and row/column counts.
7. Only after setup succeeds, consider running validators with explicit approval.

Do not deploy unless separately approved.

## Repository Structure Overview

Top-level:

- `.agents/`: local Codex skills.
- `agents/`: agent definitions and Project Brain agent docs.
- `apps-script/`: Apps Script source files and clasp config.
- `data-sources/`: project data-source area.
- `project-brain/`: persistent project memory.
- `AI_DRAFT_FLOW_MAP.md`: AI Draft flow and dependency analysis.
- `AI_RULES.md`: AI operating and development rules.
- `PROJECT_INDEX.md`: project source-of-truth index.
- `PROJECT_OPERATING_PROTOCOL.md`: currently empty documentation placeholder.
- `PROJECT_SOURCES.md`: project source notes.
- `START_CODEX.md` / `END_CODEX.md`: session start/end docs.

Apps Script files:

- `טופס HTML דוחות שירות.js`
- `AIDraftHistory.js`
- `EmailSender.js`
- `MavenAPI.js`
- `Report.html`
- `SystemHealthSetup.js`
- `SystemHealthRegistryValidation.js`
- `SystemHealthLogValidation.js`
- `appsscript.json`

## Documentation Gaps

- `PROJECT_OPERATING_PROTOCOL.md` exists but is empty.
- `project-brain/current/CURRENT_TASK.md` is stale relative to the active System Health infrastructure work.
- `project-brain/checkpoints/ACTIVE_SESSION_STATE.md` is stale relative to current System Health work.
- `PROJECT_BRAIN_MASTER.md` contains duplicated headings and some encoding-corrupted Hebrew text.
- System Health infrastructure status is now mostly in git history and chat context; this file captures it until Project Brain is updated with approval.
