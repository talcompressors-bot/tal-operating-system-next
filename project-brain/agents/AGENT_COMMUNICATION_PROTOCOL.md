# AGENT COMMUNICATION PROTOCOL

Status: Active Project Brain workflow protocol.

## Purpose

Define how Codex coordinates Builder, Map Guard, QA, Reviewer, and existing specialist agents without losing evidence or crossing approval boundaries.

This protocol is internal to Project Brain workflow. It does not create runtime automations.

## Message Packet

Every agent handoff should use this packet:

| Field | Required |
|---|---|
| `Task` | Exact user goal or subtask |
| `Scope` | Files/systems in scope |
| `OutOfScope` | Files/systems explicitly untouched |
| `SourcesRead` | Evidence files read |
| `Findings` | What the agent found |
| `Risks` | Known risks or assumptions |
| `ApprovalGates` | Human approval required before proceeding |
| `Validation` | Commands/checks to run or already run |
| `NextAction` | Exact next safe action |

## Communication Flow

```text
Codex Orchestrator
-> Map Guard Agent
-> Builder Agent
-> QA Agent
-> Reviewer Agent
-> Project Brain sync
-> Git commit/push
-> Final report
```

For specialized work, Codex also routes to the existing active agent owner from `agents/AGENT_REGISTRY.md`.

## Rules

1. Handoffs must cite source files or mark facts `UNKNOWN`.
2. Agents do not invent IDs, approvals, schemas, or runtime state.
3. Any APPROVAL_REQUIRED action stops the workflow before execution.
4. QA and Reviewer can reject Builder output.
5. Project Brain sync happens after successful feature commit and before final report.
6. Final report must reflect validated reality, not stale blockers.

## Escalation Format

If approval is required, stop and provide:

- what is requested
- why it is needed
- systems affected
- systems confirmed untouched
- validation already completed
- risk
- rollback
- exact action after approval
