import { Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const CTA_POINTS = [
  "تصميم سهل وبسيط",
  "معاينة فورية",
  "نشر ومشاركة فورية",
  "ادفع فقط عند النشر",
];

/** Maroon CTA banner: "ابدأ دعوتك الأولى خلال دقائق". */
export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-10">
      <div className="relative overflow-hidden rounded-[40px] bg-primary px-8 py-16 text-center text-primary-foreground">
        <Sparkles
          className="absolute start-10 top-8 size-6 opacity-30"
          aria-hidden
        />
        <Sparkles
          className="absolute end-14 bottom-10 size-8 opacity-20"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-balance sm:text-4xl">
            ابدأ دعوتك الأولى خلال دقائق
          </h2>
          <p className="text-lg leading-relaxed text-primary-foreground/85">
            صمّم وعاين دعوتك مجانًا، ثم انشرها عندما تكون جاهزًا لمشاركتها مع
            ضيوفك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-background text-primary shadow-none hover:bg-background/90"
            >
              ابدأ التصميم
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              استعرض القوالب
            </Button>
          </div>
          <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {CTA_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm">
                <Check className="size-4" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
