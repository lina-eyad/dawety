import { ShieldCheck, Smile, Star } from "lucide-react";
import { Fragment } from "react";

import { TESTIMONIALS } from "../content";
import { SectionHeading } from "./section-heading";

/**
 * Trust-stats bar (Figma "Stats Bar"): a white pill with tan border, three
 * inline items separated by vertical dividers, each an icon + a two-tone label
 * (dark value + muted description). Order matches Figma left→right.
 */
const STATS = [
  {
    Icon: Star,
    filled: true,
    parts: [
      { t: "4.9/5", strong: true },
      { t: "تقييم العملاء", strong: false },
    ],
  },
  {
    Icon: ShieldCheck,
    filled: false,
    parts: [
      { t: "ثقة", strong: false },
      { t: "آلاف العملاء", strong: true },
    ],
  },
  {
    Icon: Smile,
    filled: false,
    parts: [
      { t: "50,000+", strong: true },
      { t: "مستخدم سعيد", strong: false },
    ],
  },
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
            className="flex flex-col gap-4 rounded-[30px] border border-primary/20 bg-card p-7 shadow-soft"
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

      <div className="mt-12 flex justify-center" dir="ltr">
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-3 rounded-full border border-primary/20 bg-background px-12 py-6">
          {STATS.map((s, i) => (
            <Fragment key={i}>
              {i > 0 ? (
                <span
                  className="hidden h-6 w-px bg-primary/20 sm:block"
                  aria-hidden
                />
              ) : null}
              <div className="flex items-center gap-3 text-base font-medium whitespace-nowrap">
                <span>
                  {s.parts.map((p, j) => (
                    <span key={j} className="text-[#0B1020]">
                      {p.t}
                      {j < s.parts.length - 1 ? " " : ""}
                    </span>
                  ))}
                </span>
                <s.Icon
                  className={
                    "size-5 text-primary" + (s.filled ? " fill-primary" : "")
                  }
                  aria-hidden
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
