import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | Prokodex",
  description: "Terms and conditions for using Prokodex services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and
            provision of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Description of Service</h2>
          <p>
            Prokodex provides software development, consulting, and educational services.
            We reserve the right to modify or discontinue, temporarily or permanently, the services with
            or without notice.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Intellectual Property</h2>
          <p>
            All content included on this site, such as text, graphics, logos, button icons, images,
            audio clips, digital downloads, data compilations, and software, is the property of
            Prokodex or its content suppliers and protected by international copyright laws.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall Prokodex, nor its directors, employees, partners, agents,
            suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or
            punitive damages, including without limitation, loss of profits, data, use, goodwill, or
            other intangible losses, resulting from your access to or use of or inability to access or
            use the Service.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please <Link href="/contact" className="text-secondary hover:underline">contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
