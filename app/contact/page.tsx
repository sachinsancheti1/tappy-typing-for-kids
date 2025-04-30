// app/page.tsx
export const dynamic = "force-static" // ensures this page is prerendered at build time

import { headers } from "next/headers"
import Link from "next/link"
import type { Metadata } from "next"
import ContactForm from "./ContactForm" // see next section

export const metadata: Metadata = {
  title: "Contact Us – Typing for Kids",
  description: "Get in touch with the Typing for Kids team",
}

interface PageProps {
  searchParams: { success?: string }
}

export default function ContactPage({ searchParams }: PageProps) {
  const isSuccess = searchParams.success === "true"

  // Get domain on the server
  const h = headers()
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "tappytyping.com"
  const domain = host.split(":")[0]

  return (
    <main className="min-h-screen bg-orange-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <Link
          href="/"
          className="text-orange-500 hover:underline mb-8 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-orange-500 mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ————— Left column: Intro & Social ————— */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">
                We’d Love to Hear From You
              </h2>
              <p className="mb-4">
                Have questions about our typing lessons? Want to share feedback
                or suggestions? Use the form to get in touch.
              </p>
              <p>
                Our team is dedicated to helping children learn typing skills in
                a fun and engaging way.
              </p>
            </div>
          </div>

          {/* ————— Right column: Form or Thank-You ————— */}
          {isSuccess ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-orange-500 mb-4">
                Thanks for reaching out!
              </h2>
              <p className="text-gray-700">
                We’ve received your message and will get back to you shortly.
              </p>
            </div>
          ) : (
            <ContactForm domain={domain} />
          )}
        </div>
      </div>
    </main>
  )
}
