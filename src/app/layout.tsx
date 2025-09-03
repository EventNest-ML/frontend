import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
      <body className={`antialiased`}>
        <main>{children}</main>
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
