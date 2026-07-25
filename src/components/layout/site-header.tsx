import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

/**
 * App-wide header shell. Intentionally minimal for the foundation phase — brand
 * wordmark + language switcher only. Navigation items are added when pages exist.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href={ROUTES.home}
          className="text-lg font-extrabold tracking-tight text-primary"
        >
          INVITERA
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
