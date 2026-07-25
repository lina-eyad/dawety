"use client";

import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALE_LABELS } from "@/constants/site";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";

/**
 * Instant locale switcher. `router.replace(pathname, { locale })` swaps only the
 * locale segment client-side (no full reload), and the layout re-resolves
 * `dir`/messages for the new locale.
 */
export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(nextLocale: Locale) {
    if (nextLocale === activeLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          aria-label={t("label")}
        >
          <Globe className="size-4" aria-hidden />
          {LOCALE_LABELS[activeLocale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onSelect={() => switchTo(locale)}
            className="justify-between gap-6"
          >
            {LOCALE_LABELS[locale]}
            {locale === activeLocale ? (
              <Check className="size-4" aria-hidden />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
