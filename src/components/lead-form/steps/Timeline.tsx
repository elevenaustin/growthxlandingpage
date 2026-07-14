import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";
import { TIMELINES } from "../schema";
import { OptionCard } from "../OptionCard";

export function TimelineStep() {
  const { watch, setValue, formState } = useFormContext<LeadForm>();
  const value = watch("timeline");
  const err = formState.errors.timeline?.message;
  return (
    <div>
      <div className="text-sm font-medium text-primary">05 · Timeline</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        🚀 When do you want to start?
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {TIMELINES.map((t) => (
          <OptionCard
            key={t.id}
            selected={value === t.id}
            onSelect={() =>
              setValue("timeline", t.id, { shouldValidate: true, shouldDirty: true })
            }
            title={t.title}
            desc={t.desc}
          />
        ))}
      </div>
      {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
    </div>
  );
}