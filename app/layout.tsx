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

// SEO Metadata
export const metadata: Metadata = {
  title: 'Convoc | Free Secure Video Meetings & Screen Sharing',
  description:
    'Host HD video calls, real-time screen sharing, group chat, and file sharing with Convoc — the modern, secure alternative to Zoom, Google Meet, and Skype.',
  openGraph: {
    title: 'Convoc | Free Secure Video Meetings & Screen Sharing',
    description:
      'Experience fast, secure, and high-quality video conferencing with Convocs. No installs required. Just click and meet.',
    url: 'https://convoc.live',
    siteName: 'Convocs',
    images: [
      {
        url: 'https://convoc.live/convoc.png',
        width: 1200,
        height: 630,
        alt: 'Convocs - Free Secure Video Meetings App',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convoc | Free Secure Video Meetings & Screen Sharing',
    description:
      'Switch to Convoc for fast, reliable, and private video calls. Perfect for teams, remote work, and online classes.',
    images: ['https://convoc.live/convoc.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};



// Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
