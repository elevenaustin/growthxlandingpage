import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { Reveal } from "../motion/Reveal";

const faqs = [
  {
    q: "How quickly will your team contact me after submission?",
    a: "We respond within 30 minutes during standard business hours (9:00 AM – 9:00 PM IST). Submissions received outside of these hours will be addressed first thing the following morning over WhatsApp or email.",
  },
  {
    q: "How much do your monthly paid media retainers cost?",
    a: "Our monthly retainers start from ₹60,000/month. The exact cost depends on your monthly ad spend volume, creative asset requirements (e.g. UGC video production vs. static ads), and target scale. We provide an exact price quote during the strategy call.",
  },
  {
    q: "Do you handle copywriting and video production for ad creatives?",
    a: "Yes, end-to-end. Our creative department handles ad copywriting, graphic design, and writing script briefs for User-Generated Content (UGC) videos. You will have full access to review, request edits, and approve all creatives before we launch any campaigns.",
  },
  {
    q: "What is your testing framework for scaling ad accounts?",
    a: "We utilize a rapid testing protocol where we test 3-5 creative concepts weekly to combat ad fatigue. We run separate testing campaigns to evaluate hooks, headlines, and angles. Winners are graduated into consolidated CBO scaling campaigns to optimize ad spend distribution.",
  },
  {
    q: "Do you guarantee a specific ROAS or conversion count?",
    a: "No professional agency can guarantee final sales, as they rely on factors outside our control (such as site load speed, product-market fit, and pricing strategy). However, we guarantee the metrics we control: driving targeted traffic, pixel tracking accuracy, and CPA optimization. If we fail to hit agreed-upon KPIs in the first 30 days, we work free until we do.",
  },
  {
    q: "What is the minimum monthly ad spend you work with?",
    a: "We partner with scaling brands starting from a minimum ad budget of ₹30,000/month. This ensures we have enough data volume to test creatives and optimize bidding strategies effectively.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 scroll-mt-20">
      <Reveal>
        <div className="text-center">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Help Center</div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Get clear, professional answers on our retainers, creative workflow, campaign testing policies, and dashboard reporting.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Accordion type="single" collapsible className="mt-12 space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`i-${i}`}
              className="group rounded-2xl border border-border bg-card px-6 shadow-[var(--shadow-soft)] transition-all duration-300 data-[state=open]:border-primary/50 data-[state=open]:shadow-[0_0_30px_-5px_rgba(139,92,246,0.25)]"
            >
              <AccordionTrigger className="py-5 text-left text-base font-bold text-white/95 hover:text-primary hover:no-underline transition-colors">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-8 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}