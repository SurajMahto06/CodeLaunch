"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { scrollToTop } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Demos", href: "/demos" },
    { name: "Internship", href: "/internship" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 flex flex-col ${isMobileMenuOpen
        ? "h-[100dvh] bg-background"
        : isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
        }`}
    >
      {/* Announcement Marquee */}
      <div className="bg-secondary text-secondary-foreground text-xs font-medium py-2 overflow-hidden flex items-center w-full border-b border-secondary-foreground/10">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {[1, 2].map((set) => (
            <div key={set} className="flex gap-12 px-6 items-center">
              <span className="flex items-center gap-2">🚀 <strong className="font-bold uppercase tracking-wider">Summer Internship 2026</strong> Applications are now open!</span>
              <span className="flex items-center gap-2">⚡ Build real-world enterprise applications with industry experts.</span>
              <span className="flex items-center gap-2">🔥 Spots are limited. Interviews starting next week.</span>
              <span className="flex items-center gap-2">💡 Master Next.js, React, Node.js, and Cloud Architecture.</span>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" onClick={(e) => { if (pathname === "/") scrollToTop(); }} className="flex items-center group">
              <img src="/logo-dark.png?v=4" alt="Prokodex Logo" className="h-11 w-auto hidden dark:block" />
              <img src="/logo-light.png?v=4" alt="Prokodex Logo" className="h-11 w-auto block dark:hidden" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => { if (pathname === link.href) scrollToTop(); }}
                className={`text-sm font-medium transition-colors ${pathname === link.href
                  ? "text-secondary"
                  : "text-foreground/80 hover:text-secondary"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4 border-l pl-4 border-border">
              <ThemeToggle />
              <Link href="/contact">
                <Button>Let's Talk</Button>
              </Link>
            </div>
          </nav>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground/80 hover:text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background flex-1 overflow-y-auto border-t border-border">
          <div className="px-4 py-6 flex flex-col h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  if (pathname === link.href) scrollToTop();
                }}
                className={`block px-4 py-3 text-lg font-medium rounded-xl transition-colors ${pathname === link.href
                  ? "bg-secondary/10 text-secondary"
                  : "hover:bg-accent text-foreground/80"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-4">
              <Link href="/contact" className="w-full" onClick={(e) => {
                setIsMobileMenuOpen(false)
                if (pathname === "/contact") scrollToTop();
              }}>
                <Button size="lg" className="w-full justify-center text-lg">Let's Talk</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
