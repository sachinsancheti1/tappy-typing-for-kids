"use client"

import { useEffect, useState } from "react"

export function SchemaMarkup() {
  const [currentDomain, setCurrentDomain] = useState("")
  const [isPrimaryDomain, setIsPrimaryDomain] = useState(true)

  useEffect(() => {
    // Get the current hostname
    const hostname = window.location.hostname
    setCurrentDomain(`https://${hostname}`)
    setIsPrimaryDomain(hostname.includes("tappytyping.com"))
  }, [])

  // Set the canonical and alternate domains
  const canonicalDomain = isPrimaryDomain ? "https://tappytyping.com" : "https://learntyping.fun"
  const alternateDomain = isPrimaryDomain ? "https://learntyping.fun" : "https://tappytyping.com"

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Typing for Kids",
    url: canonicalDomain,
    description:
      "An interactive typing book experience optimized for iPad, helping children learn to type with fun exercises",
    potentialAction: {
      "@type": "SearchAction",
      target: `${canonicalDomain}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    sameAs: [alternateDomain],
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Typing for Kids",
    url: canonicalDomain,
    logo: `${canonicalDomain}/images/tappy-icon.png`,
    sameAs: [
      alternateDomain,
      "https://twitter.com/typingforkids",
      "https://facebook.com/typingforkids",
      "https://instagram.com/typingforkids",
    ],
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Typing for Kids",
    description: "An interactive typing course designed for children to learn typing skills through fun exercises",
    provider: {
      "@type": "Organization",
      name: "Typing for Kids",
      sameAs: canonicalDomain,
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
    },
    educationalLevel: "beginner",
    teaches: "Touch typing skills for children",
  }

  return (
    <>
      {currentDomain && (
        <>
          <link rel="canonical" href={canonicalDomain} />
          <link rel="alternate" href={alternateDomain} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
        </>
      )}
    </>
  )
}
