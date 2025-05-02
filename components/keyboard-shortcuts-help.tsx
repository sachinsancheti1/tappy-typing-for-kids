"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, X } from "lucide-react"

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
        onClick={() => setIsOpen(true)}
        title="Keyboard Shortcuts"
      >
        <HelpCircle size={16} />
        <span>Keyboard Shortcuts</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">Keyboard Shortcuts</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Action</th>
                    <th className="text-left py-2">Shortcut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Reset current exercise</td>
                    <td className="py-2">
                      <kbd className="px-2 py-1 bg-gray-100 rounded">Esc</kbd>{" "}
                      or{" "}
                      <kbd className="px-2 py-1 bg-gray-100 rounded">
                        Ctrl+R
                      </kbd>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Next exercise</td>
                    <td className="py-2">
                      <kbd className="px-2 py-1 bg-gray-100 rounded">Alt+N</kbd>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Close practice mode</td>
                    <td className="py-2">
                      <kbd className="px-2 py-1 bg-gray-100 rounded">Alt+Q</kbd>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 rounded-b-lg">
              <p className="text-sm text-gray-600">
                Keyboard shortcuts help you practice more efficiently without
                needing to use the mouse.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
