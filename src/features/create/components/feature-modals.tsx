"use client";

import {
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ImagePlus,
  Lock,
  MessageSquare,
  Minus,
  Plus,
  UserCheck,
  Users,
  Utensils,
} from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";

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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

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

/** Icon + title/desc row with a trailing pill switch — used for form options. */
function ToggleRow({
  Icon,
  title,
  desc,
  checked,
  onToggle,
}: {
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e5e7eb] p-3.5">
      <span className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose text-primary">
          <Icon className="size-4" aria-hidden />
        </span>
        <span>
          <span className="block text-sm font-medium text-ink">{title}</span>
          <span className="text-xs text-ink-muted">{desc}</span>
        </span>
      </span>
      <Switch checked={checked} onClick={onToggle} label={title} />
    </div>
  );
}

/** Compact −/+ number stepper. */
function Stepper({
  value,
  setValue,
  min = 0,
  max = 10,
}: {
  value: number;
  setValue: (n: number) => void;
  min?: number;
  max?: number;
}) {
  const btn =
    "flex size-8 items-center justify-center rounded-full border border-[#d1d5db] text-ink transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40";
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setValue(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="إنقاص"
        className={btn}
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span className="w-6 text-center text-sm font-bold text-ink">
        {value}
      </span>
      <button
        type="button"
        onClick={() => setValue(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="زيادة"
        className={btn}
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export function RsvpModal({ trigger }: { trigger: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [companions, setCompanions] = useState(true);
  const [guestMsg, setGuestMsg] = useState(true);
  const [meal, setMeal] = useState(false);
  const [maxCompanions, setMaxCompanions] = useState(2);
  const [thanks, setThanks] = useState(
    "شكرًا لتأكيد حضوركم، سعداء بمشاركتكم فرحتنا.",
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] gap-0 overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-3 text-start">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-rose text-primary">
              <UserCheck className="size-5" aria-hidden />
            </span>
            <div>
              <DialogTitle className="text-lg font-bold text-ink">
                إعداد تأكيد الحضور
              </DialogTitle>
              <DialogDescription className="text-ink-muted">
                حدد ما الذي سيظهر للضيف عند تأكيد الحضور، وكيف ستتابع الردود.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Master enable */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-rose/50 p-4">
          <span>
            <span className="block text-sm font-medium text-ink">
              تفعيل تأكيد الحضور
            </span>
            <span className="text-xs text-ink-muted">
              اسمح لضيوفك بإرسال ردهم من داخل الدعوة.
            </span>
          </span>
          <Switch
            checked={enabled}
            onClick={() => setEnabled((v) => !v)}
            label="تفعيل تأكيد الحضور"
          />
        </div>

        {/* Config — dimmed while disabled */}
        <div
          className={cn(
            "mt-5 flex flex-col gap-4 transition-opacity",
            !enabled && "pointer-events-none opacity-50",
          )}
        >
          <div>
            <p className="mb-2.5 text-sm font-bold text-ink">
              ماذا يملأ الضيف عند الرد؟
            </p>
            <div className="flex flex-col gap-2.5">
              {/* Attendance — always on */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-3.5">
                <span className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose text-primary">
                    <CalendarCheck className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      سؤال الحضور
                    </span>
                    <span className="text-xs text-ink-muted">
                      يختار الضيف: سأحضر أو أعتذر
                    </span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose px-2.5 py-1 text-[11px] font-medium text-primary">
                  <Lock className="size-3" aria-hidden />
                  أساسي
                </span>
              </div>

              <ToggleRow
                Icon={Users}
                title="عدد المرافقين"
                desc="اسمح للضيف بتحديد عدد الأشخاص القادمين معه"
                checked={companions}
                onToggle={() => setCompanions((v) => !v)}
              />
              {companions ? (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-[#e5e7eb] px-4 py-3">
                  <span className="text-sm text-ink">
                    الحد الأقصى للمرافقين
                  </span>
                  <Stepper
                    value={maxCompanions}
                    setValue={setMaxCompanions}
                    min={0}
                    max={10}
                  />
                </div>
              ) : null}

              <ToggleRow
                Icon={MessageSquare}
                title="رسالة من الضيف"
                desc="اسمح بإرسال تهنئة أو ملاحظة قصيرة"
                checked={guestMsg}
                onToggle={() => setGuestMsg((v) => !v)}
              />
              <ToggleRow
                Icon={Utensils}
                title="تفضيل الوجبة"
                desc="اسمح للضيف باختيار نوع الطعام المفضل"
                checked={meal}
                onToggle={() => setMeal((v) => !v)}
              />
            </div>
          </div>

          {/* RSVP deadline */}
          <div className="flex flex-col gap-1.5">
            <Label>آخر موعد لاستقبال الردود</Label>
            <div className="flex h-[50px] items-center gap-2 rounded-[12px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-ink">
              <CalendarDays
                className="size-4 shrink-0 text-ink-muted"
                aria-hidden
              />
              <span className="flex-1">قبل 3 أيام من الحفل</span>
              <ChevronDown
                className="size-4 shrink-0 text-ink-muted"
                aria-hidden
              />
            </div>
          </div>

          {/* Thank-you message */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label className="mb-0">رسالة الشكر بعد التأكيد</Label>
              <span className="text-xs text-ink-muted" dir="ltr">
                {thanks.length}/120
              </span>
            </div>
            <textarea
              rows={2}
              maxLength={120}
              value={thanks}
              onChange={(e) => setThanks(e.target.value)}
              className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>
        </div>

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
