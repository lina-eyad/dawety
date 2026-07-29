import { ShieldCheck, Smile, Star } from "lucide-react";
import { Fragment } from "react";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { TestimonialsCarousel } from "./testimonials-carousel";

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
      <Reveal>
        <SectionHeading
          eyebrow="اراء العملاء"
          title="تجارب جعلت الدعوات أسهل"
          description="آراء من مستخدمين صمّموا دعواتهم وشاركوها بسهولة عبر الرابط أو واتساب."
        />
      </Reveal>

      <Reveal>
        <TestimonialsCarousel />
      </Reveal>

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
