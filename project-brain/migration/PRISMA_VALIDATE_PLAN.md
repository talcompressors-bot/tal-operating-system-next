# PRISMA VALIDATE PLAN

Created: 2026-06-22  
Phase: D.1  
Status: Readiness plan only  
Scope: Documentation only

## Purpose

Prepare for Prisma validation without installing packages, running Prisma, creating a database, creating migrations, or touching Supabase.

This plan documents current readiness, missing pieces, the expected validation sequence, approval gates, risks, and rollback.

## Current State

Read and reviewed:

- `prisma/schema.prisma`
- `PROJECT_OPERATING_PROTOCOL.md`
- `project-brain/CURRENT_TASK.md`
- `project-brain/migration/POSTGRESQL_V1_SCOPE.md`
- `project-brain/migration/DATABASE_SCHEMA_V1.md`
- `project-brain/migration/PRISMA_SCHEMA_V1.md`
- `package.json`
- `prisma/` folder listing

Observed state:

- `prisma/schema.prisma` exists.
- `prisma/` folder exists.
- No Prisma migration folder is required for `prisma validate`.
- No `prisma/migrations/` folder is present, which is acceptable before migration work starts.
- `schema.prisma` defines a PostgreSQL datasource using `env("DATABASE_URL")`.
- No root `.env` file was found.
- `package.json` does not contain `prisma`.
- `package.json` does not contain `@prisma/client`.
- `package.json` does not contain a Prisma validation script.
- No Prisma command was run.
- No install was run.
- No database was created or connected.

## Required Packages

Required before validation can run locally without implicit downloads:

| Package | Type | Status | Reason |
|---|---|---|---|
| `prisma` | dev dependency | Missing | Provides Prisma CLI and `prisma validate`. |
| `@prisma/client` | dependency | Missing | Required by Prisma generator/client workflow; should be kept in sync with CLI version. |

Package installation requires explicit approval.

Recommended install command after approval:

```powershell
npm install prisma --save-dev
npm install @prisma/client
```

Do not run this during Phase D.1 documentation readiness.

## Missing Config

Missing:

- Root `.env` or equivalent environment file with `DATABASE_URL`.
- Confirmed shadow PostgreSQL/Supabase connection string.

For schema validation only, `DATABASE_URL` can be a non-production placeholder if Prisma requires the env var to exist. It must not point at production AppSheet, Google Sheets, Maven, or any production database.

Example placeholder shape for future approval:

```text
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
```

Do not create `.env` during this documentation task.

## Missing Scripts

Current `package.json` scripts:

- `dev`
- `build`
- `start`
- `lint`

Missing useful Prisma scripts:

```json
{
  "prisma:validate": "prisma validate --schema prisma/schema.prisma",
  "prisma:generate": "prisma generate --schema prisma/schema.prisma"
}
```

Do not edit `package.json` during this documentation task.

## Expected Validation Command

Expected validation command after approval, package installation, and environment readiness:

```powershell
npx prisma validate --schema prisma/schema.prisma
```

If a script is added later, the preferred project command becomes:

```powershell
npm run prisma:validate
```

Do not run either command during Phase D.1.

## Validation Sequence

1. Confirm documentation approval for Prisma validation readiness.
2. Confirm whether to add Prisma packages to `package.json`.
3. After approval, install:
   - `prisma`
   - `@prisma/client`
4. Add or confirm a non-production `DATABASE_URL` source if Prisma validation requires it.
5. Optionally add `prisma:validate` and `prisma:generate` scripts to `package.json`.
6. Run `npx prisma validate --schema prisma/schema.prisma` or `npm run prisma:validate`.
7. Record validation output in Project Brain.
8. If validation fails, document issues before any schema edit.
9. Do not run migrations, `db push`, `migrate dev`, `generate`, or database setup as part of validation unless separately approved.

## Approval Gates

| Gate | Required Before |
|---|---|
| Package approval | Installing `prisma` or `@prisma/client`. |
| Script approval | Editing `package.json` scripts. |
| Environment approval | Creating `.env` or adding `DATABASE_URL`. |
| Validation approval | Running any Prisma CLI command. |
| Schema edit approval | Modifying `prisma/schema.prisma`. |
| Database approval | Creating, connecting, pushing, or migrating any PostgreSQL/Supabase database. |

No gate implies approval for the next gate.

## Risks

- `prisma validate` may fail because `DATABASE_URL` is missing.
- `schema.prisma` may not yet include the documented nullable `ReportEquipmentItem.reportCounter` field from `PRISMA_SCHEMA_V1.md`.
- `package.json` currently lacks local Prisma packages, so using `npx prisma` without installation approval could trigger an implicit package download.
- Prisma validation may expose relation, enum, native type, or generator issues that require a separate schema edit task.
- Adding Prisma packages changes `package.json` and `package-lock.json`, so it must be handled as implementation work, not documentation-only work.
- Any accidental `migrate`, `db push`, or database command could create schema state before approval.

## Rollback

Documentation-only rollback:

- Revert `project-brain/migration/PRISMA_VALIDATE_PLAN.md` if this plan is not accepted.

Future package/script rollback, if approved work later changes files:

- Revert package changes in `package.json` and `package-lock.json`.
- Remove any added Prisma scripts if not approved.
- Remove any local-only `.env` placeholder if created by mistake.

Future database rollback:

- Not applicable to Phase D.1 because no DB work is allowed.
- Any future shadow DB rollback plan must be documented before DB creation or migration.

## Phase D.1 Done Criteria

- Readiness is documented.
- Missing packages, config, and scripts are identified.
- Expected validation command is documented.
- No install, Prisma command, DB, migration, Supabase, or runtime code change was performed.
- `git status --short` is reported.
