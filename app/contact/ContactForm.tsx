// app/ContactForm.tsx
'use client'

import React, { FormEvent, useState } from 'react'
import { Send } from 'lucide-react'

interface Props {
  domain: string
}

export default function ContactForm({ domain }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    formData.set('form-name', 'contact')
    formData.set('bot-field', '')
    formData.set('domain', domain)

    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })
      if (res.ok) {
        setStatus('success')
        e.currentTarget.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">
          Thanks for reaching out!
        </h2>
        <p className="text-gray-700">We’ll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      <label className="block">
        <span className="text-sm font-medium">Name</span>
        <input
          name="name"
          type="text"
          required
          className="w-full border px-3 py-2 rounded"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Email</span>
        <input
          name="email"
          type="email"
          required
          className="w-full border px-3 py-2 rounded"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Message</span>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'} <Send size={16} />
      </button>

      {status === 'error' && (
        <p className="text-red-600 text-sm">Oops! Please try again.</p>
      )}
    </form>
  )
}
