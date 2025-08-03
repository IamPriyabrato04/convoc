import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Using Next.js Metadata API and Viewport export
export const metadata: Metadata = {
  title: "Convoc",
  description: "A modern, open-source, and video conferencing web application",
  keywords: [
    "Convoc",
    "video call",
    "video conferencing",
    "self-hosted",
    "open-source",
    "alternative to Discord",
    "modern communication",
    "real-time collaboration",
    "video calls",
    "chat application",
    "community platform",
    "secure communication",
    "self-hosted video conferencing",
    "open-source video calls",
  ],
  openGraph: {
    title: "Convoc",
    description: "A modern, open-source, and video conferencing web application",
  },
};

// Define viewport instead of manually adding <meta> in head
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
