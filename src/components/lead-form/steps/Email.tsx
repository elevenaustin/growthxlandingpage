import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";

export function EmailStep() {
  const { register, formState } = useFormContext<LeadForm>();
  const reg = register("email");

  const error = formState.errors.email?.message;

  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl text-center">
        ✉️ What's your email?
      </h2>
      <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground text-center">
        We'll send your custom growth blueprint here.
      </p>
      
      <input
        {...reg}
        type="email"
        autoComplete="email"
        placeholder="e.g. priya@business.com"
        className="mt-6 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base text-white outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
      />
      {error && <p className="mt-2 text-xs text-destructive text-left">{error}</p>}
    </div>
  );
}
