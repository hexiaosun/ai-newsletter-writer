import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "NewsLetterCraft — AI-Powered Newsletters in Seconds",
  description:
    "Turn your bullet points into beautiful, engaging newsletters. Powered by AI.",
  keywords: ["newsletter", "AI", "writing", "content creation", "email marketing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-white text-gray-900 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
