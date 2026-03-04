import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Terminal ─ DPinto9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <body className={`${mono.className} bg-gray-950`}>{children}</body>
    </html>
  );
}
