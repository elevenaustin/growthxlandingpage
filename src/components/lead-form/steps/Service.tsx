import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";
import { SERVICES } from "../schema";
import { OptionCard } from "../OptionCard";

export function ServiceStep() {
  const { watch, setValue, formState } = useFormContext<LeadForm>();
  const value = watch("service");
  const err = formState.errors.service?.message;
  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          📈 Which service fits best?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
          Select the service that aligns best with your scaling goals.
        </p>
      </div>
      
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <OptionCard
            key={s.id}
            selected={value === s.id}
            onSelect={() =>
              setValue("service", s.id, { shouldValidate: true, shouldDirty: true })
            }
            title={s.title}
            desc={s.desc}
            icon={s.emoji}
          />
        ))}
      </div>
      {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
    </div>
  );
}