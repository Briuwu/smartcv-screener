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
  authors: [
    { name: "Brian Millonte (briuwu)", url: "https://www.smartcv.vercel.app" },
  ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-slate-50 via-white to-slate-100 antialiased`}
      >
        <main className="relative">{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
