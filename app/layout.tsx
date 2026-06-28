import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAL Compressors ERP",
  description: "TAL Compressors operations workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            TAL Compressors
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/operations">Operations</Link>
            <Link href="/service-reports">Service Reports</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
