import { ArrowRight } from "lucide-react";
import { Reveal } from "../motion/Reveal";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card px-8 py-14 text-center shadow-[0_0_50px_-12px_rgba(139,92,246,0.2)] sm:px-16 sm:py-20">
          {/* Radial gradient background glow inside card */}
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full pointer-events-none opacity-45"
            style={{
              background: "radial-gradient(circle, var(--primary) 35%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to Scale Your Business?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Book a free strategy call and let's grow your business together.
          </p>

          <div className="relative mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/916374783112"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book Free Strategy Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            
            <a
              href="https://wa.me/916374783112"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              <svg className="h-4 w-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.031 2C6.479 2 2 6.479 2 12.03c0 2.259.747 4.354 2.01 6.059L2 22l4.088-2.01c1.606 1.159 3.578 1.83 5.943 1.83 5.552 0 10.031-4.478 10.031-10.03S17.583 2 12.031 2zm0 18.06c-1.92 0-3.712-.555-5.234-1.507l-.375-.233-2.457.606.618-2.397-.264-.388c-1.055-1.547-1.614-3.385-1.614-5.32 0-4.99 4.06-9.05 9.05-9.05 4.99 0 9.05 4.06 9.05 9.05s-4.06 9.05-9.05 9.05z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}