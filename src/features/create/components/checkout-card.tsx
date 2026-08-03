"use client";

import { Check, Lock } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const PLAN_INCLUDES = [
  "رابط دعوة قابل للمشاركة",
  "QR Code للدعوة",
  "تفعيل جمع الردود",
  "فتح صفحة المشاركة بعد الدفع",
];

const CURRENCIES = [
  { code: "SAR", symbol: "ر.س", price: "37.50" },
  { code: "USD", symbol: "$", price: "9.99" },
  { code: "GBP", symbol: "£", price: "9.99" },
] as const;

export function CheckoutCard() {
  const [currency, setCurrency] = useState(2); // GBP default (matches Figma)
  const cur = CURRENCIES[currency];
  const total = `${cur.price} ${cur.symbol}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Plan + options */}
      <div className="flex flex-col gap-6 rounded-3xl border border-warm-border bg-card p-7 shadow-soft">
        <div>
          <h2 className="text-xl font-bold text-ink">خطة النشر</h2>
          <p className="text-sm text-ink-muted">
            ادفع مرة واحدة لفتح النشر والمشاركة
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {PLAN_INCLUDES.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="size-3" aria-hidden />
              </span>
              <span className="text-sm text-ink">{f}</span>
            </li>
          ))}
        </ul>

        {/* Currency */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">العملة</span>
          <div className="flex w-fit overflow-hidden rounded-full border border-warm-border">
            {CURRENCIES.map((c, i) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setCurrency(i)}
                className={cn(
                  "px-4 py-1.5 text-sm transition-colors",
                  i === currency
                    ? "bg-primary text-primary-foreground"
                    : "text-ink-muted",
                )}
              >
                {c.code}
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-muted">
            سيتم الدفع بالعملة المختارة، وقد يحول البنك المبلغ حسب عملتك
            المحلية.
          </p>
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-ink">
            كود خصم (اختياري)
          </span>
          <div className="flex gap-2">
            <Input placeholder="أدخل كود الخصم" className="flex-1" />
            <Button variant="secondary">تطبيق</Button>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <aside className="flex h-fit flex-col gap-5 rounded-3xl border border-warm-border bg-card p-7 shadow-soft">
        <h3 className="font-bold text-ink">ملخص الطلب</h3>
        <div className="flex items-center justify-between text-sm text-ink">
          <span>الدعوة الرقمية</span>
          <span dir="ltr">{total}</span>
        </div>
        <div className="flex items-center justify-between border-t border-warm-border pt-4">
          <span className="font-bold text-ink">الإجمالي</span>
          <span className="text-lg font-bold text-primary" dir="ltr">
            {total}
          </span>
        </div>
        <Button size="lg" className="w-full shadow-brand" asChild>
          <Link href={ROUTES.share}>الدفع ونشر الدعوة</Link>
        </Button>
        <Button variant="secondary" className="w-full" asChild>
          <Link href={ROUTES.preview}>العودة للمعاينة</Link>
        </Button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-ink-muted">
          <Lock className="size-3.5" aria-hidden />
          الدفع آمن عبر Stripe
        </p>
        <p className="text-center text-xs leading-relaxed text-ink-muted">
          بعد الدفع، سيتم إنشاء رابط دعوتك و QR Code وفتح صفحة المشاركة.
        </p>
      </aside>
    </div>
  );
}
