import { motion } from "framer-motion";
import { Users, Code, BarChart2, PieChart } from "lucide-react";
import { Reveal } from "../motion/Reveal";

const MetaIcon = () => (
  <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.924 7.64c-.886 0-1.802.39-2.611 1.066a15.7 15.7 0 0 0-2.313 2.378c-.808-1.015-1.573-1.848-2.313-2.378-.81-.676-1.725-1.067-2.612-1.067-2.64 0-4.757 2.12-4.757 4.717 0 2.597 2.118 4.717 4.757 4.717.887 0 1.802-.39 2.612-1.066.74-.53 1.505-1.363 2.313-2.378.808 1.015 1.573 1.848 2.313 2.378.81.676 1.725 1.066 2.611 1.066 2.64 0 4.757-2.12 4.757-4.717 0-2.598-2.117-4.718-4.757-4.718zm0 7.747c-.503 0-1.01-.252-1.474-.727a17.834 17.834 0 0 1-2.025-2.66c.642-.87 1.344-1.789 2.025-2.66.463-.475.97-.727 1.474-.727 1.517 0 2.766 1.22 2.766 2.71 0 1.492-1.25 2.712-2.766 2.712zM7.075 7.64c.504 0 1.01.252 1.474.727a17.83 17.83 0 0 1 2.025 2.66c-.642.87-1.344 1.789-2.025 2.66-.463.475-.97.727-1.474.727-1.517 0-2.766-1.22-2.766-2.71 0-1.492 1.25-2.712 2.766-2.712z" />
  </svg>
);

const services = [
  {
    icon: MetaIcon,
    title: "Meta Ads Management",
    desc: "High-converting ad campaigns that generate quality leads and sales.",
  },
  {
    icon: Users,
    title: "Audience Research",
    desc: "We find the perfect audience that's most likely to buy from you.",
  },
  {
    icon: Code,
    title: "Pixel & Tracking Setup",
    desc: "Accurate tracking for better optimization and 100% data clarity.",
  },
  {
    icon: BarChart2,
    title: "Campaign Optimization",
    desc: "Daily optimization to improve performance and lower your cost per result.",
  },
  {
    icon: PieChart,
    title: "Reporting & Analysis",
    desc: "Weekly reports with clear insights to track growth and ROI.",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20 scroll-mt-20">
      <Reveal>
        <div className="text-center">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Our Services</div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            End-to-end performance marketing solutions for your business growth.
          </p>
        </div>
      </Reveal>

      {/* Grid containing first 3 services */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 3).map((svc, i) => (
          <Reveal key={svc.title} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-colors duration-300 hover:border-primary/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <svc.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white transition-colors duration-250 group-hover:text-primary-glow">
                {svc.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{svc.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Centered flex row containing the remaining 2 services on large screens */}
      <div className="mt-6 flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:justify-center">
        {services.slice(3).map((svc, i) => (
          <Reveal key={svc.title} delay={(i + 3) * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-colors duration-300 hover:border-primary/40 lg:w-[350px]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <svc.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white transition-colors duration-250 group-hover:text-primary-glow">
                {svc.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{svc.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
