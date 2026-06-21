import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "טל מדחסים - דוחות שירות",
  description: "מערכת פיתוח לקריאת דוחות שירות",
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
            טל מדחסים
          </Link>
          <nav aria-label="ניווט ראשי">
            <Link href="/service-reports">דוחות שירות</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
