import { getTranslations, setRequestLocale } from "next-intl/server";

import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";

/**
 * Minimal placeholder home page — foundation phase only. Its purpose is to prove
 * the stack end to end (Tajawal font, brand tokens, i18n/RTL, primitives,
 * motion). Real pages and features come in a later phase.
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <FadeIn className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {t("badge")}
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">{t("primaryCta")}</Button>
          <Button size="lg" variant="secondary">
            {t("secondaryCta")}
          </Button>
        </div>
      </FadeIn>
    </main>
  );
}
