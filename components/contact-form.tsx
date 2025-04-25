"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Add domain information to form submission
    const domain = window.location.hostname
    const dataWithDomain = {
      ...formData,
      domain,
      form_name: "contact", // Helps identify which form was submitted
    }

    try {
      // Using Netlify's form handling
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...dataWithDomain,
        }).toString(),
      })

      if (response.ok) {
        setFormStatus("success")
        setFormData({ name: "", email: "", message: "" })

        // Track form submission in analytics
        if (window.gtag) {
          window.gtag("event", "form_submission", {
            event_category: "Contact",
            event_label: "Contact Form",
            domain: domain,
          })
        }
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      setFormStatus("error")
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Contact Us</h2>

      {formStatus === "success" ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Thank you for your message! We'll get back to you soon.</p>
        </div>
      ) : formStatus === "error" ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>There was an error submitting your message. Please try again.</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} data-netlify="true" name="contact" method="POST" className="space-y-4">
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="domain" value={typeof window !== "undefined" ? window.location.hostname : ""} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          disabled={formStatus === "submitting"}
          className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-70"
        >
          {formStatus === "submitting" ? "Sending..." : "Send Message"}
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
