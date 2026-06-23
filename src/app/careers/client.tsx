"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
  Laptop,
  CheckCircle2,
  GraduationCap,
  Users,
  Compass,
  Zap,
  Coffee,
  X
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CtaSection } from "@/components/sections/cta-section"

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
}

const jobs = [
  {
    id: "sr-fullstack",
    title: "Senior Full Stack Engineer (Next.js & Node.js)",
    department: "Engineering",
    location: "Remote / Hybrid (India)",
    type: "Full-Time",
    experience: "4+ Years",
    description: "We are looking for a Senior Full Stack Engineer to lead the design and development of scalable enterprise dashboards and interactive platforms. You will set architecture standards, mentor junior engineers, and push Next.js performance limits.",
    requirements: [
      "Expert understanding of React 19, Next.js App Router, and Server Components.",
      "Proficient in building high-concurrency Node.js / Express microservices.",
      "Solid database design experience using PostgreSQL, MongoDB, and Redis caching.",
      "Familiarity with containerization (Docker) and AWS cloud deployments.",
      "Strong communication and team leadership skills."
    ],
    benefits: [
      "Competitive Salary + Performance Bonuses",
      "Flexible Remote Work Environment",
      "Premium Hardware Allowance",
      "Comprehensive Health Insurance"
    ]
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "2+ Years",
    description: "Join us to shape the look, feel, and flow of our custom SaaS, ERP and mobile products. You will turn complex enterprise workflows into intuitive, beautiful, and interactive modern user experiences.",
    requirements: [
      "Strong portfolio showcasing complex web application and mobile UI/UX designs.",
      "Mastery of Figma (advanced components, auto-layouts, and prototyping).",
      "Deep understanding of typography, color theory, grid systems, and responsiveness.",
      "Experience conducting user interviews and usability tests.",
      "Basic understanding of Tailwind CSS and frontend capabilities is a plus."
    ],
    benefits: [
      "Competitive Compensation",
      "Creative Freedom & High Impact on Products",
      "Annual Design Resource/Book Allowance",
      "Remote Work & Flexible Hours"
    ]
  },
  {
    id: "backend-laravel",
    title: "Backend Engineer (Laravel & PostgreSQL)",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-Time",
    experience: "2+ Years",
    description: "We are seeking a backend specialist to build secure database schemas, scale RESTful APIs, and configure cron queues using Laravel. You will work on robust billing portals and client ERP modules.",
    requirements: [
      "Strong command over Object-Oriented PHP and Laravel framework concepts.",
      "Deep experience with relational database design and writing optimized SQL queries in PostgreSQL.",
      "Proficiency in setting up task queues, cron jobs, and caching strategies (Redis).",
      "Familiarity with writing automated unit and integration tests (PHPUnit).",
      "Git version control and basic DevOps pipeline knowledge."
    ],
    benefits: [
      "Competitive Salary",
      "Regular Career Development & Tech Courses",
      "Flexible Remote Work Setup",
      "Annual Paid Time Off"
    ]
  },
  {
    id: "qa-automation",
    title: "QA Automation Engineer",
    department: "Quality Assurance",
    location: "Remote",
    type: "Full-Time",
    experience: "2+ Years",
    description: "Help us maintain our zero-downtime, bug-free standards. You will write automated end-to-end integration test suites for client projects and set up CI/CD pipeline test gates.",
    requirements: [
      "Experience writing test scripts using Playwright, Cypress, or Selenium.",
      "Strong script coding skills (JavaScript, TypeScript, or Python).",
      "Familiarity with API testing tools (Postman, Jest) and security audits.",
      "Experience incorporating automated testing gates in GitHub Actions.",
      "Detail-oriented with a strong focus on edge cases and product polish."
    ],
    benefits: [
      "Competitive Salary",
      "Flexible Remote Setup",
      "Wellness & Mental Health Benefits",
      "Opportunities for Full-Stack training"
    ]
  }
]

const values = [
  {
    icon: Zap,
    title: "Unmatched Speed & Quality",
    desc: "We believe in writing clean, performant code. We optimize every query, component, and animation to deliver state-of-the-art experiences."
  },
  {
    icon: Users,
    title: "Extreme Collaboration",
    desc: "No silos here. Engineers, designers, and project stakeholders communicate openly, share knowledge, and solve problems together."
  },
  {
    icon: GraduationCap,
    title: "Continuous Growth",
    desc: "Technology evolves rapidly, and so do we. We support active learning, provide resources, and sponsor technical courses for all team members."
  },
  {
    icon: Compass,
    title: "Ownership & Freedom",
    desc: "We trust our teammates. You take full ownership of features, work flexible hours, and have the freedom to propose new tech solutions."
  }
]

const perks = [
  { icon: Laptop, title: "Modern Tech Stack", desc: "Work with bleeding-edge technologies. We build scalable products using Next.js, React, Node.js, and generative AI." },
  { icon: Heart, title: "Health & Wellness", desc: "Premium health insurance coverages and wellness stipends." },
  { icon: Coffee, title: "Remote-First Culture", desc: "Work from anywhere with flexible hours, virtual team events, and asynchronous communication." },
  { icon: Sparkles, title: "Learning Budgets", desc: "Paid technical courses, design assets, and attendance at tech conferences." }
]

function JobCard({ job, index }: { job: typeof jobs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onClick={() => setIsOpen(true)}
        className="group relative p-6 md:p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-sm border border-border/60 hover:border-secondary/50 hover:shadow-2xl transition-[border-color,box-shadow] duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center text-xs font-semibold bg-secondary/15 text-secondary px-3 py-1 rounded-full border border-secondary/20">
            {job.department}
          </span>
          <span className="inline-flex items-center text-xs font-semibold bg-card border border-border px-3 py-1 rounded-full text-muted-foreground">
            {job.type}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-secondary transition-colors">
          {job.title}
        </h3>

        <div className="flex flex-col gap-2.5 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-secondary shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-secondary shrink-0" />
            <span>Experience: {job.experience}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
          {job.description}
        </p>

        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between group/btn">
          <span className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">
            View Details & Apply
          </span>
          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover/btn:bg-secondary group-hover/btn:text-secondary-foreground transition-all duration-300">
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-card border border-border shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-border bg-muted/30">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs font-bold bg-secondary/10 text-secondary px-2.5 py-1 rounded-full border border-secondary/25">
                      {job.department}
                    </span>
                    <span className="text-xs font-medium bg-background border border-border px-2.5 py-1 rounded-full text-muted-foreground">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">{job.title}</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 rounded-full flex flex-shrink-0 items-center justify-center bg-background border border-border hover:bg-muted hover:text-secondary transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8">
                <div>
                  <h4 className="font-bold text-lg mb-3">Role Overview</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {job.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4">Requirements</h4>
                    <ul className="space-y-3">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-4">Key Benefits</h4>
                    <ul className="space-y-3">
                      {job.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 border-t border-border bg-muted/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-xs text-muted-foreground text-center sm:text-left">
                  Refer to this job ID when contacting: <strong>{job.id}</strong>
                </div>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto cursor-pointer bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 h-12 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:shadow-secondary/40">
                    Apply For This Position <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 bg-background flex items-center justify-center overflow-hidden border-b border-border">
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
              We're Hiring for 2026!
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Prokodex Team</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
              Build the digital infrastructure of tomorrow. Work with a passionate group of designers, developers, and product minds in a high-growth environment.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
              <Link href="#open-positions">
                <Button size="lg" className="cursor-pointer h-14 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)]">
                  Explore Positions <Briefcase className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/internship">
                <Button size="lg" variant="outline" className="cursor-pointer h-14 px-8 text-lg border-border/60 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/50">
                  Looking for Internships?
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Core <span className="text-secondary">Values</span></h2>
            <p className="text-lg text-muted-foreground">
              What drives our engineers, designers, and project managers every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-[2rem] bg-card/40 border border-border/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary mb-6">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section id="open-positions" className="py-16 bg-background relative border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Opportunities</span></h2>
            <p className="text-lg text-muted-foreground">
              Explore our current open job listings. Click on any card to view detailed requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="py-16 bg-muted/30 relative border-t border-border">
        <div className="container mx-auto px-4">
          <div className="bg-card/30 backdrop-blur-sm border border-border/60 rounded-[3rem] p-8 md:p-16 relative overflow-hidden max-w-6xl mx-auto">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-6 text-sm font-semibold tracking-wide uppercase border border-secondary/20">
                  Life at Prokodex
                </div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">Perks & <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Benefits</span></h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  We invest heavily in the happiness, health, and career growth of our team members. Enjoy a balanced, innovative culture built for developers and creators.
                </p>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                {perks.map((perk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="p-5 rounded-2xl bg-card border border-border/50 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary mb-4">
                      <perk.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base mb-2">{perk.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{perk.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <CtaSection
        title="Don't see a perfect fit?"
        highlight="Let's Talk anyway."
        description="We are always looking for stellar engineering, design, and project management talent. Send us your portfolio and let's see what we can build together."
        primaryBtnText="Get In Touch"
        primaryBtnLink="/contact"
        primaryBtnIcon={<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
        secondaryBtnText="Learn About Internships"
        secondaryBtnLink="/internship"
      />
    </div>
  )
}
