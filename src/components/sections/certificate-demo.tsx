"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShieldCheck, Share2, Award, ArrowRight } from "lucide-react"

export function CertificateDemo() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Digitally Verifiable",
      description: "Every certificate has a unique ID that can be instantly verified on our portal by recruiters."
    },
    {
      icon: Share2,
      title: "One-Click LinkedIn Share",
      description: "Directly add your credential to the 'Licenses & Certifications' section of your LinkedIn profile."
    },
    {
      icon: Award,
      title: "Industry Recognized",
      description: "Backed by enterprise partners, validating your hands-on experience in building real-world apps."
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-background border-t border-border/50">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-sm font-semibold text-secondary mb-6"
          >
            <Award className="w-4 h-4" /> Validated Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Your Proof of <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/50 via-secondary/80 to-secondary">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Complete your internship and earn an official, verifiable certificate to showcase your skills to top tech companies.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-center">
          {/* Certificate Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl opacity-50 rounded-[3rem] -z-10" />
            <div className="relative">
              <motion.div
                className="bg-card/50 backdrop-blur-md p-3 sm:p-4 rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden"
              >
                <div className="relative aspect-[1.414/1] w-full rounded-2xl overflow-hidden shadow-inner ring-1 ring-white/10">
                  <Image
                    src="/images/certificate_flat_mockup.png"
                    alt="Prokodex Internship Certificate Mockup"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>


            </div>
          </motion.div>

          {/* Features Side */}
          <div>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 transition-colors shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                    <feature.icon className="w-5 h-5 text-secondary group-hover:text-secondary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1 text-foreground/90">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex"
            >
              <Link href="/verify">
                <Button size="lg" className="h-12 px-8 text-base bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_30px_-10px_rgba(6,182,212,0.4)] cursor-pointer group">
                  Verify a Certificate <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
