import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convoc",
  description: "A modern, open-source, and video conferenceing web application",
  keywords: [
    "Convoc",
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
    description: "A modern, open-source, and video conferenceing web application",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
