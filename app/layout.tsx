import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammed-alosaimi.pages.dev"),
  title: "Mohammed Saad Nayaf Al-Osaimi | Business Development & Corporate Communication",
  description:
    "Professional portfolio of Mohammed Saad Nayaf Al-Osaimi: business development, marketing, corporate communication, training programs, design work, experience, and recommendations.",
  keywords: [
    "Mohammed Saad Nayaf Al-Osaimi",
    "Mohammed Al-Osaimi",
    "Business Development",
    "Marketing",
    "Corporate Communication",
    "B2B",
    "CRM",
  ],
  authors: [{ name: "Mohammed Saad Nayaf Al-Osaimi" }],
  openGraph: {
    title: "Mohammed Saad Nayaf Al-Osaimi | Business Development & Corporate Communication",
    description:
      "Business development, marketing, corporate communication, training programs, design work, and professional experience.",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Saad Nayaf Al-Osaimi",
    description: "Business Development · Marketing · Corporate Communication",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mohammed Saad Nayaf Al-Osaimi" }],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
