import type { PageData } from "@/types/page"
import pageData from "@/data/pages.json"

export function getAllPageSlugs(): string[] {
  return pageData.map((page) => page.id.toString())
}

export function getPageData(pageId: number): PageData | null {
  return pageData.find((page) => page.id === pageId) || null
}
