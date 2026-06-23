"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Script from "next/script"
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
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const applySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  track: z.string().min(1, "Please select a program"),
  plan: z.string(),
  portfolio: z.string().url("Please enter a valid URL including http:// or https://").optional().or(z.literal("")),
  coverLetter: z.string().optional().refine(val => !val || val.length >= 50, {
    message: "Please provide a bit more detail (minimum 50 characters)"
  }),
  resume: z.string().url("Please enter a valid URL to your resume (Drive, Dropbox, etc.)").optional().or(z.literal("")),
  website: z.string().optional(), // Honeypot
})

type ApplyFormValues = z.infer<typeof applySchema>

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
  "Gen AI & AI Web Dev",
  "Digital Marketing"
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
    originalPrice: "₹999",
    description: "Perfect for self-paced learners who just need materials.",
    features: [
      { title: "PDF Materials", desc: "Comprehensive guides and project briefs." },
      { title: "Doubt Sessions", desc: "Weekly group Q&A sessions." },
      { title: "Certificate", desc: "Verified internship certificate." }
    ]
  },
  /*
  {
    id: "premium",
    name: "Premium Plan",
    price: "₹1,199",
    originalPrice: "₹2,499",
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
    price: "₹2,999",
    originalPrice: "₹4,999",
    description: "Guaranteed 1-on-1 mentorship and full premium access.",
    features: [
      { title: "1-on-1 Mentorship", desc: "Dedicated senior engineer mentor." },
      { title: "Video Portal", desc: "Full access to premium video content." },
      { title: "PDF Materials", desc: "Comprehensive guides and project briefs." },
      { title: "Capstone Projects", desc: "Build advanced real-world projects." },
      { title: "Certificate", desc: "Verified internship certificate." }
    ]
  }
  */
]

function ApplicationForm() {
  const searchParams = useSearchParams()
  const defaultTrack = searchParams.get("track")
  const defaultPlan = searchParams.get("plan")

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue, reset } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      track: defaultTrack && tracks.includes(defaultTrack) ? defaultTrack : "",
      plan: defaultPlan && pricingTiers.some(t => t.id === defaultPlan) ? defaultPlan : "standard",
      portfolio: "",
      resume: "",
      coverLetter: "",
      website: ""
    }
  })

  const watchedPlan = watch("plan") || "standard"
  const watchedTrack = watch("track") || ""

  const [countryCode, setCountryCode] = useState("+91")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false)
  const [resumeMethod, setResumeMethod] = useState<"link" | "upload">("upload")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeFileError, setResumeFileError] = useState("")
  const [paymentError, setPaymentError] = useState("")

  // Custom Dropdown State
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [countrySearchQuery, setCountrySearchQuery] = useState("")
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  // Coupon State
  const [couponCode, setCouponCode] = useState("")
  const [couponStatus, setCouponStatus] = useState<"idle" | "valid" | "invalid">("idle")
  const [discountAmount, setDiscountAmount] = useState(0)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

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

  // Apply Coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || watchedPlan === 'general') return;
    setIsApplyingCoupon(true);
    try {
      const response = await fetch('/api/verify-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode: couponCode.trim(), plan: watchedPlan })
      });
      
      const data = await response.json();
      if (data.success) {
        setCouponStatus("valid");
        setDiscountAmount(data.discountAmount);
      } else {
        setCouponStatus("invalid");
        setDiscountAmount(0);
      }
    } catch {
      setCouponStatus("invalid");
      setDiscountAmount(0);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Update track if URL param changes after mount
  useEffect(() => {
    if (defaultTrack && tracks.includes(defaultTrack)) {
      setValue("track", defaultTrack)
    }
  }, [defaultTrack, setValue])

  // Reset coupon when plan changes
  useEffect(() => {
    setCouponStatus("idle")
    setDiscountAmount(0)
    setCouponCode("")
  }, [watchedPlan])

  const onSubmit = async (data: ApplyFormValues) => {
    if (resumeMethod === "upload" && resumeFile) {
      if (resumeFile.size > 5 * 1024 * 1024) {
        setResumeFileError("File size must be less than 5MB")
        return
      }
    }
    setResumeFileError("")

    if (data.plan === "general") {
      try {
        const formData = new FormData()
        formData.append("fullName", data.fullName)
        formData.append("email", data.email)
        formData.append("phone", `${countryCode} ${data.phone}`)
        formData.append("track", data.track)
        formData.append("plan", data.plan)
        if (data.portfolio) formData.append("portfolio", data.portfolio)
        if (data.coverLetter) formData.append("coverLetter", data.coverLetter)
        if (data.website) formData.append("website", data.website) // Honeypot

        formData.append("resumeMethod", resumeMethod)
        if (resumeMethod === "link" && data.resume) {
          formData.append("resumeLink", data.resume)
        } else if (resumeMethod === "upload" && resumeFile) {
          formData.append("resumeFile", resumeFile)
        }

        const response = await fetch('/api/internship', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          reset()
          setResumeFile(null)
          setIsSuccess(true)
        } else {
          alert('Failed to submit application. Please try again.')
        }
      } catch (error) {
        console.error('Submission error:', error)
        alert('An error occurred. Please try again later.')
      }
    } else {
      // Payment Integration Flow
      try {
        setPaymentError("")
        // 1. Create Order
        const orderResponse = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: data.plan, couponCode: couponCode.trim() })
        })
        const orderData = await orderResponse.json()

        if (!orderResponse.ok) {
          alert(orderData.error || 'Failed to initialize payment')
          return
        }

        // 2. Open Razorpay Checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_T1rNmBt4fXxCR8", // Default to test key for safety
          amount: orderData.order.amount,
          currency: "INR",
          name: "Prokodex Internship",
          description: `${pricingTiers.find(p => p.id === data.plan)?.name}`,
          order_id: orderData.order.id,
          handler: async function (response: any) {
            // 3. Verify Payment
            try {
              setIsVerifyingPayment(true)
              const formData = new FormData()
              formData.append("fullName", data.fullName)
              formData.append("email", data.email)
              formData.append("phone", `${countryCode} ${data.phone}`)
              formData.append("track", data.track)
              formData.append("plan", data.plan)
              if (data.portfolio) formData.append("portfolio", data.portfolio)
              if (data.coverLetter) formData.append("coverLetter", data.coverLetter)
              if (data.website) formData.append("website", data.website)

              formData.append("resumeMethod", resumeMethod)
              if (resumeMethod === "link" && data.resume) {
                formData.append("resumeLink", data.resume)
              } else if (resumeMethod === "upload" && resumeFile) {
                formData.append("resumeFile", resumeFile)
              }

              // Append payment info
              formData.append("razorpay_payment_id", response.razorpay_payment_id)
              formData.append("razorpay_order_id", response.razorpay_order_id)
              formData.append("razorpay_signature", response.razorpay_signature)

              const verifyResponse = await fetch('/api/internship/payment-verify', {
                method: 'POST',
                body: formData,
              })

              if (verifyResponse.ok) {
                reset()
                setResumeFile(null)
                setIsSuccess(true)
              } else {
                alert('Payment verification failed. Please contact support.')
              }
            } catch (err) {
              console.error(err)
              alert('An error occurred during verification.')
            } finally {
              setIsVerifyingPayment(false)
            }
          },
          prefill: {
            name: data.fullName,
            email: data.email,
            contact: `${countryCode}${data.phone}`
          },
          theme: {
            color: "#3b82f6" // Secondary brand color
          }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.on('payment.failed', function (response: any) {
          setPaymentError(`Payment Failed: ${response.error.description}`);
        });
        razorpay.open();

      } catch (error) {
        console.error('Payment error:', error)
        setPaymentError('An error occurred. Please try again later.')
      }
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
            Thank you for applying to the <strong className="text-foreground">{watchedTrack}</strong> program. Our hiring team will review your application and get back to you within 3-5 business days.
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

  const basePriceString = pricingTiers.find(p => p.id === watchedPlan)?.price || "₹0"
  const basePriceNumeric = parseInt(basePriceString.replace(/\D/g, "")) || 0
  const finalPriceNumeric = Math.max(0, Math.round(basePriceNumeric - discountAmount))
  const finalPriceDisplay = couponStatus === "valid" ? `₹${finalPriceNumeric.toLocaleString('en-IN')}` : basePriceString

  return (
    <div className="max-w-4xl mx-auto flex flex-col">
      {/* Verifying Payment Overlay */}
      {isVerifyingPayment && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
          <Loader2 className="w-12 h-12 animate-spin text-secondary mb-4" />
          <h3 className="text-xl font-bold mb-2 text-foreground">Verifying Payment...</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Please do not close or refresh this window. We are securing your application.
          </p>
        </div>
      )}

      {/* Top Section - Information */}
      <div className="flex flex-col items-center text-center mb-12">
        <Link href="/internship" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Programs
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
          Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Tech Career</span>
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

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6" noValidate>
            {/* Honeypot Field (Hidden from users) */}
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

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-foreground/80 mb-2">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    {...register("fullName")}
                    placeholder="John Doe"
                    className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.fullName ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                  />
                  {errors.fullName && <AlertCircle className="absolute right-3 top-3.5 h-5 w-5 text-red-500" />}
                </div>
                {errors.fullName && <p className="text-red-500 text-xs font-medium">{errors.fullName.message as string}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground/80 mb-2">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                  />
                  {errors.email && <AlertCircle className="absolute right-3 top-3.5 h-5 w-5 text-red-500" />}
                </div>
                {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message as string}</p>}
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
                        <span className="text-base leading-none">{countryCodes.find(c => c.code === countryCode)?.flag || "🏳️"}</span>
                        <span>{countryCode}</span>
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
                                  setCountryCode(c.code)
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
                      {...register("phone")}
                      placeholder="98765 43210"
                      className={`w-full h-12 bg-background border rounded-r-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
                    />
                    {errors.phone && <AlertCircle className="absolute right-3 top-3.5 h-5 w-5 text-red-500" />}
                  </div>
                </div>
                {errors.phone && <p className="text-red-500 text-xs font-medium">{errors.phone.message as string}</p>}
              </div>

              {/* Program Track */}
              <div>
                <label htmlFor="track" className="block text-sm font-semibold text-foreground/80 mb-2">Program of Interest <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    id="track"
                    {...register("track")}
                    className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 appearance-none cursor-pointer ${errors.track ? 'border-red-500/50 focus:border-red-500 text-foreground' : 'border-border/60 focus:border-secondary text-foreground'}`}
                  >
                    <option value="" disabled>Select a program</option>
                    {tracks.map(track => (
                      <option key={track} value={track}>{track}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                {errors.track && <p className="text-red-500 text-xs font-medium">{errors.track.message as string}</p>}
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
                {...register("portfolio")}
                placeholder="https://github.com/username"
                className={`w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 ${errors.portfolio ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
              />
              {errors.portfolio && <p className="text-red-500 text-xs font-medium">{errors.portfolio.message as string}</p>}
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
                      setResumeFileError("")
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${resumeMethod === "upload" ? "bg-background shadow-sm text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <UploadCloud className="w-3 h-3" /> Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResumeMethod("link")
                      setResumeFileError("")
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
                  {...register("resume")}
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
                            setResumeFileError("");
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
              {errors.resume && <p className="text-red-500 text-xs font-medium">{errors.resume.message as string}</p>}{resumeFileError && <p className="text-red-500 text-xs font-medium">{resumeFileError}</p>}
            </div>

            {/* Plan Selection */}
            <div>
              <label htmlFor="plan" className="block text-sm font-semibold text-foreground/80 mb-2">Choose Your Plan <span className="text-red-500">*</span></label>
              <div className="relative mb-4">
                <select
                  id="plan"
                  {...register("plan")}
                  className="w-full h-12 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 border-border/60 focus:border-secondary appearance-none cursor-pointer text-foreground"
                >
                  {pricingTiers.map(tier => (
                    <option key={tier.id} value={tier.id}>
                      {tier.name} - {tier.price}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-4 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Plan Benefits Popup/Card */}
              <motion.div
                key={watchedPlan}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-secondary/5 border border-secondary/20 rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-secondary/10">
                  <h4 className="font-bold text-sm text-foreground">{pricingTiers.find(p => p.id === watchedPlan)?.name}</h4>
                  <div className="flex items-center gap-2">
                    {pricingTiers.find(p => p.id === watchedPlan)?.originalPrice && (
                      <span className="text-xs font-semibold text-muted-foreground line-through decoration-muted-foreground/50">
                        {pricingTiers.find(p => p.id === watchedPlan)?.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                      {pricingTiers.find(p => p.id === watchedPlan)?.price}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {pricingTiers.find(p => p.id === watchedPlan)?.description}
                </p>
                <ul className="space-y-2">
                  {pricingTiers.find(p => p.id === watchedPlan)?.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                      <span><strong className="text-foreground/80">{feature.title}:</strong> {feature.desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Coupon Logic for Paid Plans */}
              {watchedPlan !== "general" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4"
                >
                  <label htmlFor="coupon" className="block text-sm font-semibold text-foreground/80 mb-2">Have a Coupon Code?</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase())
                        setCouponStatus("idle")
                      }}
                      placeholder="e.g. FLAT50"
                      className="flex-1 h-11 bg-background border rounded-xl px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 border-border/60 focus:border-secondary uppercase"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 border-border/60"
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode.trim()}
                    >
                      {isApplyingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                    </Button>
                  </div>

                  {couponStatus === "valid" && (
                    <p className="text-green-500 text-xs font-medium mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Coupon applied! You saved ₹{discountAmount}
                    </p>
                  )}
                  {couponStatus === "invalid" && (
                    <p className="text-red-500 text-xs font-medium mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Invalid or expired coupon code
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="flex items-center gap-2 text-sm font-semibold text-foreground/80 mb-2">
                Why do you want to join this program?
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">Optional</span>
              </label>
              <textarea
                id="coverLetter"
                {...register("coverLetter")}
                placeholder="Tell us about your background, what excites you about this technology, and what you hope to achieve during the internship..."
                rows={4}
                className={`w-full bg-background border rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/50 placeholder:text-muted-foreground/50 resize-none ${errors.coverLetter ? 'border-red-500/50 focus:border-red-500' : 'border-border/60 focus:border-secondary'}`}
              />
              {errors.coverLetter && <p className="text-red-500 text-xs font-medium">{errors.coverLetter.message as string}</p>}
            </div>

            <div className="space-y-4">
              {paymentError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{paymentError}</p>
                </div>
              )}

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
                ) : watchedPlan === 'general' ? (
                  "Submit Application"
                ) : (
                  `Proceed to Payment (${finalPriceDisplay})`
                )}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background pt-12 pb-16 px-4 relative overflow-hidden selection:bg-secondary/30">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
