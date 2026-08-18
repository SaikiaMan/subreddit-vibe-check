import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Subreddit Vibe Check",
  description: "Analyze the sentiment of hot Reddit posts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}