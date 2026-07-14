import { Sparkles } from "lucide-react";

export function WelcomeStep() {
  return (
    <div className="text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-2xl">
        <Sparkles className="h-6 w-6 text-primary" />
      </div>
      <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        👋 Let's help you grow.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        A quick 30-second conversation and our team will craft a custom growth
        plan for your business.
      </p>
      <p className="mt-4 text-xs text-muted-foreground">
        Press <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px]">Enter</kbd> at any step to continue.
      </p>
    </div>
  );
}