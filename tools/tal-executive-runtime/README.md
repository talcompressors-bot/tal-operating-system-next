# Tal Executive Runtime POC

Read-only Phase 1 skeleton for the Tal Compressors Chief Architect decision loop.

## Purpose

This POC prints a dry-run executive decision report without calling OpenAI, mutating Git, writing to the database, or touching external business systems.

## Command

```powershell
python tools/tal-executive-runtime/executive_runtime.py --dry-run
```

## Boundaries

- No OpenAI API call.
- No API key required.
- No package install required.
- No writes to `app/**`, `lib/**`, or `prisma/**`.
- No DB writes.
- No Git mutations.
- No Maven, Invoice4U, email, inventory, Google Drive, Google Sheets, AppSheet, Apps Script, or production action.

## Phase 1 Output

The dry run prints:

- Company Objective
- Candidate capabilities
- Evidence status
- Decision: `APPROVE`, `NEEDS_FIX`, or `BLOCKED`
- Minimal next slice
