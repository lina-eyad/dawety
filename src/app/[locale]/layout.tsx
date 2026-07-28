import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { getDirection, routing } from "@/i18n/routing";
import { ibmPlexSansArabic, tajawal } from "@/lib/fonts";
import { AppProviders } from "@/providers/app-providers";
import "@/styles/globals.css";

/** Pre-render every locale at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Localized <head> metadata. */
export async function generateMetadata(
  props: PageProps<"/[locale]">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: { default: t("title"), template: `%s · INVITERA` },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // Reject unknown locales before rendering.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opt into static rendering for this request's locale.
  setRequestLocale(locale);

  const direction = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${tajawal.variable} ${ibmPlexSansArabic.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <AppProviders direction={direction}>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
