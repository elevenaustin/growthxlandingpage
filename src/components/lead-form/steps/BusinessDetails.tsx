import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";

export function BusinessDetailsStep() {
  const { register, formState } = useFormContext<LeadForm>();
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const reg = register("businessDetails");

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 250);
    return () => clearTimeout(t);
  }, []);

  const error = formState.errors.businessDetails?.message;

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          📝 Tell us about your business
        </h2>
        <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
          Briefly describe your goals, budget, or current marketing struggles.
        </p>
      </div>

      <textarea
        {...reg}
        ref={(el) => {
          reg.ref(el);
          ref.current = el;
        }}
        rows={4}
        placeholder="e.g. We are an e-commerce brand selling leather bags. We want to scale our sales using Meta Ads..."
        className="mt-6 w-full resize-none rounded-2xl border border-border bg-card px-4 py-3 text-base text-white outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
      />
      {error && <p className="mt-2 text-xs text-destructive text-left">{error}</p>}
    </div>
  );
}
