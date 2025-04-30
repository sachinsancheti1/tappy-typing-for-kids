"use client"

import { useState, useRef } from "react"
import { TypingPractice } from "./typing-practice"
import { Button } from "@/components/ui/button"
import { saveTypingResult } from "@/lib/progress"

interface PracticeModeProps {
  content: string | string[]
  onClose: () => void
  pageNumber: number
  exerciseTitle: string
}

export function PracticeMode({
  content,
  onClose,
  pageNumber,
  exerciseTitle,
}: PracticeModeProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [results, setResults] = useState<
    Array<{ accuracy: number; wpm: number }>
  >([])
  const typingPracticeRef = useRef<{ reset: () => void } | null>(null)

  // Convert content to array if it's a string
  const textArray = Array.isArray(content) ? content : [content]

  const currentText = textArray[currentTextIndex]
  const isLastText = currentTextIndex === textArray.length - 1

  const handleComplete = (accuracy: number, wpm: number) => {
    // Save result to local storage
    saveTypingResult({
      exercise: `${exerciseTitle} - ${currentTextIndex + 1}`,
      wpm,
      accuracy,
      pageNumber,
    })

    setResults([...results, { accuracy, wpm }])
  }

  const handleNext = () => {
    if (currentTextIndex < textArray.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1)
      // Reset the typing practice component
      if (typingPracticeRef.current) {
        setTimeout(() => {
          typingPracticeRef.current?.reset()
        }, 0)
      }
    } else {
      onClose()
    }
  }

  const averageWpm = results.length
    ? Math.round(
        results.reduce((sum, result) => sum + result.wpm, 0) / results.length
      )
    : 0

  const averageAccuracy = results.length
    ? Math.round(
        results.reduce((sum, result) => sum + result.accuracy, 0) /
          results.length
      )
    : 0

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-500">
              Practice Mode {currentTextIndex + 1}/{textArray.length}
            </h2>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>

          <TypingPractice
            text={currentText}
            onComplete={handleComplete}
            ref={typingPracticeRef}
          />

          {results.length > 0 && (
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Your Progress</h3>
              <div className="flex gap-6">
                <div>
                  <span className="font-semibold">Average WPM:</span>{" "}
                  {averageWpm}
                </div>
                <div>
                  <span className="font-semibold">Average Accuracy:</span>{" "}
                  {averageAccuracy}%
                </div>
                <div>
                  <span className="font-semibold">Exercises Completed:</span>{" "}
                  {results.length}/{textArray.length}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLastText ? "Finish Practice" : "Next Exercise"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
