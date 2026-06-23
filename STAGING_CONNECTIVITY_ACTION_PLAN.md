# STAGING CONNECTIVITY ACTION PLAN

Date: 2026-06-23

Scope: documentation-only action plan for the Supabase staging connectivity blocker.

Constraints:

- Do not edit code.
- Do not commit.
- Do not include env files or secret values.
- Do not run DB writes, imports, Prisma migrations, Prisma `db push`, AppSheet changes, Google Sheets writes, Maven actions, Apps Script changes, or production actions.

## 1. What Exactly Is Still Broken?

The Next.js shadow app and Prisma schema are not currently able to read Supabase staging from this local/runtime environment.

Concrete broken behavior:

- `npx.cmd prisma validate` succeeds when staging env values are loaded through `.env` or an equivalent explicit env-loading method.
- After env loading succeeds, Prisma fails on database reachability with `P1001`.
- The failure is against the Supabase pooler host:
  - `aws-1-eu-central-1.pooler.supabase.com:5432`
  - Earlier diagnostics also referenced pooler port `6543`.
- Next.js home route can start/render, but database-backed service report routes fail because Prisma cannot connect:
  - `/service-reports`
  - `/service-reports/acd1133d`
- Actual staging counts cannot currently be read back through Prisma.

What is not broken based on current evidence:

- The verified Supabase staging project id is `mdlvxklufrchiabonafm`.
- `.env.staging` is documented as matching that verified project id.
- Prisma schema validation is not the current blocker.
- Missing env was an earlier blocker, but the current blocker after env loading is `P1001`.
- No evidence currently points to a Prisma migration or schema-push problem.

## 2. What Is The Most Likely Root Cause?

Most likely root cause:

Local network/runtime connectivity restriction between this machine/session and external TCP targets, including the Supabase pooler.

Why this is most likely:

- Prisma reaches schema validation, then fails at network connection time with `P1001`.
- DNS resolution for the Supabase pooler was proven to work.
- TCP checks failed not only for Supabase pooler ports, but also for ordinary HTTPS targets such as `google.com:443` and `github.com:443`.
- This points to local runtime/network reachability rather than a Supabase project id, Prisma schema, or missing-env issue.

Secondary root-cause candidate:

The Supabase connection strings should still be byte-for-byte compared against Supabase Dashboard > Connect > Prisma because `DIRECT_URL` format may need review. This is a secondary candidate because the broader TCP failures make local/runtime networking the stronger explanation.

Current confidence:

- Local network/runtime restriction: HIGH
- Connection string format mismatch: MEDIUM
- Malformed password/escaping: LOW-MEDIUM
- Wrong Supabase project id: LOW
- Missing env: LOW for the current failure
- Wrong Prisma schema: VERY LOW

## 3. Next 3 Actions To Fix It

### Action 1: Prove Whether The Runtime Can Reach Normal HTTPS And Supabase TCP

Run read-only network checks from the same terminal/runtime used for Prisma.

Checks:

- Confirm regular HTTPS reachability to a normal public endpoint.
- Confirm TCP reachability to:
  - `aws-1-eu-central-1.pooler.supabase.com:5432`
  - `aws-1-eu-central-1.pooler.supabase.com:6543`
- If possible, repeat from a second network or runtime, such as a different Wi-Fi/network, VPN off/on, or another terminal environment.

Expected result:

- If ordinary HTTPS and Supabase TCP fail together, treat this as a local machine/runtime/network restriction.
- If ordinary HTTPS works but Supabase ports fail, focus on firewall/router/ISP/security software rules or Supabase pooler endpoint/port choice.

Confidence this action helps: HIGH.

Reason:

The strongest current evidence is broad TCP failure, including ordinary HTTPS targets.

### Action 2: Compare Local Staging URLs Against Supabase Dashboard Connect Strings

Open Supabase Dashboard for staging project `mdlvxklufrchiabonafm` and compare the local staging connection string shapes against Supabase Dashboard > Connect > Prisma.

Check without exposing secrets:

- Project id/ref is `mdlvxklufrchiabonafm`.
- Pooler host and port match the Dashboard-recommended Prisma connection string.
- `DATABASE_URL` uses the recommended pooled connection mode.
- `DIRECT_URL` uses the Dashboard-recommended direct connection format for Prisma.
- SSL/query parameters match the Supabase-provided strings.
- Password is present and unchanged, but do not paste it into repo files or reports.

Expected result:

- If local strings differ from Dashboard recommendations, correct only the ignored local env file outside git, then retry read-only validation.
- If strings match, continue treating local/runtime network reachability as the blocker.

Confidence this action helps: MEDIUM.

Reason:

Current evidence says the project id and password are likely correct, but `DIRECT_URL` format has not been fully compared against the Supabase Prisma connection guidance.

### Action 3: Rerun Read-Only Prisma And Next.js Validation After Connectivity Is Restored

After network reachability and connection-string shape are confirmed, rerun the approved read-only validation only.

Validation:

1. Load staging env explicitly or use a temporary local `.env` copied from ignored `.env.staging`.
2. Run Prisma schema validation.
3. Run read-only Prisma count checks for Wave 1 tables:
   - `customers`
   - `service_reports`
   - `report_equipment_items`
4. Validate Next.js routes read-only:
   - `/`
   - `/service-reports`
   - `/service-reports/acd1133d`
5. Confirm no DB writes, imports, schema changes, Prisma migrations, Prisma `db push`, Google Sheets writes, AppSheet changes, Maven actions, Apps Script changes, Drive/email actions, or production actions occurred.

Expected result:

- Prisma can read staging counts.
- `/service-reports` and `/service-reports/acd1133d` return HTTP 200.
- Wave 1 read/display validation is restored.
- Wave 2 import remains blocked until a separate explicit approval gate.

Confidence this action helps: HIGH after Actions 1-2 are resolved; LOW before connectivity is restored.

Reason:

This is the canonical next approved validation in `project-brain/CURRENT_TASK.md` and `project-brain/TASK_BOARD.md`, but it depends on resolving the current reachability failure first.

## 4. Estimated Confidence Per Action

| Action | Confidence | Why |
|---|---:|---|
| Action 1: prove runtime/network reachability | HIGH | Current evidence shows TCP failures to Supabase and ordinary HTTPS targets, so network/runtime testing directly targets the leading cause. |
| Action 2: compare local URLs with Supabase Connect > Prisma | MEDIUM | Project id/password issues are mostly disproven, but `DIRECT_URL` format and SSL/query parameters still need direct comparison. |
| Action 3: rerun read-only Prisma and Next.js validation | HIGH after connectivity is fixed; LOW before that | Validation is the correct success proof, but it cannot pass while `P1001` reachability remains. |

## Stop Conditions

Stop before any of these actions:

- Prisma `db push`
- Prisma `migrate`
- DB writes
- imports
- seeds
- Supabase project/settings changes
- Google Sheets writes
- AppSheet changes
- Maven actions
- Apps Script changes
- Drive/email/customer-facing actions
- production deployment or cutover

Any of those require a separate explicit approval gate.

## Final Resolution

Resolved diagnosis:

- Real Prisma connectivity passed outside the network sandbox.
- Read-only Prisma Client test passed:
  - `customer.count() = 763`
- Read-only Prisma introspection command passed:
  - `npx.cmd prisma db pull --print`
  - exit code `0`
- The previous `P1001` failure was caused by the sandbox/runtime network limitation, not by Supabase project configuration, project id, local env values, or Prisma schema.
- No DB writes were run.
- No Prisma migrations were run.
- No Prisma `db push` was run.
- No imports, seeds, AppSheet changes, Google Sheets writes, Maven actions, Apps Script changes, Drive/email actions, production deployment, or production cutover occurred.

Current conclusion:

Staging connectivity is functionally valid when network access is available. Future read-only validation commands that must reach Supabase may need to run outside the restricted network sandbox.
