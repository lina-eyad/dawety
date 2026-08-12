import { ROUTES } from "@/constants/routes";

export const CURRENCIES = [
  { code: "SAR", symbol: "ر.س" },
  { code: "USD", symbol: "$" },
  { code: "GBP", symbol: "£" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export type PricingPlan = {
  name: string;
  tagline: string;
  price?: Record<CurrencyCode, string>;
  unit: string;
  cta: string;
  href: string;
  free?: boolean;
  contact?: boolean;
  popular?: boolean;
  features: string[];
};

/** Pay-per-invitation model: free to design, one-time fee to publish. */
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "مجاني",
    tagline: "صمّم وعاين دون حدود",
    unit: "بدون رسوم",
    free: true,
    cta: "ابدأ مجاناً",
    href: ROUTES.create,
    features: [
      "معاينة كاملة للدعوة",
      "تجربة جميع القوالب",
      "تخصيص التفاصيل والتصميم",
      "حفظ المسودة",
    ],
  },
  {
    name: "دعوة واحدة",
    tagline: "رابط جاهز للنشر والمشاركة",
    price: { SAR: "37", USD: "9.99", GBP: "7.99" },
    unit: "دفعة واحدة لكل دعوة",
    popular: true,
    cta: "ابدأ التصميم",
    href: ROUTES.create,
    features: [
      "كل ما في الخطة المجانية",
      "نشر ومشاركة الرابط",
      "بدون علامة مائية",
      "تأكيد حضور RSVP وإدارة الردود",
      "QR Code لرابط الدعوة",
      "دعم عربي وإنجليزي",
    ],
  },
  {
    name: "للمنظّمين",
    tagline: "لمخطّطي المناسبات ومتعدّدي الدعوات",
    // Bundle of 5 invitations at ~20% off the single-invitation price.
    price: { SAR: "149", USD: "39", GBP: "32" },
    unit: "باقة 5 دعوات",
    cta: "ابدأ التصميم",
    href: ROUTES.create,
    features: [
      "كل مزايا «دعوة واحدة»",
      "خصم يصل إلى 20% لكل دعوة",
      "إدارة عدة مناسبات من مكان واحد",
      "لوحة تحكم موحّدة للردود",
      "دعم مخصّص ذو أولوية",
    ],
  },
];

/** Feature comparison — columns map to [مجاني, دعوة واحدة, باقة المنظّمين]. */
export const COMPARISON: {
  label: string;
  cols: [boolean, boolean, boolean];
}[] = [
  { label: "تصميم ومعاينة كاملة", cols: [true, true, true] },
  { label: "تجربة كل القوالب", cols: [true, true, true] },
  { label: "نشر ومشاركة الرابط", cols: [false, true, true] },
  { label: "بدون علامة مائية", cols: [false, true, true] },
  { label: "تأكيد الحضور RSVP", cols: [false, true, true] },
  { label: "QR Code للدعوة", cols: [false, true, true] },
  { label: "عدة مناسبات ودعوات", cols: [false, false, true] },
  { label: "لوحة تحكم موحّدة للردود", cols: [false, false, true] },
  { label: "دعم ذو أولوية", cols: [false, false, true] },
];

/** Live currency converter — base is the paid "دعوة واحدة" plan, priced in USD. */
export const CONVERTER_BASE_USD = 9.99;

export const CONVERT_CURRENCIES = [
  { code: "SAR", name: "ريال سعودي", symbol: "ر.س" },
  { code: "AED", name: "درهم إماراتي", symbol: "د.إ" },
  { code: "KWD", name: "دينار كويتي", symbol: "د.ك" },
  { code: "QAR", name: "ريال قطري", symbol: "ر.ق" },
  { code: "BHD", name: "دينار بحريني", symbol: "د.ب" },
  { code: "OMR", name: "ريال عُماني", symbol: "ر.ع" },
  { code: "EGP", name: "جنيه مصري", symbol: "ج.م" },
  { code: "USD", name: "دولار أمريكي", symbol: "$" },
  { code: "EUR", name: "يورو", symbol: "€" },
  { code: "GBP", name: "جنيه إسترليني", symbol: "£" },
] as const;

/** Fallback FX (per 1 USD) — used until live rates load, or if the fetch fails. */
export const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  SAR: 3.75,
  AED: 3.67,
  KWD: 0.31,
  QAR: 3.64,
  BHD: 0.376,
  OMR: 0.385,
  EGP: 49,
  EUR: 0.92,
  GBP: 0.79,
};

export const PAYMENT_METHODS = [
  "مدى",
  "Visa",
  "Mastercard",
  "Apple Pay",
  "Google Pay",
] as const;

export const PRICING_FAQ = [
  {
    q: "هل يمكنني تصميم الدعوة مجاناً؟",
    a: "نعم، صمّم وعاين دعوتك بالكامل مجاناً، وتدفع فقط عندما تقرر نشرها ومشاركتها.",
  },
  {
    q: "هل الدفع لمرة واحدة أم اشتراك شهري؟",
    a: "دفعة واحدة لكل دعوة — لا اشتراكات ولا رسوم متكررة على الإطلاق.",
  },
  {
    q: "هل يمكنني تعديل الدعوة بعد الدفع؟",
    a: "بالتأكيد، يمكنك تعديل تفاصيل الدعوة في أي وقت ويبقى الرابط ثابتاً لضيوفك.",
  },
  {
    q: "ما طرق الدفع المتاحة؟",
    a: "ندعم مدى وفيزا وماستركارد وApple Pay، مع إمكانية الدفع بعملات متعددة.",
  },
];
