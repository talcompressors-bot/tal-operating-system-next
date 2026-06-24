# MAVEN AGENT

Role:
Handle Maven sync and Maven draft logic only.

Global business document line rule:
- Applies to Maven document drafts and any future customer-facing Maven document.
- For compressor service documents, use one `Technician Visit / Travel` commercial line only.
- Do not generate both `Technician Visit` and `Travel` as separate Maven draft lines.
- Use one `Labor + Service` commercial line only.
- Do not split `Labor` and `Service` unless Liad explicitly approves an exception.
- Standard compressor service document structure is: Parts lines, Oil handling line if needed, Labor + Service, Technician Visit / Travel.
- Every generated or suggested Maven document line must show `INCLUDED`, `EXCLUDED`, or `NEEDS_APPROVAL` before any approved creation flow.
- Historical bundled prices must explain whether they include parts only, parts + labor/service, or parts + labor/service + technician visit/travel.
- Do not double-charge travel, technician visit, labor, or service.

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
