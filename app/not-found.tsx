import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - Typing for Kids",
  description: "The page you are looking for could not be found",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-purple-600 mb-6">Page Not Found</h2>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">Oops! The page you are looking for doesn't exist or has been moved.</p>
          <div className="w-32 h-32 mx-auto mb-6">
            <img
              src="/images/tappy-icon.png"
              alt="Tappy the Typing Cat is confused"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-gray-600">Let's get you back to typing practice!</p>
        </div>

        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </main>
  )
}
