"use client";

import { Check, Copy, QrCode } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

const INVITE_URL = "https://invitera.com/i/ahmad-sara-2026";

/** WhatsApp glyph (lucide ships no brand icons). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Sharing stage — the invitation is published; share it with guests. */
export function ShareCard() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(INVITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waHref = `https://wa.me/?text=${encodeURIComponent(
    `أنتم مدعوّون 🎉 تفضّلوا بفتح دعوتنا: ${INVITE_URL}`,
  )}`;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 rounded-3xl border border-warm-border bg-card p-8 text-center shadow-soft">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="size-7" aria-hidden />
      </span>
      <div>
        <h2 className="text-2xl font-bold text-ink">تم نشر دعوتك بنجاح!</h2>
        <p className="mt-1 text-ink-muted">
          شارك الرابط مع ضيوفك عبر أي وسيلة تحب.
        </p>
      </div>

      {/* Shareable link + copy */}
      <div className="flex w-full items-center gap-2 rounded-[12px] border border-[#e5e7eb] bg-[#f9fafb] p-1.5">
        <span className="flex-1 truncate px-2 text-sm text-ink" dir="ltr">
          {INVITE_URL}
        </span>
        <Button onClick={copy} className="h-9 rounded-[8px]">
          {copied ? (
            <Check className="size-4" aria-hidden />
          ) : (
            <Copy className="size-4" aria-hidden />
          )}
          {copied ? "تم النسخ" : "نسخ"}
        </Button>
      </div>

      {/* Share actions */}
      <div className="grid w-full grid-cols-2 gap-3">
        <Button
          asChild
          variant="outline"
          className="h-[50px] rounded-[8px] border-primary text-primary"
        >
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-5 text-[#25d366]" />
            مشاركة عبر واتساب
          </a>
        </Button>
        <Button
          variant="outline"
          className="h-[50px] rounded-[8px] border-primary text-primary"
        >
          <QrCode className="size-4" aria-hidden />
          رمز QR
        </Button>
      </div>

      <Link
        href={ROUTES.preview}
        className="text-sm font-medium text-primary hover:underline"
      >
        معاينة الدعوة
      </Link>
    </div>
  );
}
