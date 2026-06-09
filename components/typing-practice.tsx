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
  autoAdvance?: boolean
  autoAdvanceDelay?: number
}

export type TypingPracticeRef = {
  reset: () => void
  focus: () => void
}

export const TypingPractice = forwardRef<
  TypingPracticeRef,
  TypingPracticeProps
>(({ text, onComplete, autoAdvance = true, autoAdvanceDelay = 500 }, ref) => {
  const [input, setInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [errors, setErrors] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [hasCalledComplete, setHasCalledComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentCharRef = useRef<HTMLSpanElement | null>(null)

  useImperativeHandle(ref, () => ({
    reset: () => resetPractice(),
    focus: () => inputRef.current?.focus(),
  }))

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Scroll the current character into view as the user advances through the text
  useEffect(() => {
    currentCharRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.ctrlKey && e.key === "r")) {
        e.preventDefault()
        resetPractice()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (isCompleted && !hasCalledComplete && onComplete) {
      const { wpm, accuracy } = calculateMetrics()
      setHasCalledComplete(true)
      onComplete(accuracy, wpm)
    }
  }, [isCompleted, hasCalledComplete, onComplete])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!startTime && value.length > 0) {
      setStartTime(Date.now())
    }

    if (value.length > 0 && value[value.length - 1] !== text[value.length - 1]) {
      setErrors(errors + 1)
    }

    setCurrentIndex(value.length)

    if (value.length === text.length) {
      setEndTime(Date.now())
      setIsCompleted(true)
    }

    setInput(value)
  }

  const resetPractice = () => {
    setInput("")
    setStartTime(null)
    setEndTime(null)
    setCurrentIndex(0)
    setErrors(0)
    setIsCompleted(false)
    setHasCalledComplete(false)
    inputRef.current?.focus()
  }

  const calculateMetrics = () => {
    if (!startTime) return { wpm: 0, accuracy: 100 }
    const timeInMinutes = ((endTime || Date.now()) - startTime) / 60000
    const wordsTyped = text.split(" ").length
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
      <div
        role="region"
        aria-label="Text to type"
        // Fixed height with vertical scroll — keeps the modal stable for long texts.
        // overflow-x-hidden + break-words prevents horizontal overflow from
        // long unbroken words in monospace.
        className="mb-6 font-mono text-lg bg-gray-50 p-4 rounded-lg h-48 overflow-y-auto overflow-x-hidden wrap-break-word"
      >
        {text.split("").map((char, index) => {
          let className = ""
          if (index < input.length) {
            className =
              input[index] === char
                ? "text-green-700"
                : "text-red-700 bg-red-100"
          } else if (index === currentIndex) {
            className = "bg-yellow-200"
          }
          return (
            <span
              key={index}
              ref={index === currentIndex ? currentCharRef : null}
              className={className}
            >
              {char === " " ? " " : char}
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
          readOnly={isCompleted}
          aria-readonly={isCompleted}
          className={cn(
            "w-full p-3 border rounded-md font-mono",
            isCompleted ? "bg-gray-100 cursor-default" : "bg-white"
          )}
          placeholder="Start typing here..."
          aria-label="Typing practice input"
        />
      </div>

      <div className="flex justify-between items-center" aria-live="polite">
        <div className="flex gap-4">
          <div className="text-sm">
            <span className="font-bold">WPM:</span> <span>{wpm}</span>
          </div>
          <div className="text-sm">
            <span className="font-bold">Accuracy:</span> <span>{accuracy}%</span>
          </div>
          <div className="text-sm">
            <span className="font-bold">Progress:</span>{" "}
            <span>{Math.round((currentIndex / text.length) * 100)}%</span>
          </div>
        </div>

        <button
          onClick={resetPractice}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          aria-label="Reset typing practice (Esc or Ctrl+R)"
          title="Reset typing practice (Esc or Ctrl+R)"
        >
          Reset
        </button>
      </div>

      {isCompleted && (
        <div
          role="status"
          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md"
        >
          <h3 className="font-bold text-green-800">Practice Complete!</h3>
          <p className="text-green-700">
            You typed at {wpm} WPM with {accuracy}% accuracy.
            {autoAdvance && (
              <span className="ml-2">Advancing to next exercise…</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
})

TypingPractice.displayName = "TypingPractice"
