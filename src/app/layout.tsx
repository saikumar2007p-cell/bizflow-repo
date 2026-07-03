import type { Metadata } from "next";
import { BranchProvider } from "@/context/BranchContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "BizFlow AI - SME Business Operating System",
  description: "Replace notebooks, WhatsApp, Excel sheets, and manual operations with one intelligent AI-powered platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth dark">
      <body className="min-h-full bg-background-app text-white antialiased">
        <BranchProvider>
          {children}
        </BranchProvider>
      </body>
    </html>
  );
}
