"use client"

import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 group">
              <img src="/logo-dark.png?v=4" alt="Prokodex Logo" className="h-11 w-auto hidden dark:block" />
              <img src="/logo-light.png?v=4" alt="Prokodex Logo" className="h-11 w-auto block dark:hidden" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Building Modern Digital Products That Scale. We help startups and businesses build websites, ERP systems, mobile apps, and custom software solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-secondary transition-colors">AI Chatbots</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Admin Dashboards</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Industry CRMs</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-secondary transition-colors">App Development</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Web Design & Deployment</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Custom Software</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Digital Marketing</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Video & Graphic Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/demos" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Demos</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Careers</Link></li>
              <li><Link href="/internship" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Internships</Link></li>
              <li><Link href="/verify" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Verify Certificate</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-secondary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <a href="mailto:hello@prokodex.com" className="hover:text-secondary transition-colors">hello@prokodex.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <a href="tel:+917250591448" className="hover:text-secondary transition-colors">+91 72505 91448</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <svg className="h-5 w-5 text-secondary fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a href="https://wa.me/917250591448" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">+91 72505 91448</a>
              </li>

            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prokodex. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
