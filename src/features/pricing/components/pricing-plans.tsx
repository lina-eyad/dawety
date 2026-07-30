"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { CURRENCIES, PRICING_PLANS, type CurrencyCode } from "../content";

/**
 * Pricing tiers with a live currency switcher. The "دعوة واحدة" plan is the
 * highlighted, most-popular option (elevated, filled CTA); the others use a
 * lighter treatment so the recommended path is visually obvious.
 */
export function PricingPlans() {
  const [currency, setCurrency] = useState<CurrencyCode>("SAR");
  const symbol =
    CURRENCIES.find((c) => c.code === currency)?.symbol ?? currency;

  // Default to the visitor's likely currency from their browser locale/region
  // (Arabic-first → SAR). A manual switch always overrides this guess.
  useEffect(() => {
    const locale = navigator.language?.toLowerCase() ?? "";
    const region = locale.split("-")[1];
    const gulf = ["sa", "ae", "kw", "qa", "bh", "om"];
    let detected: CurrencyCode = "USD";
    if (region === "gb") detected = "GBP";
    else if (locale.startsWith("ar") || gulf.includes(region)) detected = "SAR";
    // navigator is only available post-mount; setting after mount (rather than
    // in a lazy initializer) keeps SSR output stable and avoids a hydration
    // mismatch on the default currency.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (CURRENCIES.some((c) => c.code === detected)) setCurrency(detected);
  }, []);

  return (
    <div>
      {/* Currency switcher */}
      <div className="flex justify-center">
        <div
          className="inline-flex rounded-full border border-warm-border bg-background p-1"
          role="group"
          aria-label="اختر العملة"
        >
          {CURRENCIES.map((c) => {
            const on = currency === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setCurrency(c.code)}
                aria-pressed={on}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  on
                    ? "bg-primary text-primary-foreground"
                    : "text-ink-muted hover:text-primary",
                )}
              >
                {c.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Plans */}
      <div className="mx-auto mt-10 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col gap-6 rounded-[30px] border bg-card p-8 transition-all duration-300 hover:-translate-y-1",
              plan.popular
                ? "border-2 border-primary shadow-brand lg:-my-2"
                : "border-primary/15 shadow-soft hover:shadow-soft-lg",
            )}
          >
            {plan.popular ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground shadow-soft">
                الأكثر شيوعاً
              </span>
            ) : null}

            <div>
              <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{plan.tagline}</p>
            </div>

            <div>
              <div className="flex items-end gap-1.5">
                {plan.free ? (
                  <span className="text-4xl font-bold text-ink">مجاناً</span>
                ) : plan.contact ? (
                  <span className="text-3xl font-bold text-ink">عرض خاص</span>
                ) : (
                  <>
                    <span className="text-5xl font-bold text-ink">
                      {plan.price?.[currency]}
                    </span>
                    <span className="mb-2 text-lg text-ink-muted">
                      {symbol}
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1.5 text-sm text-ink-muted">{plan.unit}</p>
            </div>

            <ul className="flex flex-col gap-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full",
                      plan.popular
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-ink-muted",
                    )}
                  >
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="text-sm text-ink">{f}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              variant={plan.popular ? "default" : "outline"}
              className={cn(
                "mt-auto h-[50px] w-full rounded-[8px] font-semibold",
                plan.popular ? "shadow-lg" : "border-primary text-primary",
              )}
            >
              <Link href={plan.href}>{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
