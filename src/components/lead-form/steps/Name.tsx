import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";

export function NameStep() {
  const { register, formState } = useFormContext<LeadForm>();
  const reg = register("fullName");

  const error = formState.errors.fullName?.message;

  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl text-center">
        👤 What's your name?
      </h2>
      <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground text-center">
        Let's get to know you.
      </p>

      <input
        {...reg}
        type="text"
        autoComplete="name"
        placeholder="e.g. Priya Sharma"
        className="mt-6 w-full rounded-2xl border border-border bg-card px-4 py-3 text-base text-white outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
      />
      {error && <p className="mt-2 text-xs text-destructive text-left">{error}</p>}
    </div>
  );
}