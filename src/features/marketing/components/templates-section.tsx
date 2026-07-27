import Image from "next/image";

import { Button } from "@/components/ui/button";

import { TEMPLATE_FILTERS, TEMPLATES } from "../content";
import { SectionHeading } from "./section-heading";

/** "قوالب أنيقة تناسب كل احتفال" — filter chips + template card row. */
export function TemplatesSection() {
  return (
    <section id="templates" className="bg-background py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="قوالب احترافية"
          title="قوالب أنيقة تناسب كل احتفال"
          description="اختر من مجموعة قوالب مصممة بعناية لمختلف المناسبات، وخصصها بسهولة لتناسب ذوقك وتفاصيل مناسبتك."
        />

        {/* Filter chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {TEMPLATE_FILTERS.map((filter, i) => (
            <button
              key={filter}
              type="button"
              className={
                i === 0
                  ? "rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                  : "rounded-full border border-warm-border bg-background px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-primary/40 hover:text-primary"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Template cards */}
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.title}
              className="group overflow-hidden rounded-2xl border border-tan-border/60 bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-warm-bg">
                <Image
                  src={tpl.img}
                  alt={tpl.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col items-center gap-3 p-4 text-center">
                <div>
                  <h3 className="font-bold text-ink">{tpl.title}</h3>
                  <span className="text-sm text-gold">{tpl.tag}</span>
                </div>
                <Button variant="secondary" size="sm" className="w-full">
                  استخدم القالب
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg" className="shadow-brand">
            استعرض كل القوالب
          </Button>
        </div>
      </div>
    </section>
  );
}
