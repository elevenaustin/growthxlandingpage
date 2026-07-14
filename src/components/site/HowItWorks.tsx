import { Phone, Search, Send, Sliders, TrendingUp } from "lucide-react";
import { Reveal } from "../motion/Reveal";

const steps = [
  {
    icon: Phone,
    title: "Discovery Call",
    desc: "We understand your business & goals.",
  },
  {
    icon: Search,
    title: "Research & Strategy",
    desc: "We research your market, audience & competitors.",
  },
  {
    icon: Send,
    title: "Campaign Launch",
    desc: "We build & launch high-converting campaigns.",
  },
  {
    icon: Sliders,
    title: "Optimize & Scale",
    desc: "We optimize daily and scale winning campaigns.",
  },
  {
    icon: TrendingUp,
    title: "Report & Grow",
    desc: "We provide reports & plan for more growth.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-20">
      <Reveal>
        <div className="text-center">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Our Process</div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Proven 5-Step Process
          </h2>
        </div>
      </Reveal>

      {/* Desktop Horizontal Timeline */}
      <div className="relative mt-20 hidden lg:block">
        {/* Connecting dotted line */}
        <div 
          aria-hidden
          className="absolute top-[28px] left-[10%] right-[10%] h-0.5 border-t border-dashed border-primary/45" 
        />
        
        <div className="grid grid-cols-5 gap-4 relative">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                {/* Step Circle Button */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-glow)]">
                  <s.icon className="h-5 w-5" />
                  <span className="absolute -bottom-8 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                
                <h3 className="mt-14 text-sm font-bold text-white leading-tight">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[170px] text-xs text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Vertical Timeline */}
      <div className="relative mt-12 flex flex-col gap-10 pl-8 lg:hidden">
        {/* Connecting vertical dotted line */}
        <div 
          aria-hidden
          className="absolute top-2 bottom-2 left-[19px] w-0.5 border-l border-dashed border-primary/40" 
        />
        
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <div className="relative flex flex-col items-start text-left pl-6">
              {/* Circle Icon left-floated absolute */}
              <div className="absolute -left-[39px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-glow)]">
                <s.icon className="h-4.5 w-4.5" />
              </div>
              
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Step {i + 1}
              </div>
              <h3 className="mt-0.5 text-base font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}