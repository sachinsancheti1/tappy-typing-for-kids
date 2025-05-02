"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getAllPageSlugs } from "@/lib/data"

export default function Home() {
  const router = useRouter()
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    // Get all page slugs and redirect to the first page
    const slugs = getAllPageSlugs()
    setTotalPages(slugs.length)

    // Check if we have progress data to determine the last page visited
    if (typeof window !== "undefined") {
      try {
        const progressData = localStorage.getItem("typing_progress")
        if (progressData) {
          const results = JSON.parse(progressData)
          if (results.length > 0) {
            // Find the most recent page visited
            const sortedResults = [...results].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            const lastPageVisited = sortedResults[0].pageNumber
            router.push(`/page/${lastPageVisited}`)
            return
          }
        }
      } catch (error) {
        console.error("Error reading progress data:", error)
      }
    }

    // Default to first page if no progress data
    router.push(`/page/1`)
  }, [router])

  return (
    <main className="h-screen w-screen flex flex-col bg-orange-100 overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-orange-400 text-white">
        <div className="flex items-center gap-2">
          <Image
            src="/images/tappy-icon.jpg"
            alt="Tappy the Typing Cat"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">Typing for Kids</h1>
        </div>
        <div className="text-lg font-semibold">Loading...</div>
      </header>

      {/* Loading State */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-2xl font-bold text-orange-500">
          Loading typing book...
        </div>
      </div>
    </main>
  )
}
