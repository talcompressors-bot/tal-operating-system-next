# DECISION LOG

## 2026-05-25

Decision:
Use AutomationCommands queue architecture.

Reason:
Avoid duplicate AppSheet Bot runs and row update conflicts.

Status:
Approved.

---

## 2026-06-08

Decision:
Apps Script is the main execution and validation layer.

Reason:
AppSheet should be UI/approval layer, not complex backend logic.

Status:
Approved.

---

## 2026-06-08

Decision:
Git + VS Code + Codex CLI are the primary development workflow.

Reason:
Need source control, rollback, traceability, and repeatable project memory.

Status:
Approved.

---

## 2026-06-09

Decision:
Create PROJECT_OPERATING_PROTOCOL.

Reason:
Codex must not start coding before reading project state, rules, flowchart, changelog, and git status.

Status:
Approved.

---

## 2026-06-09

Decision:
Create System Health Check concept.

Reason:
Regression discovered: report 5852 was signed and numbered but SignedHtmlFileUrl was not created automatically.

Status:
Approved for planning.

---

## 2026-06-22

Decision:
`PROJECT_INDEX.md` is the mandatory startup entrypoint for every Codex/ChatGPT project session.

Reason:
The project already has multiple startup, status, and Project Brain files. A single enforced entrypoint prevents future sessions from starting from stale state.

Status:
Approved.

---

## 2026-06-22

Decision:
Project Brain files win over ChatGPT/Codex memory when they conflict.

Reason:
Model memory can be stale, incomplete, or from a different phase. Project Brain files are the repository-owned source of project reality.

Status:
Approved.

---

## 2026-06-22

Decision:
Before creating any new planning file, map, dashboard, control center, protocol, agent, or roadmap, Codex must search existing files and prove no existing file already serves that purpose.

Reason:
The repo already contains governance, startup, status, roadmap, map, migration, and agent files. New planning/control files increase fragmentation unless an existing owner cannot serve the need.

Status:
Approved.

---

## 2026-06-22

Decision:
`project-brain/CURRENT_TASK.md` is the canonical current task, current phase, and next task file.

Reason:
The older `project-brain/current/CURRENT_TASK.md` is stale and has been retired as a compatibility stub.

Status:
Approved.

---

## 2026-06-22

Decision:
`PROJECT_INDEX.md` is the navigation and status map, not a giant source file.

Reason:
The index should show Project Reality Check and link to canonical owner files without duplicating full content from current task, task board, decisions, maps, migration scope, Prisma schema, or protocol.

Status:
Approved.
