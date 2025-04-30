// Types for progress tracking
export interface TypingResult {
  date: string
  exercise: string
  wpm: number
  accuracy: number
  pageNumber: number
}

// Local storage key
const PROGRESS_KEY = "typing_progress"

// Save a typing result
export function saveTypingResult(
  result: Omit<TypingResult, "date">
): TypingResult {
  const newResult = {
    ...result,
    date: new Date().toISOString(),
  }

  const existingResults = getTypingResults()
  const updatedResults = [...existingResults, newResult]

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedResults))

  return newResult
}

// Get all typing results
export function getTypingResults(): TypingResult[] {
  if (typeof window === "undefined") return []

  const storedResults = localStorage.getItem(PROGRESS_KEY)
  if (!storedResults) return []

  try {
    return JSON.parse(storedResults)
  } catch (error) {
    console.error("Error parsing typing results:", error)
    return []
  }
}

// Get average WPM
export function getAverageWpm(): number {
  const results = getTypingResults()
  if (results.length === 0) return 0

  const sum = results.reduce((total, result) => total + result.wpm, 0)
  return Math.round(sum / results.length)
}

// Get average accuracy
export function getAverageAccuracy(): number {
  const results = getTypingResults()
  if (results.length === 0) return 0

  const sum = results.reduce((total, result) => total + result.accuracy, 0)
  return Math.round(sum / results.length)
}

// Get progress by page
export function getProgressByPage(): Record<
  number,
  { completed: number; total: number }
> {
  const results = getTypingResults()
  const progressByPage: Record<number, { completed: number; total: number }> =
    {}

  // Count completed exercises by page
  results.forEach((result) => {
    if (!progressByPage[result.pageNumber]) {
      progressByPage[result.pageNumber] = { completed: 0, total: 0 }
    }
    progressByPage[result.pageNumber].completed += 1
  })

  return progressByPage
}

// Clear all progress
export function clearProgress(): void {
  localStorage.removeItem(PROGRESS_KEY)
}
