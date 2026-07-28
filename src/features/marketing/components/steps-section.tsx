import { LayoutTemplate, Share2, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { STEPS } from "../content";
import { SectionHeading } from "./section-heading";

const ICONS = [LayoutTemplate, SlidersHorizontal, Share2];

/** "دعوتك جاهزة بثلاث خطوات بسيطة" — 3 numbered step cards. */
export function StepsSection() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-[50px]">
      <SectionHeading
        eyebrow="سهلة وسريعة"
        title="دعوتك جاهزة بثلاث خطوات بسيطة"
        description="اختر قالبًا يناسب مناسبتك، عدّل التفاصيل بطريقتك، ثم شارك الدعوة فورًا مع ضيوفك."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = ICONS[i];
          return (
            <div
              key={step.num}
              className="relative flex flex-col items-center gap-4 rounded-3xl border border-primary/20 bg-card p-8 text-center shadow-soft"
            >
              <span className="absolute start-6 top-6 text-4xl font-bold text-rose-strong">
                {step.num}
              </span>
              <span className="flex size-14 items-center justify-center rounded-2xl bg-rose text-primary">
                <Icon className="size-7" aria-hidden />
              </span>
              <h3 className="text-xl font-bold text-ink">{step.title}</h3>
              <p className="leading-relaxed text-ink-muted">{step.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          size="lg"
          className="h-[50px] rounded-[8px] font-semibold shadow-lg"
        >
          ابدأ بتصميم دعوتك الان
        </Button>
      </div>
    </section>
  );
}
