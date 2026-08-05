/** Invitation-creation wizard content (Arabic), transcribed from the Figma flow. */

/** Outer 4-stage progress (design → preview → payment → share). */
export const STAGES = [
  { num: "1", label: "التصميم" },
  { num: "2", label: "المعاينة" },
  { num: "3", label: "الدفع" },
  { num: "4", label: "المشاركة" },
] as const;

/** Inner tabs of the "التصميم" stage. */
export const WIZARD_TABS = [
  "اللغات",
  "نوع المناسبة",
  "القالب",
  "التفاصيل",
  "التاريخ والمكان",
  "التصميم",
  "خيارات إضافية",
] as const;

export const EVENT_TYPES = [
  { label: "زفاف", icon: "heart" },
  { label: "خطوبة", icon: "gem" },
  { label: "حنة", icon: "hand" },
  { label: "عيد ميلاد", icon: "cake" },
  { label: "تخرج", icon: "graduation" },
  { label: "استقبال مولود", icon: "baby" },
  { label: "ذكرى سنوية", icon: "calendar-heart" },
  { label: "أخرى", icon: "sparkles" },
] as const;

/** Template picker options (name + "featured" flag + exported thumbnail). */
export const WIZARD_TEMPLATES: {
  title: string;
  img: string;
  featured?: boolean;
}[] = [
  { title: "كلاسيك أبيض", img: "/images/template-2.png" },
  { title: "أمسية فاخرة", img: "/images/template-4.png" },
  { title: "ورد ناعم", img: "/images/template-1.png" },
  { title: "لمسة ذهبية", img: "/images/template-5.png", featured: true },
  { title: "كلاسيك ذهبي", img: "/images/template-3.png" },
  { title: "أناقة خضراء", img: "/images/template-1.png" },
  { title: "نعومة بنفسجية", img: "/images/template-2.png" },
  { title: "Royal Burgundy", img: "/images/template-4.png" },
];

export const DETAILS_FIELDS = [
  { label: "عنوان الدعوة", placeholder: "حفل زفاف" },
  { label: "الاسم الأول", placeholder: "أحمد" },
  { label: "الاسم الثاني", placeholder: "سارة" },
  { label: "اسم العائلة الأول", placeholder: "الراشد" },
  { label: "اسم العائلة الثاني", placeholder: "مهنا" },
] as const;

export const INVITE_TEXT =
  "بكل حب وامتنان، نتشرف بدعوتكم لمشاركتنا فرحة حفل زفافنا وحضور هذه المناسبة السعيدة.";

/* ---- "التصميم" tab tokens (shared by the editor and the live preview) ---- */
export const DESIGN_COLORS = [
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

export const DESIGN_FONTS = [
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

export const DESIGN_BACKGROUNDS = [
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
] as const;
