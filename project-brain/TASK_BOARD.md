# TASK BOARD

Last updated: 2026-06-22
Mode: documentation sync, no implementation

## NOW

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| Document Liad architecture decisions | Record approved equipment import, report counter, Server Actions, offline-first, and implementation order decisions | Listed migration and protocol docs updated; no code/runtime files changed | No for documentation |
| Prisma validation | Verify existing `prisma/schema.prisma` syntax/design with Prisma tooling | Validation passes without DB migration or schema edits | Yes before installing/running Prisma tooling |
| Preserve shadow-only safety rules | Keep Next.js and PostgreSQL work separate from production AppSheet/Sheets | Docs clearly state no production writes or cutover | No |

## NEXT

| Task | Goal | Test / Done | Approval Needed |
|---|---|---|---|
| PostgreSQL/Supabase environment | Prepare the shadow PostgreSQL environment only | DB exists for shadow migration work; no production cutover | Yes |
| Import mapping and import validation | Map source rows to PostgreSQL and validate exclusions before import | `ReportEquipmentItems` imports only rows linked to real `ServiceReports`; legacy/test exclusions are reported | Yes before running import |
| Server Actions architecture | Make internal Next.js write flows use Server Actions by default | Approvals, AI draft approval, BusinessDocument creation, ServiceReport shadow updates, import review, queue commands, PostgreSQL mutations, and offline sync actions have Server Action paths | Yes before write implementation |
| Offline queue/PWA sync | Support field work without internet | Local pending actions sync automatically; conflicts are logged for review and not silently overwritten | Yes before sync implementation |
| VPS/Remote Development planning | Select an open full development environment for remote work | Candidate supports terminal, full repo, Git/GitHub, Codex CLI, VS Code Server/browser IDE, Next.js, Prisma/PostgreSQL, future agents, SSH, mobile/tablet access, secrets, backups, and rollback | Yes before provisioning |
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
| Liad architecture decisions documented | Equipment-row exclusion, derived report counter, Server Actions-first, offline-first, and next implementation order recorded in Project Brain docs |
| Remote infrastructure requirement recorded | Future VPS/Remote Development track must use an open full dev environment and avoid restricted control panels/provider lock-in |

## BLOCKED / NOT STARTED

| Task | Blocker | Next Unblock Step |
|---|---|---|
| Prisma validation | Prisma is not installed and validation has not been approved/run | Approve Prisma tooling step |
| Database setup/migration | No PostgreSQL environment has been created; no migration has been run | Validate Prisma, then approve shadow PostgreSQL setup |
| Import mapping and validation | Prisma validation and shadow environment are not complete | Validate Prisma, prepare PostgreSQL/Supabase environment, then map import behavior |
| Server Actions architecture | Import mapping and mutation boundaries are not implemented | Complete import mapping/validation first |
| Offline queue/PWA sync | Server Actions sync targets are not implemented | Define Server Actions architecture first |
| VPS/Remote Development setup | Future track only; no provider selected and no approval to provision | Plan candidates later against open-environment requirements |
| Production integration | Shadow app is not approved for production | Keep AppSheet/Sheets production until explicit cutover approval |
| Maven write flow | Not part of shutdown work | Requires separate design and approval |

## Rules

- No production writes.
- Documentation only for the current update.
- Do not modify `prisma/schema.prisma` yet.
- No Prisma install unless explicitly approved.
- No database creation or migration unless explicitly approved.
- No Google Sheets.
- No AppSheet.
- No Maven.
- No VPS provisioning or remote infrastructure setup.
