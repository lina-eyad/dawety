"use client";

import { ChevronDown, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const CODES: Record<Locale, string> = { ar: "AR", en: "EN" };
const NAMES: Record<Locale, string> = { ar: "العربية", en: "English" };

/** Compact navbar language switcher: globe + locale code + chevron. */
export function NavLanguageSwitcher() {
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === active) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isPending}
        className="flex items-center gap-1.5 text-[15px] font-medium text-ink transition-colors outline-none hover:text-primary disabled:opacity-60"
        aria-label="اختر اللغة"
      >
        <Globe className="size-4" aria-hidden />
        {CODES[active]}
        <ChevronDown className="size-3.5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onSelect={() => switchTo(loc)}
            className={cn(
              "justify-between gap-6",
              loc === active && "font-medium text-primary",
            )}
          >
            {NAMES[loc]}
            <span className="text-xs text-ink-muted">{CODES[loc]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
