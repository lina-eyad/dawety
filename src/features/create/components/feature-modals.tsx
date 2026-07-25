"use client";

import { ImagePlus, Plus } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Shared shell: header + enable toggle + body + cancel/save footer. */
function FeatureModal({
  trigger,
  title,
  desc,
  toggleLabel,
  toggleHint,
  children,
}: {
  trigger: ReactNode;
  title: string;
  desc: string;
  toggleLabel: string;
  toggleHint: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] gap-0 overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-ink">
            {title}
          </DialogTitle>
          <DialogDescription className="text-ink-muted">
            {desc}
          </DialogDescription>
        </DialogHeader>

        <label className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-rose/50 p-4">
          <span>
            <span className="block text-sm font-medium text-ink">
              {toggleLabel}
            </span>
            <span className="text-xs text-ink-muted">{toggleHint}</span>
          </span>
          <input
            type="checkbox"
            defaultChecked
            className="size-5 accent-[var(--primary)]"
          />
        </label>

        <div className="mt-4 flex flex-col gap-4">{children}</div>

        <DialogFooter className="mt-6 gap-2 sm:justify-start">
          <Button className="shadow-brand">حفظ الإعدادات</Button>
          <DialogClose asChild>
            <Button variant="secondary">إلغاء</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RsvpModal({ trigger }: { trigger: ReactNode }) {
  const questions = [
    { t: "سؤال الحضور", d: "يختار الضيف: سأحضر أو أعتذر" },
    { t: "عدد المرافقين", d: "اسمح للضيف بتحديد عدد الأشخاص القادمين معه" },
    { t: "رسالة من الضيف", d: "اسمح بإرسال تهنئة أو ملاحظة قصيرة" },
  ];
  return (
    <FeatureModal
      trigger={trigger}
      title="إعداد تأكيد الحضور"
      desc="حدد ما الذي سيظهر للضيف عند تأكيد الحضور، وكيف ستتابع الردود."
      toggleLabel="تفعيل تأكيد الحضور"
      toggleHint="اسمح لضيوفك بإرسال ردهم من داخل الدعوة."
    >
      <div>
        <p className="mb-2 text-sm font-medium text-ink">
          ماذا تريد أن يسأل في النموذج؟
        </p>
        <div className="flex flex-col gap-2">
          {questions.map((q) => (
            <label
              key={q.t}
              className="flex items-center justify-between gap-3 rounded-2xl border border-warm-border p-3"
            >
              <span>
                <span className="block text-sm font-medium text-ink">
                  {q.t}
                </span>
                <span className="text-xs text-ink-muted">{q.d}</span>
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="size-4 accent-[var(--primary)]"
              />
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>رسالة بعد التأكيد</Label>
        <textarea
          rows={2}
          defaultValue="شكرًا لتأكيد حضوركم، سعداء بمشاركتكم فرحتنا."
          className="rounded-2xl border border-input bg-transparent px-4 py-3 text-sm outline-none"
        />
      </div>
    </FeatureModal>
  );
}

export function ContactModal({ trigger }: { trigger: ReactNode }) {
  return (
    <FeatureModal
      trigger={trigger}
      title="إعداد معلومات التواصل"
      desc="أضف وسيلة تواصل تظهر للضيوف داخل الدعوة عند الحاجة."
      toggleLabel="تفعيل معلومات التواصل"
      toggleHint="عند تفعيله، سيظهر زر تواصل داخل الدعوة."
    >
      <div className="flex flex-col gap-1.5">
        <Label>اسم جهة التواصل</Label>
        <Input placeholder="مثال: أحمد / منسقة الحفل / والد العروس" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>رقم واتساب</Label>
        <div className="flex gap-2" dir="ltr">
          <span className="flex items-center rounded-2xl border border-input px-3 text-sm text-ink-muted">
            +966
          </span>
          <Input placeholder="5XXXXXXXX" className="flex-1" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label>رسالة واتساب جاهزة (اختياري)</Label>
        <textarea
          rows={2}
          placeholder="مثال: مرحبًا، لدي استفسار بخصوص الدعوة."
          className="rounded-2xl border border-input bg-transparent px-4 py-3 text-sm outline-none"
        />
        <span className="self-start text-xs text-ink-muted">0/120</span>
      </div>
    </FeatureModal>
  );
}

export function GalleryModal({ trigger }: { trigger: ReactNode }) {
  return (
    <FeatureModal
      trigger={trigger}
      title="إعداد معرض الصور"
      desc="أضف صورًا جميلة تظهر داخل دعوتك وتمنح الضيوف تجربة أكثر دفئًا."
      toggleLabel="تفعيل معرض الصور"
      toggleHint="عند تفعيله، سيظهر قسم الصور داخل دعوتك."
    >
      <div className="flex flex-col gap-1.5">
        <Label>عنوان المعرض (اختياري)</Label>
        <Input placeholder="مثال: لحظاتنا الجميلة" />
      </div>
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-warm-border p-8 text-center text-ink-muted">
        <ImagePlus className="size-7 text-primary" aria-hidden />
        <span className="text-sm font-medium text-ink">
          اسحب الصور هنا أو اضغط لاختيار الصور
        </span>
        <span className="text-xs">
          JPG / PNG، حتى 6 صور، الحد الأقصى لكل صورة 10MB
        </span>
      </div>
    </FeatureModal>
  );
}

export function ProgramModal({ trigger }: { trigger: ReactNode }) {
  const steps = [
    { time: "06:00 م", label: "استقبال الضيوف" },
    { time: "07:30 م", label: "العشاء" },
    { time: "09:00 م", label: "مراسم الزفاف" },
    { time: "10:30 م", label: "تقطيع الكيك" },
    { time: "11:30 م", label: "ختام الحفل" },
  ];
  return (
    <FeatureModal
      trigger={trigger}
      title="برنامج الحفل"
      desc="أضف الجدول الزمني للعرض للضيوف داخل الدعوة."
      toggleLabel="عرض برنامج الحفل داخل الدعوة"
      toggleHint="عند تفعيله، سيظهر جدول البرنامج داخل دعوتك."
    >
      <p className="text-sm font-medium text-ink">خطوات برنامج الحفل</p>
      <div className="flex flex-col gap-2">
        {steps.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-2xl border border-warm-border p-3"
          >
            <span className="rounded-full bg-rose px-3 py-1 text-xs font-medium text-primary">
              {s.time}
            </span>
            <span className="text-sm text-ink">{s.label}</span>
          </div>
        ))}
      </div>
      <Button variant="secondary" className="w-full">
        <Plus className="size-4" aria-hidden />
        إضافة خطوة جديدة
      </Button>
    </FeatureModal>
  );
}
