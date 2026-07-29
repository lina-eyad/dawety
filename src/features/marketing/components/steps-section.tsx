import { LayoutTemplate, Share2, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { STEPS } from "../content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const ICONS = [LayoutTemplate, SlidersHorizontal, Share2];

/** "دعوتك جاهزة بثلاث خطوات بسيطة" — 3 numbered step cards. */
export function StepsSection() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-[50px]">
      <Reveal>
        <SectionHeading
          eyebrow="سهلة وسريعة"
          title="دعوتك جاهزة بثلاث خطوات بسيطة"
          description="اختر قالبًا يناسب مناسبتك، عدّل التفاصيل بطريقتك، ثم شارك الدعوة فورًا مع ضيوفك."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col items-center gap-4 rounded-[30px] border border-primary/20 bg-card p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                <span className="absolute start-6 top-6 text-4xl font-bold text-rose-strong">
                  {step.num}
                </span>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-rose text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-7" aria-hidden />
                </span>
                <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                <p className="leading-relaxed text-ink-muted">{step.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <Button
          size="lg"
          className="h-[50px] rounded-[8px] font-semibold shadow-lg"
        >
          ابدأ بتصميم دعوتك الان
        </Button>
      </Reveal>
    </section>
  );
}
