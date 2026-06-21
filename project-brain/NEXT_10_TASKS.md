# NEXT 10 TASKS

Last updated: 2026-06-21

| # | Task | Goal | Files Likely Involved | Expected Result | Test / Verification | Risk | Approval Needed Before Production Logic |
|---|---|---|---|---|---|---|---|
| 1 | Run AppSheet UI discovery | Capture real AppSheet screens for migration | `scripts/playwright/appsheet-discovery.ts`, `project-brain/appsheet-ui/*` | JSON report and screenshots or clear login blocker | Report has views or blocker status | Low | No production logic touched; URL/session approval needed |
| 2 | Fill AppSheet UI inventory from scan | Produce human-readable screen list | `project-brain/appsheet-ui/APPSHEET_UI_INVENTORY.md` | View/card/screen table populated from evidence | Every discovered view appears in inventory | Low | No |
| 3 | Fill AppSheet-to-Next screen map | Prioritize migration screens | `project-brain/appsheet-ui/APPSHEET_TO_NEXT_SCREEN_MAP.md` | Proposed routes/components per screen | Each discovered screen has route or UNKNOWN | Low | No |
| 4 | Create AppSheet action/bot gap list | Know what scanner cannot see | `project-brain/PROJECT_GAPS.md`, `project-brain/maps/APPSHEET_MAP.md` | Actions/bots marked verified or UNKNOWN | No unverified action treated as fact | Low | No |
| 5 | Map BusinessDocuments and AutomationCommands statuses | Prevent status confusion | `AI_DRAFT_FLOW_MAP.md`, `project-brain/maps/SYSTEM_MAP.md`, new/update doc if approved | Separate status lifecycle table | Status names cite source or UNKNOWN | Low | No |
| 6 | Receipt requirements discovery | Define Phase 2 from real sources | `project-brain/PROJECT_DASHBOARD.md`, `PROJECT_GAPS.md`, future receipt plan | Trigger/input/output/approval map for receipts | Missing data marked UNKNOWN | Low | No |
| 7 | Maven create-draft API evidence audit | Confirm what is missing before coding | `apps-script/MavenAPI.js`, Maven docs if provided, `agents/MAVEN_AGENT.md` | API contract and payload fields documented | No code change; missing fields listed | Medium | Yes before implementation |
| 8 | AI Draft internal draft write design | Prepare safe approved write phase | `AI_DRAFT_RUNTIME_BLUEPRINT.md`, `apps-script/AIDraftHistory.js`, `SHEETS_REGISTRY.md` | Write boundary, validation, rollback plan | Design cites table columns | Medium | Yes before code/write |
| 9 | Drive auto-save root-cause analysis | Fix Bug 1 later without broad rewrite | `apps-script/טופס HTML דוחות שירות.js`, `project-brain/bugs/CURRENT_BUGS.md` | Root-cause hypothesis and smallest fix plan | No production changes | Medium | Yes before code/deploy |
| 10 | Maven sync stuck root-cause analysis | Fix Bug 2 later without rewriting sync | `apps-script/MavenAPI.js`, `project-brain/bugs/CURRENT_BUGS.md` | Repro/read-only analysis and small fix plan | No Maven call unless approved | High | Yes before code/run |

