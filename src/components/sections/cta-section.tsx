import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ReactNode } from "react"

interface CtaSectionProps {
  title: string | ReactNode;
  highlight: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  primaryBtnIcon?: ReactNode;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  secondaryBtnIcon?: ReactNode;
}

export function CtaSection({
  title,
  highlight,
  description,
  primaryBtnText,
  primaryBtnLink,
  primaryBtnIcon,
  secondaryBtnText,
  secondaryBtnLink,
  secondaryBtnIcon
}: CtaSectionProps) {
  return (
    <section className="py-16 relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-10 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">{highlight}</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
          <Link href={primaryBtnLink} className="w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-lg w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] group cursor-pointer">
              {primaryBtnText} {primaryBtnIcon}
            </Button>
          </Link>
          <Link href={secondaryBtnLink} className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full bg-background/50 backdrop-blur-sm border-secondary/20 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/50 transition-all duration-300 cursor-pointer">
              {secondaryBtnIcon}
              {secondaryBtnText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
