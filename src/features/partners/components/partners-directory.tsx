"use client";

import { MapPin, Search, SearchX, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { PARTNER_TYPES, PARTNERS, type PartnerType } from "../content";

export function PartnersDirectory() {
  const [type, setType] = useState<"all" | PartnerType>("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim();
    return PARTNERS.filter(
      (partner) =>
        (type === "all" || partner.type === type) &&
        (q === "" ||
          partner.name.includes(q) ||
          partner.city.includes(q) ||
          partner.typeLabel.includes(q)),
    );
  }, [type, query]);

  return (
    <div>
      {/* Filters + search */}
      <div className="flex flex-col gap-3 rounded-2xl border border-warm-border bg-card p-3 shadow-soft sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-wrap gap-2">
          {PARTNER_TYPES.map((t) => {
            const on = type === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setType(t.key)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  on
                    ? "bg-primary text-primary-foreground"
                    : "text-ink-muted hover:bg-rose hover:text-primary",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن شريك…"
            aria-label="ابحث عن شريك"
            className="h-11 w-full rounded-xl border border-warm-border bg-background ps-4 pe-10 text-sm transition-colors outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/10"
          />
        </div>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((partner) => (
            <article
              key={partner.id}
              className="flex flex-col gap-3 rounded-2xl border border-warm-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-rose text-lg font-bold text-primary">
                    {partner.name.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{partner.name}</h3>
                    <span className="text-xs text-ink-muted">
                      {partner.typeLabel}
                    </span>
                  </div>
                </div>
                {partner.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                    <Sparkles className="size-3" aria-hidden />
                    مميّز
                  </span>
                ) : null}
              </div>

              <p className="text-sm leading-relaxed text-ink-muted">
                {partner.bio}
              </p>

              <div className="mt-auto flex items-center gap-1.5 text-xs text-ink-muted">
                <MapPin className="size-3.5" aria-hidden />
                {partner.city}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-warm-border bg-card/50 px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-rose text-primary">
            <SearchX className="size-6" aria-hidden />
          </span>
          <p className="text-lg font-bold text-ink">لا يوجد شريك مطابق</p>
          <p className="max-w-sm text-sm text-ink-muted">
            جرّب تصنيفاً آخر أو كلمة بحث مختلفة.
          </p>
        </div>
      )}
    </div>
  );
}
