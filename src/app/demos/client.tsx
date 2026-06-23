"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Bot, LayoutDashboard, Landmark, Smartphone, TrendingUp, Video } from "lucide-react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

const demos = [

  {
    icon: Bot,
    title: "AI Chatbot",
    description: "24/7 lead qualification chatbot. Chat with Nova, our AI assistant.",
    cta: "Try it →",
    href: "/demo/chatbot" // Placeholder links, they can be updated later
  },
  {
    icon: LayoutDashboard,
    title: "Analytics Dashboard",
    description: "Real-time KPIs, charts, and reports. Clean dark theme.",
    cta: "View demo →",
    href: "/demo/analytics"
  },
  {
    icon: Landmark,
    title: "Loan CRM",
    description: "Lead pipeline, bank sync, staff management. Full workflow.",
    cta: "View demo →",
    href: "/demo/crm"
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Cross-platform iOS & Android app. Leads, alerts, and profile.",
    cta: "View demo →",
    href: "/demo/mobile"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Comprehensive marketing including On-page & Off-page SEO, social media management, Google Ads, and lead generation.",
    cta: "View Portfolio →",
    href: "/demo/marketing"
  },
  {
    icon: Video,
    title: "Video & Graphic Design",
    description: "Reel editing, YouTube videos, invitation cards, posters, logo design, and complete brand identity creation.",
    cta: "View Portfolio →",
    href: "/demo/design"
  },
]

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-background flex items-center justify-center overflow-hidden">
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
              Interactive Demos
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Demos</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Try before you buy. Click any demo to see it in action.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Demos Grid */}
      <section className="py-16 relative mb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {demos.map((demo, i) => (
              <Link href={demo.href} key={i}>
                <motion.div
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="group relative p-8 rounded-[2rem] bg-card/40 backdrop-blur-sm border border-border/60 hover:border-secondary/50 hover:shadow-2xl transition-[border-color,box-shadow,transform] duration-300 flex flex-col h-full cursor-pointer overflow-hidden"
                >
                  {/* Subtle hover background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:rotate-3 transition-all duration-500 shadow-sm mb-6 relative z-10">
                    <demo.icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-secondary transition-colors relative z-10">
                    {demo.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow relative z-10">
                    {demo.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between group/btn relative z-10">
                    <span className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">
                      {demo.cta.replace(' →', '')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover/btn:bg-secondary group-hover/btn:text-secondary-foreground transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
