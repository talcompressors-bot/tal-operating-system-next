# CHECKPOINT 2026-06-04

## Status

Project Brain upgraded from basic skeleton to structured project memory.

## Git / GitHub

- Git is working.
- GitHub repository is connected.
- Apps Script code was pushed to GitHub.
- Repository: TalCompressors-ServiceReports-AI.

## Apps Script

Backed up files:

- ServiceReports.gs
- MavenAPI.gs
- EmailSender.gs
- Report.html
- appsscript.json

## Working Systems

- Service Report HTML generation
- BusinessDocuments workflow
- AutomationCommands queue architecture
- Maven draft creation
- GitHub backup flow

## Known Open Issues

- Maven sync stuck / incomplete around InvoiceMavenDocumentItems.
- Drive save may create duplicate customer folders.
- Drive save may create duplicate report files.
- ReportCounter timing must be protected.
- Need better A4 / PDF layout handling.

## Golden Rules

- Do not rewrite stable working flows.
- Extend existing logic whenever possible.
- Do not allow AppSheet Bot and Apps Script to update the same row simultaneously.
- Use AutomationCommands queue architecture.
- Analyze first, fix incrementally.
- No deploy without approval.

## Next Steps

1. Fill SYSTEM_MAP.md.
2. Fill LESSONS_LEARNED.md.
3. Fill ROADMAP.md.
4. Update PROJECT_BRAIN_MASTER.md as index.
5. Commit Project Brain upgrade to GitHub.
