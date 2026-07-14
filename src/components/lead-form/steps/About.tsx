import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";

export function AboutStep() {
  const { register, formState } = useFormContext<LeadForm>();
  const nameRef = useRef<HTMLInputElement | null>(null);
  
  const nameReg = register("fullName");
  const emailReg = register("email");

  useEffect(() => {
    const t = setTimeout(() => nameRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, []);

  const nameError = formState.errors.fullName?.message;
  const emailError = formState.errors.email?.message;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-sm font-medium text-primary">01 · About You</div>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          👋 Let's help you grow
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Tell us about yourself to get started on your custom ads growth plan.
        </p>
      </div>

      <div className="space-y-4 text-left">
        <div>
          <label htmlFor="fullName" className="text-xs font-semibold text-white/90">
            Full Name
          </label>
          <input
            {...nameReg}
            ref={(el) => {
              nameReg.ref(el);
              nameRef.current = el;
            }}
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Priya Sharma"
            className="mt-1.5 w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-base text-white outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
          />
          {nameError && (
            <p className="mt-1.5 text-xs text-destructive">{nameError}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-semibold text-white/90">
            Email Address
          </label>
          <input
            {...emailReg}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. priya@business.com"
            className="mt-1.5 w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-base text-white outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_15%,transparent)]"
          />
          {emailError && (
            <p className="mt-1.5 text-xs text-destructive">{emailError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
