import type { Metadata } from "next"
import PortfolioClient from "./client"

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore our portfolio of digital projects. From high-scale ERP systems and SaaS dashboards to mobile apps and custom tech integrations at Prokodex.",
}

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Prokodex Portfolio",
    "url": "https://prokodex.com/portfolio",
    "description": "Explore our portfolio of digital projects. From high-scale ERP systems and SaaS dashboards to mobile apps and custom tech integrations at Prokodex.",
    "provider": {
      "@type": "Organization",
      "name": "Prokodex",
      "url": "https://prokodex.com"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioClient />
    </>
  )
}
