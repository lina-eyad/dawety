import Image from "next/image";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Hero: rose-glow background, headline, subtitle, dual CTAs, device mockup. */
export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row lg:justify-between lg:py-28">
        {/* Media */}
        <div className="w-full max-w-xl lg:w-[52%]">
          <Image
            src="/images/hero-mockup.png"
            alt="معاينة دعوة رقمية على الحاسوب والجوال"
            width={629}
            height={615}
            className="h-auto w-full drop-shadow-[0_10px_40px_rgba(16,19,28,0.08)]"
            priority
          />
        </div>

        {/* Copy */}
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center lg:w-[44%] lg:items-start lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-background/70 px-4 py-2 text-sm font-medium text-ink shadow-soft">
            <Sparkles className="size-4 text-primary" aria-hidden />
            دعوات رقمية لكل مناسباتك
          </span>

          <h1 className="text-4xl leading-[1.1] font-bold text-balance text-ink sm:text-5xl lg:text-[56px]">
            صمّم دعوتك
            <br />
            بكل سهولة وأناقة
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-ink-muted">
            أنشئ دعوات رقمية مميزة لمناسباتك وشاركها فوراً عبر الرابط أو واتساب
            بطريقة عصرية وسريعة.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button size="lg" className="shadow-brand">
              ابدأ التصميم
            </Button>
            <Button size="lg" variant="secondary">
              استعرض القوالب
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
