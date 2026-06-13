"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Calendar, ArrowUpRight, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CtaSection } from "@/components/sections/cta-section"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const categories = ["All", "Enterprise ERP", "Web Apps", "Mobile", "UI/UX"]

  const projects = [
    {
      title: "Global Logistics ERP",
      category: "Enterprise ERP",
      tech: ["Next.js", "PostgreSQL", "AWS"],
      imageDesc: "Comprehensive dashboard for supply chain management",
      description: "A complete overhaul of a legacy logistics system resulting in a 40% increase in operational efficiency."
    },
    {
      title: "FinTrust Banking App",
      category: "Mobile",
      tech: ["React Native", "Node.js", "Redis"],
      imageDesc: "Sleek mobile banking interface",
      description: "A highly secure, cross-platform mobile application handling millions of daily transactions."
    },
    {
      title: "SaaSFlow Platform",
      category: "Web Apps",
      tech: ["React", "Express", "MongoDB"],
      imageDesc: "Modern SaaS analytics dashboard",
      description: "An intuitive analytics platform built for scale, featuring real-time data visualization."
    },
    {
      title: "Healthcare Patient Portal",
      category: "UI/UX",
      tech: ["Figma", "Design Systems"],
      imageDesc: "Accessible healthcare interface design",
      description: "A complete UX redesign focusing on accessibility and HIPAA-compliant data presentation."
    },
    {
      title: "EduManage School System",
      category: "Enterprise ERP",
      tech: ["Next.js", "Prisma", "Docker"],
      imageDesc: "Academic management software",
      description: "A unified platform managing 10,000+ students, staff, and payroll across multiple campuses."
    },
    {
      title: "Real Estate Marketplace",
      category: "Web Apps",
      tech: ["Next.js", "Tailwind", "Supabase"],
      imageDesc: "Property listing storefront",
      description: "A lightning-fast property portal with interactive maps and seamless virtual tour integrations."
    },
  ]

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter)

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
              Case Studies
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Digital Products That <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Drive Impact</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Explore how we've helped visionary companies solve complex technical challenges and scale their operations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-muted/30 relative min-h-[800px]">
        <div className="container mx-auto px-4">

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-20">
            {categories.map((filter, i) => (
              <button
                key={i}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeFilter === filter
                  ? 'bg-secondary text-secondary-foreground border-secondary shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]'
                  : 'bg-background text-muted-foreground border-border/60 hover:border-secondary/50 hover:text-foreground'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="group relative rounded-[2rem] bg-card/40 backdrop-blur-sm border border-border/60 hover:border-secondary/50 hover:shadow-2xl transition-[border-color,box-shadow] duration-500 overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Image Mockup Area */}
                  <div className="aspect-[4/3] bg-muted/50 relative overflow-hidden flex items-center justify-center border-b border-border/50">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    {/* Mock UI Frame */}
                    <div className="w-[85%] h-[85%] mt-[15%] rounded-t-xl border border-border bg-background/80 shadow-2xl overflow-hidden group-hover:translate-y-2 transition-transform duration-700 relative flex flex-col">
                      <div className="h-6 border-b border-border/50 bg-muted/30 flex items-center px-3 gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-destructive/60" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                      </div>
                      <div className="flex-1 flex items-center justify-center p-4 text-center">
                        <p className="text-sm font-mono text-muted-foreground/60">[{project.imageDesc}]</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 relative z-20 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-xs font-bold text-secondary uppercase tracking-widest">{project.category}</div>
                      <div className="h-8 w-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground group-hover:border-secondary group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-secondary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/50">
                      {project.tech.map((t, j) => (
                        <span key={j} className="px-3 py-1.5 bg-background border border-border/60 text-muted-foreground text-xs rounded-full font-semibold group-hover:border-secondary/30 group-hover:text-foreground transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Code2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-muted-foreground">No projects found in this category</h3>
            </div>
          )}
        </div>
      </section>

      {/* Dual CTA Section */}
      <CtaSection
        title="Ready to Build the"
        highlight="Future?"
        description="Let's transform your vision into an industry-leading digital product."
        primaryBtnText="Start a Project"
        primaryBtnLink="/contact"
        primaryBtnIcon={<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
        secondaryBtnText="Schedule a Call"
        secondaryBtnLink="/contact"
        secondaryBtnIcon={<Calendar className="mr-2 h-5 w-5 text-secondary" />}
      />
    </div>
  )
}
