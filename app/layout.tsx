import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tal Compressors Service Reports",
  description: "Read-only service reports migration shell",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            Tal Compressors
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/service-reports">Service Reports</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
