"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Decorative } from "@/components/ui/decorative"
import { Keyboard } from "@/components/ui/keyboard"
import { use } from "react"
import { getAllPageSlugs, getPageData } from "@/lib/data"
import type { PageData } from "@/types/page"
import Link from "next/link"

interface PageProps {
  params: Promise<{ page: string }>
}

export default function Page({ params }: PageProps) {
  // this hook unwraps the Promise for us
  const { page: pageStr } = use(params)
  const currentPage      = parseInt(pageStr, 10)

  const [pageData, setPageData]   = useState<PageData | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading]     = useState(true)
  const router = useRouter()

  useEffect(() => {
    const slugs = getAllPageSlugs()
    setTotalPages(slugs.length)

    const data = getPageData(currentPage)
    setPageData(data)
    setLoading(false)
  }, [currentPage])

  const nextPage = () => {
    if (currentPage < totalPages) {
      router.push(`/page/${currentPage + 1}`)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      router.push(`/page/${currentPage - 1}`)
    }
  }

  const goToPage = (pageNumber: number) => {
    router.push(`/page/${pageNumber}`)
  }

  if (loading || !pageData) {
    return (
      <main className="h-screen w-screen flex flex-col bg-orange-100 overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-orange-400 text-white">
          <div className="flex items-center gap-2">
            <Image
              src="/images/tappy-icon.png"
              alt="Tappy the Typing Cat"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">Typing for Kids</h1>
          </div>
          <div className="text-lg font-semibold">Loading...</div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-2xl font-bold text-orange-500">Loading page...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen w-screen flex flex-col bg-orange-100 overflow-hidden">
      {/* Header */}
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
          <div className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </div>
          <div className="hidden md:flex gap-2">
            <Link href="/privacy-policy" className="text-sm text-white/80 hover:text-white">
              Privacy
            </Link>
            <span className="text-white/60">|</span>
            <Link href="/colophon" className="text-sm text-white/80 hover:text-white">
              Colophon
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-full h-full flex flex-col p-8 bg-white overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full">
              <Decorative position="top" />

              <div className="my-6">
                {pageData.pageNumber && (
                  <div className="flex justify-end items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
                      {pageData.pageNumber}
                    </div>
                  </div>
                )}

                {pageData.title && (
                  <h1 className="text-4xl font-bold text-orange-500 mb-4 text-center">{pageData.title}</h1>
                )}

                {pageData.subtitle && (
                  <h2 className="text-2xl font-semibold text-purple-600 text-center mb-8">{pageData.subtitle}</h2>
                )}

                {pageData.image && (
                  <div className="my-8 flex justify-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 bg-orange-400 rounded-full opacity-20"></div>
                      <img
                        src={pageData.image || "/placeholder.svg"}
                        alt={pageData.imageAlt || ""}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {pageData.introduction && (
                  <p className="text-lg text-gray-700 mt-4 text-center mb-8">{pageData.introduction}</p>
                )}

                {pageData.sections &&
                  pageData.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      {section.budget && (
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-bold text-purple-600">{section.budget}</h2>
                        </div>
                      )}

                      {section.title && <h3 className="text-xl font-bold text-orange-500 mb-4">{section.title}</h3>}

                      {section.instruction && <p className="mb-4 font-semibold text-gray-700">{section.instruction}</p>}

                      {section.content && (
                        <div className="bg-gray-50 p-4 rounded-lg font-mono text-lg">
                          {section.contentType === "grid" && (
                            <div className={`grid grid-cols-${section.columns || 3} gap-4`}>
                              {section.content.map((item, i) => (
                                <span key={i}>{item}</span>
                              ))}
                            </div>
                          )}

                          {section.contentType === "rows" && (
                            <div className="space-y-2">
                              {section.content.map((item, i) => (
                                <div key={i} className="flex justify-center space-x-8 mb-2">
                                  {Array.isArray(item) ? (
                                    item.map((subItem, j) => <span key={j}>{subItem}</span>)
                                  ) : (
                                    <span>{item}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {section.contentType === "paragraphs" && (
                            <div className="space-y-3">
                              {section.content.map((item, i) => (
                                <p key={i}>{item}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {section.type === "keyboard" && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Keyboard />
                          {section.note && <p className="mt-4 text-sm text-gray-600 italic">{section.note}</p>}
                        </div>
                      )}
                    </div>
                  ))}

                {pageData.tips && (
                  <div className="mt-8 p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <h3 className="text-xl font-bold text-purple-600 mb-4">{pageData.tips.title}</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      {pageData.tips.items.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              <Decorative position="bottom" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center p-4 bg-purple-600 text-white">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
        >
          <ChevronLeft size={24} />
          <span>Previous</span>
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentPage === index + 1 ? "bg-white text-purple-600" : "bg-purple-700 text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
        >
          <span>Next</span>
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Footer for mobile */}
      <div className="md:hidden flex justify-center items-center p-2 bg-orange-400 text-white text-xs">
        <Link href="/privacy-policy" className="mx-2 hover:underline">
          Privacy Policy
        </Link>
        <span>|</span>
        <Link href="/colophon" className="mx-2 hover:underline">
          Colophon
        </Link>
      </div>
    </main>
  )
}
