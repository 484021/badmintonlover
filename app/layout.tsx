import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://badmintonlover.com'),
  title: {
    default: "Best Badminton Racket for Beginners 2025 - BadmintonLover Deals & Reviews",
    template: "%s | BadmintonLover"
  },
  description: "Find the perfect badminton racket for beginners. Get expert reviews, buying guides, and exclusive deals on beginner-friendly rackets. Join 1000+ players improving their game!",
  keywords: ["badminton racket for beginners", "best badminton racket for beginners", "beginner badminton racket", "badminton racket buying guide", "cheap badminton rackets", "beginner badminton equipment"],
  authors: [{ name: "BadmintonLover" }],
  creator: "BadmintonLover",
  publisher: "BadmintonLover",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://badmintonlover.com",
    title: "BadmintonLover - Best Badminton Deals, News & Tips",
    description: "Get exclusive badminton deals, equipment reviews, training tips, and tournament news delivered to your inbox.",
    siteName: "BadmintonLover",
  },
  twitter: {
    card: "summary_large_image",
    title: "BadmintonLover - Best Badminton Deals, News & Tips",
    description: "Join 1000+ badminton enthusiasts getting exclusive deals and tips!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
