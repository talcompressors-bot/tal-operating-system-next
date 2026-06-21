# TASK BOARD

Last updated: 2026-06-21
Mode: project brain sync

## NOW

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Prisma validation | Verify `prisma/schema.prisma` syntax/design with Prisma tooling | Validation passes without DB migration | Yes before installing/running Prisma tooling |
| PostgreSQL environment setup | Prepare the shadow PostgreSQL environment only | DB exists for shadow migration work; no production cutover | Yes |
| Preserve shadow-only safety rules | Keep Next.js and PostgreSQL work separate from production AppSheet/Sheets | Docs clearly state no production writes or cutover | No |

## NEXT

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| First shadow import | Import validated source data into shadow PostgreSQL | Row counts and import issues are reported; production remains untouched | Yes |
| Define snapshot adapter contract | Keep local JSON snapshot reads stable for shadow development | Adapter inputs, outputs, timestamp, and row-count checks documented | No |
| Document Hebrew RTL UI requirements | Preserve current Next.js UI direction | RTL, Hebrew labels, and status/source text preservation documented | No |

## DONE

| Task | Evidence |
|---|---|
| Next.js shadow app created | App exists as shadow/development implementation only |
| Hebrew RTL UI created | Next.js UI supports Hebrew RTL direction |
| ServiceReports list/detail created | Shadow app includes ServiceReports list and detail screens |
| Snapshot JSON adapter created | Adapter reads local snapshot JSON instead of production sources |
| Live read-only validation completed | `Customers_Final = 763`, `ServiceReports = 62`, `ReportEquipmentItems = 108` |
| GitHub push completed | Latest shadow-app/documentation work pushed |
| Production protected | AppSheet and Google Sheets untouched |
| Narrow Phase 1 Prisma subset rejected | Documented as too narrow for Tal Operating System V1 |
| PostgreSQL V1 scope approved | `project-brain/migration/POSTGRESQL_V1_SCOPE.md` approved as final V1 scope before Prisma generation |
| Full Prisma schema created | `prisma/schema.prisma` created from the approved full V1 scope |
| Prisma schema committed and pushed | Commit `108b756 Add full PostgreSQL V1 Prisma schema` exists on `origin/main` |

## BLOCKED / NOT STARTED

| Task | Blocker | Next Unblock Step |
|---|---|---|
| Prisma validation | Prisma is not installed and validation has not been approved/run | Approve Prisma tooling step |
| Database setup/migration | No PostgreSQL environment has been created; no migration has been run | Validate Prisma, then approve shadow PostgreSQL setup |
| Production integration | Shadow app is not approved for production | Keep AppSheet/Sheets production until explicit cutover approval |
| Maven write flow | Not part of shutdown work | Requires separate design and approval |

## Rules

- No production writes.
- No Prisma install unless explicitly approved.
- No database creation or migration unless explicitly approved.
- No Google Sheets.
- No AppSheet.
- No Maven.
