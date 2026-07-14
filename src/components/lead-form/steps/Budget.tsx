import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";
import { BUDGETS } from "../schema";
import { OptionCard } from "../OptionCard";

export function BudgetStep() {
  const { watch, setValue, formState } = useFormContext<LeadForm>();
  const value = watch("budget");
  const err = formState.errors.budget?.message;
  return (
    <div>
      <div className="text-sm font-medium text-primary">04 · Budget</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        💰 Monthly marketing budget?
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {BUDGETS.map((b) => (
          <OptionCard
            key={b.id}
            selected={value === b.id}
            onSelect={() =>
              setValue("budget", b.id, { shouldValidate: true, shouldDirty: true })
            }
            title={b.title}
            desc={b.desc}
          />
        ))}
      </div>
      {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
    </div>
  );
}