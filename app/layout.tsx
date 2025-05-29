import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartCV Screener – AI Resume Screening for Recruiters",
  description:
    "SmartCV Screener is an AI-powered resume screening tool. Upload resumes, input your job description, and let AI automatically classify candidates and extract key profile information.",
  applicationName: "SmartCV Screener",
  authors: [{ name: "Brian Millonte (briuwu)", url: "https://www.smartcv.io" }],
  creator: "SmartCV Team",
  keywords: [
    "resume screening",
    "AI recruiter tools",
    "resume classification",
    "automated hiring",
    "recruitment software",
    "job matching AI",
    "resume parser",
    "AI resume review",
  ],
  // robots: {
  //   index: true,
  //   follow: true,
  //   nocache: false,
  // },
  // themeColor: '#0F172A', // Dark slate
  // colorScheme: 'light',
  // openGraph: {
  //   title: 'SmartCV Screener – AI Resume Screening for Recruiters',
  //   description:
  //     'Upload resumes, add job criteria, and let SmartCV Screener handle resume filtering and candidate profiling for you. Powered by AI.',
  //   url: 'https://www.smartcv.io',
  //   siteName: 'SmartCV Screener',
  //   images: [
  //     {
  //       url: 'https://www.smartcv.io/og-image.png',
  //       width: 1200,
  //       height: 630,
  //       alt: 'SmartCV Screener Dashboard Screenshot',
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'SmartCV Screener – AI Resume Screening for Recruiters',
  //   description:
  //     'Instantly classify resumes and extract candidate profiles with AI. Try SmartCV Screener now.',
  //   site: '@smartcv_ai',
  //   creator: '@smartcv_ai',
  //   images: ['https://www.smartcv.io/og-image.png'],
  // },
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-32x32.png',
  //   apple: '/apple-touch-icon.png',
  // },
  // manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
