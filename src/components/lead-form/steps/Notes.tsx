import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";

export function NotesStep() {
  const { register } = useFormContext<LeadForm>();
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const reg = register("notes");
  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      <div className="text-sm font-medium text-primary">06 · Context</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        📝 Tell us about your business
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">Optional — a couple of sentences is perfect.</p>
      <textarea
        {...reg}
        ref={(el) => {
          reg.ref(el);
          ref.current = el;
        }}
        rows={5}
        placeholder="Briefly describe your business goals…"
        className="mt-6 w-full resize-none rounded-2xl border border-border bg-card px-5 py-4 text-base outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
      />
    </div>
  );
}