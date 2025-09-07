import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { RouteGuard } from "@/components/custom-ui/RouteGaurd";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <body className={`antialiased ${plusJakarta.className}`}>
        <main>
          <RouteGuard type="auth">{children}</RouteGuard>
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
