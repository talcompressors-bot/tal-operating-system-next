# FACTORY ASSET REGISTRY

Status: Active draft  
Mission: FAR-1  
Mode: Documentation only  
Purpose: Provide the first auditable inventory of known Tal AI Factory assets so `FACTORY_CONTROL_CENTER_AGENT` can compare documented assets against repository reality.

## Registry Rules

- This registry is documentation only.
- It does not authorize production changes.
- It does not modify Apps Script, Google Sheets, AppSheet, Maven, Drive, deploy state, setup state, or customer-facing systems.
- Asset status comes from documented evidence only.
- Operational reality is marked `UNKNOWN` unless the listed sources verify it.
- Protected systems remain protected even when listed as assets.

## Source Set Used

- `agents/AGENT_REGISTRY.md`
- `agents/AGENT_FACTORY_OPERATING_SYSTEM.md`
- `agents/FACTORY_CONTROL_CENTER_AGENT.md`
- `project-brain/roadmap/ROADMAP.md`
- `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md`
- `data-sources/tools/SHEETS_REGISTRY.md`
- `project-brain/maps/*`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `project-brain/current/CURRENT_TASK.md`

## Field Definitions

| Field | Meaning |
|---|---|
| Asset Name | Unique human-readable asset name. |
| Asset Type | Document, agent, table, map, workflow, protected system, registry, phase asset, or checkpoint. |
| Location | Repository path, table name, workflow name, or protected-system label. |
| Owner Agent | Agent responsible for maintaining or auditing the asset. |
| Consumer Agents | Agents that read or rely on the asset. |
| Status | Documented lifecycle status such as Active, Current, Complete, Development, Planned, Draft, Legacy, Unknown, or Protected. |
| Evidence Source | Source file proving the asset is known. |
| Operational Status | Verified operational state from documented evidence, or `UNKNOWN`. |
| Last Validation | Latest documented validation date, commit, checkpoint, or source read date. |
| Known Gaps | Missing evidence, stale status, missing SOP, incomplete schema, or required future validation. |
| Protected | Whether the asset is protected from mutation without explicit approval. |
| Next Required Action | Next safe action for audit, validation, documentation, or recovery. |

## Factory Asset Registry

| Asset Name | Asset Type | Location | Owner Agent | Consumer Agents | Status | Evidence Source | Operational Status | Last Validation | Known Gaps | Protected | Next Required Action |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PROJECT_OPERATING_PROTOCOL | Governance document | `PROJECT_OPERATING_PROTOCOL.md` | `INFRASTRUCTURE_MANAGER_AGENT` | All agents | Active | `PROJECT_BRAIN_MASTER.md`; `PHASE_EXECUTION_BLUEPRINT.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md` | Official governance protocol | 2026-06-15 governance foundation | Needs ongoing alignment as new agents/registries are added | Yes | Keep as first source-of-truth file for audits |
| PROJECT_INDEX | Governance index | `PROJECT_INDEX.md` | `PROJECT_BRAIN_AGENT` | All agents | Active | `PHASE_EXECUTION_BLUEPRINT.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md`; `FACTORY_CONTROL_CENTER_AGENT.md` | Source-load asset | UNKNOWN | Current contents not revalidated in FAR-1 beyond references | Yes | Include in future Factory Control Center audit |
| PROJECT_BRAIN_MASTER | Durable memory | `project-brain/PROJECT_BRAIN_MASTER.md` | `PROJECT_BRAIN_AGENT` | All agents | Active | `PROJECT_BRAIN_MASTER.md`; `CURRENT_TASK.md` | Durable project memory | 2026-06-15 documented change log | Needs updates after new registry creation | Yes | Propose brain update after registry adoption |
| CURRENT_TASK | Current-state document | `project-brain/current/CURRENT_TASK.md` | `PROJECT_BRAIN_AGENT` | All agents | Current | `CURRENT_TASK.md` | Phase 1 current task source | 2026-06-15 | Needs date/status refresh after later committed docs | Yes | Update when active mission/phase changes |
| LIVE_OBJECTS | Current-state document | `project-brain/current/LIVE_OBJECTS.md` | `PROJECT_BRAIN_AGENT` | Factory Control Center, Infrastructure Manager | Active/UNKNOWN | `AGENT_FACTORY_OPERATING_SYSTEM.md`; `FACTORY_CONTROL_CENTER_AGENT.md` | UNKNOWN | UNKNOWN | File referenced but not audited in FAR-1 | Yes | Include in next reality-vs-documentation audit |
| ROADMAP | Roadmap document | `project-brain/roadmap/ROADMAP.md` | `PROJECT_BRAIN_AGENT` | Infrastructure Manager, Factory Control Center, Orchestrator | Active | `ROADMAP.md` | Master roadmap | 2026-06-15 | Needs registry reference after FAR-1 | Yes | Propose roadmap/brain update if registry becomes official |
| PHASE_EXECUTION_BLUEPRINT | Phase execution blueprint | `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, Orchestrator, all builder agents | Draft execution blueprint | `PHASE_EXECUTION_BLUEPRINT.md` | Defines phases 0-54 execution fields | Commit `70facc0` documentation layer | Draft status remains; per-phase reality not fully audited | Yes | Factory Control Center should audit fields and reality match |
| PHASE_1_PLAYBOOK | Phase playbook | `project-brain/roadmap/PHASE_1_PLAYBOOK.md` | `PROJECT_BRAIN_AGENT` | Phase 1 agents, Factory Control Center | Active draft | `FACTORY_CONTROL_CENTER_AGENT.md`; committed file exists | Phase 1 documentation asset | Commit `70facc0` | Needs Control Center audit against Phase 1 SOP | Yes | Audit against `PHASE_1_SOP.md` |
| PHASE_1_SOP | Phase SOP | `project-brain/roadmap/PHASE_1_SOP.md` | `PROJECT_BRAIN_AGENT` | Phase 1 agents, Factory Control Center | Active draft | `FACTORY_CONTROL_CENTER_AGENT.md`; committed file exists | Phase 1 execution SOP asset | Commit `70facc0` | Needs practical execution validation | Yes | Use for Phase 1 mission execution and audit |
| MASTER_HANDOFF_2026-06-16 | Checkpoint/handoff | `project-brain/checkpoints/MASTER_HANDOFF_2026-06-16.md` | `PROJECT_BRAIN_AGENT` | Future Codex sessions, Git Agent, Factory Control Center | Active checkpoint | Git commit `70facc0`; file exists | Handoff document | 2026-06-16 | Needs next handoff when state changes | Yes | Reference during startup/handoff audits |
| SHEETS_REGISTRY | Table registry document | `data-sources/tools/SHEETS_REGISTRY.md` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, Apps Script Agent, Maven Agent, AI Draft Agent | Active | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md`; `ROADMAP.md` | Populated from read-only live metadata/header inspection | Last live read 2026-06-15 | Live schemas can drift; no live write authorized | Yes | Revalidate read-only before schema-sensitive work |
| FACTORY_ASSET_REGISTRY | Factory asset registry | `project-brain/registries/FACTORY_ASSET_REGISTRY.md` | `FACTORY_CONTROL_CENTER_AGENT` | Factory Control Center, Infrastructure Manager, Project Brain Agent | Active draft | FAR-1 mission | New documentation registry | 2026-06-16 | Needs first Control Center audit and Project Brain reference | Yes | Audit and register in Project Brain after approval |
| SYSTEM_MAP | System map | `project-brain/maps/SYSTEM_MAP.md` | `PROJECT_BRAIN_AGENT` | Infrastructure Manager, Apps Script Agent, Maven Agent, Factory Control Center | Active | `PROJECT_BRAIN_MASTER.md`; `ROADMAP.md`; `PHASE_EXECUTION_BLUEPRINT.md` | Current system map asset | UNKNOWN | Needs reality-vs-documentation audit | Yes | Audit against Apps Script and table registry |
| PROJECT_FILE_TREE | File tree map | `project-brain/maps/PROJECT_FILE_TREE.md` | `PROJECT_BRAIN_AGENT` | Factory Control Center, Git Agent, Infrastructure Manager | Active | `rg --files project-brain/maps`; `CURRENT_TASK.md` references file tree map committed | File tree map asset | 2026-06-15 completed work | Needs refresh after new docs/registries | Yes | Update after documentation layer stabilizes |
| APPS_SCRIPT_MAP | Apps Script map | `project-brain/maps/APPS_SCRIPT_MAP.md` | `APPS_SCRIPT_AGENT` | Infrastructure Manager, Maven Agent, Factory Control Center | Active | `PROJECT_BRAIN_MASTER.md`; `ROADMAP.md`; `PHASE_EXECUTION_BLUEPRINT.md` | Apps Script mapping asset | UNKNOWN | Must be compared to `apps-script/*` read-only before code work | Yes | Run read-only Apps Script map audit |
| APPSHEET_MAP | AppSheet map | `project-brain/maps/APPSHEET_MAP.md` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, Orchestrator, AI Draft Agent | Active | `PROJECT_BRAIN_MASTER.md`; `ROADMAP.md`; `PHASE_EXECUTION_BLUEPRINT.md` | AppSheet mapping asset | UNKNOWN | AppSheet manual/exported evidence may be missing | Yes | Mark unknown AppSheet behavior until evidence exists |
| AI_DRAFT_FIELD_MAPPING | AI Draft field map | `project-brain/maps/AI_DRAFT_FIELD_MAPPING.md` | `AI_DRAFT_AGENT` | AI Draft Agent, Maven Agent, Factory Control Center | Active | `PHASE_EXECUTION_BLUEPRINT.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md` | AI Draft field mapping asset | UNKNOWN | AI Draft remains Development; SOP missing in registry matrix | Yes | Audit before AI Draft execution |
| AGENT_REGISTRY | Agent registry | `agents/AGENT_REGISTRY.md` | `INFRASTRUCTURE_MANAGER_AGENT` | All agents | Active | `AGENT_REGISTRY.md` | Lists active/development/planned agents | Commit `a1eae5e` and later docs use | Does not yet list Factory Control Center or Factory Asset Registry owner | Yes | Consider registry update in future mission |
| AGENT_FACTORY_OPERATING_SYSTEM | Agent operating manual | `agents/AGENT_FACTORY_OPERATING_SYSTEM.md` | `INFRASTRUCTURE_MANAGER_AGENT` | All agents | Active draft | `AGENT_FACTORY_OPERATING_SYSTEM.md` | Defines execution manual and matrices | Commit `70facc0` | Agent-specific SOPs remain missing for most agents | Yes | Complete priority SOPs |
| FACTORY_CONTROL_CENTER_AGENT | Master audit agent | `agents/FACTORY_CONTROL_CENTER_AGENT.md` | `FACTORY_CONTROL_CENTER_AGENT` | Infrastructure Manager, Project Brain Agent, all auditors | Active draft | `FACTORY_CONTROL_CENTER_AGENT.md` | Defines factory audit system | Commit `70facc0` | Not yet listed in Agent Registry | Yes | Add to Agent Registry in separate approved mission |
| PROJECT_BRAIN_AGENT_SOP | Agent SOP | `agents/PROJECT_BRAIN_AGENT_SOP.md` | `PROJECT_BRAIN_AGENT` | Project Brain Agent, Factory Control Center | Active draft | `AGENT_FACTORY_OPERATING_SYSTEM.md`; file exists | Full SOP exists | Commit `70facc0` | Needs future integration with specialist SOPs | Yes | Use as model for next agent SOPs |
| PRE_MISSION_REVIEW_SYSTEM | Review gate | `agents/PRE_MISSION_REVIEW_SYSTEM.md` | `INFRASTRUCTURE_MANAGER_AGENT` | All agents | Active | `AGENT_REGISTRY.md`; `PRE_MISSION_REVIEW_SYSTEM.md` | Mandatory mission review gate | Commit `a1eae5e` | Needs mission review registry implementation only if approved | Yes | Run before every mission |
| INFRASTRUCTURE_MANAGER_AGENT | Governance agent | `agents/INFRASTRUCTURE_MANAGER_AGENT.md` | `INFRASTRUCTURE_MANAGER_AGENT` | All agents | Active | `AGENT_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Active governance agent | 2026-06-15 | Full executable SOP still marked missing in Factory OS | Yes | Create Infrastructure Manager SOP |
| ORCHESTRATOR_AGENT | Routing agent | `agents/ORCHESTRATOR_AGENT.md` | `ORCHESTRATOR_AGENT` | Infrastructure Manager, builder agents | Active | `AGENT_REGISTRY.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md` | Active routing role | UNKNOWN | SOP missing | Yes | Create Orchestrator SOP after higher-risk SOPs |
| PROJECT_BRAIN_AGENT | Memory agent | `agents/PROJECT_BRAIN_AGENT.md`; `agents/PROJECT_BRAIN_AGENT_SOP.md` | `PROJECT_BRAIN_AGENT` | All agents | Active | `AGENT_REGISTRY.md`; `PROJECT_BRAIN_AGENT_SOP.md` | Active with SOP | Commit `70facc0` | Needs registry reference to SOP status | Yes | Keep brain updates source-backed |
| GIT_AGENT | Git/checkpoint agent | `agents/GIT_AGENT.md` | `GIT_AGENT` | Project Brain Agent, user | Active | `AGENT_REGISTRY.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md` | Active short workflow | UNKNOWN | SOP missing | Yes | Create Git Agent SOP before more commit-heavy work |
| APPS_SCRIPT_AGENT | Apps Script specialist | `agents/APPS_SCRIPT_AGENT.md` | `APPS_SCRIPT_AGENT` | Infrastructure Manager, Maven Agent, Factory Control Center | Active | `AGENT_REGISTRY.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md` | Analysis role active; writes approval-gated | UNKNOWN | SOP missing; must not modify Apps Script in FAR-1 | Yes | Create Apps Script Agent SOP before code missions |
| MAVEN_AGENT | Maven specialist | `agents/MAVEN_AGENT.md` | `MAVEN_AGENT` | AI Draft Agent, Apps Script Agent, Factory Control Center | Active | `AGENT_REGISTRY.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md` | Maven analysis role active; production actions approval-gated | UNKNOWN | SOP missing | Yes | Create Maven Agent SOP before Maven changes |
| AI_DRAFT_AGENT | AI draft specialist | `agents/AI_DRAFT_AGENT.md` | `AI_DRAFT_AGENT` | Maven Agent, Factory Control Center | Development | `AGENT_REGISTRY.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md` | Development/pilot; recommendation only | UNKNOWN | SOP missing; pricing/data flow needs audit | Yes | Create AI Draft Agent SOP |
| QA_AGENT | Planned validation agent | UNKNOWN | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center | Planned | `AGENT_REGISTRY.md`; `AGENT_FACTORY_OPERATING_SYSTEM.md` | Not executable | UNKNOWN | No agent file; SOP missing | No | Create QA Agent file/SOP before assignment |
| INVOICE4U_AGENT | Planned integration agent | UNKNOWN | `INFRASTRUCTURE_MANAGER_AGENT` | Finance/Maven future agents | Planned | `AGENT_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Future integration only | UNKNOWN | No agent file; SOP missing; production finance risk | Yes | Create discovery/SOP before any Invoice4u action |
| EXPENSE_AGENT | Planned expense agent | UNKNOWN | `INFRASTRUCTURE_MANAGER_AGENT` | Invoice4u future agents | Planned | `AGENT_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Future automation only | UNKNOWN | No agent file; SOP missing; production finance risk | Yes | Create discovery/SOP before expense automation |
| PHASE 0 - Governance Foundation | Phase asset | `project-brain/roadmap/ROADMAP.md` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, Project Brain Agent | Complete | `ROADMAP.md`; `CURRENT_TASK.md`; `PROJECT_BRAIN_MASTER.md` | Completed and pushed | 2026-06-15 | Needs Control Center completion audit if challenged | Yes | Preserve checkpoint evidence |
| PHASE 1 - Digital Twin Foundation | Phase asset | `project-brain/roadmap/ROADMAP.md`; `project-brain/roadmap/PHASE_1_SOP.md` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, Apps Script Agent, Maven Agent, Project Brain Agent | Current | `CURRENT_TASK.md`; `ROADMAP.md`; `PROJECT_BRAIN_MASTER.md` | Read-only mapping phase | 2026-06-15 | Infrastructure Manager review still next step per current task | Yes | Run Infrastructure Manager review before modifying anything |
| PHASES 2-54 | Phase assets | `project-brain/roadmap/PHASE_EXECUTION_BLUEPRINT.md` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, Orchestrator | Draft/planned | `PHASE_EXECUTION_BLUEPRINT.md` | Future planning only | Commit `70facc0` | Reality not implemented unless separately evidenced | Yes | Audit before each phase starts |
| BusinessDocuments Workflow | Workflow | `BusinessDocuments -> AutomationCommands -> AppSheet Bot -> Apps Script -> Maven Draft` | `MAVEN_AGENT` | AI Draft Agent, Apps Script Agent, Factory Control Center | Active/stable checkpoint | `PROJECT_BRAIN_MASTER.md` | Stable queue flow documented | Checkpoint 2026-05-25 | Must preserve AppSheet Bot / Apps Script row boundary | Yes | Do not change without impact analysis and approval |
| AutomationCommands Queue Architecture | Workflow/protected system | `AutomationCommands` queue | `INFRASTRUCTURE_MANAGER_AGENT` | Maven Agent, Apps Script Agent, Factory Control Center | Stable working checkpoint | `PROJECT_BRAIN_MASTER.md`; `CURRENT_TASK.md` | Stable working checkpoint | 2026-05-25 | Manual recovery required after failed claimed command | Yes | Keep as protected system |
| Service Report System | Workflow/system | Service report HTML/Web App/signature/report loading | `APPS_SCRIPT_AGENT` | AI Draft Agent, Factory Control Center, Maven Agent | Active | `PROJECT_BRAIN_MASTER.md` | Active | UNKNOWN | Open tasks: A4 layout, page breaks, PDF export, signature/Drive improvements | Yes | Audit maps before service report changes |
| Maven Integration | Integration/protected system | Maven API and related tables | `MAVEN_AGENT` | AI Draft Agent, Apps Script Agent, Factory Control Center | Exists/approval-gated | `PROJECT_BRAIN_MASTER.md`; `MAVEN_AGENT.md` | Exists; document creation requires approval | UNKNOWN | Current Maven health not fully audited | Yes | Run Maven diagnostic before any Maven work |
| Drive Save Logic | Workflow/protected system | Drive folder/file save behavior | `APPS_SCRIPT_AGENT` | Factory Control Center, Project Brain Agent | Active with known issues | `PROJECT_BRAIN_MASTER.md`; `CURRENT_TASK.md` | Known duplicate folder/file issues | UNKNOWN | Duplicate customer folders; duplicate report files; update issue | Yes | Read-only investigation only unless approved |
| AppSheet Production | Protected system | AppSheet production app | `INFRASTRUCTURE_MANAGER_AGENT` | All agents | Protected | `CURRENT_TASK.md`; `ROADMAP.md`; `PROJECT_BRAIN_MASTER.md` | Production protected | 2026-06-15 | Manual/exported evidence may be missing | Yes | Do not modify; collect evidence read-only if available |
| Apps Script Runtime | Protected system | `apps-script/*` / deployed Apps Script | `APPS_SCRIPT_AGENT` | Maven Agent, AI Draft Agent, Factory Control Center | Protected | `CURRENT_TASK.md`; `ROADMAP.md`; `PROJECT_BRAIN_MASTER.md` | Production protected | 2026-06-15 | Runtime deployment status UNKNOWN | Yes | Read-only analysis unless explicit approval |
| Google Sheets Live Data | Protected system | `ServiceApp_FIX` spreadsheet | `INFRASTRUCTURE_MANAGER_AGENT` | All agents | Protected | `SHEETS_REGISTRY.md`; `CURRENT_TASK.md` | Live data protected | Last live read 2026-06-15 | Schema/data can drift | Yes | Read-only metadata only when needed |
| Maven Production | Protected system | Maven documents/API | `MAVEN_AGENT` | AI Draft Agent, Apps Script Agent | Protected | `CURRENT_TASK.md`; `PROJECT_BRAIN_MASTER.md` | Approval-gated | UNKNOWN | Current external state UNKNOWN | Yes | No document creation without user approval |
| Drive Production | Protected system | Google Drive folders/files | `APPS_SCRIPT_AGENT` | Factory Control Center, Project Brain Agent | Protected | `CURRENT_TASK.md`; `PROJECT_BRAIN_MASTER.md` | Approval-gated | UNKNOWN | Duplicate folder/file issues | Yes | No Drive changes without approval |
| AutomationRegistry | Sheet/table | `AutomationRegistry` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, System Health future agents | ACTIVE | `SHEETS_REGISTRY.md` | Existing live registry table | Last live read 2026-06-15 | Writes require approval | Yes | Use as read-only evidence unless approved |
| HealthCheckRegistry | Sheet/table | `HealthCheckRegistry` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, QA/System Health future agents | ACTIVE | `SHEETS_REGISTRY.md` | Existing live registry table | Last live read 2026-06-15 | Writes require approval | Yes | Use as read-only evidence unless approved |
| SystemHealthLog | Sheet/table | `SystemHealthLog` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, QA/System Health future agents | ACTIVE | `SHEETS_REGISTRY.md` | Existing live system-health table | Last live read 2026-06-15 | Writes require approved health workflow | Yes | Keep write-gated |
| Customers_Final | Sheet/table | `Customers_Final` | `INFRASTRUCTURE_MANAGER_AGENT` | Apps Script Agent, AI Draft Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Active customer master table | Last live read 2026-06-15 | Customer folder logic issues may depend on this table | Yes | Protect; read-only mapping only |
| Customers2 | Sheet/table | `Customers2` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center | DUPLICATE_CANDIDATE | `SHEETS_REGISTRY.md` | Possible duplicate/predecessor | Last live read 2026-06-15 | Overlaps `Customers_Final` | No | Review before use |
| ServiceReports | Sheet/table | `ServiceReports` | `INFRASTRUCTURE_MANAGER_AGENT` | Apps Script Agent, AI Draft Agent, Maven Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Main service report table | Last live read 2026-06-15 | Blank headers and report counter risk | Yes | Protect and map read-only |
| ReportEquipmentItems | Sheet/table | `ReportEquipmentItems` | `INFRASTRUCTURE_MANAGER_AGENT` | AI Draft Agent, Apps Script Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Service report equipment details | Last live read 2026-06-15 | Needs workflow mapping | Yes | Use in AI Draft data completeness checks |
| InspectionItems | Sheet/table | `InspectionItems` | `INFRASTRUCTURE_MANAGER_AGENT` | Apps Script Agent, Factory Control Center | UNKNOWN | `SHEETS_REGISTRY.md` | Schema incomplete/non-normalized | Last live read 2026-06-15 | Only row-1 value observed | No | Discovery before use |
| PartsUsed | Sheet/table | `PartsUsed` | `AI_DRAFT_AGENT` | AI Draft Agent, Factory Control Center | UNKNOWN | `SHEETS_REGISTRY.md`; `AI_DRAFT_AGENT.md` | Exists but schema incomplete | Last live read 2026-06-15 | AI Draft expects fields not verified in header | Yes | Discovery before AI Draft decisions |
| EmailLog | Sheet/table | `EmailLog` | `APPS_SCRIPT_AGENT` | Factory Control Center | UNKNOWN | `SHEETS_REGISTRY.md` | Exists but schema incomplete | Last live read 2026-06-15 | Direct writes not confirmed | Yes | Discovery before email workflow changes |
| Lists | Sheet/table | `Lists` | `INFRASTRUCTURE_MANAGER_AGENT` | Apps Script Agent, AppSheet mapping, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md` | Reference/list table | Last live read 2026-06-15 | Need AppSheet mapping confirmation | Yes | Read-only mapping |
| SetupGuide | Sheet/table | `SetupGuide` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center | LEGACY | `SHEETS_REGISTRY.md` | Setup/config documentation sheet | Last live read 2026-06-15 | Not normalized table | No | Treat as historical/config only |
| PDF_Template | Sheet/table | `PDF_Template` | `APPS_SCRIPT_AGENT` | Factory Control Center | LEGACY | `SHEETS_REGISTRY.md` | Template-like sheet | Last live read 2026-06-15 | Report.html may supersede it; current use UNKNOWN | Yes | Audit before PDF/report changes |
| AppSheet_Formulas | Sheet/table | `AppSheet_Formulas` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center | LEGACY | `SHEETS_REGISTRY.md` | Formula/config documentation | Last live read 2026-06-15 | Not production data table | No | Use as reference only |
| ServiceReport_Form_View | Sheet/table | `ServiceReport_Form_View` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center | LEGACY | `SHEETS_REGISTRY.md` | Mock/view guide | Last live read 2026-06-15 | Not normalized table | No | Use as reference only |
| BusinessDocuments | Sheet/table | `BusinessDocuments` | `MAVEN_AGENT` | AI Draft Agent, Maven Agent, Apps Script Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Business document workflow table | Last live read 2026-06-15 | Status distinction from queue status must be preserved | Yes | Protect and audit before changes |
| BusinessDocumentItems | Sheet/table | `BusinessDocumentItems` | `MAVEN_AGENT` | AI Draft Agent, Maven Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Business document line items | Last live read 2026-06-15 | Needs mapping for AI Draft/Maven | Yes | Protect and audit before changes |
| BusinessDocumentLog | Sheet/table | `BusinessDocumentLog` | `MAVEN_AGENT` | Factory Control Center, System Health future agents | ACTIVE | `SHEETS_REGISTRY.md` | Business document workflow log | Last live read 2026-06-15 | Write workflow details UNKNOWN | Yes | Audit before log writes |
| ApprovalsLog | Sheet/table | `ApprovalsLog` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center, future approval agents | ACTIVE | `SHEETS_REGISTRY.md` | Approval governance evidence | Last live read 2026-06-15 | Current workflow use UNKNOWN | Yes | Discovery before relying on approval history |
| SecretAccessLog | Sheet/table | `SecretAccessLog` | `INFRASTRUCTURE_MANAGER_AGENT` | Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md` | Secret/access audit evidence | Last live read 2026-06-15 | Current workflow use UNKNOWN | Yes | Protect and avoid exposing secrets |
| InvoiceMavenDocuments | Sheet/table | `InvoiceMavenDocuments` | `MAVEN_AGENT` | Maven Agent, AI Draft Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Maven document sync table | Last live read 2026-06-15 | External Maven state UNKNOWN | Yes | Read-only Maven diagnostic before changes |
| InvoiceMavenCustomers | Sheet/table | `InvoiceMavenCustomers` | `MAVEN_AGENT` | Maven Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md` | Maven customer sync table | Last live read 2026-06-15 | Current sync health UNKNOWN | Yes | Include in Maven audit |
| ProductsCatalog | Sheet/table | `ProductsCatalog` | `AI_DRAFT_AGENT` | AI Draft Agent, Maven Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `AI_DRAFT_AGENT.md` | Pricing/product source | Last live read 2026-06-15 | Pricing completeness UNKNOWN | Yes | Validate before AI price recommendations |
| InventoryStock | Sheet/table | `InventoryStock` | `INFRASTRUCTURE_MANAGER_AGENT` | Future inventory agents, Factory Control Center | ACTIVE/UNKNOWN | `SHEETS_REGISTRY.md` | Inventory-related table | Last live read 2026-06-15 | Workflow use not fully confirmed | Yes | Discovery before inventory automation |
| SuppliersProducts | Sheet/table | `SuppliersProducts` | `INFRASTRUCTURE_MANAGER_AGENT` | Future expense/inventory agents, Factory Control Center | ACTIVE/UNKNOWN | `SHEETS_REGISTRY.md` | Supplier/product table | Last live read 2026-06-15 | Workflow use not fully confirmed | Yes | Discovery before supplier automation |
| AIDraftSuggestions | Sheet/table | `AIDraftSuggestions` | `AI_DRAFT_AGENT` | AI Draft Agent, Factory Control Center | ACTIVE/UNKNOWN | `SHEETS_REGISTRY.md` | AI Draft/Agent Factory overlap table | Last live read 2026-06-15 | AI Draft remains development | Yes | Audit before AI Draft writes |
| InvoiceMavenItems | Sheet/table | `InvoiceMavenItems` | `MAVEN_AGENT` | Maven Agent, AI Draft Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md` | Maven item sync table | Last live read 2026-06-15 | Current sync health UNKNOWN | Yes | Include in Maven audit |
| InvoiceMavenDocumentItems | Sheet/table | `InvoiceMavenDocumentItems` | `MAVEN_AGENT` | Maven Agent, AI Draft Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Maven document item sync table | Last live read 2026-06-15 | Current sync health UNKNOWN | Yes | Include in Maven audit |
| SyncLog | Sheet/table | `SyncLog` | `MAVEN_AGENT` | Maven Agent, System Health future agents, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md` | Sync log table | Last live read 2026-06-15 | First header cell blank/space | Yes | Audit schema before log-dependent checks |
| ErrorLog | Sheet/table | `ErrorLog` | `MAVEN_AGENT` | Maven Agent, System Health future agents, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md` | Error log table | Last live read 2026-06-15 | Current error health UNKNOWN | Yes | Include in health audit |
| SyncState | Sheet/table | `SyncState` | `MAVEN_AGENT` | Maven Agent, System Health future agents, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md` | Sync state table | Last live read 2026-06-15 | Current state health UNKNOWN | Yes | Include in Maven audit |
| AutomationCommands | Sheet/table | `AutomationCommands` | `INFRASTRUCTURE_MANAGER_AGENT` | Maven Agent, Apps Script Agent, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md`; `PROJECT_BRAIN_MASTER.md`; `CURRENT_TASK.md` | Stable protected queue | Last live read 2026-06-15; checkpoint 2026-05-25 | Must not bypass queue; manual recovery after failed claimed command | Yes | Protect from unapproved changes |
| AppMenu | Sheet/table | `AppMenu` | `INFRASTRUCTURE_MANAGER_AGENT` | AppSheet mapping, Factory Control Center | ACTIVE | `SHEETS_REGISTRY.md` | App/menu table | Last live read 2026-06-15 | Current AppSheet use needs manual/exported evidence | Yes | Include in AppSheet map audit |

## Registry Summary

| Category | Count | Notes |
|---|---:|---|
| Governance / roadmap / brain documents | 12 | Includes operating protocol, Project Brain, roadmap, blueprint, playbook, SOP, checkpoint, and this registry. |
| Maps | 5 | Current map files found under `project-brain/maps/*`. |
| Agent assets | 12 | Includes active, development, planned, and missing-file agent entries. |
| Phase assets | 3 | Phase 0 complete, Phase 1 current, Phases 2-54 draft/planned. |
| Workflows / protected systems | 7 | Includes BusinessDocuments flow, AutomationCommands, Service Report System, Maven, Drive, AppSheet, Apps Script, and Google Sheets/Maven/Drive production protections. |
| Sheet/table assets | 33 | All sheets listed from `data-sources/tools/SHEETS_REGISTRY.md`. |

## Immediate Gaps For Factory Control Center

1. `FACTORY_CONTROL_CENTER_AGENT` is not yet listed in `agents/AGENT_REGISTRY.md`.
2. `FACTORY_ASSET_REGISTRY.md` is new and not yet referenced by Project Brain, roadmap, or Factory Control Center required sources.
3. Most agents still have SOP status `MISSING` in `AGENT_FACTORY_OPERATING_SYSTEM.md`.
4. Phase and output completion claims need Control Center audits against actual files and validation evidence.
5. Live operational status for AppSheet, Maven, Drive, and Apps Script deployment remains `UNKNOWN` unless separately verified by read-only evidence.
6. Several tables have `UNKNOWN`, `LEGACY`, or `DUPLICATE_CANDIDATE` status and must not be used for automation without discovery.

## Next Required Action

Run a Factory Control Center audit of this registry:

```text
FACTORY_CONTROL_CENTER_AGENT
-> Load FACTORY_ASSET_REGISTRY
-> Compare assets against registry, roadmap, maps, and git reality
-> Mark missing/stale/conflicting entries
-> Recommend Project Brain and Agent Registry updates
```
