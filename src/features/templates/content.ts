/** Categories for the templates page filter — "الكل" first (matches the header). */
export const TEMPLATE_CATEGORIES = [
  "الكل",
  "زفاف",
  "خطوبة",
  "عيد ميلاد",
  "تخرج",
  "استقبال مولود",
  "حنة",
] as const;

export type TemplateItem = {
  title: string;
  category: string;
  img: string;
  featured?: boolean;
};

/**
 * Template catalogue for the gallery. Cycles the five available artworks across
 * varied titles/categories to populate a full, browsable grid (swap in real
 * artwork per item when available).
 */
export const TEMPLATE_ITEMS: TemplateItem[] = [
  {
    title: "لمسة ذهبية",
    category: "زفاف",
    img: "/images/template-4.png",
    featured: true,
  },
  { title: "ورد ناعم", category: "خطوبة", img: "/images/template-1.png" },
  {
    title: "احتفال بسيط",
    category: "عيد ميلاد",
    img: "/images/template-2.png",
  },
  {
    title: "تخرج أنيق",
    category: "تخرج",
    img: "/images/template-3.png",
    featured: true,
  },
  { title: "ليلة الحناء", category: "حنة", img: "/images/template-5.png" },
  { title: "فرح العمر", category: "زفاف", img: "/images/template-3.png" },
  {
    title: "خطوبة كلاسيك",
    category: "خطوبة",
    img: "/images/template-4.png",
    featured: true,
  },
  {
    title: "مولود جديد",
    category: "استقبال مولود",
    img: "/images/template-2.png",
  },
  { title: "بهجة التخرج", category: "تخرج", img: "/images/template-1.png" },
  {
    title: "عيد ميلاد مرح",
    category: "عيد ميلاد",
    img: "/images/template-5.png",
  },
  {
    title: "لمسة عصرية",
    category: "حنة",
    img: "/images/template-5.png",
    featured: true,
  },
  { title: "أزهار ربيعية", category: "زفاف", img: "/images/template-1.png" },
  {
    title: "استقبال المولود",
    category: "استقبال مولود",
    img: "/images/template-3.png",
  },
  { title: "خطوة العمر", category: "خطوبة", img: "/images/template-2.png" },
];
