import { chromium, type Page } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

type DiscoveryButton = {
  label: string;
  role: string;
  safe: boolean;
  reason?: string;
};

type DiscoveryView = {
  id: string;
  url: string;
  title: string;
  viewNameGuess: string;
  visibleText: string[];
  buttons: DiscoveryButton[];
  fields: string[];
  links: string[];
  listOrCardText: string[];
  screenshot?: string;
};

type DiscoveryReport = {
  status: string;
  generatedAt: string;
  appUrlConfigured: boolean;
  startUrl?: string;
  chromeUserDataDir: string;
  chromeProfileDir: string;
  views: DiscoveryView[];
  screenshots: string[];
  skippedActions: Array<{ label: string; reason: string; url: string }>;
  blockers: Array<{ type: string; message: string; instruction?: string }>;
};

const unsafeWords = [
  'create',
  'add',
  'new',
  'edit',
  'delete',
  'remove',
  'send',
  'approve',
  'issue',
  'invoice',
  'receipt',
  'payment',
  'pay',
  'archive',
  'submit',
  'save',
  'sync',
  'run',
  'execute',
  'צור',
  'חדש',
  'ערוך',
  'מחק',
  'שלח',
  'אשר',
  'חשבונית',
  'קבלה',
  'תשלום',
  'שמור'
];

const navigationHints = [
  'menu',
  'view',
  'tab',
  'back',
  'home',
  'dashboard',
  'reports',
  'documents',
  'customers',
  'service',
  'maven',
  'catalog',
  'דוחות',
  'לקוחות',
  'מסמכים'
];

const appUrl = process.env.APPSHEET_APP_URL;
const outputDir = path.resolve(process.env.APPSHEET_DISCOVERY_OUTPUT_DIR || 'project-brain/appsheet-ui');
const screenshotDir = path.join(outputDir, 'screenshots');
const maxViews = Number(process.env.APPSHEET_DISCOVERY_MAX_VIEWS || '50');
const headless = String(process.env.APPSHEET_DISCOVERY_HEADLESS || 'false').toLowerCase() === 'true';
const keepOpenOnBlocker = String(process.env.APPSHEET_DISCOVERY_KEEP_OPEN_ON_BLOCKER || 'true').toLowerCase() !== 'false';

const defaultChromeUserDataDir = path.join(
  os.homedir(),
  'AppData',
  'Local',
  'Google',
  'Chrome',
  'User Data'
);

const chromeUserDataDir = path.resolve(process.env.CHROME_USER_DATA_DIR || defaultChromeUserDataDir);
const chromeProfileDir = process.env.CHROME_PROFILE_DIR || 'Default';

function ensureDirs() {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(screenshotDir, { recursive: true });
}

function isUnsafeLabel(label: string): { unsafe: boolean; reason?: string } {
  const lower = label.toLowerCase();
  const hit = unsafeWords.find(word => lower.includes(word.toLowerCase()));
  if (hit) return { unsafe: true, reason: `SKIPPED_UNSAFE: label contains "${hit}"` };
  return { unsafe: false };
}

function uniqueCompact(values: string[], limit: number): string[] {
  const seen = new Set<string>();
  const output: string[] = [];
  for (const raw of values) {
    const value = raw.replace(/\s+/g, ' ').trim();
    if (!value || value.length < 2 || seen.has(value)) continue;
    seen.add(value);
    output.push(value.slice(0, 240));
    if (output.length >= limit) break;
  }
  return output;
}

async function getTexts(page: Page, selector: string, limit: number): Promise<string[]> {
  return uniqueCompact(await page.locator(selector).evaluateAll(elements =>
    elements.map(element => (element.textContent || '').trim())
  ), limit);
}

async function detectBlocker(page: Page): Promise<DiscoveryReport['blockers'][number] | null> {
  const bodyText = (await page.locator('body').innerText({ timeout: 5000 }).catch(() => '')).toLowerCase();
  const url = page.url().toLowerCase();

  if (url.includes('accounts.google') || bodyText.includes('sign in') || bodyText.includes('login')) {
    return {
      type: 'LOGIN_REQUIRED',
      message: 'Chrome profile is not authenticated for AppSheet in this context.',
      instruction: 'Close all Chrome windows, confirm CHROME_USER_DATA_DIR and CHROME_PROFILE_DIR point to the authenticated Chrome profile, then rerun.'
    };
  }

  if (bodyText.includes('access denied') || bodyText.includes('permission') || bodyText.includes('not authorized')) {
    return {
      type: 'PERMISSION_REQUIRED',
      message: 'The authenticated Chrome profile does not have permission to view this AppSheet app.',
      instruction: 'Use a Chrome profile that already has AppSheet access.'
    };
  }

  return null;
}

async function collectView(page: Page, id: string): Promise<DiscoveryView> {
  const title = await page.title().catch(() => '');
  const url = page.url();
  const visibleText = await getTexts(page, 'body *:visible', 80);
  const buttonLabels = await getTexts(page, 'button:visible, [role="button"]:visible, input[type="button"]:visible, input[type="submit"]:visible', 60);
  const links = await getTexts(page, 'a:visible, [role="link"]:visible', 60);
  const fields = uniqueCompact(await page.locator('input:visible, textarea:visible, select:visible, [contenteditable="true"]:visible').evaluateAll(elements =>
    elements.map(element => {
      const input = element as HTMLInputElement;
      return input.getAttribute('aria-label') || input.getAttribute('placeholder') || input.getAttribute('name') || input.id || '';
    })
  ), 60);
  const listOrCardText = await getTexts(page, '[role="listitem"]:visible, [role="row"]:visible, .card:visible, .table:visible, .deck:visible', 80);

  const buttons = buttonLabels.map(label => {
    const unsafe = isUnsafeLabel(label);
    return {
      label,
      role: 'button',
      safe: !unsafe.unsafe,
      reason: unsafe.reason
    };
  });

  const viewNameGuess = visibleText[0] || title || url;
  const screenshotName = `appsheet-auth-view-${id}.png`;
  const screenshotPath = path.join(screenshotDir, screenshotName);
  await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => undefined);

  return {
    id,
    url,
    title,
    viewNameGuess,
    visibleText,
    buttons,
    fields,
    links,
    listOrCardText,
    screenshot: path.relative(outputDir, screenshotPath).replace(/\\/g, '/')
  };
}

async function safeNavigationCandidates(page: Page): Promise<Array<{ label: string; index: number }>> {
  const labels = await page.locator('a:visible, button:visible, [role="button"]:visible, [role="link"]:visible').evaluateAll(elements =>
    elements.map((element, index) => ({
      index,
      label: (element.textContent || element.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
    }))
  );

  return labels.filter(candidate => {
    if (!candidate.label) return false;
    if (isUnsafeLabel(candidate.label).unsafe) return false;
    const lower = candidate.label.toLowerCase();
    return navigationHints.some(hint => lower.includes(hint.toLowerCase()));
  }).slice(0, 20);
}

async function clickCandidateByIndex(page: Page, index: number): Promise<boolean> {
  const locator = page.locator('a:visible, button:visible, [role="button"]:visible, [role="link"]:visible').nth(index);
  await locator.click({ trial: true, timeout: 2000 }).catch(() => {
    throw new Error('candidate is not clickable in trial mode');
  });
  await locator.click({ timeout: 3000 });
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => undefined);
  await page.waitForTimeout(1000);
  return true;
}

async function main() {
  ensureDirs();

  const report: DiscoveryReport = {
    status: appUrl ? 'STARTED' : 'BLOCKED_MISSING_APPSHEET_URL',
    generatedAt: new Date().toISOString(),
    appUrlConfigured: Boolean(appUrl),
    startUrl: appUrl,
    chromeUserDataDir,
    chromeProfileDir,
    views: [],
    screenshots: [],
    skippedActions: [],
    blockers: []
  };

  if (!appUrl) {
    report.blockers.push({
      type: 'MISSING_ENV',
      message: 'APPSHEET_APP_URL is not set.',
      instruction: 'Set APPSHEET_APP_URL to the existing AppSheet app URL and rerun the scanner.'
    });
    fs.writeFileSync(path.join(outputDir, 'playwright-discovery-report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (!fs.existsSync(chromeUserDataDir)) {
    report.status = 'BLOCKED';
    report.blockers.push({
      type: 'CHROME_PROFILE_NOT_FOUND',
      message: `Chrome user data directory was not found: ${chromeUserDataDir}`,
      instruction: 'Set CHROME_USER_DATA_DIR to the authenticated Chrome User Data directory.'
    });
    fs.writeFileSync(path.join(outputDir, 'playwright-discovery-report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(`[appsheet-discovery-auth] appUrl: ${appUrl}`);
  console.log(`[appsheet-discovery-auth] chromeUserDataDir: ${chromeUserDataDir}`);
  console.log(`[appsheet-discovery-auth] chromeProfileDir: ${chromeProfileDir}`);
  console.log('[appsheet-discovery-auth] launching persistent Chrome context...');

  let context;
  try {
    context = await chromium.launchPersistentContext(chromeUserDataDir, {
      channel: 'chrome',
      headless,
      viewport: { width: 1440, height: 1000 },
      args: [
        `--profile-directory=${chromeProfileDir}`,
        '--disable-blink-features=AutomationControlled'
      ]
    });
  } catch (error) {
    report.status = 'BLOCKED';
    report.blockers.push({
      type: 'CHROME_PROFILE_LAUNCH_FAILED',
      message: error instanceof Error ? error.message : String(error),
      instruction: 'Chrome closed before Playwright could attach. Close every Chrome window/process and rerun, or try another CHROME_PROFILE_DIR such as Profile 3.'
    });
    fs.writeFileSync(path.join(outputDir, 'playwright-discovery-report.json'), JSON.stringify(report, null, 2));
    console.error('[appsheet-discovery-auth] launchPersistentContext failed before page.goto. No navigation was attempted.');
    throw error;
  }

  console.log('[appsheet-discovery-auth] persistent Chrome context launched.');

  const page = context.pages()[0] || await context.newPage();
  const visited = new Set<string>();
  const queue: string[] = [appUrl];
  let shouldKeepOpen = false;

  try {
    while (queue.length > 0 && report.views.length < maxViews) {
      const nextUrl = queue.shift()!;
      if (visited.has(nextUrl)) continue;
      visited.add(nextUrl);

      console.log(`[appsheet-discovery-auth] before goto: ${nextUrl}`);
      await page.goto(nextUrl, { waitUntil: 'networkidle', timeout: 30000 }).catch(async () => {
        console.log(`[appsheet-discovery-auth] networkidle goto failed, retrying domcontentloaded: ${nextUrl}`);
        await page.goto(nextUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      });
      console.log(`[appsheet-discovery-auth] after goto current URL: ${page.url()}`);

      const blocker = await detectBlocker(page);
      if (blocker) {
        report.status = 'BLOCKED';
        report.blockers.push(blocker);
        shouldKeepOpen = keepOpenOnBlocker && !headless;
        console.log(`[appsheet-discovery-auth] blocker: ${blocker.type}`);
        break;
      }

      const view = await collectView(page, String(report.views.length + 1).padStart(3, '0'));
      report.views.push(view);
      if (view.screenshot) report.screenshots.push(view.screenshot);

      for (const button of view.buttons) {
        if (!button.safe && button.reason) {
          report.skippedActions.push({ label: button.label, reason: button.reason, url: page.url() });
        }
      }

      const candidates = await safeNavigationCandidates(page);
      for (const candidate of candidates) {
        const unsafe = isUnsafeLabel(candidate.label);
        if (unsafe.unsafe) {
          report.skippedActions.push({ label: candidate.label, reason: unsafe.reason || 'SKIPPED_UNSAFE', url: page.url() });
          continue;
        }

        const beforeUrl = page.url();
        const clicked = await clickCandidateByIndex(page, candidate.index).catch(() => false);
        if (!clicked) continue;

        const afterUrl = page.url();
        if (!visited.has(afterUrl) && !queue.includes(afterUrl)) {
          queue.push(afterUrl);
        }

        if (afterUrl !== beforeUrl) {
          await page.goBack({ waitUntil: 'networkidle', timeout: 8000 }).catch(() => page.goto(beforeUrl));
        }
      }
    }

    if (report.status === 'STARTED') {
      report.status = report.views.length > 0 ? 'COMPLETED' : 'NO_VIEWS_FOUND';
    }
  } finally {
    if (shouldKeepOpen) {
      console.log('[appsheet-discovery-auth] keeping browser open because a blocker/error was detected. Close the browser window when done inspecting.');
      await page.waitForTimeout(30 * 60 * 1000).catch(() => undefined);
    }
    await context.close();
  }

  fs.writeFileSync(path.join(outputDir, 'playwright-discovery-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({
    status: report.status,
    views: report.views.length,
    skippedActions: report.skippedActions.length,
    blockers: report.blockers
  }, null, 2));
}

main().catch(error => {
  ensureDirs();
  console.error('[appsheet-discovery-auth] fatal error before normal cleanup. Browser may remain open if Chrome launched outside script control.');
  const failure: DiscoveryReport = {
    status: 'ERROR',
    generatedAt: new Date().toISOString(),
    appUrlConfigured: Boolean(appUrl),
    startUrl: appUrl,
    chromeUserDataDir,
    chromeProfileDir,
    views: [],
    screenshots: [],
    skippedActions: [],
    blockers: [{ type: 'SCRIPT_ERROR', message: error instanceof Error ? error.message : String(error) }]
  };
  fs.writeFileSync(path.join(outputDir, 'playwright-discovery-report.json'), JSON.stringify(failure, null, 2));
  console.error(error);
  process.exitCode = 1;
});
