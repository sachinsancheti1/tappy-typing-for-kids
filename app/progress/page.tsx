"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ProgressDashboard } from "@/components/progress-dashboard"
import Head from "next/head"

export default function ProgressPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Head>
        <title>Your Typing Progress - Typing for Kids</title>
        <meta
          name="description"
          content="Track your typing speed, accuracy, and progress over time with our interactive typing progress dashboard."
        />
        <meta
          name="keywords"
          content="typing progress, typing speed, typing accuracy, typing for kids, typing practice"
        />
        <meta
          property="og:title"
          content="Your Typing Progress - Typing for Kids"
        />
        <meta
          property="og:description"
          content="Track your typing speed, accuracy, and progress over time with our interactive typing progress dashboard."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Your Typing Progress - Typing for Kids"
        />
        <meta
          name="twitter:description"
          content="Track your typing speed, accuracy, and progress over time with our interactive typing progress dashboard."
        />
      </Head>
      <main className="min-h-screen bg-orange-50">
        <header className="flex justify-between items-center p-4 bg-orange-400 text-white">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/images/tappy-icon.png"
                alt="Tappy the Typing Cat"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <h1 className="text-2xl font-bold">Typing for Kids</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white hover:underline">
              Back to Book
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6 py-12">
          <h1 className="text-4xl font-bold text-orange-500 mb-8">
            Your Typing Progress
          </h1>

          {isClient ? (
            <ProgressDashboard />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p>Loading progress data...</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
