import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";

export function PhoneStep() {
  const { register, formState } = useFormContext<LeadForm>();
  const ref = useRef<HTMLInputElement | null>(null);
  const reg = register("phone");

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 250);
    return () => clearTimeout(t);
  }, []);

  const error = formState.errors.phone?.message;

  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl text-center">
        📱 What's your mobile number?
      </h2>
      <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground text-center">
        We reply on WhatsApp within 30 minutes.
      </p>

      <input
        {...reg}
        ref={(el) => {
          reg.ref(el);
          ref.current = el;
        }}
        type="tel"
        inputMode="tel"
        placeholder="e.g. 9876543210"
        className="mt-6 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base text-white outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
      />
      {error && <p className="mt-2 text-xs text-destructive text-left">{error}</p>}
    </div>
  );
}