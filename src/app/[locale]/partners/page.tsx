import { ArrowLeft, Sparkles } from "lucide-react";
import { Fragment } from "react";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { MarketingFooter, MarketingNavbar } from "@/features/marketing";
import { PARTNER_STATS, PartnersDirectory } from "@/features/partners";

/** Our Partners — the trusted-professionals directory. */
export default async function PartnersPage({
  params,
}: PageProps<"/[locale]/partners">) {
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
          <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-14 pb-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              شركاء موثوقون
            </span>
            <h1 className="mx-auto mt-4 text-3xl font-bold text-balance text-ink sm:text-[40px] sm:leading-[1.2]">
              شركاؤنا
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
              تعرّف على المبدعين — منظّمين ومصمّمين ومصوّرين — الذين يُحيون
              مناسباتكم عبر منصّتنا.
            </p>

            {/* Stats */}
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-8 rounded-2xl border border-primary/15 bg-card px-8 py-5 shadow-soft">
              {PARTNER_STATS.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 ? (
                    <span className="h-8 w-px bg-primary/15" aria-hidden />
                  ) : null}
                  <div>
                    <div className="text-xl font-bold text-ink">{s.value}</div>
                    <div className="text-xs text-ink-muted">{s.label}</div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Directory */}
        <section className="mx-auto w-full max-w-[1200px] px-6 py-10">
          <PartnersDirectory />
        </section>

        {/* Join CTA */}
        <section className="mx-auto w-full max-w-[1200px] px-6 pb-20">
          <div className="flex flex-col items-center gap-5 rounded-[30px] bg-primary px-6 py-14 text-center text-primary-foreground">
            <h2 className="max-w-xl text-2xl font-bold text-balance sm:text-3xl">
              هل أنت مزوّد خدمة للمناسبات؟
            </h2>
            <p className="max-w-lg leading-relaxed text-primary-foreground/85">
              انضم إلى دليل شركائنا وقدّم خدماتك لآلاف المستخدمين.
            </p>
            <Button
              size="lg"
              className="h-[50px] rounded-[8px] bg-background font-semibold text-primary shadow-lg hover:bg-background/90"
              asChild
            >
              <Link href="/#contact">
                قدّم كشريك
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
