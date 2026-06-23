import type { Metadata } from "next"
import CareersClient from "./client"

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Prokodex team. Explore full-time job openings in frontend development, backend systems, UI/UX design, and QA automation, and build modern digital products.",
}

export default function CareersPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "Senior Full Stack Engineer (Next.js & Node.js)",
      "description": "We are looking for a Senior Full Stack Engineer to lead the design and development of scalable enterprise dashboards and interactive platforms.",
      "datePosted": "2026-01-01",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Prokodex",
        "sameAs": "https://prokodex.com",
        "logo": "https://prokodex.com/logo-dark.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        }
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "India"
      },
      "jobLocationType": "TELECOMMUTE",
      "experienceRequirements": "4+ Years"
    },
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "UI/UX Designer",
      "description": "Join us to shape the look, feel, and flow of our custom SaaS, ERP and mobile products.",
      "datePosted": "2026-01-01",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Prokodex",
        "sameAs": "https://prokodex.com",
        "logo": "https://prokodex.com/logo-dark.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        }
      },
      "jobLocationType": "TELECOMMUTE",
      "experienceRequirements": "2+ Years"
    },
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "Backend Engineer (Laravel & PostgreSQL)",
      "description": "We are seeking a backend specialist to build secure database schemas, scale RESTful APIs, and configure cron queues using Laravel.",
      "datePosted": "2026-01-01",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Prokodex",
        "sameAs": "https://prokodex.com",
        "logo": "https://prokodex.com/logo-dark.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        }
      },
      "experienceRequirements": "2+ Years"
    },
    {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": "QA Automation Engineer",
      "description": "Help us maintain our zero-downtime, bug-free standards. You will write automated end-to-end integration test suites for client projects.",
      "datePosted": "2026-01-01",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Prokodex",
        "sameAs": "https://prokodex.com",
        "logo": "https://prokodex.com/logo-dark.png"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        }
      },
      "jobLocationType": "TELECOMMUTE",
      "experienceRequirements": "2+ Years"
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareersClient />
    </>
  )
}
