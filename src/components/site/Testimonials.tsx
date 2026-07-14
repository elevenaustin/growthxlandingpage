import { Reveal } from "../motion/Reveal";
import { Star } from "lucide-react";

const items = [
  {
    name: "Rohan Mehta",
    business: "D2C Skincare Brand",
    quote:
      "In 90 days our ROAS went from 1.8x to 5.6x. The team ships creative faster than any agency we've worked with.",
    initials: "RM",
  },
  {
    name: "Aisha Kapoor",
    business: "SaaS Founder",
    quote:
      "Finally an ads team that talks about pipeline and payback, not just impressions. Weekly reports are gold.",
    initials: "AK",
  },
  {
    name: "Vikram Shah",
    business: "Ecommerce · Home",
    quote:
      "They rebuilt our funnel end-to-end. CAC dropped 41% and our best month tripled in 8 weeks.",
    initials: "VS",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <div className="text-center">
          <div className="text-sm font-medium text-primary">What clients say</div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
            Loved by founders across categories.
          </h2>
        </div>
      </Reveal>
      <div className="mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
        {items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <div className="w-[85vw] shrink-0 snap-center rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:w-auto md:shrink">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-primary-foreground"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.business}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}