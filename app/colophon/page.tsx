import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Colophon - Typing for Kids",
  description:
    "Information about the Typing for Kids website, its creation, and technologies used",
}

export default function Colophon() {
  return (
    <main className="min-h-screen bg-orange-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <Link
          href="/"
          className="text-orange-500 hover:underline mb-8 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-orange-500 mb-8">Colophon</h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-600 mt-4 mb-4">
            About This Website
          </h2>
          <p className="mb-4">
            "Typing for Kids" is an interactive typing book designed to help
            children learn typing skills through engaging exercises. The website
            was created with a focus on accessibility, usability, and a fun
            learning experience.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            Technologies
          </h2>
          <p className="mb-4">
            This website was built using the following technologies:
          </p>

          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">
            Framework
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Next.js - A React framework for production</li>
            <li>React - A JavaScript library for building user interfaces</li>
            <li>TypeScript - A typed superset of JavaScript</li>
          </ul>

          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">
            Styling
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Tailwind CSS - A utility-first CSS framework</li>
            <li>Lucide React - A set of beautiful, consistent icons</li>
          </ul>

          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">
            Deployment & Hosting
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Netlify - For continuous deployment and hosting</li>
            <li>GitHub - For version control and code hosting</li>
          </ul>

          <h3 className="text-xl font-bold text-orange-500 mt-6 mb-3">
            Analytics & Monitoring
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Google Analytics 4 - For website analytics</li>
            <li>Google Tag Manager - For tag management</li>
            <li>Microsoft Clarity - For user behavior insights</li>
          </ul>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            Typography
          </h2>
          <p className="mb-4">
            This website uses the Inter font family, a variable font designed
            for computer screens.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            Accessibility
          </h2>
          <p className="mb-4">
            We are committed to making this website accessible to all users,
            including those with disabilities. The website is designed to be
            navigable via keyboard and compatible with screen readers.
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            Credits
          </h2>
          <p className="mb-4">
            Design and Development: Typing for Kids Team
            <br />
            Illustrations: Tappy the Typing Cat character was created
            specifically for this project
            <br />
            Content: Original typing exercises compiled from various educational
            resources
          </p>

          <h2 className="text-2xl font-bold text-purple-600 mt-8 mb-4">
            Copyright
          </h2>
          <p className="mb-4">
            © {new Date().getFullYear()} Typing for Kids. All rights reserved.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
