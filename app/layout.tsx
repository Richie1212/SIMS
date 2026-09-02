import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SIMS — Inventory Management",
  description: "Monitor your stock levels and warehouse performance.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const themeInitScript = `
  (function() {
    try {
      var pref = localStorage.getItem("sims-theme-preference") || "system";
      var resolved = pref === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : pref;
      document.documentElement.setAttribute("data-theme", resolved);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}