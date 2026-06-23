import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://prokodex.com"),
  title: {
    default: "Prokodex | Premium Software Agency",
    template: "%s | Prokodex"
  },
  description: "Building Modern Digital Products That Scale. We help startups and businesses build websites, ERP systems, mobile apps, and custom software solutions.",
  keywords: [
    "Software Agency",
    "Web Development",
    "Mobile App Development",
    "Custom ERP Systems",
    "Next.js Development",
    "React Agency",
    "Laravel Development",
    "AI Integration",
    "Coding Internships",
    "Software Engineering Training",
    "Prokodex"
  ],
  authors: [{ name: "Prokodex Team", url: "https://prokodex.com" }],
  creator: "Prokodex",
  publisher: "Prokodex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Prokodex | Premium Software Agency",
    description: "Building Modern Digital Products That Scale. We help startups and businesses build websites, ERP systems, mobile apps, and custom software solutions.",
    url: "https://prokodex.com",
    siteName: "Prokodex",
    images: [
      {
        url: "/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "Prokodex Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prokodex | Premium Software Agency",
    description: "Building Modern Digital Products That Scale. We help startups and businesses build websites, ERP systems, mobile apps, and custom software solutions.",
    images: ["/logo-dark.png"],
    creator: "@prokodex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import NextTopLoader from "nextjs-toploader"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Prokodex",
    "url": "https://prokodex.com",
    "logo": "https://prokodex.com/logo-dark.png",
    "description": "Building Modern Digital Products That Scale. We help startups and businesses build websites, ERP systems, mobile apps, and custom software solutions.",

    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-72505-91448",
      "contactType": "customer service",
      "email": "hello@prokodex.com",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://twitter.com/prokodex",
      "https://github.com/prokodex",
      "https://linkedin.com/company/prokodex"
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.className} min-h-screen bg-background antialiased flex flex-col overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="#000000"
            initialPosition={0.08}
            crawlSpeed={200}
            height={5}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.3)"
          />
          <Navbar />
          <main className="flex-1 pt-28">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
