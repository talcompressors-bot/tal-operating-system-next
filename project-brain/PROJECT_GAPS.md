# PROJECT GAPS

Last updated: 2026-06-21

## Missing Implementation

- No Next.js app, route tree, component library, API layer, or tests found.
- No real AppSheet UI/view/action/bot discovery output yet.
- No automatic receipt workflow implementation found.
- AI Draft does not yet create approved internal draft rows in production.
- `createMavenDraft(data)` currently updates internal status/logs; evidence does not show real Maven create-document API call.
- `BusinessDocumentItems` are not consumed by a Maven payload builder.
- Maven draft response persistence to `BusinessDocuments.MavenDocumentId`, number, PDF, and `ServiceReports.MavenDocumentCreated` is missing.
- System Health setup/validation exists locally, but operational execution/deploy status is not approved in this mission.

## Missing Documentation

- Live AppSheet UX views, actions, bots, slices, and security filters are unknown.
- Receipts data model and approval policy are not documented.
- Next.js migration acceptance criteria are not documented per screen.
- AppSheet-to-Next route/component map depends on discovery and is currently proposed only.
- Exact Maven create-document API contract is not documented in repo evidence.
- Several Apps Script file references conflict between `.gs` and `.js`.

## Broken Or Unclear Flows

- Drive auto-save for new service reports is open as a production bug.
- Maven sync is open as a production bug around `InvoiceMavenDocumentItems`.
- BusinessDocuments document-status lifecycle is not fully separated from AutomationCommands queue status in all docs.
- AppSheet approval-to-command behavior is described but not exported as code.
- AppSheet Bot and Apps Script row update boundaries must remain protected but exact live bot settings are unknown.

## Duplicate Or Conflicting Plans

- `project-brain/current/CURRENT_TASK.md` is a retired compatibility stub; `project-brain/CURRENT_TASK.md` is active.
- AI Draft docs are spread across agent docs, runtime blueprint, flow map, and roadmap files.
- AppSheet/Apps Script maps overlap with `SYSTEM_COMPONENTS.md` and `PROJECT_BRAIN_MASTER.md`.
- `project-brain/apps-script/*` appears to be a mirror/snapshot of Apps Script files, while `apps-script/*` is the active code area.
- Root-level `PROJECT_MASTER_CONTEXT.md` marks itself historical and should not override current sources.

## Risks

- Any `clasp push` can overwrite production Apps Script files.
- AppSheet Bot and Apps Script updating the same row can reintroduce duplicate execution.
- Changing Drive folder/report file logic can create duplicate folders or files.
- Changing ReportCounter logic can create duplicate report numbers.
- Running Maven sync or backfill functions can write production sheet data.
- AppSheet UI scanning can accidentally click unsafe actions if safety rules are weak.
- Credentials, AppSheet URLs, and Maven API keys must not be committed.

## Decisions Needed From Liad

- Confirm whether the nested `TalCompressors-ServiceReports-AI/` directory is the canonical repo root.
- Provide or approve use of `APPSHEET_APP_URL` for read-only scanning.
- Decide whether Playwright should use an existing browser profile/session or a saved non-secret storage-state file.
- Decide whether AppSheet screen inventory should be the next migration source of truth.
- Decide where automatic receipts belong in the roadmap and what source data proves payment evidence.
- Decide canonical policy for `apps-script/*.js` versus `project-brain/apps-script/*.gs` mirrors.
- Approve or reject any future production logic work separately.
