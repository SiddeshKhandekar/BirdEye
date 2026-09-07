import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BirdEye — Safer Streets, Stronger Communities",
  description:
    "Map-first civic issue reporting platform for smart cities. Report infrastructure issues, track progress, and build stronger communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased bg-[#F7F8F5] text-[#293B46] overflow-hidden">{children}</body>
    </html>
  );
}
