import { existsSync } from "fs";
import { chromium, type Browser } from "playwright";
import { getBusinessDocumentById } from "../../business-document-adapter";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type BusinessDocumentPdfRouteContext = {
  params: Promise<{ id: string }>;
};

function getBaseUrl(request: Request) {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

function getSafeFileName(id: string) {
  const safeId = id.replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "");
  return `${safeId || "business-document"}.pdf`;
}

function getChromiumExecutablePath() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    process.env.CHROME_EXECUTABLE_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter((path): path is string => Boolean(path));

  return candidates.find((path) => existsSync(path));
}

async function launchPdfBrowser() {
  const executablePath = getChromiumExecutablePath();

  return chromium.launch({
    headless: true,
    executablePath,
    args: ["--disable-dev-shm-usage", "--no-sandbox"],
  });
}

export async function GET(
  request: Request,
  { params }: BusinessDocumentPdfRouteContext,
) {
  const { id } = await params;
  const document = await getBusinessDocumentById(id);

  if (!document) {
    return Response.json(
      { error: "BusinessDocument not found" },
      { status: 404 },
    );
  }

  let browser: Browser | undefined;

  try {
    browser = await launchPdfBrowser();

    const page = await browser.newPage({
      locale: "he-IL",
      timezoneId: "Asia/Jerusalem",
    });
    const previewUrl = `${getBaseUrl(request)}/business-documents/${encodeURIComponent(
      id,
    )}/preview`;

    await page.goto(previewUrl, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    const pdf = await page.pdf({
      format: "A4",
      margin: {
        top: "12mm",
        right: "12mm",
        bottom: "12mm",
        left: "12mm",
      },
      preferCSSPageSize: true,
      printBackground: true,
    });

    return new Response(new Uint8Array(pdf), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename="${getSafeFileName(
          document.id,
        )}"`,
        "Content-Type": "application/pdf",
        "X-Internal-PDF-Preview": "true",
        "X-No-External-Action":
          "No Maven/Invoice4U call, email, inventory, DB write, or file persistence",
      },
    });
  } catch (error) {
    console.error("BusinessDocument PDF generation failed", error);

    return Response.json(
      {
        error: "PDF generation failed",
        boundary:
          "No Maven/Invoice4U call, no email, no inventory action, no DB write, and no file persistence occurred.",
      },
      { status: 500 },
    );
  } finally {
    await browser?.close().catch(() => undefined);
  }
}
