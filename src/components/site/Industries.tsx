import { motion } from "framer-motion";
import { ShoppingCart, Home, Users, Store, GraduationCap, Activity } from "lucide-react";
import { Reveal } from "../motion/Reveal";

const industries = [
  { icon: ShoppingCart, name: "E-Commerce" },
  { icon: Home, name: "Real Estate" },
  { icon: Users, name: "Coaches & Consultants" },
  { icon: Store, name: "Local Businesses" },
  { icon: GraduationCap, name: "Education" },
  { icon: Activity, name: "Healthcare" },
];

export function Industries() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <Reveal>
        <h2 className="text-center text-xl font-bold tracking-tight text-white/90 sm:text-2xl">
          Industries We Help Grow
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {industries.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -4, borderColor: "var(--primary)" }}
              className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center transition-colors duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:bg-primary group-hover:text-white">
                <ind.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white/95">{ind.name}</h3>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
