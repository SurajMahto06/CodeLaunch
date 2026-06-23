import type { Metadata } from "next"
import AboutClient from "./client"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Prokodex. Founded by software architects, we bridge the gap between stunning UI/UX designs and high-performance server architectures.",
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Prokodex",
    "url": "https://prokodex.com/about",
    "description": "Learn more about Prokodex. Founded by software architects, we bridge the gap between stunning UI/UX designs and high-performance server architectures.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Prokodex",
      "url": "https://prokodex.com",
      "foundingDate": "2021",
      "description": "Building Modern Digital Products That Scale. We help startups and businesses build websites, ERP systems, mobile apps, and custom software solutions.",

    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  )
}
