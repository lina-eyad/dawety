import { setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Headphones,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { MarketingFooter, MarketingNavbar } from "@/features/marketing";
import {
  COMPARISON,
  CurrencyConverter,
  PAYMENT_METHODS,
  PRICING_FAQ,
  PricingPlans,
} from "@/features/pricing";

const PLAN_COLS = ["مجاني", "دعوة واحدة", "للمنظّمين"] as const;

const TRUST = [
  {
    Icon: ShieldCheck,
    title: "دفع آمن",
    desc: "بوابات دفع موثوقة ومشفّرة بالكامل.",
  },
  {
    Icon: BadgeCheck,
    title: "بدون رسوم خفية",
    desc: "تدفع مرة واحدة فقط، بلا اشتراكات.",
  },
  {
    Icon: Headphones,
    title: "دعم سريع",
    desc: "فريقنا جاهز لمساعدتك بالعربية والإنجليزية.",
  },
];

/** Pricing page — plans, currency switcher, comparison, trust and FAQ. */
export default async function PricingPage({
  params,
}: PageProps<"/[locale]/pricing">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MarketingNavbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,var(--rose)_0%,transparent_70%)] opacity-70"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-14 pb-4 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              أسعار بسيطة وشفافة
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-balance text-ink sm:text-[40px] sm:leading-[1.2]">
              صمّم مجاناً، وادفع عند النشر فقط
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
              صمّم وعاين دعوتك بالكامل دون أي تكلفة، وادفع دفعة واحدة فقط عندما
              تقرر نشرها ومشاركتها — بلا اشتراكات ولا رسوم متكررة.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto w-full max-w-[1200px] px-6 py-10">
          <PricingPlans />
        </section>

        {/* Trust signals */}
        <section className="mx-auto w-full max-w-[1200px] px-6 pb-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {TRUST.map((t) => (
              <div
                key={t.title}
                className="flex items-start gap-3 rounded-[20px] border border-primary/15 bg-card p-5 shadow-soft"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose text-primary">
                  <t.Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-ink">{t.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto w-full max-w-[1000px] px-6 py-12">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
            قارن بين الخطط
          </h2>
          <div className="mt-8 overflow-x-auto rounded-[24px] border border-warm-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-warm-bg/60">
                  <th className="p-4 text-start font-bold text-ink">المزايا</th>
                  {PLAN_COLS.map((col, i) => (
                    <th key={col} className={cnHeader(i === 1)} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-t border-warm-border">
                    <td className="p-4 text-start font-medium text-ink">
                      {row.label}
                    </td>
                    {row.cols.map((v, i) => (
                      <td
                        key={i}
                        className={
                          "p-4 text-center" + (i === 1 ? " bg-rose/25" : "")
                        }
                      >
                        {v ? (
                          <Check
                            className="mx-auto size-5 text-primary"
                            aria-label="متوفر"
                          />
                        ) : (
                          <Minus
                            className="mx-auto size-5 text-ink-muted/50"
                            aria-label="غير متوفر"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Live currency converter */}
        <section className="mx-auto w-full max-w-[820px] px-6 py-6">
          <CurrencyConverter />
        </section>

        {/* Payment methods */}
        <section className="mx-auto w-full max-w-[1000px] px-6 py-12">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
            طرق الدفع
          </h2>
          <p className="mt-2 text-center text-ink-muted">
            ندعم وسائل الدفع الرئيسية حول العالم — وبأي عملة محلية.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {PAYMENT_METHODS.map((m) => (
              <span
                key={m}
                className="flex h-14 min-w-[104px] items-center justify-center rounded-[14px] border border-warm-border bg-card px-5 font-bold text-ink shadow-soft"
              >
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* Pricing FAQ */}
        <section className="mx-auto w-full max-w-[800px] px-6 py-12">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
            أسئلة شائعة حول الأسعار
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            {PRICING_FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-[15px] border border-primary/20 bg-card p-5 shadow-soft transition-all duration-300 hover:shadow-soft-lg open:[&_svg]:rotate-45"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-ink">
                  {item.q}
                  <Plus
                    className="size-5 shrink-0 text-primary transition-transform duration-300"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="mx-auto w-full max-w-[1200px] px-6 pb-20">
          <div className="flex flex-col items-center gap-5 rounded-[30px] bg-primary px-6 py-14 text-center text-primary-foreground">
            <h2 className="max-w-xl text-2xl font-bold text-balance sm:text-3xl">
              جاهز لتصميم دعوتك؟ ابدأ الآن مجاناً
            </h2>
            <p className="max-w-lg leading-relaxed text-primary-foreground/85">
              صمّم وعاين دعوتك بالكامل، ولن تدفع شيئاً حتى تقرر نشرها.
            </p>
            <Button
              size="lg"
              className="h-[50px] rounded-[8px] bg-background font-semibold text-primary shadow-lg hover:bg-background/90"
              asChild
            >
              <Link href={ROUTES.create}>
                ابدأ التصميم
                <ArrowLeft className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}

/** Highlighted header cell for the most-popular column. */
function cnHeader(popular: boolean) {
  return (
    "p-4 text-center font-bold" +
    (popular ? " bg-rose/40 text-primary" : " text-ink")
  );
}
