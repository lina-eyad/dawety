import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Hero — measurements read directly from the Figma home frame (node 2:2). */
export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 py-[50px] lg:flex-row lg:justify-between">
        {/* Copy — right side in RTL. Figma: text block ≈515px wide, 30px gaps. */}
        <div className="flex w-full max-w-[515px] flex-col items-center gap-[30px] text-center lg:w-[43%] lg:items-start lg:text-start">
          {/* Badge: #fff0f5 bg, #9e0d3d border/text, pill, 6/16 padding */}
          <span className="inline-flex items-center gap-2 rounded-full border border-primary bg-rose px-4 py-1.5 text-sm font-medium text-primary shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]">
            <Sparkles className="size-4 text-primary" aria-hidden />
            دعوات رقمية لكل مناسباتك
          </span>

          {/* Heading: Tajawal 700, 60px/70px, ls 0.6. Only "صمّم" is brand
              color (#9e0d3d); the rest is #111827 (ink). */}
          <h1 className="text-4xl leading-[1.1] font-bold text-balance text-ink sm:text-5xl lg:text-[60px] lg:leading-[70px] lg:tracking-[0.6px]">
            <span className="text-primary">صمّم</span> دعوتك
            <br />
            بكل سهولة وأناقة
          </h1>

          {/* Description: Tajawal 400, 20px/33px, #5b5e69 */}
          <p className="text-lg leading-relaxed text-ink-muted lg:text-xl lg:leading-[33px]">
            أنشئ دعوات رقمية مميزة لمناسباتك وشاركها فوراً عبر الرابط أو واتساب
            بطريقة عصرية وسريعة.
          </p>

          {/* CTAs: 50px tall. Both radius 8; outlined has maroon border/text */}
          <div className="flex flex-wrap items-center justify-center gap-[26px] lg:justify-start">
            <Button
              size="lg"
              className="h-[50px] rounded-[8px] font-bold shadow-lg"
            >
              ابدأ التصميم
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-[50px] rounded-[8px] border-primary px-10 font-bold text-primary"
            >
              استعرض القوالب
              <ArrowLeft className="size-3" aria-hidden />
            </Button>
          </div>
        </div>

        {/* Media — left side in RTL. Figma image 629×615. The mockup PNG has a
            soft rose backdrop baked in, faded with a radial mask to blend into
            the white page (per the earlier white-background decision). */}
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
