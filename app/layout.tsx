import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevFeedback Board",
  description: "A feedback board for sharing and tracking ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
