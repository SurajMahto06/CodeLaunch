import type { Metadata } from "next"
import ContactClient from "./client"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Prokodex. Reach out to discuss project development, consulting, partnerships, career opportunities, or internships.",
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Prokodex",
    "url": "https://prokodex.com/contact",
    "description": "Get in touch with Prokodex. Reach out to discuss project development, consulting, partnerships, career opportunities, or internships.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Prokodex",
      "url": "https://prokodex.com",
      "email": "hello@prokodex.com",
      "telephone": "+91-72505-91448",

      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-72505-91448",
        "contactType": "customer service",
        "email": "hello@prokodex.com",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  )
}
