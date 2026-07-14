import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LeadForm } from "../lead-form/LeadForm";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      {/* Background radial gradient glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-[500px] w-full max-w-7xl -translate-x-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(50% 50% at 50% 0%, color-mix(in oklab, var(--primary) 20%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase"
        >
          <Sparkles className="h-3.5 w-3.5" />
          GrowthX Studio Paid Media Experts
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          We Scale Businesses With High-Converting{" "}
          <span className="gradient-text">Meta Ads</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Fill out the quick 30-second form below to get a custom ads growth plan and book your free strategy call.
        </motion.p>

        {/* Form Submission Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <LeadForm />
        </motion.div>

      </div>
    </section>
  );
}