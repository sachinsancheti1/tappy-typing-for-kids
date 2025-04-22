export interface Section {
  budget?: string
  title?: string
  instruction?: string
  content?: string[] | string[][] | any[]
  contentType?: "grid" | "rows" | "paragraphs"
  columns?: number
  type?: string
  note?: string
}

export interface Tips {
  title: string
  items: string[]
}

export interface PageData {
  id: number
  pageNumber?: number
  title?: string
  subtitle?: string
  image?: string
  imageAlt?: string
  introduction?: string
  sections?: Section[]
  tips?: Tips
}
