import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Hero: white background, headline, subtitle, dual CTAs, device mockup. */
export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 py-[50px] lg:flex-row lg:justify-between">
        {/* Copy — right side in RTL */}
        <div className="flex w-full max-w-xl flex-col items-center gap-4 text-center lg:w-[44%] lg:items-start lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-warm-border bg-background/70 px-4 py-2 text-sm font-medium text-ink shadow-soft">
            <Sparkles className="size-4 text-primary" aria-hidden />
            دعوات رقمية لكل مناسباتك
          </span>

          <h1 className="text-4xl leading-[1.15] font-bold text-balance text-ink sm:text-5xl lg:text-[46px]">
            صمّم دعوتك
            <br />
            بكل سهولة وأناقة
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-ink-muted">
            أنشئ دعوات رقمية مميزة لمناسباتك وشاركها فوراً عبر الرابط أو واتساب
            بطريقة عصرية وسريعة.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button size="lg" className="h-[50px] rounded-[8px]">
              ابدأ التصميم
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-[50px] rounded-[8px]"
            >
              استعرض القوالب
              <ArrowLeft className="size-4" aria-hidden />
            </Button>
          </div>
        </div>

        {/* Media — left side in RTL. The mockup render has a soft rose backdrop
            baked into the PNG, so its edges are faded with a radial mask to blend
            into the white page instead of showing a pink box. */}
        <div className="w-full max-w-[629px] lg:w-[52%]">
          <Image
            src="/images/hero-mockup.png"
            alt="معاينة دعوة رقمية على الحاسوب والجوال"
            width={629}
            height={615}
            className="h-auto w-full [mask-image:radial-gradient(120%_120%_at_50%_48%,#000_62%,transparent_94%)] [-webkit-mask-image:radial-gradient(120%_120%_at_50%_48%,#000_62%,transparent_94%)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
