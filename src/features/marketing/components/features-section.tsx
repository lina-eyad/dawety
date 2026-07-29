import {
  Globe,
  Languages,
  LayoutGrid,
  Link2,
  Send,
  Smartphone,
} from "lucide-react";

import { FEATURES } from "../content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const ICONS = [LayoutGrid, Send, Globe, Link2, Languages, Smartphone];

/** "كل ما تحتاجه لإنشاء دعوة رقمية مميزة" — 6 feature cards (3×2). */
export function FeaturesSection() {
  return (
    <section
      id="features"
      className="mx-auto w-full max-w-[1200px] px-6 py-[50px]"
    >
      <Reveal>
        <SectionHeading
          eyebrow="مميزات متكاملة"
          title="كل ما تحتاجه لإنشاء دعوة رقمية مميزة"
          description="من اختيار القالب الى مشاركة الرابط, نمنحك تجربة بسيطة وأنيقة لإنشاء دعوتك بأقل مجهود وأعلى جودة."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={feature.title} delay={(i % 3) * 0.1}>
              <div className="group flex h-full flex-col gap-4 rounded-[30px] border border-primary/20 bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-rose text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-ink">{feature.title}</h3>
                <p className="leading-relaxed text-ink-muted">{feature.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
