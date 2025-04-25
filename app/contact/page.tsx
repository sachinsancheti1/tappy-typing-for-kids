// app/page.tsx
"use client"

import React, { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { Send } from "lucide-react"

export default function ContactPage() {
  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const domain = typeof window !== "undefined" ? window.location.hostname : ""

  // handler: input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((f) => ({ ...f, [name]: value }))
  }

  // handler: form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")

    const body = new URLSearchParams({
      "form-name": "contact",
      domain,
      ...formData,
    }).toString()

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      })
      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  // auto‐clear the URL params if necessary
  useEffect(() => {
    if (status === "success" && window.history.replaceState) {
      window.history.replaceState({}, "", window.location.pathname)
    }
  }, [status])

  return (
    <>
      {/* Head section for SEO & Social */}
      <Head>
        <title>Contact Us – Typing for Kids</title>
        <meta name="description" content="Get in touch with the Typing for Kids team" />
        <meta name="keywords" content="typing for kids, contact, feedback, support" />
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us – Typing for Kids" />
        <meta property="og:description" content="Get in touch with the Typing for Kids team" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${domain}/contact`} />
        <meta property="og:image" content="https://typingforkids.com/images/og-image.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us – Typing for Kids" />
        <meta name="twitter:description" content="Get in touch with the Typing for Kids team" />
      </Head>

      <main className="min-h-screen bg-orange-50">
        <div className="max-w-4xl mx-auto p-6 py-12">
          <Link href="/" className="text-orange-500 hover:underline mb-8 inline-block">
            &larr; Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-orange-500 mb-8">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column: info & social */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">
                  We’d Love to Hear From You
                </h2>
                <p className="mb-4">
                  Have questions about our typing lessons? Want to share feedback or suggestions? Use the form to get in touch.
                </p>
                <p>
                  Our team is dedicated to helping children learn typing skills in a fun and engaging way.
                </p>
              </div>
            </div>

            {/* Right column: Netlify‐friendly form */}
            {status === "success" ? (
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
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md space-y-4"
              >
                {/* Netlify hidden fields */}
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
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-200"
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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-200"
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
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-200"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </button>

                {status === "error" && (
                  <p className="text-red-600 text-sm mt-2">
                    Oops! Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
