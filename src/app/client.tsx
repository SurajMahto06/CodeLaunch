"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { OurProcess } from "@/components/sections/our-process"
import { CtaSection } from "@/components/sections/cta-section"
import {
  ArrowRight,
  Code2,
  MonitorSmartphone,
  Database,
  Palette,
  Lightbulb,
  GraduationCap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Smile,
  Users,
  Clock,
  Calendar,
  Terminal,
  Cloud,
  Sparkles,
  Layers,
  Smartphone,
  Bot,
  LayoutDashboard,
  Building2,
  Globe,
  CircleDollarSign,
  Unlock,
  TrendingUp,
  Video
} from "lucide-react"

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiGo,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiTailwindcss
} from "react-icons/si"
import { FaAws } from "react-icons/fa"

export default function HomeClient() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const testimonials = [
    { quote: "Prokodex transformed our legacy systems into a modern, lightning-fast ERP. The attention to detail is unmatched.", author: "Sarah Jenkins", role: "CTO, GlobalLogistics" },
    { quote: "The team's expertise in Next.js and React is phenomenal. They delivered our SaaS product 3 weeks ahead of schedule.", author: "David Chen", role: "Founder, SaaSFlow" },
    { quote: "Our interns from Prokodex were incredibly well-trained. They contributed to our live codebase from week one.", author: "Michael Ross", role: "VP Engineering, TechNova" },
    { quote: "The mobile app they built for us has a 4.9 rating on the App Store. The UX is flawless and the performance is buttery smooth.", author: "Emily Watson", role: "Product Manager, FitLife" },
    { quote: "We hired their enterprise consulting team for our microservices migration. It was the best technical decision we made this year.", author: "James Carter", role: "Director of Engineering, FinTrust" },
    { quote: "Their internship program is a game changer. We regularly hire graduates from Prokodex and they are always production-ready.", author: "Anita Patel", role: "HR Head, TechInnovate" }
  ]
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Top Section Wrapper (Allows glow to bleed across Hero, Header, and Stats) */}
      <div className="relative bg-background">
        {/* Unified Background Glow */}
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[800px] md:w-[1000px] h-[800px] md:h-[1000px] bg-secondary/20 dark:bg-secondary/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative pt-16 pb-16 ">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />


          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center max-w-4xl mx-auto"
            >
              <Link href="/contact">
                <motion.div
                  variants={fadeIn}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-8 cursor-pointer hover:bg-secondary/20 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-secondary/10 group"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <span className="text-sm font-medium">Available for new projects</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>

              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Build Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">AI-Powered</span> Software
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                AI chatbots, custom dashboards, industry CRMs, mobile apps, and modern websites — built for your business, delivered in weeks.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="h-12 px-8 text-base group w-full">
                    Book a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/internship" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full hover:border-secondary/50 hover:text-secondary hover:bg-secondary/10 transition-colors">
                    Explore Internships
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10">

          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                {
                  label: "Projects Delivered",
                  value: "150+",
                  shape: "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
                  hoverShape: "group-hover:rounded-[30%_60%_70%_40%/50%_60%_30%_60%]"
                },
                {
                  label: "Happy Clients",
                  value: "98%",
                  shape: "rounded-[40%_60%_70%_30%/50%_40%_60%_50%]",
                  hoverShape: "group-hover:rounded-[70%_30%_50%_50%/30%_60%_40%_70%]"
                },
                {
                  label: "Interns Trained",
                  value: "500+",
                  shape: "rounded-[40%_60%_60%_40%/60%_40%_70%_30%]",
                  hoverShape: "group-hover:rounded-[50%_50%_40%_60%/40%_60%_50%_50%]"
                },
                {
                  label: "Years of Experience",
                  value: "5+",
                  shape: "rounded-[70%_30%_40%_60%/30%_60%_40%_70%]",
                  hoverShape: "group-hover:rounded-[40%_60%_70%_30%/60%_40%_30%_70%]"
                }
              ].map((stat, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                  className="group flex flex-col items-center justify-center text-center cursor-default py-4"
                >
                  <div className={`bg-secondary/10 p-8 ${stat.shape} ${stat.hoverShape} group-hover:bg-secondary/20 transition-all duration-700 ease-in-out flex flex-col items-center justify-center aspect-square md:aspect-auto min-w-[160px]`}>
                    <div className="text-4xl md:text-5xl font-black text-secondary mb-2 tracking-tighter transition-transform duration-500 group-hover:scale-110">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-foreground/80 font-bold uppercase tracking-widest leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-4 text-sm font-semibold tracking-wide uppercase">
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Build</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end solutions for modern businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[

              { icon: Bot, title: "AI Chatbots", desc: "24/7 lead qualification & customer support. Works on WhatsApp, web, and social media." },
              { icon: LayoutDashboard, title: "Admin Dashboards", desc: "Real-time analytics, KPIs, and reporting. See your business at a glance." },
              { icon: Building2, title: "Industry CRMs", desc: "Tailored for finance, healthcare, real estate & more. Manage leads, loans, clients." },
              { icon: Smartphone, title: "App Development", desc: "iOS & Android apps — cross-platform, fast, built for your business. From $499." },
              { icon: Globe, title: "Web Design & Deployment", desc: "Responsive websites & e-commerce. SEO-optimized, mobile-first. From $50." },
              { icon: Code2, title: "Custom Software", desc: "Automate workflows, integrate APIs, build micro SaaS. Your idea, our code." },
              { icon: TrendingUp, title: "Digital Marketing", desc: "Comprehensive marketing including On-page & Off-page SEO, social media management, Google Ads, and lead generation." },
              { icon: Video, title: "Video & Graphic Design", desc: "Reel editing, YouTube videos, invitation cards, posters, logo design, and complete brand identity creation." },
              { icon: CircleDollarSign, title: "Transparent Pricing", desc: "No hidden fees. Starting at $50. You own your API keys." },
              { icon: Unlock, title: "Full Source Code", desc: "You own everything. No vendor lock-in. We hand over code, docs, and deploy guides." },
              { icon: GraduationCap, title: "Internship Programs", desc: "Industry-aligned training programs for aspiring developers." },
            ].map((service, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                key={i}
                className="group relative p-6 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/60 hover:border-secondary/50 hover:shadow-xl transition-[border-color,box-shadow] duration-300 overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <service.icon className="h-8 w-8 text-secondary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />

                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2 tracking-tight">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30 border-y border-border relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Prokodex?</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We don't just write code; we build scalable digital products that solve real business problems. Our engineering culture is built on quality, velocity, and extreme performance.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mt-12">
                {[
                  { title: "Modern Tech Stack", desc: "Next.js, React, Node, SQL" },
                  { title: "Fast Delivery", desc: "Agile sprints & rapid prototyping" },
                  { title: "Scalable Arch", desc: "Microservices & serverless ready" },
                  { title: "Clean Code", desc: "Strict linting & automated testing" }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-5 group cursor-default">
                    <div className="h-14 w-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                      <CheckCircle2 className="h-7 w-7 text-secondary group-hover:text-secondary-foreground transition-colors" />
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group perspective-1000 lg:pl-12">
              {/* Glow Behind Graphic */}
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-accent blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-[3rem] -z-10" />

              <div className="aspect-square md:aspect-[4/3] bg-card/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative transform transition-transform duration-700 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-accent/5" />

                {/* Fake OS Header */}
                <div className="absolute top-0 inset-x-0 h-14 border-b border-border/50 bg-background/50 flex items-center px-6 gap-2 backdrop-blur-md z-20">
                  <div className="w-3.5 h-3.5 rounded-full bg-destructive/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                </div>

                {/* Fake UI Body */}
                <div className="absolute inset-0 flex flex-col p-8 pt-16 gap-6">
                  <div className="flex gap-6 items-center">
                    <div className="h-16 w-16 rounded-2xl bg-secondary/20 animate-pulse border border-secondary/30" />
                    <div className="space-y-3 flex-1">
                      <div className="h-4 w-2/3 bg-muted rounded-full" />
                      <div className="h-3 w-1/2 bg-muted/50 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="bg-background/50 rounded-2xl border border-border/50 p-4 flex flex-col justify-end">
                      <div className="h-2 w-full bg-secondary/20 rounded-full mb-2" />
                      <div className="h-2 w-4/5 bg-secondary/20 rounded-full mb-2" />
                      <div className="h-2 w-3/4 bg-secondary/20 rounded-full" />
                    </div>
                    <div className="bg-secondary/5 rounded-2xl border border-secondary/20 p-4 flex items-center justify-center relative overflow-hidden">
                      <div className="w-20 h-20 rounded-full border-[6px] border-secondary/20 border-t-secondary animate-spin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Methodology */}
      <OurProcess />

      {/* Tech Stack Section */}
      <section className="py-16 bg-background border-t border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-4 text-sm font-semibold tracking-wide uppercase">
              Tech Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Modern Tech</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We leverage enterprise-grade technologies to build fast, secure, and infinitely scalable digital products that stand the test of time.
            </p>
          </div>
        </div>

        <div className="relative mt-8 py-8 flex flex-col gap-6 max-w-full">
          {/* Gradient masks for smooth fade on exact edges of the screen */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Moves Left */}
          <motion.div
            className="flex items-center w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 120, repeat: Infinity }}
          >
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-6 items-center pr-6">
                {[1, 2, 3, 4].flatMap(() => [
                  { name: "React", icon: SiReact },
                  { name: "Next.js", icon: SiNextdotjs },
                  { name: "Node.js", icon: SiNodedotjs },
                  { name: "TypeScript", icon: SiTypescript },
                  { name: "Python", icon: SiPython },
                  { name: "Go", icon: SiGo },
                ]).map((tech, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-full bg-background/60 backdrop-blur-xl border border-border/60 shadow-md shrink-0 group hover:bg-card hover:border-secondary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:bg-secondary transition-all duration-300">
                      <tech.icon className="h-5 w-5 text-secondary group-hover:text-secondary-foreground transition-colors" />
                    </div>
                    <span className="font-bold text-lg text-foreground/90 relative z-10">{tech.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Row 2 - Moves Right */}
          <motion.div
            className="flex items-center w-max ml-[-100px]"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 140, repeat: Infinity }}
          >
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-6 items-center pr-6">
                {[1, 2, 3, 4].flatMap(() => [
                  { name: "PostgreSQL", icon: SiPostgresql },
                  { name: "MongoDB", icon: SiMongodb },
                  { name: "Redis", icon: SiRedis },
                  { name: "AWS", icon: FaAws },
                  { name: "Docker", icon: SiDocker },
                  { name: "Tailwind CSS", icon: SiTailwindcss },
                ]).map((tech, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-full bg-background/60 backdrop-blur-xl border border-border/60 shadow-md shrink-0 group hover:bg-card hover:border-secondary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:bg-secondary transition-all duration-300">
                      <tech.icon className="h-5 w-5 text-secondary group-hover:text-secondary-foreground transition-colors" />
                    </div>
                    <span className="font-bold text-lg text-foreground/90 relative z-10">{tech.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Success Stories / Testimonials */}
      <section className="py-16 bg-card/50 border-t border-border relative">
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Success Stories</span></h2>
              <p className="text-muted-foreground text-lg">
                Don't just take our word for it. Here's what our enterprise clients and partners have to say.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 hover:bg-secondary/10 hover:text-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 hover:bg-secondary/10 hover:text-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-8 cursor-grab active:cursor-grabbing"
          >
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="w-[85vw] sm:w-[400px] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-background p-8 rounded-2xl border border-border shrink-0 flex flex-col justify-between hover:border-secondary/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div>
                  <div className="flex gap-1 text-secondary mb-6 group-hover:scale-105 origin-left transition-transform duration-300">
                    {"★★★★★"}
                  </div>
                  <p className="text-foreground/90 italic mb-8 leading-relaxed">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary shrink-0 border border-secondary/20 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-secondary font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
            {/* Spacer to fix right-side padding collapse in flex scroll containers */}
            <div className="w-1 shrink-0" />
          </div>
        </div>
      </section>

      {/* Internship Program Preview */}
      <section className="py-16 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-4 text-sm font-medium">
              We're Hiring Interns!
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Tech Career</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our industry-leading internship programs. Work on live projects, get mentored by senior engineers, and kickstart your career.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16 relative">
            {/* Glowing orb behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

            {[
              { track: "Frontend Engineering", icon: Code2 },
              { track: "Backend Engineering", icon: Terminal },
              { track: "Full Stack Mastery", icon: Layers },
              { track: "UI/UX Architecture", icon: Palette },
              { track: "Mobile App Dev", icon: Smartphone },
              { track: "AI & Web Dev", icon: Sparkles },
              { track: "Digital Marketing", icon: TrendingUp }
            ].map((item, i) => (
              <div key={i} className="group relative p-6 bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl text-center hover:border-secondary/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <item.icon className="h-8 w-8 mx-auto mb-4 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
                <span className="font-semibold text-sm relative z-10">{item.track}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Live Projects</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> 1-on-1 Mentorship</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Certificate of Completion</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Interview Preparation</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Certificate Verification</div>
          </div>
          <div className="text-center mt-12">
            <Link href="/internship">
              <Button variant="outline" className="h-12 px-8 group">View All Internship Programs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection
        title="Let's Build Something"
        highlight="Amazing Together"
        description="Ready to transform your idea into a scalable digital product? Let's discuss your project."
        primaryBtnText="Start Your Project"
        primaryBtnLink="/contact"
        primaryBtnIcon={<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
        secondaryBtnText="Schedule a Call"
        secondaryBtnLink="/contact"
        secondaryBtnIcon={<Calendar className="mr-2 h-5 w-5 text-secondary group-hover:text-background group-hover:scale-110 transition-all" />}
      />
    </div>
  )
}
