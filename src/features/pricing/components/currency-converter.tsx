"use client";

import { ArrowLeftRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  CONVERT_CURRENCIES,
  CONVERTER_BASE_USD,
  FALLBACK_RATES,
} from "../content";

/**
 * Live currency converter — shows the paid plan's price in the visitor's local
 * currency using live FX rates, with static fallbacks so it never breaks. The
 * copy makes clear the charge itself happens in the plan's original currency.
 */
export function CurrencyConverter() {
  const [target, setTarget] = useState("AED");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((data) => {
        if (active && data?.rates) {
          setRates(data.rates);
          setLive(true);
        }
      })
      .catch(() => {
        /* keep fallback rates */
      });
    return () => {
      active = false;
    };
  }, []);

  const meta = CONVERT_CURRENCIES.find((c) => c.code === target);
  const rate = rates[target] ?? FALLBACK_RATES[target];
  const converted = (CONVERTER_BASE_USD * rate).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="rounded-[24px] border border-primary/15 bg-card p-8 shadow-soft">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-rose text-primary">
          <ArrowLeftRight className="size-5" aria-hidden />
        </span>
        <h2 className="mt-3 text-2xl font-bold text-ink">محوّل العملات</h2>
        <p className="mt-1 text-sm text-ink-muted">
          اعرف سعر «دعوة واحدة» بعملتك المحلية — بأسعار صرف مباشرة.
        </p>
      </div>

      {/* Currency chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {CONVERT_CURRENCIES.map((c) => {
          const on = target === c.code;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => setTarget(c.code)}
              aria-pressed={on}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                on
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-warm-border bg-background text-ink-muted hover:border-primary/40 hover:text-primary",
              )}
            >
              {c.code}
            </button>
          );
        })}
      </div>

      {/* Result */}
      <div className="mx-auto mt-6 max-w-sm rounded-[20px] border border-primary/15 bg-warm-bg/50 p-6 text-center">
        <p className="text-sm font-medium text-ink-muted">دعوة واحدة</p>
        <div className="mt-2 flex items-end justify-center gap-1.5">
          <span className="text-4xl font-bold text-ink">{converted}</span>
          <span className="mb-1 text-lg text-ink-muted">
            {meta?.symbol ?? target}
          </span>
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          ‏≈ {meta?.name ?? target} · السعر الأصلي {CONVERTER_BASE_USD}$
        </p>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-ink-muted">
        <span
          className={cn(
            "inline-block size-1.5 rounded-full",
            live ? "bg-green-500" : "bg-ink-muted/40",
          )}
          aria-hidden
        />
        {live ? "أسعار صرف مباشرة" : "أسعار تقريبية"} · يتم الخصم بعملة الخطة
        الأصلية عبر بوابة الدفع الآمنة.
      </p>
    </div>
  );
}
