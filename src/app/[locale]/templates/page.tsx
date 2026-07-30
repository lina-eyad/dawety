import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { MarketingFooter, MarketingNavbar } from "@/features/marketing";
import { TemplatesGallery } from "@/features/templates";

/** Templates catalogue — browse, filter and pick a design to start from. */
export default async function TemplatesPage({
  params,
}: PageProps<"/[locale]/templates">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MarketingNavbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background">
          {/* soft rose glow */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,var(--rose)_0%,transparent_70%)] opacity-70"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-[1200px] px-6 pt-14 pb-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              قوالب احترافية
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-balance text-ink sm:text-[40px] sm:leading-[1.2]">
              قوالب أنيقة تناسب كل مناسبة
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
              تصفّح مجموعتنا من القوالب المصمّمة بعناية، اختر ما يناسب مناسبتك،
              وخصّصه بسهولة ليعكس ذوقك — كل ذلك في دقائق.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto w-full max-w-[1200px] px-6 py-10">
          <TemplatesGallery />
        </section>

        {/* CTA band */}
        <section className="mx-auto w-full max-w-[1200px] px-6 pb-20">
          <div className="flex flex-col items-center gap-5 rounded-[30px] bg-primary px-6 py-14 text-center text-primary-foreground">
            <h2 className="max-w-xl text-2xl font-bold text-balance sm:text-3xl">
              لم تجد ما يناسبك؟ صمّم دعوتك من الصفر
            </h2>
            <p className="max-w-lg leading-relaxed text-primary-foreground/85">
              ابدأ بصفحة فارغة وأنشئ دعوة فريدة تماماً تعبّر عن مناسبتك بأدواتنا
              السهلة.
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
