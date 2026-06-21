# TASK BOARD

Last updated: 2026-06-21

## NOW

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Run AppSheet UI discovery with real URL | Capture live views/actions/screens safely | `playwright-discovery-report.json` contains discovered views or login blocker | No production write approval; URL/session approval needed |
| Review scanner output and fill AppSheet UI inventory | Convert raw scan to migration-ready map | `APPSHEET_UI_INVENTORY.md` has one row per discovered screen | No |
| Update AppSheet-to-Next screen map from evidence | Create route/component plan | `APPSHEET_TO_NEXT_SCREEN_MAP.md` references discovered screens | No |

## NEXT

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Confirm canonical repo root | Avoid writing docs to wrong outer/nested path | Liad confirms root; docs remain under selected repo | No |
| Audit AppSheet actions/bots manually if Playwright cannot see them | Fill migration gaps | Actions/bots marked discovered or UNKNOWN | No production changes |
| Separate BusinessDocuments status map from AutomationCommands status | Reduce implementation ambiguity | Status lifecycle doc or section created | No |
| Create receipts requirements map | Define Phase 2 scope from evidence | Receipt sources, triggers, and blockers documented | No |

## BACKLOG

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Design Maven create-draft payload builder | Bridge approved draft rows to Maven | Payload schema and validation plan documented | Yes before code |
| Analyze Drive auto-save bug | Identify smallest safe fix | Root-cause hypothesis and test plan documented | Yes before code |
| Analyze Maven sync stuck bug | Identify smallest safe fix | Error pattern and incremental plan documented | Yes before code |
| Consolidate duplicate AI Draft docs | Reduce conflicting instructions | Cleanup diff only touches docs | No for docs; yes if changing code |
| Build Next.js scaffold | Start migration implementation | App runs locally with mapped routes | Yes, because it begins new app work |

## DONE

| Task | Evidence |
|---|---|
| Governance Foundation completed | `project-brain/roadmap/ROADMAP.md`, `project-brain/current/CURRENT_TASK.md` |
| Sheets registry populated | `data-sources/tools/SHEETS_REGISTRY.md` |
| AI Draft read-only preview validated as concept | `project-brain/checkpoints/NEXT_SESSION.md`, `AI_DRAFT_RUNTIME_BLUEPRINT.md` |
| Project control map created | This mission's `PROJECT_DASHBOARD.md`, traceability, inventory, gaps, task board, next tasks, n8n map |

## BLOCKED

| Task | Blocker | Next Unblock Step |
|---|---|---|
| Live AppSheet Playwright scan | Missing `APPSHEET_APP_URL` and login/session state | Set env var and run scanner |
| Real AppSheet action/bot migration map | AppSheet definitions are not exported in repo | Use scanner plus manual AppSheet export/review |
| Production AI Draft -> Maven | Requires approval and missing payload/create API contract | Approve design-only Maven payload audit |
| Automatic receipts | No source data, workflow, or table contract found | Approve receipts requirements discovery |

