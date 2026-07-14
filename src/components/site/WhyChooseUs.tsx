import { Check, Target } from "lucide-react";
import { Reveal } from "../motion/Reveal";
import { motion } from "framer-motion";

const reasons = [
  "ROI-Focused Campaigns",
  "Transparent & Honest Reporting",
  "Data-Driven Strategies",
  "Dedicated Account Manager",
  "Quick Communication & Support",
];

const stats = [
  { value: "100+", label: "Campaigns Managed" },
  { value: "50+", label: "Happy Clients" },
  { value: "4x+", label: "Average ROAS" },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        
        {/* Left Column: List of checklist items */}
        <div className="text-left lg:col-span-6">
          <Reveal>
            <div className="text-xs font-bold tracking-widest text-primary uppercase">Why Choose Us?</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Why Choose <span className="gradient-text">GrowthX</span> Studio?
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4">
            {reasons.map((reason, i) => (
              <Reveal key={reason} delay={i * 0.06}>
                <div className="flex items-center gap-3.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-4.5 w-4.5" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold text-white/90 sm:text-base">{reason}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Column: Stats glowing card */}
        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-card p-8 text-center shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)] sm:p-10"
            >
              {/* Target icon inside purple circle */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[var(--shadow-glow)]">
                <Target className="h-7 w-7" />
              </div>

              <div className="mt-6 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Our Goal Is Simple
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl leading-tight">
                Deliver Maximum ROI For Your Business
              </h3>

              {/* Stats divider line */}
              <div className="my-8 h-px bg-border/60" />

              {/* Stats display */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((st) => (
                  <div key={st.label}>
                    <div className="text-2xl font-black text-primary sm:text-3xl lg:text-4xl">
                      {st.value}
                    </div>
                    <div className="mt-1.5 text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}