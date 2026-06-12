"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, MessageSquare, Send, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-secondary/30">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="pt-24 pb-24 px-4 container mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-6 text-sm font-semibold tracking-wide uppercase border border-secondary/20">
            <MessageSquare className="w-4 h-4" /> Let's Connect
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-transparent via-secondary/60 to-secondary">Touch</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Have a groundbreaking project in mind or want to learn more about our services? We'd love to collaborate with you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We're currently available for new projects, consulting engagements, and partnerships. Reach out directly through any of these channels.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-5 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm group hover:border-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <p className="text-sm text-muted-foreground">hello@codelaunch.tech</p>
                    <p className="text-sm text-muted-foreground">careers@codelaunch.tech</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm group hover:border-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon - Fri, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm group hover:border-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Visit Us</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      123 Innovation Drive<br />
                      Tech Park, CA 94043
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>


          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-card/40 backdrop-blur-md border border-border/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

              {isSuccess ? (
                <div className="relative z-10 py-16 text-center">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 tracking-tight">Message Sent!</h3>
                  <p className="text-muted-foreground text-lg mb-8">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="h-12 px-8 rounded-xl font-semibold text-base shadow-lg hover:-translate-y-0.5 transition-transform"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold mb-8 tracking-tight">Send us a Message</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-foreground/80 mb-2">First Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="w-full h-12 bg-background border border-border/60 focus:border-secondary rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-foreground/80 mb-2">Last Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="w-full h-12 bg-background border border-border/60 focus:border-secondary rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground/80 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full h-12 bg-background border border-border/60 focus:border-secondary rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-semibold text-foreground/80 mb-2">Inquiry Type <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        id="inquiryType"
                        required
                        className="w-full h-12 bg-background border border-border/60 focus:border-secondary rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 appearance-none cursor-pointer"
                      >
                        <option value="">Select a topic</option>
                        <option value="project">Project Development</option>
                        <option value="consulting">Consulting & Strategy</option>
                        <option value="internship">Internship & Careers</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                      <div className="absolute right-4 top-4 text-muted-foreground pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground/80 mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full bg-background border border-border/60 focus:border-secondary rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base shadow-lg shadow-secondary/20 transition-all hover:shadow-secondary/40 cursor-pointer mt-4"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
