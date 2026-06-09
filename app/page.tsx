"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getLastPage } from "@/lib/progress"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const lastPage = getLastPage()
    router.push(`/page/${lastPage ?? 1}`)
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
