// app/page.tsx

export const dynamic = 'force-static';

import { headers } from "next/headers"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us – Typing for Kids",
  description: "Get in touch with the Typing for Kids team",
}

interface PageProps {
  searchParams: { success?: string }
}

export default function ContactPage({ searchParams }: PageProps) {
  const isSuccess = searchParams.success === "true"

  // Grab host → domain on the server
  const h = headers()
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "tappytyping.com"
  const domain = host.split(":")[0]

  return (
    <main className="min-h-screen bg-orange-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <Link href="/" className="text-orange-500 hover:underline mb-8 inline-block">
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
                Have questions about our typing lessons? Want to share feedback or
                suggestions? Use the form to get in touch.
              </p>
              <p>
                Our team is dedicated to helping children learn typing skills in a
                fun and engaging way.
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
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="?success=true"
              className="bg-white p-6 rounded-lg shadow-md space-y-4"
            >
              {/* Netlify magic inputs */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="domain" value={domain} />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human: <input name="bot-field" />
                </label>
              </p>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-200"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-200"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-200"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
