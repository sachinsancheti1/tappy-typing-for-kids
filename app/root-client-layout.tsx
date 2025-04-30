"use client"

import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { CookieConsent } from "@/components/cookie-consent"
import { SchemaMarkup } from "@/components/schema-markup"
import { Suspense } from "react"
import { useEffect } from "react"
import { registerServiceWorker } from "@/lib/service-worker"

const inter = Inter({ subsets: ["latin"] })

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return (
    <html
      lang="en"
      className="light" // <-- match the server’s defaultTheme
      style={{ colorScheme: "light" }} // <-- match next-themes’ inline style
      suppressHydrationWarning // <-- optional, silences any stray warnings
    >
      <head>
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // <-- ensure SSR uses “light” always
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
