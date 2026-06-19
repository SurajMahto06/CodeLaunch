"use client"

import { motion } from "framer-motion"
import { Code2, Users, Target, Globe2, Cpu, Zap, Heart, Award, ArrowRight, Compass } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CtaSection } from "@/components/sections/cta-section"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 bg-background flex items-center justify-center overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-6 text-sm font-semibold tracking-wide uppercase">
              Our Story
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Architecting the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Digital Experiences</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We are an elite team of engineers, designers, and strategists building scalable software solutions that drive exponential growth for startups and enterprises globally.
            </motion.p>
          </motion.div>
        </div>
      </section>


      {/* Mission & Vision (Asymmetrical Grid) */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl rounded-[3rem] opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              <div className="aspect-[4/5] md:aspect-square bg-card/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col justify-end p-8 transform transition-transform duration-700 group-hover:-rotate-y-2 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

                {/* Decorative Tech Graphic inside the box */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
                  <div className="w-[150%] h-[150%] border-[2px] border-secondary/30 rounded-full animate-[spin_40s_linear_infinite]" />
                  <div className="absolute w-[100%] h-[100%] border-[2px] border-primary/30 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                  <Code2 className="absolute h-32 w-32 text-secondary" />
                </div>

                <div className="relative z-20 space-y-6">
                  <div className="h-16 w-16 bg-secondary/20 rounded-2xl flex items-center justify-center border border-secondary/30 mb-8 backdrop-blur-sm">
                    <Target className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-3xl font-bold">Our Mission</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To empower visionary companies with robust, scalable, and elegantly designed software. We transform complex business problems into seamless digital realities.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Engineering Excellence at Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Core</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Founded by a group of passionate software architects, Prokodex was born out of a desire to bridge the gap between stunning design and flawless backend performance. We don't just write code; we build the infrastructure of tomorrow.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-secondary/5 border border-secondary/10 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <Compass className="h-10 w-10 text-secondary mb-6 relative z-10" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  To be the most trusted technology partner for global enterprises and the premier launching pad for the next generation of top-tier engineering talent through our elite internship programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-card/40 border-y border-border relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Values</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The fundamental principles that guide our code, our culture, and our relationship with clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "Uncompromising Quality", desc: "We adhere strictly to clean code architecture, automated testing, and rigorous code reviews. Good enough is never enough." },
              { icon: Heart, title: "Empathy-Driven Design", desc: "Every pixel we place and every flow we build is centered around the human who will ultimately use the product." },
              { icon: Zap, title: "Velocity & Agility", desc: "We deploy fast and iterate faster. Our CI/CD pipelines and agile methodologies ensure rapid time-to-market." },
              { icon: Globe2, title: "Global Perspective", desc: "We build for a diverse, worldwide audience, ensuring accessibility, localization, and inclusive design from day one." },
              { icon: Award, title: "Radical Transparency", desc: "Honesty in timelines, budgets, and technical challenges. We operate as an extension of your own internal team." },
              { icon: Users, title: "Continuous Mentorship", desc: "We constantly uplift each other. Through our academy and intern programs, we are actively shaping the future of tech." },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group p-8 rounded-3xl bg-background border border-border/60 hover:border-secondary/50 hover:shadow-2xl transition-[border-color,box-shadow] duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Dual CTA Section */}
      <CtaSection
        title="Take the"
        highlight="Next Step"
        description="Whether you want to build a groundbreaking digital product or start an incredible career in tech, we're ready for you."
        primaryBtnText="Start a Project"
        primaryBtnLink="/contact"
        secondaryBtnText="Apply for Internship"
        secondaryBtnLink="/internship"
      />

    </div>
  )
}
