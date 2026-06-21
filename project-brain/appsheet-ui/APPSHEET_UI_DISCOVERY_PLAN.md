# APPSHEET UI DISCOVERY PLAN

Last updated: 2026-06-21

## Purpose

Build a reusable, read-only Playwright scanner for the current AppSheet app so the AppSheet UI can be migrated screen-by-screen to Next.js.

## How The Scanner Works

1. Reads the AppSheet URL from `APPSHEET_APP_URL`.
2. Optionally loads a Playwright storage state from `APPSHEET_STORAGE_STATE`.
3. Opens the app in a Chromium browser.
4. Detects whether login or permissions block discovery.
5. Collects visible screen text, buttons, form fields, links, list/card/table-like labels, and navigation candidates.
6. Clicks only safe navigation candidates.
7. Never clicks actions that look destructive or production-changing.
8. Saves one screenshot per discovered view where safe.
9. Writes a JSON report under `project-brain/appsheet-ui/`.

## What It Collects

- Page URL and title.
- View/screen name guesses.
- Visible text snippets.
- Buttons and action labels.
- Form field labels and placeholders.
- Link/navigation labels.
- Table/list/card-like visible text.
- Skipped unsafe actions.
- Screenshots per visited safe view.
- Blocking reason if login, permissions, or missing URL stops discovery.

## Safety Rules

The scanner is read-only by design.

It must not click labels containing unsafe action words, including:

- create
- add
- new
- edit
- delete
- remove
- send
- approve
- issue
- invoice
- receipt
- payment
- pay
- archive
- submit
- save
- sync
- run
- execute

If an action is unclear, the scanner records it as `SKIPPED_UNSAFE`.

The scanner does not store passwords, cookies, or secrets in code. If a login is needed, use a local storage-state file outside git or manually log in during an approved local run.

## Required Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `APPSHEET_APP_URL` | Yes | AppSheet application URL to scan |
| `APPSHEET_STORAGE_STATE` | No | Path to Playwright storage-state JSON for an already logged-in session |
| `APPSHEET_DISCOVERY_OUTPUT_DIR` | No | Defaults to `project-brain/appsheet-ui` |
| `APPSHEET_DISCOVERY_HEADLESS` | No | `true` by default; set `false` for visible browser debugging |
| `APPSHEET_DISCOVERY_MAX_VIEWS` | No | Defaults to `50` |

## How To Run

Install Playwright in a safe local Node environment if it is not already installed:

```powershell
npm install -D playwright tsx
npx playwright install chromium
```

Run:

```powershell
$env:APPSHEET_APP_URL="https://www.appsheet.com/start/..."
npx tsx scripts/playwright/appsheet-discovery.ts
```

Optional storage state:

```powershell
$env:APPSHEET_STORAGE_STATE="C:\path\to\appsheet-storage-state.json"
npx tsx scripts/playwright/appsheet-discovery.ts
```

## Outputs

- `project-brain/appsheet-ui/playwright-discovery-report.json`
- `project-brain/appsheet-ui/screenshots/*.png`
- Console summary of discovered views and skipped unsafe actions

If `APPSHEET_APP_URL` is missing, this mission creates:

- `project-brain/appsheet-ui/playwright-discovery-report.example.json`

