"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Search, CheckCircle2, XCircle, Award, Calendar, User, Building, ArrowRight, ShieldCheck, Lock, QrCode, Landmark, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const verifySchema = z.object({
  certificateId: z.string().min(1, "Certificate ID is required"),
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
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")

  const { register, handleSubmit, formState: { errors }, watch } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { certificateId: "" }
  })

  const certificateId = watch("certificateId")

  const onSubmit = (data: VerifyFormValues) => {
    setStatus("loading")

    // Simulate API call for verification
    setTimeout(() => {
      // For demo purposes, if it starts with 'CL-', it's valid, otherwise invalid
      if (data.certificateId.toUpperCase().startsWith("CL-")) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-secondary/30 pt-8 pb-20 flex flex-col items-center justify-center">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
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
            Enter the certificate ID to verify the authenticity of an internship or training program completed at CodeLaunch.
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

        {/* Success State */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 backdrop-blur-md border border-green-500/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-green-500/20">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-500 tracking-tight">Certificate Verified</h2>
                  <p className="text-muted-foreground mt-1">This is a valid CodeLaunch credential.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                    <User className="h-4 w-4 text-green-500/70" /> Student Name
                  </div>
                  <div className="font-semibold text-lg">Alex Johnson</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                    <Building className="h-4 w-4 text-green-500/70" /> Role
                  </div>
                  <div className="font-semibold text-lg">Full Stack Developer Intern</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-green-500/70" /> Duration
                  </div>
                  <div className="font-semibold text-lg">Jan 2026 - Jun 2026</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                    <Award className="h-4 w-4 text-green-500/70" /> Certificate ID
                  </div>
                  <div className="font-semibold text-lg uppercase tracking-wider">{certificateId}</div>
                </div>

                <div className="space-y-2 col-span-1 sm:col-span-2 pt-4 border-t border-green-500/20">
                  <div className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-green-500/70" /> Skills & Technologies Verified
                  </div>
                  <div className="font-semibold text-lg text-foreground/90 leading-relaxed">
                    Next.js, TypeScript, Full-Stack Architecture, Tailwind CSS, REST API Integration
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/10 backdrop-blur-md border border-destructive/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-destructive/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-10 w-10 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-destructive mb-3 tracking-tight">Verification Failed</h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                We couldn't find a certificate matching the ID <span className="font-semibold text-foreground uppercase">"{certificateId}"</span>. Please check the ID and try again, or <Link href="/contact" className="text-secondary hover:underline underline-offset-4 transition-colors">contact support</Link> if you believe this is an error.
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}
