import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

export function OptionCard({
  selected,
  onSelect,
  title,
  desc,
  icon,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  desc?: string;
  icon?: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all",
        selected
          ? "border-transparent shadow-[var(--shadow-glow)]"
          : "border-border bg-card hover:border-primary/40 hover:shadow-[var(--shadow-soft)]",
      ].join(" ")}
      style={
        selected
          ? {
              backgroundImage:
                "linear-gradient(var(--card), var(--card)), var(--gradient-accent)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              border: "2px solid transparent",
            }
          : undefined
      }
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-xl">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-foreground">{title}</div>
          {desc && (
            <div className="mt-0.5 text-sm text-muted-foreground">{desc}</div>
          )}
        </div>
        <motion.div
          initial={false}
          animate={{
            scale: selected ? 1 : 0.6,
            opacity: selected ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-primary-foreground"
          style={{ background: "var(--gradient-accent)" }}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </motion.div>
      </div>
    </motion.button>
  );
}