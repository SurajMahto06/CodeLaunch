"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Search, CheckCircle2, XCircle, Award, Calendar, User, Building, ArrowRight, ShieldCheck, Lock, QrCode, Landmark, Zap, X, AlertTriangle, LinkIcon, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import axios from "axios"

const verifySchema = z.object({
  certificateId: z.string().min(1, "Certificate ID is required"),
  botCheck: z.string().optional(),
})

type VerifyFormValues = z.infer<typeof verifySchema>

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function VerifyPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <VerifyPageContent />
    </React.Suspense>
  )
}

function VerifyPageContent() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [certData, setCertData] = React.useState<any>(null)
  const [invalidLink, setInvalidLink] = React.useState(false)
  const searchParams = useSearchParams()
  const initialIdParam = searchParams.get("id")
  const [isAutoVerifying, setIsAutoVerifying] = React.useState(!!initialIdParam)

  React.useEffect(() => {
    if (status === "success" || status === "error") {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      document.documentElement.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
      document.documentElement.style.overflow = "unset"
    }
  }, [status])

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { certificateId: "", botCheck: "" }
  })

  const certificateId = watch("certificateId")

  // Handle URL-based verification
  React.useEffect(() => {
    const idParam = searchParams.get("id")
    const queryString = searchParams.toString()

    if (idParam) {
      // Valid format: ?id=SOME_VALUE — auto-trigger verification
      setIsAutoVerifying(true)
      setValue("certificateId", idParam)
      setInvalidLink(false)
      handleVerify(idParam)
    } else if (queryString) {
      // URL has query string but no `id` param (e.g., ?jlkmn, ?random=xyz)
      setInvalidLink(true)
      setIsAutoVerifying(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleVerify = async (id: string, botCheck?: string) => {
    setStatus("loading")
    setCertData(null)
    try {
      const response = await axios.post('/api/verify', { id, botCheck })
      const result = response.data
      if (response.status === 200 && result.success) {
        setCertData(result.certificate)
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Verification error:", error)
      setStatus("error")
    } finally {
      setIsAutoVerifying(false)
    }
  }

  const onSubmit = async (data: VerifyFormValues) => {
    setInvalidLink(false)
    handleVerify(data.certificateId, data.botCheck)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-secondary/30 pt-8 pb-20 flex flex-col items-center justify-center">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        {/* Invalid Link Warning Banner */}
        <AnimatePresence>
          {invalidLink && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-11 h-11 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-amber-500 mb-1">Invalid Verification Link</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      The link you used doesn't contain a valid certificate ID. This may happen if the URL was copied incorrectly or is incomplete.
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                      Please enter your certificate ID manually below in the format <span className="font-semibold text-foreground">CL-YYYY-XXXX</span>, or scan the QR code on your certificate.
                    </p>
                  </div>
                  <button
                    onClick={() => setInvalidLink(false)}
                    className="p-1.5 hover:bg-amber-500/10 rounded-full transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
                    aria-label="Dismiss warning"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-6 text-sm font-semibold tracking-wide uppercase border border-secondary/20">
            <Award className="w-4 h-4" /> Certification
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Verify <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Certificate</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
            Enter the certificate ID to verify the authenticity of an internship or training program completed at Prokodex.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/60 text-sm text-muted-foreground shadow-sm">
              <Lock className="w-4 h-4 text-secondary" /> Secure Digital Records
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/60 text-sm text-muted-foreground shadow-sm">
              <Building className="w-4 h-4 text-secondary" /> MSME Registered
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/60 text-sm text-muted-foreground shadow-sm">
              <QrCode className="w-4 h-4 text-secondary" /> Unique ID & QR Validation
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/60 text-sm text-muted-foreground shadow-sm">
              <Landmark className="w-4 h-4 text-secondary" /> Trusted by Companies & Institutions
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/60 text-sm text-muted-foreground shadow-sm">
              <Zap className="w-4 h-4 text-secondary" /> Instant Verification
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="bg-card/40 backdrop-blur-md border border-border/60 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 flex flex-col sm:flex-row gap-4">
              {/* Honeypot Field */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="botCheck">Leave this field empty</label>
                <input
                  type="text"
                  id="botCheck"
                  {...register("botCheck")}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  {...register("certificateId")}
                  placeholder="Enter Certificate ID (e.g., CL-2026-XYZ)"
                  className={`w-full pl-12 pr-4 h-14 rounded-xl border bg-background/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all ${errors.certificateId ? 'border-red-500/50 focus:border-red-500' : 'border-input/50 focus:border-secondary'}`}
                />
                {errors.certificateId && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-2">{errors.certificateId.message}</p>}
              </div>
              <Button type="submit" disabled={status === "loading"} className="h-14 px-8 rounded-xl font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] transition-all">
                {status === "loading" ? "Verifying..." : "Verify Now"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {/* Success State */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setStatus("idle")}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border/60 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-y-auto max-h-[90vh] w-full max-w-2xl"
            >
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

              <button
                onClick={() => setStatus("idle")}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-background/50 hover:bg-secondary/10 rounded-full transition-colors text-muted-foreground hover:text-foreground z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 mt-2 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-8 pb-5 sm:pb-8 border-b border-border/50 pr-8 sm:pr-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-green-500 tracking-tight">Certificate Verified</h2>
                    <p className="text-muted-foreground text-xs sm:text-base mt-0.5 sm:mt-1">This is a valid Prokodex credential.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2 font-medium">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500/70" /> Student Name
                    </div>
                    <div className="font-semibold text-sm sm:text-lg">{certData.studentName}</div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2 font-medium">
                      <Building className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500/70" /> Role
                    </div>
                    <div className="font-semibold text-sm sm:text-lg">{certData.role}</div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2 font-medium">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500/70" /> Duration
                    </div>
                    <div className="font-semibold text-sm sm:text-lg">{certData.duration}</div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2 font-medium">
                      <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500/70" /> Certificate ID
                    </div>
                    <div className="font-semibold text-sm sm:text-lg uppercase tracking-wider">{certData.id}</div>
                  </div>

                  <div className="space-y-1 sm:space-y-2 col-span-1 sm:col-span-2 pt-3 sm:pt-4 border-t border-border/50">
                    <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 sm:gap-2 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500/70" /> Date of Issue
                    </div>
                    <div className="font-semibold text-sm sm:text-lg text-foreground/90 leading-relaxed">
                      {certData.issueDate}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Error State */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setStatus("idle")}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-destructive/20 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-y-auto max-h-[90vh] text-center w-full max-w-md"
            >
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-destructive/5 rounded-full blur-[100px] pointer-events-none" />

              <button
                onClick={() => setStatus("idle")}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-background/50 hover:bg-destructive/10 rounded-full transition-colors text-muted-foreground hover:text-foreground z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 mt-6 sm:mt-4">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <XCircle className="h-7 w-7 sm:h-10 sm:w-10 text-destructive" />
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-destructive mb-2 sm:mb-3 tracking-tight">Verification Failed</h2>
                <p className="text-muted-foreground text-xs sm:text-base leading-relaxed max-w-sm mx-auto">
                  We couldn't find a certificate matching the ID <span className="font-semibold text-foreground uppercase">"{certificateId}"</span>. Please check the ID and try again.
                </p>
                <Button
                  onClick={() => setStatus("idle")}
                  variant="outline"
                  className="mt-5 sm:mt-8 w-full rounded-xl border-destructive/20 hover:bg-destructive/5 text-sm sm:text-base"
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Loading Overlay */}
        {(isAutoVerifying || status === "loading") && status !== "success" && status !== "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <Loader2 className="w-12 h-12 text-secondary animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-foreground tracking-tight">Verifying Certificate...</h2>
            <p className="text-sm text-muted-foreground mt-2">Please wait while we validate the credentials.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
