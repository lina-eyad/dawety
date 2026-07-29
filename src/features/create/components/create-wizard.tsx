"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Cake,
  CalendarClock,
  CalendarHeart,
  Check,
  ClipboardCheck,
  GraduationCap,
  Hand,
  Heart,
  Images,
  MapPin,
  MessageCircle,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import {
  ContactModal,
  GalleryModal,
  ProgramModal,
  RsvpModal,
} from "./feature-modals";

import {
  DETAILS_FIELDS,
  EVENT_TYPES,
  INVITE_TEXT,
  WIZARD_TABS,
  WIZARD_TEMPLATES,
} from "../content";

const EVENT_ICONS: Record<string, typeof Heart> = {
  heart: Heart,
  gem: Sparkles,
  hand: Hand,
  cake: Cake,
  graduation: GraduationCap,
  baby: Baby,
  "calendar-heart": CalendarHeart,
  sparkles: Sparkles,
};

const TAB_ICONS = [Heart, Palette, Wand2, MapPin, Palette, Sparkles];

const FEATURE_OPTIONS = [
  { label: "تأكيد الحضور RSVP", icon: ClipboardCheck, Modal: RsvpModal },
  { label: "معلومات التواصل", icon: MessageCircle, Modal: ContactModal },
  { label: "معرض الصور", icon: Images, Modal: GalleryModal },
  { label: "برنامج الحفل", icon: CalendarClock, Modal: ProgramModal },
] as const;

export function CreateWizard() {
  const [tab, setTab] = useState(0);
  const [event, setEvent] = useState(0);
  const [template, setTemplate] = useState(3);
  const [guests, setGuests] = useState("شخصين");

  const isFirst = tab === 0;
  const isLast = tab === WIZARD_TABS.length - 1;

  return (
    <div className="flex w-full flex-col rounded-3xl border border-[#d1d5db] bg-card shadow-soft-lg">
      {/* Tab bar */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-[#d1d5db] px-4 pt-4">
        {WIZARD_TABS.map((label, i) => {
          const Icon = TAB_ICONS[i];
          const active = i === tab;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setTab(i)}
              className={cn(
                "flex items-center gap-1.5 rounded-t-lg border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="min-h-[380px] p-6">
        {tab === 0 ? (
          <StepShell
            title="اختر نوع المناسبة"
            desc="اختر نوع المناسبة لتظهر لك القوالب المناسبة."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {EVENT_TYPES.map((type, i) => {
                const Icon = EVENT_ICONS[type.icon] ?? Sparkles;
                const active = i === event;
                return (
                  <button
                    key={type.label}
                    type="button"
                    onClick={() => setEvent(i)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-2xl border p-5 transition-colors",
                      active
                        ? "border-primary bg-rose text-primary"
                        : "border-[#d1d5db] text-ink-muted hover:border-primary/40",
                    )}
                  >
                    {active ? (
                      <span className="absolute end-2 top-2 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-2.5" aria-hidden />
                      </span>
                    ) : null}
                    <Icon className="size-6" aria-hidden />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </StepShell>
        ) : null}

        {tab === 1 ? (
          <StepShell
            title="اختر قالب دعوتك"
            action={
              <button className="text-sm font-medium text-primary">
                عرض الكل
              </button>
            }
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {WIZARD_TEMPLATES.map((tpl, i) => {
                const active = i === template;
                return (
                  <button
                    key={tpl.title}
                    type="button"
                    onClick={() => setTemplate(i)}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border text-center transition-colors",
                      active ? "border-primary" : "border-[#d1d5db]",
                    )}
                  >
                    {active ? (
                      <span className="absolute end-2 top-2 z-10 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-3" aria-hidden />
                      </span>
                    ) : null}
                    <div className="relative aspect-[3/4] bg-warm-bg">
                      <Image
                        src={tpl.img}
                        alt={tpl.title}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-center gap-1 p-2">
                      <span className="text-xs font-medium text-ink">
                        {tpl.title}
                      </span>
                      {tpl.featured ? (
                        <span className="rounded-full bg-rose px-1.5 text-[10px] text-primary">
                          مميز
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </StepShell>
        ) : null}

        {tab === 2 ? (
          <StepShell
            title="أدخل تفاصيل دعوتك"
            desc="أضف الأسماء والنصوص الأساسية التي ستظهر داخل الدعوة."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {DETAILS_FIELDS.map((field) => (
                <div key={field.label} className="flex flex-col gap-1.5">
                  <Label>{field.label}</Label>
                  <Input placeholder={field.placeholder} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label>نص الدعوة</Label>
                <button className="text-sm font-medium text-primary">
                  استخدام نص مقترح
                </button>
              </div>
              <textarea
                rows={3}
                defaultValue={INVITE_TEXT}
                className="rounded-2xl border border-input bg-transparent px-4 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Label className="mb-0">الدعوة باسم</Label>
              <div className="flex overflow-hidden rounded-full border border-[#d1d5db]">
                {["شخص واحد", "شخصين"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setGuests(opt)}
                    className={cn(
                      "px-4 py-1.5 text-sm",
                      guests === opt
                        ? "bg-primary text-primary-foreground"
                        : "text-ink-muted",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </StepShell>
        ) : null}

        {tab === 3 ? (
          <StepShell
            title="حدد تاريخ ومكان مناسبتك"
            desc="اختر التاريخ والوقت وأضف موقع الحفل ليتعرف ضيوفك على التفاصيل بسهولة."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="تاريخ المناسبة" value="الجمعة، 20 يونيو 2025" />
              <Field label="وقت البداية" value="07:00 مساءً" />
              <Field label="وقت النهاية" value="11:00 مساءً" />
              <Field label="اسم المكان *" value="فندق الريتز كارلتون" />
              <Field label="العنوان" value="الرياض، السعودية" />
              <Field label="رابط الموقع" value="https://maps.app.goo.gl/…" />
            </div>
            <label className="mt-4 flex items-center gap-3 rounded-2xl bg-rose/50 p-4">
              <input
                type="checkbox"
                defaultChecked
                className="size-4 accent-[var(--primary)]"
              />
              <span>
                <span className="block text-sm font-medium text-ink">
                  إضافة إلى التقويم تلقائياً
                </span>
                <span className="text-xs text-ink-muted">
                  يستطيع ضيوفك حفظ الموعد في تقويمهم بسهولة.
                </span>
              </span>
            </label>
            <div className="mt-4 flex h-28 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d1d5db] text-sm text-ink-muted">
              <MapPin className="size-4" aria-hidden />
              حدد الموقع على الخريطة
            </div>
          </StepShell>
        ) : null}

        {tab === 4 ? (
          <StepShell
            title="خصص تصميم دعوتك"
            desc="اختر الألوان والخطوط والخلفيات التي تعكس ذوقك وتناسب مناسبتك."
          >
            <div className="flex flex-col gap-5">
              <div>
                <Label>لون الدعوة</Label>
                <div className="mt-2 flex gap-2">
                  {[
                    "#9e0d3d",
                    "#b8955d",
                    "#111827",
                    "#15803d",
                    "#4e453a",
                    "#be123c",
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="size-9 rounded-full ring-offset-2 first:ring-2 first:ring-primary"
                      style={{ backgroundColor: c }}
                      aria-label={c}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label>الخط</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Tajawal", "IBM Plex", "Cairo", "Amiri"].map((f, i) => (
                    <span
                      key={f}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm",
                        i === 0
                          ? "border-primary text-primary"
                          : "border-[#d1d5db] text-ink-muted",
                      )}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </StepShell>
        ) : null}

        {tab === 5 ? (
          <StepShell
            title="خصص مميزات إضافية لدعوتك"
            desc="فعّل الميزات التي تحتاجها فقط لتجعل الدعوة أكثر تفاعلاً وملاءمة لضيوفك."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURE_OPTIONS.map((opt) => {
                const Modal = opt.Modal;
                const Icon = opt.icon;
                return (
                  <Modal
                    key={opt.label}
                    trigger={
                      <button
                        type="button"
                        className="flex items-center gap-3 rounded-2xl border border-[#d1d5db] p-4 text-start transition-colors hover:border-primary/40"
                      >
                        <span className="flex size-10 items-center justify-center rounded-xl bg-rose text-primary">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-ink">
                            {opt.label}
                          </span>
                          <span className="text-xs text-ink-muted">
                            اضغط للإعداد
                          </span>
                        </span>
                      </button>
                    }
                  />
                );
              })}
            </div>
          </StepShell>
        ) : null}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between border-t border-[#d1d5db] p-4">
        <Button
          variant="secondary"
          onClick={() => setTab((t) => Math.max(0, t - 1))}
          disabled={isFirst}
          className="h-[50px] rounded-[8px] border-[#d1d5db]"
        >
          <ArrowRight className="size-4" aria-hidden />
          السابق
        </Button>
        <Button
          onClick={() => setTab((t) => Math.min(WIZARD_TABS.length - 1, t + 1))}
          className="h-[50px] rounded-[8px] shadow-brand"
        >
          {isLast ? "معاينة الدعوة" : "التالي"}
          <ArrowLeft className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function StepShell({
  title,
  desc,
  action,
  children,
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          {desc ? <p className="mt-1 text-sm text-ink-muted">{desc}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input defaultValue={value} />
    </div>
  );
}
