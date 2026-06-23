"use client"

import { motion } from "framer-motion"
import {
  Code2,
  Database,
  MonitorSmartphone,
  Palette,
  Cloud,
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Bot,
  LayoutDashboard,
  Building2,
  Smartphone,
  Globe,
  CircleDollarSign,
  Unlock,
  GraduationCap,
  TrendingUp,
  Video
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OurProcess } from "@/components/sections/our-process"
import { CtaSection } from "@/components/sections/cta-section"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function ServicesPage() {
  const services = [

    {
      icon: Bot,
      title: "AI Chatbots",
      description: "24/7 lead qualification & customer support. Works on WhatsApp, web, and social media.",
      features: ["WhatsApp Integration", "Lead Qualification", "24/7 Support", "Social Media Ready"]
    },
    {
      icon: LayoutDashboard,
      title: "Admin Dashboards",
      description: "Real-time analytics, KPIs, and reporting. See your business at a glance.",
      features: ["Real-time Analytics", "KPI Tracking", "Custom Reporting", "Data Visualization"]
    },
    {
      icon: Building2,
      title: "Industry CRMs",
      description: "Tailored for finance, healthcare, real estate & more. Manage leads, loans, clients.",
      features: ["Lead Management", "Finance & Real Estate", "Client Portals", "Loan Tracking"]
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "iOS & Android apps — cross-platform, fast, built for your business. From $499.",
      features: ["iOS & Android", "Cross-platform Apps", "Fast Performance", "From $499"]
    },
    {
      icon: Globe,
      title: "Web Design & Deployment",
      description: "Responsive websites & e-commerce. SEO-optimized, mobile-first. From $50.",
      features: ["Responsive Design", "SEO Optimized", "Mobile First", "From $50"]
    },
    {
      icon: Code2,
      title: "Custom Software",
      description: "Automate workflows, integrate APIs, build micro SaaS. Your idea, our code.",
      features: ["Workflow Automation", "API Integration", "Micro SaaS", "Custom Logic"]
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Comprehensive marketing including On-page & Off-page SEO, social media management, Google Ads, and lead generation.",
      features: ["On-page SEO", "Off-page SEO", "Social Media", "PPC Campaigns"]
    },
    {
      icon: Video,
      title: "Video & Graphic Design",
      description: "Reel editing, YouTube videos, invitation cards, posters, logo design, and complete brand identity creation.",
      features: ["Video Editing", "Poster Design", "UI/UX Design", "Graphics"]
    },
    {
      icon: CircleDollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees. Starting at $50. You own your API keys.",
      features: ["No Hidden Fees", "Start at $50", "Own your API Keys", "Flexible Plans"]
    },
    {
      icon: Unlock,
      title: "Full Source Code",
      description: "You own everything. No vendor lock-in. We hand over code, docs, and deploy guides.",
      features: ["No Vendor Lock-in", "Full Documentation", "Deploy Guides", "100% Ownership"]
    },
    {
      icon: GraduationCap,
      title: "Internship Programs",
      description: "Industry-aligned training programs for aspiring developers.",
      features: ["Live Projects", "1-on-1 Mentorship", "Certifications", "Job Ready"]
    }
  ]




  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 bg-background flex items-center justify-center overflow-hidden border-b border-border">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-6 text-sm font-semibold tracking-wide uppercase border border-secondary/20">
              Our Expertise
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Architecting Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Excellence</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              End-to-end software engineering and design services tailored for visionary companies. We don't just build apps; we build scalable digital businesses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Do</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, launch, and grow your digital business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-sm border border-border/60 hover:border-secondary/50 hover:shadow-2xl transition-[border-color,box-shadow] duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:rotate-3 transition-all duration-500 shadow-sm">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <div className="h-10 w-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground group-hover:border-secondary group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                      <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-secondary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Pills instead of bullet list */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/50">
                    {service.features.map((feature, j) => (
                      <span key={j} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-background border border-border/60 text-muted-foreground group-hover:border-secondary/30 group-hover:text-foreground transition-colors">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Methodology */}
      <OurProcess />


      {/* Dual CTA Section */}
      <CtaSection
        title="Ready to Build the"
        highlight="Future?"
        description="Let's transform your vision into an industry-leading digital product."
        primaryBtnText="Start a Project"
        primaryBtnLink="/contact"
        primaryBtnIcon={<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
        secondaryBtnText="View Demos"
        secondaryBtnLink="/demos"
      />

    </div>
  )
}
