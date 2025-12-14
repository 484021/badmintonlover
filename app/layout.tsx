import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { AuthProvider } from "@/components/auth-provider"
import Script from "next/script"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://badmintonlover.com'),
  title: {
    default: "BadmintonLover - The Authority on Badminton",
    template: "%s | BadmintonLover"
  },
  description: "Expert badminton technique, strategy, drills, and equipment guides. Trusted by players worldwide.",
  keywords: ["badminton", "badminton training", "badminton technique", "badminton strategy", "badminton drills", "badminton equipment", "badminton rackets", "badminton tips", "badminton tutorial", "learn badminton"],
  authors: [{ name: "BadmintonLover Team" }],
  creator: "BadmintonLover",
  publisher: "BadmintonLover",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://badmintonlover.com",
    siteName: "BadmintonLover",
    title: "BadmintonLover - The Authority on Badminton",
    description: "Expert badminton technique, strategy, drills, and equipment guides. Trusted by players worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BadmintonLover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BadmintonLover - The Authority on Badminton",
    description: "Expert badminton technique, strategy, drills, and equipment guides.",
    creator: "@badmintonlover",
    images: ["/og-image.jpg"],
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
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <SiteNavigation />
          {children}
          <SiteFooter />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
