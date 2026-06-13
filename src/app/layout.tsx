import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeLaunch Technologies | Premium Software Agency",
  description: "Building Modern Digital Products That Scale. We help startups and businesses build websites, ERP systems, mobile apps, and custom software solutions.",
}

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${inter.className} min-h-screen bg-background antialiased flex flex-col overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
