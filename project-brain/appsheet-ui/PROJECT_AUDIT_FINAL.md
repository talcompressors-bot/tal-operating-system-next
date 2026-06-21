# PROJECT AUDIT FINAL

Last updated: 2026-06-21
Scope: AppSheet discovery and migration planning
Mode: documentation only

## 1. Current AppSheet Blocker

Full Playwright runtime discovery is blocked by AppSheet licensing/runtime restrictions.

Observed/reported blockers:

- Invalid subscription plan
- User Signin not allowed with FREE plan
- Document Process task not allowed with FREE plan

Runtime scan result:

- Chrome CDP connection succeeded.
- AppSheet runtime URL loaded.
- Only an AppSheet test-mode / plan-upgrade interstitial was visible.
- Actual AppSheet application screens/views were not exposed to the scanner.
- No unsafe actions were clicked.
- No production data was changed.

## 2. Conclusion

Full runtime discovery is blocked by AppSheet licensing.

The migration cannot rely on Playwright crawling alone until AppSheet licensing/deployment allows authenticated runtime access to the full app UI.

## 3. Alternative Discovery Sources

Use AppSheet metadata and repo evidence instead of runtime crawling:

- Tables
- View definitions
- Actions
- Bots
- Slices
- Security filters
- UX configuration

Current repo evidence already available:

- `data-sources/tools/SHEETS_REGISTRY.md`
- `project-brain/maps/APPSHEET_MAP.md`
- `project-brain/maps/SYSTEM_MAP.md`
- `project-brain/maps/APPS_SCRIPT_MAP.md`
- `AI_DRAFT_FLOW_MAP.md`
- `project-brain/PROJECT_BRAIN_MASTER.md`
- `project-brain/bugs/CURRENT_BUGS.md`

Missing metadata exports:

- Full AppSheet view definitions
- Full AppSheet action list
- Full AppSheet bot/process/task definitions
- Slice definitions
- Security filters
- UX menu/navigation configuration
- App formulas and behavior settings

## 4. Migration Strategy

Build the complete AppSheet -> Next.js migration map from AppSheet metadata instead of runtime crawling.

Recommended path:

1. Export or manually document AppSheet metadata for tables, views, actions, bots, slices, security filters, and UX settings.
2. Merge metadata with `SHEETS_REGISTRY.md`.
3. Build object/action/bot/view inventories.
4. Map every AppSheet object to a Next.js route, component, API/data source, permission rule, and test.
5. Keep all production writes disabled until each workflow has an explicit approval and rollback plan.

## 5. Generated Migration Documents

Generated as metadata-first migration controls:

- `project-brain/appsheet-ui/APPSHEET_OBJECT_INVENTORY.md`
- `project-brain/appsheet-ui/APPSHEET_ACTION_INVENTORY.md`
- `project-brain/appsheet-ui/APPSHEET_BOT_INVENTORY.md`
- `project-brain/appsheet-ui/APPSHEET_VIEW_INVENTORY.md`
- `project-brain/appsheet-ui/NEXTJS_MIGRATION_MAP.md`

