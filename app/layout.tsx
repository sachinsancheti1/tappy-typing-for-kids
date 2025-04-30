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
  const headersList = await headers()
  const rawHost =
    // try x-forwarded-host first (when behind a proxy)
    headersList.get('x-forwarded-host')
      // fall back to the standard Host header
      ?? headersList.get('host')
      // final fallback for static exports
      ?? 'tappytyping.com'

  // strip off any :port
  const hostname = rawHost.split(':')[0]

  // use http in dev, https everywhere else
  const protocol = process.env.NODE_ENV === 'development' ? 'http:' : 'https:'

  const baseUrl = `${protocol}//${hostname}`

  // detect your “primary” vs “alternate” domains
  const isPrimary = hostname === 'tappytyping.com'
  const primaryDomain   = isPrimary ? baseUrl : 'https://tappytyping.com'
  const alternateDomain = isPrimary ? 'https://learntyping.fun' : baseUrl

  return {
    title: "Typing for Kids - Interactive Typing Book",
    description:
      "An interactive typing book experience optimized for iPad, helping children learn to type with fun exercises",
    keywords: "typing for kids, learn typing, typing exercises, children typing, typing practice, typing book",
    authors: [{ name: "Typing for Kids Team" }],
    creator: "Typing for Kids Team",
    publisher: "Typing for Kids",
    metadataBase: new URL(primaryDomain),
    alternates: {
      canonical: "/",
      languages: {
        "x-default": `${alternateDomain}`,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: primaryDomain,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="light"                   // <-- match the server’s defaultTheme
      style={{ colorScheme: "light" }}    // <-- match next-themes’ inline style
      suppressHydrationWarning             // <-- optional, silences any stray warnings
    >
      <head>
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"             // <-- ensure SSR uses “light” always
          enableSystem
        >
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
