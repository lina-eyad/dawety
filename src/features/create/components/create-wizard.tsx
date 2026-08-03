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
  Languages,
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
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import {
  ContactModal,
  GalleryModal,
  NotesModal,
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

const TAB_ICONS = [Languages, Heart, Palette, Wand2, MapPin, Palette, Sparkles];

/** Invitation/form language — the user picks one and the form switches to it. */
const LANGUAGES = [
  { code: "ar", label: "العربية", sub: "Arabic", dir: "rtl" as const },
  { code: "en", label: "English", sub: "الإنجليزية", dir: "ltr" as const },
  { code: "fr", label: "Français", sub: "الفرنسية", dir: "ltr" as const },
  { code: "es", label: "Español", sub: "الإسبانية", dir: "ltr" as const },
  {
    code: "id",
    label: "Bahasa Indonesia",
    sub: "الإندونيسية",
    dir: "ltr" as const,
  },
  { code: "tr", label: "Türkçe", sub: "التركية", dir: "ltr" as const },
];

type WizardStrings = {
  tabs: string[];
  titles: string[];
  descs: string[];
  prev: string;
  next: string;
  preview: string;
  showAll: string;
};

/** Localised wizard chrome (tab labels, step headings, nav) per form language. */
const WIZARD_I18N: Record<string, WizardStrings> = {
  ar: {
    tabs: [
      "اللغات",
      "نوع المناسبة",
      "القالب",
      "التفاصيل",
      "التاريخ والمكان",
      "التصميم",
      "خيارات إضافية",
    ],
    titles: [
      "اختر لغة الدعوة",
      "اختر نوع المناسبة",
      "اختر قالب دعوتك",
      "أدخل تفاصيل دعوتك",
      "حدد تاريخ ومكان مناسبتك",
      "خصص تصميم دعوتك",
      "خصص مميزات إضافية لدعوتك",
    ],
    descs: [
      "اختر لغة عرض دعوتك.",
      "اختر نوع المناسبة لتظهر لك القوالب المناسبة.",
      "",
      "أضف الأسماء والنصوص الأساسية التي ستظهر داخل الدعوة.",
      "اختر التاريخ والوقت وأضف موقع الحفل ليتعرف ضيوفك على التفاصيل بسهولة.",
      "اختر الألوان والخطوط والخلفيات التي تعكس ذوقك وتناسب مناسبتك.",
      "فعّل الميزات التي تحتاجها فقط لتجعل الدعوة أكثر تفاعلاً وملاءمة لضيوفك.",
    ],
    prev: "السابق",
    next: "التالي",
    preview: "معاينة الدعوة",
    showAll: "عرض الكل",
  },
  en: {
    tabs: [
      "Languages",
      "Occasion",
      "Template",
      "Details",
      "Date & Venue",
      "Design",
      "Extras",
    ],
    titles: [
      "Choose the invitation language",
      "Choose the occasion",
      "Choose your template",
      "Enter your invitation details",
      "Set your event date and venue",
      "Customize your design",
      "Add extra features",
    ],
    descs: [
      "Pick the language your invitation is shown in.",
      "Choose the occasion to see matching templates.",
      "",
      "Add the names and key text that appear inside the invitation.",
      "Choose the date and time and add the venue so guests know the details.",
      "Choose colors, fonts and backgrounds that match your taste.",
      "Enable only the features you need to make the invitation more interactive.",
    ],
    prev: "Back",
    next: "Next",
    preview: "Preview invitation",
    showAll: "View all",
  },
  fr: {
    tabs: [
      "Langues",
      "Occasion",
      "Modèle",
      "Détails",
      "Date et lieu",
      "Design",
      "Options",
    ],
    titles: [
      "Choisissez la langue de l’invitation",
      "Choisissez l’occasion",
      "Choisissez votre modèle",
      "Saisissez les détails de l’invitation",
      "Définissez la date et le lieu",
      "Personnalisez votre design",
      "Ajoutez des fonctionnalités",
    ],
    descs: [
      "Choisissez la langue de votre invitation.",
      "Choisissez l’occasion pour voir les modèles adaptés.",
      "",
      "Ajoutez les noms et textes qui apparaîtront dans l’invitation.",
      "Choisissez la date et l’heure et ajoutez le lieu pour informer vos invités.",
      "Choisissez les couleurs, polices et fonds selon vos goûts.",
      "Activez uniquement les fonctionnalités dont vous avez besoin.",
    ],
    prev: "Précédent",
    next: "Suivant",
    preview: "Aperçu",
    showAll: "Voir tout",
  },
  es: {
    tabs: [
      "Idiomas",
      "Ocasión",
      "Plantilla",
      "Detalles",
      "Fecha y lugar",
      "Diseño",
      "Opciones",
    ],
    titles: [
      "Elige el idioma de la invitación",
      "Elige la ocasión",
      "Elige tu plantilla",
      "Introduce los detalles de la invitación",
      "Define la fecha y el lugar",
      "Personaliza tu diseño",
      "Añade funciones adicionales",
    ],
    descs: [
      "Elige el idioma de tu invitación.",
      "Elige la ocasión para ver plantillas adecuadas.",
      "",
      "Añade los nombres y textos que aparecerán en la invitación.",
      "Elige la fecha y la hora y añade el lugar para informar a tus invitados.",
      "Elige colores, fuentes y fondos según tu gusto.",
      "Activa solo las funciones que necesites.",
    ],
    prev: "Anterior",
    next: "Siguiente",
    preview: "Vista previa",
    showAll: "Ver todo",
  },
  id: {
    tabs: [
      "Bahasa",
      "Acara",
      "Template",
      "Detail",
      "Tanggal & Tempat",
      "Desain",
      "Opsi",
    ],
    titles: [
      "Pilih bahasa undangan",
      "Pilih jenis acara",
      "Pilih template Anda",
      "Masukkan detail undangan",
      "Tentukan tanggal dan tempat",
      "Sesuaikan desain Anda",
      "Tambahkan fitur tambahan",
    ],
    descs: [
      "Pilih bahasa tampilan undangan.",
      "Pilih jenis acara untuk melihat template yang sesuai.",
      "",
      "Tambahkan nama dan teks utama yang tampil di undangan.",
      "Pilih tanggal dan waktu serta tambahkan lokasi acara.",
      "Pilih warna, font, dan latar sesuai selera Anda.",
      "Aktifkan hanya fitur yang Anda butuhkan.",
    ],
    prev: "Kembali",
    next: "Berikutnya",
    preview: "Pratinjau",
    showAll: "Lihat semua",
  },
  tr: {
    tabs: [
      "Diller",
      "Etkinlik",
      "Şablon",
      "Detaylar",
      "Tarih ve Yer",
      "Tasarım",
      "Seçenekler",
    ],
    titles: [
      "Davetiye dilini seçin",
      "Etkinlik türünü seçin",
      "Şablonunuzu seçin",
      "Davetiye bilgilerini girin",
      "Tarih ve yeri belirleyin",
      "Tasarımınızı özelleştirin",
      "Ek özellikler ekleyin",
    ],
    descs: [
      "Davetiyenizin dilini seçin.",
      "Uygun şablonları görmek için etkinlik türünü seçin.",
      "",
      "Davetiyede görünecek isimleri ve metinleri ekleyin.",
      "Tarih ve saati seçin, mekânı ekleyin.",
      "Zevkinize uygun renk, yazı tipi ve arka planları seçin.",
      "Yalnızca ihtiyacınız olan özellikleri etkinleştirin.",
    ],
    prev: "Geri",
    next: "İleri",
    preview: "Önizleme",
    showAll: "Tümünü gör",
  },
};

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
    Modal: NotesModal,
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

/** Half-hour time slots, Arabic 12-hour (e.g. "07:00 مساءً"), for the pickers. */
const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const h24 = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const period = h24 < 12 ? "صباحًا" : "مساءً";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${String(h12).padStart(2, "0")}:${minute} ${period}`;
});

/** Arabic Gregorian long date with Latin digits, e.g. "الجمعة، 20 يونيو 2025". */
function formatEventDate(d: Date) {
  return new Intl.DateTimeFormat("ar", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
    numberingSystem: "latn",
  }).format(d);
}

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
  const [lang, setLang] = useState("ar");
  const [event, setEvent] = useState(0);
  const [template, setTemplate] = useState(3);
  const [guests, setGuests] = useState("شخصين");
  const [calendar, setCalendar] = useState(true);
  const [eventDate, setEventDate] = useState<Date | undefined>(
    new Date(2025, 5, 20),
  );
  const [startTime, setStartTime] = useState("07:00 مساءً");
  const [endTime, setEndTime] = useState("11:00 مساءً");
  const [featureOn, setFeatureOn] = useState(() => FEATURES.map((f) => f.on));
  const [color, setColor] = useState("#9e0d3d");
  const [font, setFont] = useState(0);
  const [bg, setBg] = useState(1);
  const [textScale, setTextScale] = useState(1);

  const t = WIZARD_I18N[lang] ?? WIZARD_I18N.ar;
  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "rtl";

  const isFirst = tab === 0;
  const isLast = tab === WIZARD_TABS.length - 1;

  return (
    <div
      dir={dir}
      className="flex w-full flex-col rounded-3xl border border-[#d1d5db] bg-card shadow-soft-lg"
    >
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
              {t.tabs[i]}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="min-h-[380px] p-6">
        {tab === 0 ? (
          <StepShell title={t.titles[0]} desc={t.descs[0]}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {LANGUAGES.map((l) => {
                const active = lang === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "relative flex flex-col items-center gap-1 rounded-2xl border p-5 transition-colors",
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
                    <span className="text-base font-bold">{l.label}</span>
                    <span className="text-xs">{l.sub}</span>
                  </button>
                );
              })}
            </div>
          </StepShell>
        ) : null}

        {tab === 1 ? (
          <StepShell title={t.titles[1]} desc={t.descs[1]}>
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

        {tab === 2 ? (
          <StepShell
            title={t.titles[2]}
            action={
              <button className="text-sm font-medium text-primary">
                {t.showAll}
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

        {tab === 3 ? (
          <StepShell title={t.titles[3]} desc={t.descs[3]}>
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

        {tab === 4 ? (
          <StepShell title={t.titles[4]} desc={t.descs[4]}>
            <div className="flex flex-col gap-6">
              {/* Date + start/end time */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <Label>تاريخ المناسبة</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex h-[50px] items-center gap-2 rounded-[12px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-ink"
                      >
                        <Calendar
                          className="size-4 shrink-0 text-ink-muted"
                          aria-hidden
                        />
                        <span className="flex-1 text-start">
                          {eventDate
                            ? formatEventDate(eventDate)
                            : "اختر التاريخ"}
                        </span>
                        <ChevronDown
                          className="size-4 shrink-0 text-ink-muted"
                          aria-hidden
                        />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto bg-card p-0"
                    >
                      <CalendarPicker
                        mode="single"
                        selected={eventDate}
                        onSelect={setEventDate}
                        defaultMonth={eventDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <TimeField
                  label="وقت البداية"
                  value={startTime}
                  onChange={setStartTime}
                />
                <TimeField
                  label="وقت النهاية"
                  value={endTime}
                  onChange={setEndTime}
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

        {tab === 5 ? (
          <StepShell title={t.titles[5]} desc={t.descs[5]}>
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

        {tab === 6 ? (
          <StepShell title={t.titles[6]} desc={t.descs[6]}>
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
          {t.prev}
        </Button>
        <Button
          onClick={() => setTab((t) => Math.min(WIZARD_TABS.length - 1, t + 1))}
          className="h-[50px] w-[150px] rounded-[8px] shadow-brand"
        >
          {isLast ? t.preview : t.next}
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
/** Time picker — a popover with a scrollable list of half-hour slots. */
function TimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-[50px] items-center gap-2 rounded-[12px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-ink"
          >
            <Clock className="size-4 shrink-0 text-ink-muted" aria-hidden />
            <span className="flex-1 text-start">{value}</span>
            <ChevronDown
              className="size-4 shrink-0 text-ink-muted"
              aria-hidden
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) bg-card p-0"
        >
          <ScrollArea className="h-64">
            <div className="flex flex-col p-1">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    onChange(slot);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-lg px-3 py-2 text-start text-sm transition-colors",
                    value === slot
                      ? "bg-primary font-medium text-primary-foreground"
                      : "text-ink hover:bg-rose",
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
