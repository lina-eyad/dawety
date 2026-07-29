import Image from "next/image";

import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

import { TEMPLATE_FILTERS, TEMPLATES } from "../content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/** "قوالب أنيقة تناسب كل احتفال" — filter chips + template card row. */
export function TemplatesSection() {
  return (
    <section id="templates" className="bg-background py-[50px]">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <SectionHeading
            eyebrow="قوالب احترافية"
            title="قوالب أنيقة تناسب كل احتفال"
            description="اختر من مجموعة قوالب مصممة بعناية لمختلف المناسبات، وخصصها بسهولة لتناسب ذوقك وتفاصيل مناسبتك."
          />
        </Reveal>

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
              className="group overflow-hidden rounded-[30px] border border-primary/20 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
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
                  <span className="text-sm text-primary">{tpl.tag}</span>
                </div>

                <Button
                  variant="outline"
                  className="h-[46px] w-full rounded-[8px] border-primary font-semibold text-primary"
                >
                  استخدم القالب
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="h-[50px] rounded-[8px] font-semibold shadow-lg"
          >
            استعرض كل القوالب
            <ArrowLeft className="size-3" aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
