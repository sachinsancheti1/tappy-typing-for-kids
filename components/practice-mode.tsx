"use client"

import { useState, useRef, useEffect } from "react"
import { TypingPractice, type TypingPracticeRef } from "./typing-practice"
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
  const [isAllCompleted, setIsAllCompleted] = useState(false)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const typingPracticeRef = useRef<TypingPracticeRef | null>(null)

  // Convert content to array if it's a string
  const textArray = Array.isArray(content) ? content : [content]

  const currentText = textArray[currentTextIndex]
  const isLastText = currentTextIndex === textArray.length - 1

  // Handle keyboard shortcuts for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+N for next exercise
      if (e.altKey && e.key === "n" && !isLastText) {
        e.preventDefault()
        handleNext()
      }

      // Alt+Q to close practice mode
      if (e.altKey && e.key === "q") {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isLastText, onClose])

  // Focus the input when changing to a new exercise
  useEffect(() => {
    if (typingPracticeRef.current) {
      typingPracticeRef.current.reset()
      typingPracticeRef.current.focus()
    }
  }, [currentTextIndex])

  const handleComplete = (accuracy: number, wpm: number) => {
    // Prevent multiple calls during auto-advance
    if (isAdvancing) return

    setIsAdvancing(true)

    // Save result to local storage
    saveTypingResult({
      exercise: `${exerciseTitle} - ${currentTextIndex + 1}`,
      wpm,
      accuracy,
      pageNumber,
    })

    // Add to results
    const newResults = [...results, { accuracy, wpm }]
    setResults(newResults)

    // Auto-advance to next exercise after a short delay
    setTimeout(() => {
      if (currentTextIndex < textArray.length - 1) {
        setCurrentTextIndex(currentTextIndex + 1)
      } else {
        setIsAllCompleted(true)
      }
      setIsAdvancing(false)
    }, 1500) // 1.5 second delay before advancing
  }

  const handleNext = () => {
    if (currentTextIndex < textArray.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1)
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
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Shortcuts: Esc (Reset), Alt+N (Next), Alt+Q (Quit)
              </span>
              <Button variant="ghost" onClick={onClose} title="Close (Alt+Q)">
                Close
              </Button>
            </div>
          </div>

          <TypingPractice
            text={currentText}
            onComplete={handleComplete}
            ref={typingPracticeRef}
            autoAdvance={!isLastText}
          />

          {/* Only show statistics when all exercises are completed */}
          {isAllCompleted && results.length > 0 && (
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Exercise Completed!</h3>
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

          {/* Only show the next button if not auto-advancing or if it's the last exercise */}
          {(isLastText || isAllCompleted) && (
            <div className="mt-6 flex justify-end">
              <Button
                onClick={isLastText ? onClose : handleNext}
                className="bg-purple-600 hover:bg-purple-700"
                title={
                  isLastText
                    ? "Finish Practice (Alt+Q)"
                    : "Next Exercise (Alt+N)"
                }
              >
                {isLastText ? "Finish Practice" : "Next Exercise"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
