import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

import { NAV_LINKS } from "../content";
import { NavLanguageSwitcher } from "./nav-language-switcher";

/** Landing-page top navigation (RTL): logo · links · language + login + CTA. */
export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-warm-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[100px] w-full max-w-[1200px] items-center justify-between px-6">
        <Link
          href={ROUTES.home}
          className="flex items-center"
          aria-label="INVITERA"
        >
          <Image
            src="/images/logo.png"
            alt="INVITERA"
            width={199}
            height={58}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              // Point at the home page + section so the links work from any
              // route (e.g. /create), not just the landing page.
              href={`${ROUTES.home}${link.href}`}
              className="text-[15px] font-medium text-ink-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <NavLanguageSwitcher />
          <span
            className="hidden h-6 w-px bg-warm-border sm:block"
            aria-hidden
          />
          {/* Login page not built yet — placeholder anchor to avoid a dead route. */}
          <a
            href="#login"
            className="hidden text-[15px] font-medium text-ink transition-colors hover:text-primary sm:block"
          >
            تسجيل الدخول
          </a>
          <Button
            size="lg"
            className="h-[50px] rounded-[8px] font-semibold shadow-lg"
            asChild
          >
            <Link href={ROUTES.create}>ابدأ التصميم</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
