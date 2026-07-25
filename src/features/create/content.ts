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
  { label: "اسم العائلة الثاني", placeholder: "المهنا" },
] as const;

export const INVITE_TEXT =
  "بكل حب وامتنان، نتشرف بدعوتكم لمشاركتنا فرحة حفل زفافنا وحضور هذه المناسبة الغالية على قلوبنا.";
