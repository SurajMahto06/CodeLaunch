import type { Metadata } from "next"
import InternshipClient from "./client"

export const metadata: Metadata = {
  title: "Internship Programs",
  description: "Fast-track your software career. Join Prokodex internships to work on live systems with senior dev mentors in React, Next.js, Node.js, mobile app dev, and UI/UX design.",
}

export default function InternshipPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Prokodex Internship & Mentorship Programs",
    "description": "Fast-track your software career. Join Prokodex internships to work on live systems with senior dev mentors in React, Next.js, Node.js, mobile app dev, and UI/UX design.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Course",
          "name": "Frontend Development Internship",
          "description": "Master modern web interfaces by building real-world enterprise applications with React and Next.js.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Course",
          "name": "Node.js & Express Backend Internship",
          "description": "Learn to build high-performance, asynchronous server-side applications and RESTful APIs from scratch.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Course",
          "name": "MERN Stack Development Internship",
          "description": "Master the most popular full-stack technology. Build scalable web apps using MongoDB, Express, React, and Node.js.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Course",
          "name": "MEAN Stack Development Internship",
          "description": "Learn enterprise-grade full-stack development using MongoDB, Express, Angular, and Node.js.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Course",
          "name": "Laravel Backend Internship",
          "description": "Build secure, scalable backend architectures using PHP and the powerful Laravel framework.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Course",
          "name": "React Native App Dev Internship",
          "description": "Build cross-platform mobile apps for iOS and Android using React Native and Expo.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "Course",
          "name": "Flutter App Development Internship",
          "description": "Create beautiful, natively compiled, multi-platform applications from a single codebase using Flutter and Dart.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "Course",
          "name": "UI/UX Design Internship",
          "description": "Design intuitive digital products. Master user research, wireframing, and high-fidelity prototyping in Figma.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "Course",
          "name": "Gen AI & AI Web Dev Internship",
          "description": "Integrate Artificial Intelligence into web applications. Build custom AI agents, chatbots, and generative AI tools.",
          "provider": {
            "@type": "Organization",
            "name": "Prokodex",
            "url": "https://prokodex.com"
          }
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
      <InternshipClient />
    </>
  )
}
