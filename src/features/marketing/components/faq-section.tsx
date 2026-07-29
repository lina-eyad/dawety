import { MessageCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FAQS } from "../content";
import { SectionHeading } from "./section-heading";

/** "كل ما تحتاج معرفته قبل البدء" — FAQ accordion (native details) + contact card. */
export function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1000px] px-6 py-[50px]">
      <SectionHeading
        eyebrow="الأسئلة الشائعة"
        title="كل ما تحتاج معرفته قبل البدء"
        description="إجابات واضحة لأكثر الأسئلة شيوعًا حول تصميم الدعوات, النشر, الدفع."
      />

      <div className="mt-12 grid items-start gap-4 md:grid-cols-2">
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="rounded-[15px] border border-primary/20 bg-card p-5 shadow-soft open:[&_svg]:rotate-45"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 font-bold text-ink [&::-webkit-details-marker]:hidden">
              {faq.q}
              <Plus
                className="size-5 shrink-0 text-primary transition-transform"
                aria-hidden
              />
            </summary>
            <p className="mt-3 leading-relaxed text-ink-muted">{faq.a}</p>
          </details>
        ))}
      </div>

      {/* Contact card */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[30px] border border-primary/20 bg-rose/40 px-8 py-6 text-center sm:flex-row sm:text-start">
        <div>
          <h3 className="text-lg font-bold text-ink">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-ink-muted">تواصل معنا وسنجيب عليك بكل سرور.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-[50px] rounded-[8px] font-semibold shadow-lg"
          >
            تواصل معنا
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-[50px] rounded-[8px] border-primary font-semibold text-primary"
          >
            <MessageCircle className="size-4" aria-hidden />
            راسلنا على واتساب
          </Button>
        </div>
      </div>
    </section>
  );
}
