import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventNest – Plan and Organize Events Effortlessly",
  description:
    "EventNest is a collaborative event planning platform that helps you and your team organize birthdays, weddings, trips, and more — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
