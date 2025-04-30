"use client"

import type React from "react"

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react"
import { cn } from "@/lib/utils"

interface TypingPracticeProps {
  text: string
  onComplete?: (accuracy: number, wpm: number) => void
}

export type TypingPracticeRef = {
  reset: () => void
}

export const TypingPractice = forwardRef<
  TypingPracticeRef,
  TypingPracticeProps
>(({ text, onComplete }, ref) => {
  const [input, setInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [errors, setErrors] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Expose the reset method to parent components
  useImperativeHandle(ref, () => ({
    reset: () => {
      setInput("")
      setStartTime(null)
      setEndTime(null)
      setCurrentIndex(0)
      setErrors(0)
      setIsCompleted(false)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
  }))

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Start timer on first keystroke
    if (!startTime && value.length > 0) {
      setStartTime(Date.now())
    }

    // Check if the current character is correct
    if (
      value.length > 0 &&
      value[value.length - 1] !== text[value.length - 1]
    ) {
      setErrors(errors + 1)
    }

    // Update current position in text
    setCurrentIndex(value.length)

    // Check if typing is complete
    if (value.length === text.length) {
      setEndTime(Date.now())
      setIsCompleted(true)

      // Calculate metrics
      const timeInMinutes = (Date.now() - (startTime || Date.now())) / 60000
      const wordsTyped = text.split(" ").length
      const wpm = Math.round(wordsTyped / timeInMinutes)
      const accuracy = Math.max(
        0,
        Math.round(100 - (errors / text.length) * 100)
      )

      if (onComplete) {
        onComplete(accuracy, wpm)
      }
    }

    setInput(value)
  }

  // Reset the practice
  const resetPractice = () => {
    setInput("")
    setStartTime(null)
    setEndTime(null)
    setCurrentIndex(0)
    setErrors(0)
    setIsCompleted(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Calculate metrics for display
  const calculateMetrics = () => {
    if (!startTime) return { wpm: 0, accuracy: 100 }

    const timeInMinutes = ((endTime || Date.now()) - startTime) / 60000
    const wordsTyped = input.split(" ").length
    const wpm = Math.round(wordsTyped / timeInMinutes) || 0
    const accuracy = Math.max(
      0,
      Math.round(100 - (errors / Math.max(1, input.length)) * 100)
    )

    return { wpm, accuracy }
  }

  const { wpm, accuracy } = calculateMetrics()

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6 font-mono text-lg bg-gray-50 p-4 rounded-lg">
        {text.split("").map((char, index) => {
          let className = ""

          if (index < input.length) {
            // Character has been typed
            className =
              input[index] === char
                ? "text-green-600"
                : "text-red-600 bg-red-100"
          } else if (index === currentIndex) {
            // Current character to type
            className = "bg-yellow-200"
          }

          return (
            <span key={index} className={className}>
              {char === " " ? "\u00A0" : char}
            </span>
          )
        })}
      </div>

      <div className="mb-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={isCompleted}
          className={cn(
            "w-full p-3 border rounded-md font-mono",
            isCompleted ? "bg-gray-100" : "bg-white"
          )}
          placeholder="Start typing here..."
          aria-label="Typing practice input"
        />
      </div>

      <div className="flex justify-between items-center" aria-live="polite">
        <div className="flex gap-4">
          <div className="text-sm">
            <span className="font-bold">WPM:</span>{" "}
            <span aria-label="Words per minute">{wpm}</span>
          </div>
          <div className="text-sm">
            <span className="font-bold">Accuracy:</span>{" "}
            <span aria-label="Accuracy percentage">{accuracy}%</span>
          </div>
          <div className="text-sm">
            <span className="font-bold">Progress:</span>{" "}
            <span aria-label="Progress percentage">
              {Math.round((currentIndex / text.length) * 100)}%
            </span>
          </div>
        </div>

        <button
          onClick={resetPractice}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          aria-label="Reset typing practice"
        >
          Reset
        </button>
      </div>

      {isCompleted && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-bold text-green-800">Practice Complete!</h3>
          <p className="text-green-700">
            You typed at {wpm} WPM with {accuracy}% accuracy.
          </p>
        </div>
      )}
    </div>
  )
})

TypingPractice.displayName = "TypingPractice"
