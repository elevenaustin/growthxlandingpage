import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

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
          Get a custom ads growth plan for your business and scale your sales with our experts.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://wa.me/916374783112"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Book Free Strategy Call
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}