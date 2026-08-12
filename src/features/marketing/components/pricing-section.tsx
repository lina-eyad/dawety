"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { FREE_FEATURES, PLAN_FEATURES } from "../content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const CURRENCIES = [
  { code: "USD", symbol: "$", price: "9.99", bundle: "39" },
  { code: "SAR", symbol: "ر.س", price: "37", bundle: "149" },
  { code: "GBP", symbol: "£", price: "7.99", bundle: "32" },
] as const;

const ORG_FEATURES = [
  "كل مزايا «دعوة واحدة»",
  "خصم يصل إلى 20% لكل دعوة",
  "إدارة عدة مناسبات من مكان واحد",
  "لوحة تحكم موحّدة للردود",
  "دعم مخصّص ذو أولوية",
];

/** "صمّم مجانًا، وانشر عندما تكون جاهزًا" — complete vs free-trial plans. */
export function PricingSection() {
  const [currency, setCurrency] = useState(0);
  const cur = CURRENCIES[currency];

  return (
    <section
      id="pricing"
      className="mx-auto w-full max-w-[1200px] px-6 py-[50px]"
    >
      <Reveal>
        <SectionHeading
          eyebrow="أسعار بسيطة"
          title="صمّم مجانًا ، وانشر عندما تكون جاهزًا"
          description="صمّم وعاين دعوتك مجانًا بالكامل، وادفع دفعة واحدة فقط عندما تقرر نشرها ومشاركتها."
        />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-6 md:grid-cols-3">
        {/* Complete plan */}
        <div className="relative flex flex-col gap-6 rounded-[30px] border-2 border-primary/20 bg-card p-8 shadow-brand transition-all duration-300 hover:-translate-y-1">
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
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(i)}
                  aria-pressed={i === currency}
                  className={cn(
                    "px-3 py-1.5 transition-colors",
                    i === currency
                      ? "bg-primary text-primary-foreground"
                      : "text-ink-muted hover:text-primary",
                  )}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-1">
            <span className="text-5xl font-bold text-ink">{cur.price}</span>
            <span className="mb-2 text-lg text-ink-muted">{cur.symbol}</span>
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
              asChild
            >
              <Link href={ROUTES.create}>ابدأ تصميم دعوتك</Link>
            </Button>
            <Link
              href={ROUTES.pricing}
              className="text-center text-sm font-medium text-primary hover:underline"
            >
              عرض تفاصيل الأسعار
            </Link>
          </div>
        </div>

        {/* Free trial */}
        <div className="flex flex-col gap-6 rounded-[30px] border border-primary/20 bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
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
            asChild
          >
            <Link href={ROUTES.create}>ابدأ مجانًا</Link>
          </Button>
        </div>

        {/* Organizers bundle */}
        <div className="flex flex-col gap-6 rounded-[30px] border border-primary/20 bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
          <div>
            <h3 className="text-xl font-bold text-ink">للمنظّمين</h3>
            <p className="text-sm text-ink-muted">
              لمخطّطي المناسبات ومتعدّدي الدعوات
            </p>
          </div>

          <div className="flex items-end gap-1">
            <span className="text-5xl font-bold text-ink">{cur.bundle}</span>
            <span className="mb-2 text-lg text-ink-muted">{cur.symbol}</span>
            <span className="ms-2 mb-2 text-ink-muted">باقة 5 دعوات</span>
          </div>

          <ul className="flex flex-col gap-3">
            {ORG_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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
            asChild
          >
            <Link href={ROUTES.create}>ابدأ الباقة</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
