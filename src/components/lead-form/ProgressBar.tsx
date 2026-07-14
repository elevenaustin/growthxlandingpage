import { motion } from "framer-motion";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  // Compute progress percentage (from 25% on step 1, up to 100% on step 4)
  const pct = Math.max(0, Math.min(100, ((current + 1) / total) * 100));
  
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-end text-xs font-bold text-primary tracking-wide uppercase">
        <span>{Math.round(pct)}% Complete</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-accent)" }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}