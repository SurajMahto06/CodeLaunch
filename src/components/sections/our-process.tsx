import { Lightbulb, Palette, Code2, CheckCircle2 } from "lucide-react"

export function OurProcess() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-4 text-sm font-semibold tracking-wide uppercase">
            How We Work
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Our Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-transparent via-secondary/60 to-secondary">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make building software easy to understand. No confusing tech jargon, just a clear path from your idea to a live product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto group/container">
          {[
            { title: "Strategy & Scoping", desc: "We sit down with you to understand your goals and create a clear project roadmap.", icon: Lightbulb },
            { title: "UI/UX Design", desc: "We design beautiful, easy-to-use screens so you can see exactly how your app will look.", icon: Palette },
            { title: "Development", desc: "Our developers write clean code and build your product step-by-step, keeping you updated.", icon: Code2 },
            { title: "Testing & Launch", desc: "We test every feature thoroughly to ensure a smooth, bug-free launch for your users.", icon: CheckCircle2 }
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
      </div>
    </section>
  )
}
