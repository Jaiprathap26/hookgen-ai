import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HookGen.ai — Generate 25 Viral UGC Hooks in 30 Seconds",
  description:
    "Generate 25 viral UGC hooks + 3 full ad scripts for any product in 30 seconds. Stop writing ad copy, start testing it.",
  openGraph: {
    title: "HookGen.ai — 50 Viral UGC Hooks in 30 Seconds",
    description:
      "Generate 25 viral hooks + 3 full UGC scripts + 10 ad headlines for any product in seconds.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "HookGen.ai",
    description: "Generate viral UGC hooks & ad scripts with AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
