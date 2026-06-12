"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Search,
  UploadCloud,
  X,
  FileText,
  Link2,
  Building2,
  Users
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import countryCodes from "@/data/countryCodes.json"

// Need to match the tracks from the main internship page
const tracks = [
  "Frontend Development",
  "Node.js & Express Backend",
  "MERN Stack Development",
  "MEAN Stack Development",
  "Laravel Backend",
  "React Native App Dev",
  "Flutter App Development",
  "UI/UX Design",
  "Gen AI & AI Web Dev"
]

const pricingTiers = [
  {
    id: "general",
    name: "Talk to an Advisor",
    price: "Free Callback",
    description: "Have doubts? We'll call you back and help you select the right plan.",
    features: [
      { title: "Expert Guidance", desc: "Get answers to all your queries directly from our team." },
      { title: "Plan Selection", desc: "We'll help you choose the best track for your career goals." },
      { title: "No Commitment", desc: "100% free consultation with no obligation to enroll." }
    ]
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: "₹599",
    description: "Perfect for self-paced learners who just need materials.",
    features: [
      { title: "PDF Materials", desc: "Comprehensive guides and project briefs." },
      { title: "Doubt Sessions", desc: "Weekly group Q&A sessions." },
      { title: "Certificate", desc: "Verified internship certificate." }
    ]
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "₹1,199",
    description: "The complete training experience with video lectures.",
    features: [
      { title: "Video Portal", desc: "Access to our premium video lectures." },
      { title: "PDF Materials", desc: "Comprehensive guides and project briefs." },
      { title: "Doubt Sessions", desc: "Weekly group Q&A sessions." },
      { title: "Capstone Projects", desc: "Build advanced real-world projects." },
      { title: "Certificate", desc: "Verified internship certificate." }
    ]
  },
  {
    id: "elite",
    name: "Elite Mentorship",
    price: "₹5,999",
    description: "Guaranteed 1-on-1 mentorship and full premium access.",
    features: [
      { title: "1-on-1 Mentorship", desc: "Dedicated senior engineer mentor." },
      { title: "Video Portal", desc: "Full access to premium video content." },
      { title: "PDF Materials", desc: "Comprehensive guides and project briefs." },
      { title: "Capstone Projects", desc: "Build advanced real-world projects." },
      { title: "Certificate", desc: "Verified internship certificate." }
    ]
  }
]

function ApplicationForm() {
  const searchParams = useSearchParams()
  const defaultTrack = searchParams.get("track")
  const defaultPlan = searchParams.get("plan")

  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    track: defaultTrack && tracks.includes(defaultTrack) ? defaultTrack : "",
    plan: defaultPlan && pricingTiers.some(t => t.id === defaultPlan) ? defaultPlan : "standard",
    portfolio: "",
    resume: "",
    coverLetter: ""
  })

  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Resume Upload State
  const [resumeMethod, setResumeMethod] = useState<"link" | "upload">("upload")
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  // Custom Dropdown State
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredCountries = countryCodes.filter(c =>
    c.label.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    c.code.includes(countrySearchQuery)
  )

  // Update track if URL param changes after mount
  useEffect(() => {
    if (defaultTrack && tracks.includes(defaultTrack)) {
      setFormData(prev => ({ ...prev, track: defaultTrack }))
    }
  }, [defaultTrack])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.track) newErrors.track = "Please select a program"



    if (formData.portfolio && !/^https?:\/\/.*/.test(formData.portfolio)) {
      newErrors.portfolio = "Please enter a valid URL including http:// or https://"
    }

    if (resumeMethod === "link") {
      if (formData.resume.trim() && !/^https?:\/\/.*/.test(formData.resume)) {
        newErrors.resume = "Please enter a valid URL to your resume (Drive, Dropbox, etc.)"
      }
    } else {
      if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
        newErrors.resume = "File size must be less than 5MB"
      }
    }

    if (formData.coverLetter.trim() && formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Please provide a bit more detail (minimum 50 characters)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      setIsSubmitting(false)
      setIsSuccess(true)

      // In a real application, you would send formData to your backend here
      console.log("Form submitted successfully:", formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card/40 backdrop-blur-md border border-border/60 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden max-w-2xl mx-auto mt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Application Received!</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Thank you for applying to the <strong className="text-foreground">{formData.track}</strong> program. Our hiring team will review your application and get back to you within 3-5 business days.
          </p>
          <Link href="/internship">
            <Button className="h-12 px-8 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              Return to Programs
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col">
      {/* Top Section - Information */}
      <div className="flex flex-col items-center text-center mb-12">
        <Link href="/internship" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Programs
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
          Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-transparent via-secondary/60 to-secondary">Tech Career</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
          Join our elite internship program and work on real-world enterprise projects under the guidance of industry experts.
        </p>

        <div className="flex flex-wrap justify-center gap-3 w-full">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/30 border border-border/50 backdrop-blur-sm">
            <Briefcase className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Real-world Experience</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/30 border border-border/50 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Verified Internship</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/30 border border-border/50 backdrop-blur-sm">
            <Building2 className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">MSME Registered</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/30 border border-border/50 backdrop-blur-sm">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">1-on-1 Mentorship</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full">
        <div className="bg-card/40 backdrop-blur-md border border-border/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6" noValidate>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-foreground/80 mb-2">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.fullName ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                  />
                  {errors.fullName && <AlertCircle className="absolute right-3 top-3.5 h-5 w-5 text-red-500" />}
                </div>
                {errors.fullName && <p className="text-red-500 text-xs font-medium">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground/80 mb-2">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                  />
                  {errors.email && <AlertCircle className="absolute right-3 top-3.5 h-5 w-5 text-red-500" />}
                </div>
                {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground/80 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <div className="relative flex">
                  <div className="relative w-[100px] flex-shrink-0" ref={countryDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="w-full h-12 bg-background border border-r-0 border-border/60 rounded-l-xl px-3 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 focus:border-secondary focus:z-10 flex items-center justify-between"
                    >
                      <span className="truncate mr-1 flex items-center gap-1.5">
                        <span className="text-base leading-none">{countryCodes.find(c => c.code === formData.countryCode)?.flag || "🏳️"}</span>
                        <span>{formData.countryCode}</span>
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </button>

                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border/60 rounded-xl shadow-xl z-50 overflow-hidden backdrop-blur-md">
                        <div className="p-2 border-b border-border/60 relative">
                          <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search country..."
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-background/50 border border-border/50 rounded-lg text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto p-1">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                className="w-full text-left px-3 py-2.5 text-sm rounded-lg hover:bg-secondary/10 hover:text-secondary transition-colors flex items-center gap-2"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, countryCode: c.code }))
                                  setIsCountryDropdownOpen(false)
                                  setCountrySearchQuery("")
                                }}
                              >
                                <span className="text-base leading-none">{c.flag}</span>
                                <span className="truncate">{c.label}</span>
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-4 text-sm text-center text-muted-foreground">No countries found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="555-000-0000"
                      className={`w-full h-12 bg-background border rounded-r-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                    />
                    {errors.phone && <AlertCircle className="absolute right-3 top-3.5 h-5 w-5 text-red-500" />}
                  </div>
                </div>
                {errors.phone && <p className="text-red-500 text-xs font-medium">{errors.phone}</p>}
              </div>

              {/* Program Track */}
              <div>
                <label htmlFor="track" className="block text-sm font-semibold text-foreground/80 mb-2">Program of Interest <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    id="track"
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 appearance-none cursor-pointer ${errors.track ? 'border-red-500/50 focus:border-red-500 text-foreground' : 'border-border/60 focus:border-secondary text-foreground'}`}
                  >
                    <option value="" disabled>Select a program</option>
                    {tracks.map(track => (
                      <option key={track} value={track}>{track}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                {errors.track && <p className="text-red-500 text-xs font-medium">{errors.track}</p>}
              </div>
            </div>

            {/* Portfolio & Resume */}
            <div>
              <label htmlFor="portfolio" className="flex items-center gap-2 text-sm font-semibold text-foreground/80 mb-2">
                Portfolio / GitHub URL
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">Optional</span>
              </label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.portfolio ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
              />
              {errors.portfolio && <p className="text-red-500 text-xs font-medium">{errors.portfolio}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  Resume
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">Optional</span>
                </label>
                <div className="flex gap-1 bg-secondary/10 p-1 rounded-lg relative z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setResumeMethod("upload")
                      setErrors(prev => { const e = { ...prev }; delete e.resume; return e; })
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${resumeMethod === "upload" ? "bg-background shadow-sm text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <UploadCloud className="w-3 h-3" /> Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeMethod("link")
                      setErrors(prev => { const e = { ...prev }; delete e.resume; return e; })
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${resumeMethod === "link" ? "bg-background shadow-sm text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Link2 className="w-3 h-3" /> Link
                  </button>
                </div>
              </div>

              {resumeMethod === "link" ? (
                <input
                  type="url"
                  id="resume"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/file/d/..."
                  className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.resume ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                />
              ) : (
                <div className={`relative border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center p-4 bg-background/50 hover:bg-background group ${errors.resume ? 'border-red-500/50 hover:border-red-500/80' : 'border-border/60 hover:border-secondary/50'} h-32`}>
                  {resumeFile ? (
                    <div className="flex items-center justify-between w-full px-2">
                      <div className="flex items-center gap-3 overflow-hidden z-10">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-sm font-medium truncate">{resumeFile.name}</span>
                          <span className="text-xs text-muted-foreground">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="w-8 h-8 rounded-full hover:bg-red-500/10 flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0 z-20 relative cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="resumeFile"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFile(e.target.files[0]);
                            if (errors.resume) {
                              setErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors.resume;
                                return newErrors;
                              });
                            }
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-secondary transition-colors mb-2" />
                      <span className="text-sm font-medium">Click or drag to upload resume</span>
                      <span className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 5MB</span>
                    </>
                  )}
                </div>
              )}
              {errors.resume && <p className="text-red-500 text-xs font-medium">{errors.resume}</p>}
            </div>

            {/* Plan Selection */}
            <div>
              <label htmlFor="plan" className="block text-sm font-semibold text-foreground/80 mb-2">Choose Your Plan <span className="text-red-500">*</span></label>
              <div className="relative mb-4">
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 border-border/60 focus:border-secondary appearance-none cursor-pointer text-foreground"
                >
                  {pricingTiers.map(tier => (
                    <option key={tier.id} value={tier.id}>{tier.name} - {tier.price}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Plan Benefits Popup/Card */}
              <motion.div
                key={formData.plan}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary/5 border border-secondary/20 rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-secondary/10">
                  <h4 className="font-bold text-sm text-foreground">{pricingTiers.find(p => p.id === formData.plan)?.name}</h4>
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                    {pricingTiers.find(p => p.id === formData.plan)?.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {pricingTiers.find(p => p.id === formData.plan)?.description}
                </p>
                <ul className="space-y-2">
                  {pricingTiers.find(p => p.id === formData.plan)?.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                      <span><strong className="text-foreground/80">{feature.title}:</strong> {feature.desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="flex items-center gap-2 text-sm font-semibold text-foreground/80 mb-2">
                Why do you want to join this program?
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">Optional</span>
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us about your background, what excites you about this technology, and what you hope to achieve during the internship..."
                rows={4}
                className={`w-full bg-background border rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 resize-none ${errors.coverLetter ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
              />
              {errors.coverLetter && <p className="text-red-500 text-xs font-medium">{errors.coverLetter}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base shadow-lg shadow-secondary/20 transition-all hover:shadow-secondary/40"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : formData.plan === 'general' ? (
                "Submit Application"
              ) : (
                `Proceed to Payment (${pricingTiers.find(p => p.id === formData.plan)?.price})`
              )}
            </Button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background pt-12 pb-24 px-4 relative overflow-hidden selection:bg-secondary/30">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <Suspense fallback={
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-10 h-10 animate-spin text-secondary" />
        </div>
      }>
        <ApplicationForm />
      </Suspense>
    </div>
  )
}
