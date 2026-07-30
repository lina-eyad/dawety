"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Cake,
  Calendar,
  CalendarCheck,
  CalendarHeart,
  Check,
  ChevronDown,
  Clock,
  GraduationCap,
  Hand,
  Heart,
  Images,
  Lightbulb,
  MapPin,
  MessageCircle,
  Music,
  NotebookPen,
  Palette,
  Plus,
  Sparkles,
  User,
  UserPlus,
  Users,
  Wand2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

type FeatureModal = React.ComponentType<{ trigger: React.ReactNode }>;

/** "خيارات إضافية" tab — grid order fills right→left per row in RTL. */
const FEATURES: {
  title: string;
  desc: string;
  Icon: typeof Heart;
  on: boolean;
  recommended?: boolean;
  Modal: FeatureModal | null;
}[] = [
  {
    title: "تأكيد الحضور RSVP",
    desc: "اسمح لضيوفك بتأكيد حضورهم ومتابعة الردود.",
    Icon: UserPlus,
    on: true,
    recommended: true,
    Modal: RsvpModal,
  },
  {
    title: "معرض الصور",
    desc: "أضف حتى 6 صور تظهر داخل الدعوة في معرض أنيق.",
    Icon: Images,
    on: false,
    Modal: GalleryModal,
  },
  {
    title: "رسالة وملاحظات",
    desc: "أضف رسالة ترحيب أو ملاحظات هامة للضيوف.",
    Icon: NotebookPen,
    on: true,
    Modal: null,
  },
  {
    title: "موسيقى خلفية",
    desc: "أضف موسيقى اختيارية تعمل عند فتح الدعوة.",
    Icon: Music,
    on: false,
    Modal: null,
  },
  {
    title: "برنامج الحفل",
    desc: "أنشئ رمز QR يفتح رابط الدعوة مباشرة عند مسحه.",
    Icon: CalendarCheck,
    on: true,
    Modal: ProgramModal,
  },
  {
    title: "معلومات التواصل",
    desc: "أضف رقم واتساب لسهولة تواصل ضيوفك معك.",
    Icon: MessageCircle,
    on: false,
    Modal: ContactModal,
  },
];

/** "الدعوة باسم" toggle — active option (شخصين) sits first (right) in RTL. */
const NAMED_BY = [
  { label: "شخصين", Icon: Users },
  { label: "شخص واحد", Icon: User },
] as const;

/** Shared 50px field styling (Figma: light-gray fill, #d1d5db stroke). */
const FIELD_CLASS =
  "h-[50px] rounded-[12px] border-[#e5e7eb] bg-[#f9fafb] px-4";

/* ---- "التصميم" tab options ---- */
const DESIGN_COLORS = [
  "#9e0d3d",
  "#b8955d",
  "#d4a017",
  "#111827",
  "#15803d",
  "#0f766e",
  "#2563eb",
  "#7c3aed",
  "#be123c",
];

const DESIGN_FONTS = [
  { name: "Tajawal", family: "'Tajawal', system-ui, sans-serif", note: "حديث" },
  { name: "Cairo", family: "'Cairo', system-ui, sans-serif", note: "أنيق" },
  { name: "Almarai", family: "'Almarai', system-ui, sans-serif", note: "بسيط" },
  {
    name: "Amiri",
    family: "'Amiri', 'Times New Roman', serif",
    note: "كلاسيكي",
  },
  { name: "Aref Ruqaa", family: "'Aref Ruqaa', serif", note: "رقعة" },
  {
    name: "Reem Kufi",
    family: "'Reem Kufi', system-ui, sans-serif",
    note: "كوفي",
  },
];

const DESIGN_BACKGROUNDS = [
  { name: "أبيض ناصع", css: "#ffffff", dark: false },
  { name: "وردي ناعم", css: "#fff0f5", dark: false },
  {
    name: "متدرّج وردي",
    css: "linear-gradient(135deg,#fff0f5,#f5e6f0)",
    dark: false,
  },
  {
    name: "ذهبي فاخر",
    css: "linear-gradient(135deg,#faf6ec,#efe1c2)",
    dark: false,
  },
  {
    name: "نقشة زخرفية",
    css: "repeating-linear-gradient(45deg,#fff0f5 0 8px,#ffffff 8px 16px)",
    dark: false,
  },
  {
    name: "ليلي داكن",
    css: "linear-gradient(135deg,#1f2937,#111827)",
    dark: true,
  },
];

export function CreateWizard() {
  const [tab, setTab] = useState(0);
  const [event, setEvent] = useState(0);
  const [template, setTemplate] = useState(3);
  const [guests, setGuests] = useState("شخصين");
  const [calendar, setCalendar] = useState(true);
  const [featureOn, setFeatureOn] = useState(() => FEATURES.map((f) => f.on));
  const [color, setColor] = useState("#9e0d3d");
  const [font, setFont] = useState(0);
  const [bg, setBg] = useState(1);
  const [textScale, setTextScale] = useState(1);

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
            <div className="flex flex-col gap-5">
              {/* Reassurance banner */}
              <div className="flex items-center gap-2.5 rounded-2xl border border-primary/10 bg-rose/50 px-4 py-3.5 text-sm text-ink-muted">
                <Lightbulb
                  className="size-4 shrink-0 text-primary/70"
                  aria-hidden
                />
                يمكنك تعديل هذه البيانات في أي وقت، وتبقى محفوظة حتى عند تغيير
                القالب.
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* عنوان الدعوة */}
                <div className="flex flex-col gap-1.5">
                  <Label>عنوان الدعوة</Label>
                  <Input placeholder="حفل زفاف" className={FIELD_CLASS} />
                </div>

                {/* الدعوة باسم — segmented toggle */}
                <div className="flex flex-col gap-1.5">
                  <Label>الدعوة باسم</Label>
                  <div className="flex h-[50px] gap-1 rounded-[12px] border border-[#d1d5db] p-1">
                    {NAMED_BY.map(({ label, Icon }) => {
                      const active = guests === label;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setGuests(label)}
                          className={cn(
                            "flex flex-1 items-center justify-center gap-2 rounded-[8px] border text-sm font-medium transition-colors",
                            active
                              ? "border-primary/30 bg-rose text-primary"
                              : "border-transparent text-ink-muted hover:text-ink",
                          )}
                        >
                          <Icon className="size-4" aria-hidden />
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* الأسماء واسم العائلة */}
                {DETAILS_FIELDS.slice(1).map((field) => (
                  <div key={field.label} className="flex flex-col gap-1.5">
                    <Label>{field.label}</Label>
                    <Input
                      placeholder={field.placeholder}
                      className={FIELD_CLASS}
                    />
                  </div>
                ))}
              </div>

              {/* نص الدعوة */}
              <div className="flex flex-col gap-2">
                <Label>نص الدعوة</Label>
                <textarea
                  rows={4}
                  defaultValue={INVITE_TEXT}
                  className="min-h-[120px] rounded-2xl border border-[#d1d5db] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 self-end rounded-full border border-primary/20 bg-rose px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-rose/70"
                >
                  <Wand2 className="size-4" aria-hidden />
                  استخدام نص مقترح
                </button>
              </div>
            </div>
          </StepShell>
        ) : null}

        {tab === 3 ? (
          <StepShell
            title="حدد تاريخ ومكان مناسبتك"
            desc="اختر التاريخ والوقت وأضف موقع الحفل ليتعرف ضيوفك على التفاصيل بسهولة."
          >
            <div className="flex flex-col gap-6">
              {/* Date + start/end time */}
              <div className="grid gap-4 sm:grid-cols-3">
                <PickerField
                  label="تاريخ المناسبة"
                  value="الجمعة، 20 يونيو 2025"
                  Icon={Calendar}
                />
                <PickerField
                  label="وقت البداية"
                  value="07:00 مساءً"
                  Icon={Clock}
                  chevron
                />
                <PickerField
                  label="وقت النهاية"
                  value="11:00 مساءً"
                  Icon={Clock}
                  chevron
                />
              </div>

              {/* Auto add-to-calendar toggle */}
              <div className="flex items-center justify-between gap-4 rounded-[16px] border border-[#d1d5db] bg-[#f9fafb] px-6 py-5">
                <div>
                  <span className="block text-sm font-bold text-ink">
                    إضافة إلى التقويم تلقائياً
                  </span>
                  <span className="text-xs text-ink-muted">
                    يستطيع ضيوفك حفظ الموعد في تقويمهم بسهولة.
                  </span>
                </div>
                <Switch
                  checked={calendar}
                  onClick={() => setCalendar((v) => !v)}
                  label="إضافة إلى التقويم تلقائياً"
                />
              </div>

              {/* "مكان الحفل" section divider */}
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
                <span className="text-sm font-medium text-ink-muted">
                  مكان الحفل
                </span>
                <span className="h-px flex-1 bg-[#e5e7eb]" aria-hidden />
              </div>

              {/* Venue + address + link */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="اسم المكان *" value="فندق الريتز كارلتون" />
                <Field label="العنوان" value="الرياض، السعودية" />
                <Field
                  label="رابط الموقع"
                  value="https://maps.app.goo.gl/abcd1234xyz"
                />
              </div>

              {/* Pick location on map */}
              <button
                type="button"
                className="inline-flex items-center gap-2 self-start rounded-[12px] border border-primary bg-rose px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-rose/70"
              >
                <MapPin className="size-4" aria-hidden />
                حدد الموقع على الخريطة
              </button>
            </div>
          </StepShell>
        ) : null}

        {tab === 4 ? (
          <StepShell
            title="خصص تصميم دعوتك"
            desc="اختر الألوان والخطوط والخلفيات التي تعكس ذوقك وتناسب مناسبتك."
          >
            <div className="flex flex-col gap-7">
              {/* Live-preview hint */}
              <div className="flex items-center gap-2.5 rounded-2xl border border-primary/10 bg-rose/50 px-4 py-3.5 text-sm text-ink-muted">
                <Sparkles
                  className="size-4 shrink-0 text-primary/70"
                  aria-hidden
                />
                كل تغيير في الألوان أو الخط أو الخلفية ينعكس فوراً على معاينة
                دعوتك.
              </div>

              {/* Colour */}
              <div>
                <div className="flex items-center justify-between">
                  <Label className="mb-0">لون الدعوة</Label>
                  <span className="text-xs text-ink-muted" dir="ltr">
                    {color.toUpperCase()}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {DESIGN_COLORS.map((c) => {
                    const on = color.toLowerCase() === c.toLowerCase();
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        aria-label={c}
                        aria-pressed={on}
                        className={cn(
                          "relative flex size-9 items-center justify-center rounded-full ring-offset-2 ring-offset-card transition-transform hover:scale-110",
                          on && "ring-2 ring-primary",
                        )}
                        style={{ backgroundColor: c }}
                      >
                        {on ? (
                          <Check
                            className="size-4 text-white drop-shadow"
                            aria-hidden
                          />
                        ) : null}
                      </button>
                    );
                  })}
                  {/* Custom colour */}
                  <label
                    title="لون مخصص"
                    className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-dashed border-[#d1d5db] text-ink-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <Plus className="size-4" aria-hidden />
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      aria-label="اختر لوناً مخصصاً"
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </label>
                </div>
              </div>

              {/* Font */}
              <div>
                <Label>الخط</Label>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {DESIGN_FONTS.map((f, i) => {
                    const on = font === i;
                    return (
                      <button
                        key={f.name}
                        type="button"
                        onClick={() => setFont(i)}
                        aria-pressed={on}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-[12px] border px-3 py-3 transition-colors",
                          on
                            ? "border-primary bg-rose"
                            : "border-[#e5e7eb] hover:border-primary/40",
                        )}
                      >
                        <span
                          className="text-xl leading-none text-ink"
                          style={{ fontFamily: f.family }}
                        >
                          دعوتك
                        </span>
                        <span
                          className={cn(
                            "text-xs font-medium",
                            on ? "text-primary" : "text-ink-muted",
                          )}
                        >
                          {f.name} · {f.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Background */}
              <div>
                <Label>الخلفية</Label>
                <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {DESIGN_BACKGROUNDS.map((b, i) => {
                    const on = bg === i;
                    return (
                      <button
                        key={b.name}
                        type="button"
                        onClick={() => setBg(i)}
                        aria-pressed={on}
                        title={b.name}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <span
                          className={cn(
                            "flex aspect-square w-full items-center justify-center rounded-[12px] border transition-all",
                            on
                              ? "border-primary ring-2 ring-primary/30"
                              : "border-[#e5e7eb]",
                          )}
                          style={{ background: b.css }}
                        >
                          {on ? (
                            <Check
                              className={cn(
                                "size-4",
                                b.dark ? "text-white" : "text-primary",
                              )}
                              aria-hidden
                            />
                          ) : null}
                        </span>
                        <span
                          className={cn(
                            "text-[11px]",
                            on ? "font-medium text-primary" : "text-ink-muted",
                          )}
                        >
                          {b.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text size */}
              <div>
                <Label>حجم النص</Label>
                <div className="mt-3 flex h-[50px] max-w-xs gap-1 rounded-[12px] border border-[#d1d5db] p-1">
                  {["صغير", "متوسط", "كبير"].map((s, i) => {
                    const on = textScale === i;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setTextScale(i)}
                        className={cn(
                          "flex flex-1 items-center justify-center rounded-[8px] border text-sm font-medium transition-colors",
                          on
                            ? "border-primary/30 bg-rose text-primary"
                            : "border-transparent text-ink-muted hover:text-ink",
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
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
            <div className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f, i) => {
                const on = featureOn[i];
                const setup = (
                  <button
                    type="button"
                    className={cn(
                      "h-11 w-full rounded-[10px] border text-sm font-medium transition-colors",
                      on
                        ? "border-primary text-primary hover:bg-rose/40"
                        : "border-[#e5e7eb] bg-[#f9fafb] text-ink-muted",
                    )}
                  >
                    إعداد
                  </button>
                );
                return (
                  <div
                    key={f.title}
                    className={cn(
                      "relative flex flex-col justify-between gap-4 rounded-[16px] border p-5",
                      f.recommended ? "border-primary" : "border-[#e5e7eb]",
                    )}
                  >
                    {f.recommended ? (
                      <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        موصى به
                      </span>
                    ) : null}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose text-primary">
                          <f.Icon className="size-5" aria-hidden />
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-ink">
                            {f.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                            {f.desc}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={on}
                        onClick={() =>
                          setFeatureOn((prev) =>
                            prev.map((v, j) => (j === i ? !v : v)),
                          )
                        }
                        label={f.title}
                      />
                    </div>

                    {f.Modal ? <f.Modal trigger={setup} /> : setup}
                  </div>
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
          className="h-[50px] w-[150px] rounded-[8px] border-[#d1d5db]"
        >
          <ArrowRight className="size-4" aria-hidden />
          السابق
        </Button>
        <Button
          onClick={() => setTab((t) => Math.min(WIZARD_TABS.length - 1, t + 1))}
          className="h-[50px] w-[150px] rounded-[8px] shadow-brand"
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
      <Input defaultValue={value} className={FIELD_CLASS} />
    </div>
  );
}

/** Read-only date/time picker field — leading icon, optional trailing chevron. */
function PickerField({
  label,
  value,
  Icon,
  chevron,
}: {
  label: string;
  value: string;
  Icon: typeof Clock;
  chevron?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="flex h-[50px] items-center gap-2 rounded-[12px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-ink">
        <Icon className="size-4 shrink-0 text-ink-muted" aria-hidden />
        <span className="flex-1 truncate">{value}</span>
        {chevron ? (
          <ChevronDown className="size-4 shrink-0 text-ink-muted" aria-hidden />
        ) : null}
      </div>
    </div>
  );
}
