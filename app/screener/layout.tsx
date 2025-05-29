import type React from "react";
export default function ScreenerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen grid-cols-1 gap-6 bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:grid-cols-12 md:p-8">
      {children}
    </main>
  );
}
