# LESSONS LEARNED

## Queue Architecture

Problem:

BusinessDocuments and Apps Script updated the same records.

Result:

Multiple executions.
Duplicate Maven drafts.
Status conflicts.

Solution:

Use AutomationCommands queue table.

Rule:

Never allow Bot and Apps Script to update the same row simultaneously.

---

## Debugging Strategy

Problem:

Too many architectural changes before understanding the root cause.

Solution:

Analyze first.
Isolate the problem.
Change one thing at a time.

Rule:

Never rewrite a working flow before proving the root cause.

---

## Service Reports

Problem:

Drive save flow created duplicate folders and files.

Solution:

Use stable identifiers.

Rule:

Always identify customer folder and report file before creating new ones.

---

## Maven Sync

Problem:

Sync got stuck around document item import.

Solution:

Investigate incrementally.

Rule:

Do not rewrite sync from scratch.

---

## GitHub

Problem:

Project knowledge was spread across many chats.

Solution:

Project Brain repository.

Rule:

Every major decision must be documented.

---

## Deployment

Rule:

No production deployment without checkpoint and backup.
