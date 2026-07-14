import { motion } from "framer-motion";
import { Check, ExternalLink, MessageCircle } from "lucide-react";

export function SuccessStep() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="glass rounded-3xl p-8 text-center shadow-[var(--shadow-elevated)] sm:p-12">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-glow)]"
          style={{ background: "var(--gradient-accent)" }}
        >
          <Check className="h-8 w-8" strokeWidth={3} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          🎉 Thank you!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-3 max-w-md text-muted-foreground"
        >
          We've received your request. Our team will reach out on WhatsApp within
          the next <span className="font-semibold text-foreground">30 minutes</span>.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#results"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
          >
            <ExternalLink className="h-4 w-4" /> View Portfolio
          </a>
          <a
            href="https://wa.me/918269939518"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--gradient-accent)" }}
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}