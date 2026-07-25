import Image from "next/image";

import { Button } from "@/components/ui/button";

import { NAV_LINKS } from "../content";

/** Landing-page top navigation (RTL): logo · links · login + primary CTA. */
export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-warm-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[100px] w-full max-w-[1200px] items-center justify-between px-6">
        <a href="#home" className="flex items-center" aria-label="INVITERA">
          <Image
            src="/images/logo.png"
            alt="INVITERA"
            width={199}
            height={58}
            className="h-9 w-auto"
            priority
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#login"
            className="hidden text-[15px] font-medium text-ink transition-colors hover:text-primary sm:block"
          >
            تسجيل الدخول
          </a>
          <Button size="lg" className="shadow-brand">
            ابدأ التصميم
          </Button>
        </div>
      </div>
    </header>
  );
}
