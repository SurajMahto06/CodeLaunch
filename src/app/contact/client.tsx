"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, MessageSquare, Send, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(), // Honeypot field
})

type ContactFormValues = z.infer<typeof contactSchema>

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false)

  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      inquiryType: "",
      message: "",
      website: "",
    }
  })

  const selectedInquiryType = watch("inquiryType")

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const inquiryLabels: Record<string, string> = {
        "project": "Project Development",
        "digital-marketing": "Digital Marketing",
        "video-graphics": "Video & Graphic Design",
        "consulting": "Consulting & Strategy",
        "career": "Careers & Jobs",
        "internship": "Internships & Training",
        "other": "Other Inquiry",
      }

      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('email', data.email)
      formData.append('inquiryType', inquiryLabels[data.inquiryType] || data.inquiryType)
      formData.append('message', data.message)
      if (data.website) formData.append('website', data.website)

      const fileInput = document.getElementById('resume') as HTMLInputElement
      if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append('resume', fileInput.files[0])
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
        if (fileInput) fileInput.value = ''
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-secondary/30">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="pt-16 pb-16 px-4 container mx-auto">
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
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Touch</span>
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
                    <p className="text-sm text-muted-foreground">hello@prokodex.com</p>
                    <p className="text-sm text-muted-foreground">careers@prokodex.com</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm group hover:border-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-sm text-muted-foreground">
                      <a href="tel:+917250591448" className="hover:text-secondary transition-colors font-medium">+91 72505 91448</a>
                    </p>
                    <p className="text-sm text-muted-foreground">Mon - Sat, 10am - 6pm</p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm group hover:border-secondary/50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">WhatsApp Us</h4>
                    <p className="text-sm text-muted-foreground">
                      <a href="https://wa.me/917250591448" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors font-medium">+91 72505 91448</a>
                    </p>
                    <p className="text-sm text-muted-foreground">Instant chat support</p>
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
                <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold mb-8 tracking-tight">Send us a Message</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-foreground/80 mb-2">First Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName")}
                        className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.firstName ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                        placeholder="First Name"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>

                    {/* Honeypot Field (Hidden from users, visible to bots) */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        {...register("website")}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-foreground/80 mb-2">Last Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName")}
                        className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.lastName ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                        placeholder="Last Name"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground/80 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                      placeholder="your@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-semibold text-foreground/80 mb-2">Inquiry Type <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        id="inquiryType"
                        {...register("inquiryType")}
                        className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 appearance-none cursor-pointer ${errors.inquiryType ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                      >
                        <option value="">Select a topic</option>
                        <option value="project">Project Development</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="video-graphics">Video & Graphic Design</option>
                        <option value="consulting">Consulting & Strategy</option>
                        <option value="career">Careers & Jobs</option>
                        <option value="internship">Internships & Training</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                      <div className="absolute right-4 top-4 text-muted-foreground pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      </div>
                    </div>
                    {errors.inquiryType && <p className="text-red-500 text-xs mt-1">{errors.inquiryType.message}</p>}
                  </div>

                  {selectedInquiryType === 'career' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="overflow-hidden"
                    >
                      <label htmlFor="resume" className="block text-sm font-semibold text-foreground/80 mb-2">Upload Resume <span className="text-muted-foreground text-xs font-normal">(PDF, DOC, DOCX)</span></label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        className="flex w-full items-center h-12 bg-background border border-border/60 rounded-xl px-3 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 file:cursor-pointer cursor-pointer text-muted-foreground"
                      />
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground/80 mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
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
