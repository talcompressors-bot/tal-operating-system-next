# PROJECT FILE INVENTORY

Last updated: 2026-06-21

Status values: `ACTIVE_CODE`, `ACTIVE_DOC`, `PLANNING`, `OBSOLETE`, `DUPLICATE`, `UNKNOWN`.

| File | Type | Purpose | Business Goal | Status | Keep/Update/Archive | Notes |
|---|---|---|---|---|---|---|
| `README.md` | Markdown | Repo summary | Project orientation | ACTIVE_DOC | Update | Minimal; could link dashboard |
| `PROJECT_INDEX.md` | Markdown | Read order and source hierarchy | Governance | ACTIVE_DOC | Keep | Active source |
| `PROJECT_OPERATING_PROTOCOL.md` | Markdown | Operating rules | Governance | ACTIVE_DOC | Keep | Active source |
| `PROJECT_MASTER_CONTEXT.md` | Markdown | Historical master context | Historical context | OBSOLETE | Archive/reference | File marks itself non-current |
| `PROJECT_SOURCES.md` | Markdown | Source notes | Governance | ACTIVE_DOC | Update | May conflict with source hierarchy |
| `PROJECT_COMMANDS.md` | Markdown | Commands | Operations | ACTIVE_DOC | Keep | Operational helper |
| `START_CODEX.md` | Markdown | Session startup | Governance | ACTIVE_DOC | Keep | Startup wrapper |
| `END_CODEX.md` | Markdown | Session close | Governance | ACTIVE_DOC | Keep | Closeout helper |
| `AI_RULES.md` | Markdown | AI rules | Governance | ACTIVE_DOC | Keep | Safety rules |
| `AI_DRAFT_FLOW_MAP.md` | Markdown | AI Draft flow/gaps | AI service reports to drafts | ACTIVE_DOC | Keep | Strong evidence file |
| `AI_DRAFT_RUNTIME_BLUEPRINT.md` | Markdown | Runtime design | AI service reports to drafts | PLANNING | Keep | Documentation only |
| `RUN_AI_DRAFT_AGENT.md` | Markdown | AI Draft run instructions | AI service reports to drafts | ACTIVE_DOC | Update | Duplicates agent/checklist docs |
| `DOCUMENTATION_CLEANUP_PLAN.md` | Markdown | Cleanup plan | Governance | PLANNING | Keep | Existing duplicate map |
| `PM_EPM_SPARE_PARTS_SOURCE_OF_TRUTH_REPORT.md` | Markdown | Spare parts report | Pricing/catalog | ACTIVE_DOC | Keep | Supports catalog/registry work |
| `codex-brain.ps1` | PowerShell | Local helper | UNKNOWN | UNKNOWN | Keep | Inspect before use |
| `apps-script/AIDraftHistory.js` | Apps Script JS | AI Draft read-only preview and pricing helpers | AI service reports to drafts | ACTIVE_CODE | Keep | Production-sensitive |
| `apps-script/MavenAPI.js` | Apps Script JS | Maven sync, AutomationCommands webhook, BusinessDocuments updates | Maven/business docs | ACTIVE_CODE | Keep | Production-critical |
| `apps-script/EmailSender.js` | Apps Script JS | Report email sender | Service report delivery | ACTIVE_CODE | Keep | Production-sensitive |
| `apps-script/טופס HTML דוחות שירות.js` | Apps Script JS | Service report load/signature/Drive/counter logic | Service reports | ACTIVE_CODE | Keep | Production-critical; Hebrew filename |
| `apps-script/Report.html` | HTML | Service report rendering/signature UI | Service reports | ACTIVE_CODE | Keep | Production-sensitive |
| `apps-script/SystemHealthSetup.js` | Apps Script JS | Registry/log setup | System Health | ACTIVE_CODE | Keep | Do not run without approval |
| `apps-script/SystemHealthRegistryValidation.js` | Apps Script JS | Registry validation | System Health | ACTIVE_CODE | Keep | Do not run without approval |
| `apps-script/SystemHealthLogValidation.js` | Apps Script JS | Log validation | System Health | ACTIVE_CODE | Keep | Do not run without approval |
| `apps-script/appsscript.json` | JSON | Apps Script manifest | Apps Script deployment | ACTIVE_CODE | Keep | Production-sensitive |
| `apps-script/.clasp.json` | JSON | Clasp project config | Apps Script deployment | ACTIVE_CODE | Keep | Sensitive deployment boundary |
| `apps-script/.gitkeep` | Marker | Keep directory | Repo structure | ACTIVE_DOC | Keep | No action |
| `data-sources/tools/SHEETS_REGISTRY.md` | Markdown | Live sheet header registry | Digital Twin / migration | ACTIVE_DOC | Keep | Major evidence source |
| `data-sources/vendor-spare-parts/Spare Parts Service List(PM Series) rev3 (1).xls` | Spreadsheet | Vendor spare parts | Pricing/catalog | ACTIVE_DOC | Keep | Source data |
| `data-sources/vendor-spare-parts/Spare Parts Service List(EPM Series) rev2 (1).xls` | Spreadsheet | Vendor spare parts | Pricing/catalog | ACTIVE_DOC | Keep | Source data |
| `data-sources/brain-agent.ps1` | PowerShell | Local helper | UNKNOWN | UNKNOWN | Keep | Inspect before use |
| `project-brain/PROJECT_BRAIN_MASTER.md` | Markdown | Durable memory summary | Governance | ACTIVE_DOC | Update | Contains older duplication/stale content |
| `project-brain/current/CURRENT_TASK.md` | Markdown | Current task source | Governance | ACTIVE_DOC | Keep | Active current task |
| `project-brain/CURRENT_TASK.md` | Markdown | Deprecated pointer | Governance | OBSOLETE | Keep as pointer | Do not use as active source |
| `project-brain/current/LIVE_OBJECTS.md` | Markdown | Current known IDs | Governance | ACTIVE_DOC | Update | Missing IDs remain UNKNOWN |
| `project-brain/DECISION_LOG.md` | Markdown | Decisions | Governance | ACTIVE_DOC | Keep | Active record |
| `project-brain/TEST_SCENARIOS.md` | Markdown | Tests | QA | ACTIVE_DOC | Keep | Already modified before this mission |
| `project-brain/STARTUP_PROTOCOL.md` | Markdown | Startup protocol | Governance | ACTIVE_DOC | Update | Needs path alignment |
| `project-brain/SYSTEM_COMPONENTS.md` | Markdown | Component overview | System map | DUPLICATE | Update/archive later | Overlaps maps |
| `project-brain/SYSTEM_HEALTH_AGENT_PLAN.md` | Markdown | Health plan | System Health | PLANNING | Keep | Future health agent |
| `project-brain/SYSTEM_HEALTH_RULES.md` | Markdown | Health rules | System Health | ACTIVE_DOC | Keep | Governance |
| `project-brain/maps/SYSTEM_MAP.md` | Markdown | High-level system map | Digital Twin | ACTIVE_DOC | Update | Contains mojibake arrows |
| `project-brain/maps/APPSHEET_MAP.md` | Markdown | AppSheet tables/actions map | AppSheet Digital Twin | ACTIVE_DOC | Update | UI/actions not fully verified |
| `project-brain/maps/APPS_SCRIPT_MAP.md` | Markdown | Apps Script map | Apps Script Digital Twin | ACTIVE_DOC | Keep | Active map |
| `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md` | Markdown | AI Draft fields | AI service reports to drafts | ACTIVE_DOC | Keep | Schema mapping |
| `project-brain/maps/PROJECT_FILE_TREE.md` | Markdown | File tree | Governance | ACTIVE_DOC | Update | Should include new files |
| `project-brain/roadmap/ROADMAP.md` | Markdown | Master roadmap | Governance | ACTIVE_DOC | Keep | Active roadmap |
| `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md` | Markdown | Phase execution | Governance | PLANNING | Keep | Planning |
| `project-brain/roadmap/PHASE_1_SOP.md` | Markdown | Phase 1 SOP | Digital Twin | ACTIVE_DOC | Keep | Phase support |
| `project-brain/roadmap/PHASE_1_PLAYBOOK.md` | Markdown | Phase 1 playbook | Digital Twin | ACTIVE_DOC | Keep | Phase support |
| `project-brain/roadmap/AI_DRAFT_PILOT_DESIGN.md` | Markdown | AI Draft pilot | AI service reports to drafts | PLANNING | Keep | Pilot design |
| `project-brain/roadmap/AI_DRAFT_MINIMAL_IMPLEMENTATION_PLAN.md` | Markdown | AI Draft implementation plan | AI service reports to drafts | PLANNING | Keep | Future work |
| `project-brain/architecture/TARGET_ARCHITECTURE_VISION.md` | Markdown | Long-term architecture | Migration / future platform | ACTIVE_DOC | Keep | Target vision |
| `project-brain/bugs/CURRENT_BUGS.md` | Markdown | Open bugs | Production stability | ACTIVE_DOC | Keep | Drive and Maven sync bugs |
| `project-brain/lessons/LESSONS_LEARNED.md` | Markdown | Lessons | Governance | ACTIVE_DOC | Keep | Safety history |
| `project-brain/checkpoints/*.md` | Markdown | Session checkpoints | Historical context | ACTIVE_DOC | Keep | Use latest relevant only |
| `project-brain/archive/SYSTEM_STATE_2026-05-31.md` | Markdown | Archived system state | Historical context | OBSOLETE | Archive | Historical only |
| `project-brain/apps-script/*` | Apps Script mirror | Snapshot/mirror of Apps Script | Apps Script documentation | DUPLICATE | Keep until policy decided | Do not treat as canonical without review |
| `project-brain/implementation/ALIAS_REGISTRY_IMPLEMENTATION_PLAN.md` | Markdown | Alias registry plan | AI Draft/pricing | PLANNING | Keep | Future registry |
| `project-brain/implementation/EQUIPMENT_REGISTRY_IMPLEMENTATION_PLAN.md` | Markdown | Equipment registry plan | AI Draft/equipment | PLANNING | Keep | Future registry |
| `project-brain/implementation/SERVICE_KIT_REGISTRY_IMPLEMENTATION_PLAN.md` | Markdown | Service kit registry plan | AI Draft/pricing | PLANNING | Keep | Future registry |
| `project-brain/registries/FACTORY_ASSET_REGISTRY.md` | Markdown | Asset registry | Governance | ACTIVE_DOC | Keep | Asset tracking |
| `project-brain/engines/OUTPUT_VERIFICATION_ENGINE.md` | Markdown | Verification concept | Output verification | PLANNING | Keep | Future platform |
| `agents/*.md` | Markdown | Agent roles/SOPs | Governance/operations | ACTIVE_DOC | Keep/update | Many overlap; no deletion |
| `.agents/skills/*` | Markdown | Local Codex skills | Agent tooling | ACTIVE_DOC | Keep | Local helper skills |
| `scripts/playwright/appsheet-discovery.ts` | TypeScript | Read-only AppSheet UI scanner | AppSheet -> Next.js migration | ACTIVE_CODE | Keep | Added by this mission; read-only |
| `project-brain/appsheet-ui/*` | Markdown/JSON | AppSheet UI discovery docs/reports/maps | AppSheet -> Next.js migration | ACTIVE_DOC | Keep/update | Added by this mission |

