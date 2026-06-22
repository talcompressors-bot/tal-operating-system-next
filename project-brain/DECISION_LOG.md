# DECISION LOG

## 2026-06-22

Decision:
`d1d6f88 Document Supabase staging-first shadow plan` is classified as the Last Implementation Commit.

Reason:
The commit changed approved project governance and migration planning by making Supabase Staging the first shadow target and Supabase Production Shadow the second target after staging validation. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

## 2026-06-22

Decision:
Use Supabase Staging first, then Supabase Production Shadow. Do not use local PostgreSQL as the first target.

Reason:
The approved shadow environment path should validate the real hosted deployment target before production shadow setup. Staging project `talcompressors-next-staging` is first; production shadow project `talcompressors-next-prod` follows only after staging validation passes. Required env variable names are `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_ENV`; optional future Supabase env names are `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Before any DB push, Prisma must reconcile `DIRECT_URL` and `ReportEquipmentItem.reportCounter`.

Status:
Approved.

---

## 2026-06-22

Decision:
`2963977 Add master map and agent routing` is classified as the Last Implementation Commit.

Reason:
The commit changed project governance/routing behavior by adding the master project map and routing future work to existing owner agents. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `8114210 Sync project brain commit model state`.

Status:
Approved.

---

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
`315b8cc Fix reality check commit model` is classified as the Last Implementation Commit.

Reason:
The commit changed governance behavior by introducing the two-commit Reality Check model. It is an implementation/governance commit, not closeout metadata. Last Closeout Commit remains `653f370 Sync project brain after reality check hardening`.

Status:
Approved.

---

## 2026-06-22

Decision:
`hey codex` must sync from GitHub before reading Project Brain when the working tree is clean, and Project Reality Check must compare live Git against Project Brain recorded commits.

Reason:
New sessions must start from the latest GitHub state instead of stale local Project Brain files. Commit mismatches must be visible before implementation, and closeout must sync canonical Project Brain state.

Status:
Approved.

---

## 2026-06-22

Decision:
`hey codex` is the official startup command and `by codex` is the official shutdown command.

Reason:
Startup and closeout need repeatable automation. Startup must begin from `PROJECT_INDEX.md`, and shutdown must run Project Reality Check, Git review, canonical state updates when needed, approved-file commit, push to `origin/main`, clean status confirmation, and the next startup point.

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
