import { useFormContext } from "react-hook-form";
import type { LeadForm } from "../schema";
import { BUDGETS, SERVICES, TIMELINES } from "../schema";

function label<T extends { id: string; title: string }>(list: readonly T[], id: string) {
  return list.find((x) => x.id === id)?.title ?? "—";
}

export function ReviewStep() {
  const { watch } = useFormContext<LeadForm>();
  const v = watch();
  const rows: [string, string][] = [
    ["Name", v.fullName || "—"],
    ["WhatsApp", v.phone ? `${v.countryCode} ${v.phone}` : "—"],
    ["Service", label(SERVICES, v.service)],
    ["Budget", label(BUDGETS, v.budget)],
    ["Timeline", label(TIMELINES, v.timeline)],
  ];
  return (
    <div>
      <div className="text-sm font-medium text-primary">07 · Review</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        ✅ Looks good?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Quick check before we send this to our strategy team.
      </p>
      <dl className="mt-6 overflow-hidden rounded-2xl border border-border bg-card divide-y divide-border">
        {rows.map(([k, val]) => (
          <div key={k} className="grid grid-cols-[110px_1fr] gap-4 px-5 py-3">
            <dt className="text-sm text-muted-foreground">{k}</dt>
            <dd className="text-sm font-medium text-foreground">{val}</dd>
          </div>
        ))}
        {v.notes && (
          <div className="grid grid-cols-[110px_1fr] gap-4 px-5 py-3">
            <dt className="text-sm text-muted-foreground">Notes</dt>
            <dd className="text-sm font-medium text-foreground whitespace-pre-wrap">
              {v.notes}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}