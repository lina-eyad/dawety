"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";

import { TESTIMONIALS } from "../content";

/**
 * Testimonials carousel — a horizontally scrollable, snap-aligned row of cards
 * with the Figma prev/next controls: white 48px circles with a soft shadow and
 * a chevron. In RTL the right-pointing chevron goes back (left edge) and the
 * left-pointing chevron goes forward (right edge).
 */
export function TestimonialsCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (px: number) =>
    scroller.current?.scrollBy({ left: px, behavior: "smooth" });

  return (
    <div className="relative mt-14">
      {/* Back — right-pointing chevron, left edge in RTL */}
      <button
        type="button"
        onClick={() => scroll(380)}
        aria-label="السابق"
        className="absolute top-1/2 left-0 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-background text-ink shadow-soft-lg transition-colors hover:text-primary md:flex lg:-left-4"
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>

      {/* Forward — left-pointing chevron, right edge in RTL */}
      <button
        type="button"
        onClick={() => scroll(-380)}
        aria-label="التالي"
        className="absolute top-1/2 right-0 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-background text-ink shadow-soft-lg transition-colors hover:text-primary md:flex lg:-right-4"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex min-w-[300px] flex-1 snap-start flex-col gap-4 rounded-[30px] border border-primary/20 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg sm:min-w-[340px]"
          >
            <div className="flex gap-0.5 text-primary">
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
                <span className="text-sm text-primary">{t.tag}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
