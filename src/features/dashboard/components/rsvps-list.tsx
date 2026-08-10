"use client";

import { Check, Users, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { RSVPS, type RsvpStatus } from "../content";

const FILTERS: { key: "all" | RsvpStatus; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "attending", label: "سيحضر" },
  { key: "declined", label: "اعتذر" },
];

export function RsvpsList() {
  const [filter, setFilter] = useState<"all" | RsvpStatus>("all");
  const items = RSVPS.filter((r) => filter === "all" || r.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const on = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                on
                  ? "bg-primary text-primary-foreground"
                  : "border border-warm-border bg-card text-ink-muted hover:border-primary/40 hover:text-primary",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col divide-y divide-warm-border overflow-hidden rounded-2xl border border-warm-border bg-card">
        {items.map((r) => {
          const attending = r.status === "attending";
          return (
            <div key={r.id} className="flex items-start gap-3 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose font-bold text-primary">
                {r.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-ink">{r.name}</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                      attending
                        ? "bg-green-50 text-green-700"
                        : "bg-rose text-primary",
                    )}
                  >
                    {attending ? (
                      <Check className="size-3" aria-hidden />
                    ) : (
                      <X className="size-3" aria-hidden />
                    )}
                    {attending ? "سيحضر" : "اعتذر"}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-ink-muted">
                  {r.invitation}
                  {r.companions > 0 ? (
                    <span className="ms-2 inline-flex items-center gap-1">
                      <Users className="size-3" aria-hidden />+{r.companions}
                    </span>
                  ) : null}
                </p>
                {r.message ? (
                  <p className="mt-1.5 rounded-lg bg-warm-bg/70 px-3 py-1.5 text-xs text-ink">
                    {r.message}
                  </p>
                ) : null}
              </div>
              <span className="shrink-0 text-xs text-ink-muted">{r.at}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
