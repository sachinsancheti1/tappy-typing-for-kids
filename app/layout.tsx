import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Analytics } from "@/components/analytics"
import { CookieConsent } from "@/components/cookie-consent"
import { SchemaMarkup } from "@/components/schema-markup"
import { Suspense } from "react"
import { headers } from "next/headers"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  // Get the hostname from the request headers
  const headersList = headers()
  const host = headersList.get("host") || "tappytyping.com"

  // Determine which domain is being accessed
  const isPrimaryDomain = host.includes("tappytyping.com")
  const canonicalDomain = isPrimaryDomain ? "https://tappytyping.com" : "https://learntyping.fun"
  const alternateDomain = isPrimaryDomain ? "https://learntyping.fun" : "https://tappytyping.com"

  return {
    title: "Typing for Kids - Interactive Typing Book",
    description:
      "An interactive typing book experience optimized for iPad, helping children learn to type with fun exercises",
    keywords: "typing for kids, learn typing, typing exercises, children typing, typing practice, typing book",
    authors: [{ name: "Typing for Kids Team" }],
    creator: "Typing for Kids Team",
    publisher: "Typing for Kids",
    metadataBase: new URL(canonicalDomain),
    alternates: {
      canonical: "/",
      languages: {
        "x-default": `${canonicalDomain}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalDomain,
      title: "Typing for Kids - Interactive Typing Book",
      description:
        "An interactive typing book experience optimized for iPad, helping children learn to type with fun exercises",
      siteName: "Typing for Kids",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Typing for Kids - Interactive Typing Book",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Typing for Kids - Interactive Typing Book",
      description:
        "An interactive typing book experience optimized for iPad, helping children learn to type with fun exercises",
      images: ["/images/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code", // Replace with your actual verification code
    },
    other: {
      "link-rel-alternate": alternateDomain,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Suspense>
            {children}
            <CookieConsent />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
