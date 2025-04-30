"use client"

import { useState, useEffect } from "react"
import {
  getTypingResults,
  getAverageWpm,
  getAverageAccuracy,
  clearProgress,
} from "@/lib/progress"
import type { TypingResult } from "@/lib/progress"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function ProgressDashboard() {
  const [results, setResults] = useState<TypingResult[]>([])
  const [averageWpm, setAverageWpm] = useState(0)
  const [averageAccuracy, setAverageAccuracy] = useState(0)

  // Load progress data
  const loadProgressData = () => {
    const typingResults = getTypingResults()
    setResults(typingResults)
    setAverageWpm(getAverageWpm())
    setAverageAccuracy(getAverageAccuracy())
  }

  useEffect(() => {
    loadProgressData()
  }, [])

  // Handle clearing progress
  const handleClearProgress = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all your typing progress? This cannot be undone."
      )
    ) {
      clearProgress()
      loadProgressData()
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">
        Your Typing Progress
      </h2>

      {results.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-orange-700 mb-2">
                Exercises Completed
              </h3>
              <p className="text-3xl font-bold text-orange-500">
                {results.length}
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-orange-700 mb-2">
                Average WPM
              </h3>
              <p className="text-3xl font-bold text-orange-500">{averageWpm}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-orange-700 mb-2">
                Average Accuracy
              </h3>
              <p className="text-3xl font-bold text-orange-500">
                {averageAccuracy}%
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-purple-600 mb-4">
            Recent Practice Sessions
          </h3>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Exercise</TableHead>
                  <TableHead>WPM</TableHead>
                  <TableHead>Accuracy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results
                  .slice()
                  .reverse()
                  .slice(0, 10)
                  .map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(result.date)}</TableCell>
                      <TableCell>{result.pageNumber}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {result.exercise}
                      </TableCell>
                      <TableCell>{result.wpm}</TableCell>
                      <TableCell>{result.accuracy}%</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleClearProgress}
              variant="outline"
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              Clear All Progress
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600 mb-4">
            You haven't completed any typing exercises yet.
          </p>
          <p className="text-gray-600">
            Start practicing to see your progress here!
          </p>
        </div>
      )}
    </div>
  )
}
