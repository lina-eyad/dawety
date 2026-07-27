import { Star } from "lucide-react";

import { TESTIMONIALS } from "../content";
import { SectionHeading } from "./section-heading";

const STATS = [
  { value: "4.9/5", label: "تقييم العملاء" },
  { value: "آلاف العملاء", label: "ثقة" },
  { value: "50,000+", label: "مستخدم سعيد" },
];

/** "تجارب جعلت الدعوات أسهل" — testimonial cards + trust stats. */
export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="mx-auto w-full max-w-[1200px] px-6 py-[50px]"
    >
      <SectionHeading
        eyebrow="اراء العملاء"
        title="تجارب جعلت الدعوات أسهل"
        description="آراء من مستخدمين صمّموا دعواتهم وشاركوها بسهولة عبر الرابط أو واتساب."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col gap-4 rounded-3xl border border-warm-border bg-card p-7 shadow-soft"
          >
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" aria-hidden />
              ))}
            </div>
            <blockquote className="leading-relaxed text-ink">
              {t.quote}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-rose font-bold text-primary">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-bold text-ink">{t.name}</span>
                <span className="text-sm text-gold">{t.tag}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-4 rounded-3xl border border-warm-border bg-warm-bg/60 px-8 py-6 text-center">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="text-2xl font-bold text-primary">{s.value}</span>
            <span className="text-sm text-ink-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
