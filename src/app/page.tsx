import type { Metadata } from "next"
import HomeClient from "./client"

export const metadata: Metadata = {
  title: "Prokodex — AI-Powered Software Development & Internships",
  description: "Build smarter with AI-powered software. AI chatbots, custom dashboards, industry CRMs, mobile apps, and modern websites — built for your business, delivered in weeks.",
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Prokodex",
    "url": "https://prokodex.com",
    "description": "Build smarter with AI-powered software. AI chatbots, custom dashboards, industry CRMs, mobile apps, and modern websites — built for your business, delivered in weeks.",
    "publisher": {
      "@type": "Organization",
      "name": "Prokodex",
      "url": "https://prokodex.com",
      "logo": "https://prokodex.com/logo-dark.png"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://prokodex.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  )
}
