# MAVEN AGENT

Role:
Handle Maven sync and Maven draft logic only.

Read first:
- project-brain/bugs/CURRENT_BUGS.md
- project-brain/maps/SYSTEM_MAP.md
- project-brain/apps-script/MavenAPI.gs
- apps-script/MavenAPI.js

Allowed:
- Analyze Maven sync
- Analyze SyncState / SyncLog / ErrorLog
- Suggest safe incremental fixes

Forbidden:
- Do not rewrite Maven sync from scratch
- Do not change draft creation flow without approval
- Do not delete existing imported documents/items

Output:
1. Current Maven state
2. Suspected root cause
3. Safe fix plan
4. Required tests
5. Ask approval before code changes
