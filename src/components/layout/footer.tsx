"use client"

import Link from "next/link"
import { Code2, Mail } from "lucide-react"
import { scrollToTop } from "@/lib/utils"

function Twitter(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
}

function Github(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
}

function Linkedin(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" onClick={scrollToTop} className="flex items-center gap-2 mb-6 group">
              <div className="bg-secondary/10 p-2 rounded-xl group-hover:bg-secondary/20 transition-colors">
                <Code2 className="h-6 w-6 text-secondary" />
              </div>
              <span className="font-bold text-xl tracking-tight">Prokodex</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Building Modern Digital Products That Scale. We help startups and businesses build websites, ERP systems, mobile apps, and custom software solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">AI Chatbots</Link></li>
              <li><Link href="/services" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Admin Dashboards</Link></li>
              <li><Link href="/services" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Industry CRMs</Link></li>
              <li><Link href="/services" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">App Development</Link></li>
              <li><Link href="/services" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Web Design & Deployment</Link></li>
              <li><Link href="/services" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Custom Software</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Our Work</Link></li>
              <li><Link href="/internship" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Careers & Internships</Link></li>
              <li><Link href="/verify" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Verify Certificate</Link></li>
              <li><Link href="/contact" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                hello@prokodex.com
              </li>
              <li className="text-sm text-muted-foreground">
                123 Innovation Drive<br />
                Tech Park, CA 94043
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prokodex. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms" onClick={scrollToTop} className="text-sm text-muted-foreground hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
