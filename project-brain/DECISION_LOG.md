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