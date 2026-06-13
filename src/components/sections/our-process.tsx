import { Lightbulb, Palette, Code2, CheckCircle2, Globe, Server, Code } from "lucide-react"

export function OurProcess() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-4 text-sm font-semibold tracking-wide uppercase">
            How We Work
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Our Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make building software easy to understand. No confusing tech jargon, just a clear path from your idea to a live product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto group/container">
          {[
            { title: "Discovery", desc: "Tell us your idea. We understand your needs, timeline, and budget.", icon: Lightbulb },
            { title: "Prototype", desc: "Free working prototype in 48 hours. You see it before you commit.", icon: Palette },
            { title: "Build", desc: "We develop your solution with regular updates. 2 revision rounds included.", icon: Code2 },
            { title: "Handover", desc: "Full source code, docs, and deploy guide. You own 100% of what we build.", icon: CheckCircle2 }
          ].map((step, i) => (
            <div
              key={i}
              className="group/card relative overflow-hidden p-8 rounded-[2rem] bg-card border border-border/60 transition-all duration-500 cursor-default
                         hover:scale-[1.03] hover:bg-card hover:border-secondary/40 hover:z-10 hover:shadow-2xl 
                         md:hover:!opacity-100 md:group-hover/container:opacity-40"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover/card:scale-110 group-hover/card:bg-secondary group-hover/card:text-secondary-foreground group-hover/card:rotate-3 transition-all duration-500">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover/card:text-secondary transition-colors relative z-10">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10">{step.desc}</p>

              {/* Number Watermark */}
              <div className="absolute -bottom-10 -right-4 text-[180px] font-black text-foreground/[0.03] group-hover/card:text-secondary/10 group-hover/card:-translate-y-4 group-hover/card:-translate-x-4 transition-all duration-500 select-none pointer-events-none leading-none z-0">
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Ownership Guarantees */}
        <div className="max-w-5xl mx-auto pt-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary/40 via-secondary/80 to-secondary">100% Ownership</span> Guarantee
            </h3>
            <p className="text-muted-foreground mt-4 text-lg">We build it, but you own it completely. No vendor lock-in, ever.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "You Own the Domain", desc: "Buy it in your name. We help you set it up. You keep full control forever.", icon: Globe },
              { title: "You Own the Server", desc: "Your hosting, your credentials. We deploy to your infrastructure.", icon: Server },
              { title: "You Own the Code", desc: "Full source code handover with documentation. No vendor lock-in, ever.", icon: Code }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-card/40 backdrop-blur-sm border border-border/60 flex flex-col items-center text-center hover:border-secondary/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-500 group-hover:rotate-3">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold mb-3 tracking-tight group-hover:text-secondary transition-colors">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Ongoing Maintenance Offer */}
          <div className="mt-12 bg-secondary/10 border border-secondary/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-secondary/40 transition-colors duration-500">
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl font-bold tracking-tight mb-2">Need ongoing maintenance?</h4>
              <p className="text-muted-foreground">Updates, security patches, bug fixes, and priority support. <span className="font-semibold text-foreground/80">100% optional — cancel anytime.</span></p>
            </div>
            <div className="text-center md:text-right shrink-0 bg-background/50 backdrop-blur-md px-8 py-4 rounded-2xl border border-border/50 shadow-sm">
              <div className="text-4xl font-black text-secondary tracking-tight">$29<span className="text-xl text-muted-foreground font-medium">/mo</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
