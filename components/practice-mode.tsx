"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { TypingPractice, type TypingPracticeRef } from "./typing-practice"
import { Button } from "@/components/ui/button"
import { saveTypingResult } from "@/lib/progress"

interface PracticeModeProps {
  content: string | string[]
  onClose: () => void
  pageNumber: number
  exerciseTitle: string
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function PracticeMode({
  content,
  onClose,
  pageNumber,
  exerciseTitle,
}: PracticeModeProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [results, setResults] = useState<Array<{ accuracy: number; wpm: number }>>([])
  const [isAllCompleted, setIsAllCompleted] = useState(false)
  const [isAdvancing, setIsAdvancing] = useState(false)

  const typingPracticeRef = useRef<TypingPracticeRef | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  // Ref so keyboard handler always sees current index without stale closure
  const currentTextIndexRef = useRef(currentTextIndex)

  const textArray = Array.isArray(content) ? content : [content]
  const currentText = textArray[currentTextIndex]
  const isLastText = currentTextIndex === textArray.length - 1

  // Keep ref in sync
  useEffect(() => {
    currentTextIndexRef.current = currentTextIndex
  }, [currentTextIndex])

  // Save focus on open; restore it when the modal closes
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
    return () => {
      previousFocusRef.current?.focus()
    }
  }, [])

  // Focus trap
  const handleFocusTrap = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab") return
    const focusable = Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
    ).filter((el) => !el.hasAttribute("disabled"))
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === last) {
        first.focus()
        e.preventDefault()
      }
    }
  }, [])

  // Keyboard shortcuts — use ref so currentTextIndex is never stale
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleFocusTrap(e)

      if (e.altKey && e.key === "n") {
        e.preventDefault()
        const idx = currentTextIndexRef.current
        if (idx < textArray.length - 1) {
          setCurrentTextIndex(idx + 1)
        } else {
          onClose()
        }
      }

      if (e.altKey && e.key === "q") {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [textArray.length, onClose, handleFocusTrap])

  const handleComplete = (accuracy: number, wpm: number) => {
    if (isAdvancing) return
    setIsAdvancing(true)

    saveTypingResult({
      exercise: `${exerciseTitle} - ${currentTextIndex + 1}`,
      wpm,
      accuracy,
      pageNumber,
    })

    const newResults = [...results, { accuracy, wpm }]
    setResults(newResults)

    setTimeout(() => {
      const idx = currentTextIndexRef.current
      if (idx < textArray.length - 1) {
        setCurrentTextIndex(idx + 1)
      } else {
        setIsAllCompleted(true)
      }
      setIsAdvancing(false)
    }, 1500)
  }

  const handleNext = () => {
    const idx = currentTextIndexRef.current
    if (idx < textArray.length - 1) {
      setCurrentTextIndex(idx + 1)
    } else {
      onClose()
    }
  }

  const averageWpm = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length)
    : 0
  const averageAccuracy = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length)
    : 0

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="practice-dialog-title"
        aria-hidden="false"
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2
              id="practice-dialog-title"
              className="text-2xl font-bold text-orange-600"
            >
              Practice Mode {currentTextIndex + 1}/{textArray.length}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500" aria-hidden="true">
                Shortcuts: Esc (Reset), Alt+N (Next), Alt+Q (Quit)
              </span>
              <Button
                variant="ghost"
                onClick={onClose}
                aria-label="Close practice mode (Alt+Q)"
              >
                Close
              </Button>
            </div>
          </div>

          {/*
            key={currentTextIndex} forces a full remount on every exercise advance.
            The fresh TypingPractice instance starts with clean state and its own
            mount effect focuses the input automatically — no manual reset/focus needed.
          */}
          <TypingPractice
            key={currentTextIndex}
            text={currentText}
            onComplete={handleComplete}
            ref={typingPracticeRef}
            autoAdvance={!isLastText}
          />

          {isAllCompleted && results.length > 0 && (
            <div role="status" className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Exercise Completed!</h3>
              <div className="flex gap-6">
                <div>
                  <span className="font-semibold">Average WPM:</span> {averageWpm}
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

          {(isLastText || isAllCompleted) && (
            <div className="mt-6 flex justify-end">
              <Button
                onClick={isLastText ? onClose : handleNext}
                className="bg-purple-600 hover:bg-purple-700"
                title={isLastText ? "Finish Practice (Alt+Q)" : "Next Exercise (Alt+N)"}
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
