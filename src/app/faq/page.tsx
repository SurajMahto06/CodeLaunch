import type { Metadata } from "next"
import FaqClient from "./client"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to frequently asked questions about Prokodex custom software services, project management, and developer internships.",
}

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Prokodex FAQ",
    "url": "https://prokodex.com/faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Prokodex provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prokodex specializes in building modern digital products. Our core services include Web Development, Mobile App Development, Custom ERP Systems, and UI/UX Design."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with startups or established enterprises?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We work with both! We help early-stage startups build their MVP and scale, while also providing robust, scalable solutions and ERP systems for established enterprises."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Project timelines vary significantly based on complexity and scope. A simple landing page might take a few weeks, while a full-scale ERP system could take several months. We provide detailed timelines during our initial consultation."
        }
      },
      {
        "@type": "Question",
        "name": "What technologies do you use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We leverage modern, scalable technology stacks. This typically includes Next.js, React, Node.js, and TypeScript for web applications, along with React Native or Flutter for mobile apps. We also use cloud infrastructure like AWS or Vercel."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer post-launch support and maintenance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer comprehensive post-launch support and maintenance packages to ensure your application remains secure, up-to-date, and performs optimally as your user base grows."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide internships for students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We run comprehensive internship and training programs. You can check out our Careers & Internships page to learn more and apply for open positions."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqClient />
    </>
  )
}
