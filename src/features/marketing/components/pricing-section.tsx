import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FREE_FEATURES, PLAN_FEATURES } from "../content";
import { SectionHeading } from "./section-heading";

const CURRENCIES = ["USD", "SAR", "GBP"] as const;

/** "صمّم مجانًا، وانشر عندما تكون جاهزًا" — complete vs free-trial plans. */
export function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto w-full max-w-[1200px] px-6 py-[50px]"
    >
      <SectionHeading
        eyebrow="أسعار بسيطة"
        title="صمّم مجانًا ، وانشر عندما تكون جاهزًا"
        description="صمّم وعاين دعوتك مجانًا بالكامل، وادفع دفعة واحدة فقط عندما تقرر نشرها ومشاركتها."
      />

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Complete plan */}
        <div className="relative flex flex-col gap-6 rounded-[30px] border-2 border-primary/20 bg-card p-8 shadow-brand">
          <span className="absolute start-8 -top-3 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
            الأنسب لمعظم المستخدمين
          </span>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-ink">دعوة كاملة</h3>
              <p className="text-sm text-ink-muted">
                رابط جاهز للنشر والمشاركة
              </p>
            </div>
            <div className="flex overflow-hidden rounded-full border border-warm-border text-xs">
              {CURRENCIES.map((c, i) => (
                <span
                  key={c}
                  className={
                    i === 0
                      ? "bg-primary px-3 py-1.5 text-primary-foreground"
                      : "px-3 py-1.5 text-ink-muted"
                  }
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-1">
            <span className="text-5xl font-bold text-ink">9.99</span>
            <span className="mb-2 text-lg text-ink-muted">$</span>
            <span className="ms-2 mb-2 text-ink-muted">
              دفعة واحدة لكل دعوة
            </span>
          </div>

          <ul className="flex flex-col gap-3">
            {PLAN_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" aria-hidden />
                </span>
                <span className="text-sm text-ink">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-2">
            <Button
              size="lg"
              className="h-[50px] w-full rounded-[8px] font-semibold shadow-lg"
            >
              ابدأ تصميم دعوتك
            </Button>
            <button type="button" className="text-sm font-medium text-primary">
              عرض تفاصيل الأسعار
            </button>
          </div>
        </div>

        {/* Free trial */}
        <div className="flex flex-col gap-6 rounded-[30px] border border-primary/20 bg-card p-8 shadow-soft">
          <div>
            <h3 className="text-xl font-bold text-ink">تجربة مجانية</h3>
            <p className="text-sm text-ink-muted">للتصميم والمعاينة</p>
          </div>

          <div className="flex items-end gap-1">
            <span className="text-5xl font-bold text-ink">0</span>
            <span className="mb-2 text-lg text-ink-muted">$</span>
            <span className="ms-2 mb-2 text-ink-muted">مجانًا</span>
          </div>

          <ul className="flex flex-col gap-3">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-ink-muted">
                  <Check className="size-3" aria-hidden />
                </span>
                <span className="text-sm text-ink">{f}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            variant="outline"
            className="mt-auto h-[50px] w-full rounded-[8px] border-primary font-semibold text-primary"
          >
            ابدأ مجانًا
          </Button>
        </div>
      </div>
    </section>
  );
}
