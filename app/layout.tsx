import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PwaBoot } from "@/components/pwa-boot";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Little Wins — Home Sprint",
  description: "A cozy Agile-inspired chore board for couples and families.",
  manifest: "/manifest.json",
  applicationName: "Little Wins",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Little Wins",
  },
  icons: {
    icon: [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7ff" },
    { media: "(prefers-color-scheme: dark)", color: "#071126" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <PwaBoot />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
