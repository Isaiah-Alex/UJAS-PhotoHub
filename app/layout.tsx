import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UJAS PhotoHub",
  description: "Discover, book, and showcase photography excellence",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
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
