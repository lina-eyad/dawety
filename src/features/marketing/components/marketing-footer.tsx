import Image from "next/image";
import { Mail, Phone } from "lucide-react";

import { FOOTER_COLUMNS } from "../content";

/** Maroon footer: brand + contact, link columns, copyright + language switch. */
export function MarketingFooter() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + contact */}
        <div className="flex flex-col gap-4">
          <Image
            src="/images/logo.png"
            alt="INVITERA"
            width={199}
            height={58}
            className="h-9 w-auto brightness-0 invert"
          />
          <p className="text-sm leading-relaxed text-primary-foreground/80">
            تواصل معنا
          </p>
          <a
            href="mailto:info@invitera.com"
            className="flex items-center gap-2 text-sm text-primary-foreground/90"
          >
            <Mail className="size-4" aria-hidden />
            info@invitera.com
          </a>
          <a
            href="tel:+966501234567"
            className="flex items-center gap-2 text-sm text-primary-foreground/90"
            dir="ltr"
          >
            <Phone className="size-4" aria-hidden />
            +966 50 1234567
          </a>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h3 className="font-bold">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright bar */}
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-5 text-sm sm:flex-row">
          <p className="text-primary-foreground/80">
            © 2026 Invitera. جميع الحقوق محفوظة.
          </p>
          <p className="text-primary-foreground/80">صُنع بحب في Invitera</p>
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <button type="button" className="font-medium">
              AR
            </button>
            <span className="opacity-40">|</span>
            <button type="button" className="hover:text-primary-foreground">
              EN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
