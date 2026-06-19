import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Prokodex",
  description: "Privacy policy and data handling practices of Prokodex.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including when you fill out a contact form, 
            apply for an internship, or otherwise communicate with us. This may include your name, email address, 
            phone number, and any other information you choose to provide.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, 
            to process your requests and applications, and to communicate with you about products, 
            services, offers, and promotions.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures designed to protect 
            the security of any personal information we process. However, please also remember that we 
            cannot guarantee that the internet itself is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: 
            hello@prokodex.com
          </p>
        </div>
      </div>
    </div>
  )
}
