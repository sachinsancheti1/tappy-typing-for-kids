"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all")
    setShowConsent(false)
    // Enable all cookies and tracking
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: "cookie_consent_all" })
  }

  const acceptEssential = () => {
    localStorage.setItem("cookieConsent", "essential")
    setShowConsent(false)
    // Disable non-essential tracking
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: "cookie_consent_essential" })
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex-1 pr-4 mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Cookie Consent</h3>
          <p className="text-sm text-gray-600">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
            traffic. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
            <Link href="/privacy-policy" className="text-orange-500 hover:underline">
              Privacy Policy
            </Link>{" "}
            to learn more.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={acceptEssential}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={() => setShowConsent(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close cookie consent banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
