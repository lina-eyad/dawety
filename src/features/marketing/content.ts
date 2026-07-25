/**
 * INVITERA landing-page content (Arabic — the default locale), transcribed from
 * the Figma file. Kept as typed data so section components stay presentational
 * and DRY. English translations / full next-intl extraction is a follow-up.
 */

export const NAV_LINKS = [
  { label: "الرئيسية", href: "#home" },
  { label: "القوالب", href: "#templates" },
  { label: "المميزات", href: "#features" },
  { label: "الأسعار", href: "#pricing" },
  { label: "اراء العملاء", href: "#testimonials" },
  { label: "الاسئلة الشائعة", href: "#faq" },
  { label: "تواصل معنا", href: "#contact" },
] as const;

export const STEPS = [
  {
    num: "01",
    title: "اختر القالب",
    desc: "اختر من بين قوالب أنيقة تناسب مختلف المناسبات والأنماط.",
  },
  {
    num: "02",
    title: "خصّص التفاصيل",
    desc: "أضف النصوص، التاريخ، الموقع، الألوان، وكل تفاصيل دعوتك بسهولة.",
  },
  {
    num: "03",
    title: "شارك الدعوة",
    desc: "احصل على رابط دعوتك وشاركه فورًا مع ضيوفك عبر واتساب أو أي منصة.",
  },
] as const;

export const TEMPLATE_FILTERS = [
  "الكل",
  "زفاف",
  "خطوبة",
  "عيد ميلاد",
  "تخرج",
  "استقبال مولود",
  "حنة",
] as const;

export const TEMPLATES = [
  { title: "ورد ناعم", tag: "خطوبة", img: "/images/template-1.png" },
  { title: "احتفال بسيط", tag: "عيد ميلاد", img: "/images/template-2.png" },
  { title: "تخرج أنيق", tag: "تخرج", img: "/images/template-3.png" },
  { title: "لمسة ذهبية", tag: "زفاف", img: "/images/template-4.png" },
  { title: "لمسة عصرية", tag: "حنة", img: "/images/template-5.png" },
] as const;

export const FEATURES = [
  {
    title: "قوالب متعددة",
    desc: "اختر من قوالب تناسب الزفاف، الخطوبة، التخرج، أعياد الميلاد، وغيرها.",
  },
  {
    title: "مشاركة فورية",
    desc: "شارك دعوتك عبر الرابط أو واتساب مع ضيوفك خلال ثوانٍ.",
  },
  {
    title: "تخصيص سهل",
    desc: "عدّل النصوص، الألوان، التفاصيل، والتصميم بسهولة تامة.",
  },
  {
    title: "رابط خاص للدعوة",
    desc: "احصل على رابط أنيق يمكنك مشاركته مع ضيوفك مباشرة.",
  },
  {
    title: "دعم لغتين",
    desc: "صمّم دعوتك باللغة العربية أو الإنجليزية حسب جمهورك.",
  },
  {
    title: "متجاوب مع الجوال",
    desc: "دعوتك تظهر بشكل أنيق على جميع الأجهزة والشاشات.",
  },
] as const;

export const GUEST_BENEFITS = [
  "تأكيد حضور سريع",
  "عدد المرافقين",
  "قائمة ضيوف واضحة",
  "ردود منظمة في مكان واحد",
] as const;

export const GUEST_STATS = [
  { value: "124", label: "حضور مؤكد", tone: "success" as const },
  { value: "36", label: "بانتظار الرد", tone: "warning" as const },
  { value: "8", label: "معتذرون", tone: "danger" as const },
];

export const GUEST_LIST = [
  { name: "سارة أحمد", status: "حضور مؤكد", tone: "success" as const },
  { name: "محمد علي", status: "بانتظار الرد", tone: "warning" as const },
  { name: "ليان عمر", status: "معتذر", tone: "danger" as const },
];

export const PLAN_FEATURES = [
  "دعوة رقمية كاملة",
  "جميع القوالب الفاخرة",
  "رابط خاص قابل للمشاركة",
  "مشاركة عبر واتساب",
  "بدون علامة مائية",
  "تأكيد حضور RSVP وإدارة الردود",
  "QR Code لرابط الدعوة",
  "دعم عربي وإنجليزي",
] as const;

export const FREE_FEATURES = [
  "معاينة كاملة للدعوة",
  "تجربة جميع القوالب",
  "تخصيص التفاصيل والتصميم",
  "بدون نشر أو مشاركة",
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "أنشأت الدعوة خلال دقائق، وكانت تجربة التعديل والمشاركة أسهل بكثير مما توقعت.",
    name: "سارة أحمد",
    tag: "زفاف",
  },
  {
    quote:
      "أعجبتني بساطة المنصة وأناقة القوالب، وتمكنت من مشاركة الدعوة مع الجميع بسهولة.",
    name: "محمد خالد",
    tag: "تخرج",
  },
  {
    quote:
      "أكثر ما أحببته هو وضوح التصميم وإمكانية معاينة الدعوة قبل نشرها مباشرة.",
    name: "ليان سمير",
    tag: "عيد ميلاد",
  },
] as const;

export const FAQS = [
  {
    q: "هل يمكنني تصميم الدعوة مجانًا؟",
    a: "نعم، يمكنك تصميم ومعاينة دعوتك مجانًا بالكامل، وتدفع فقط عند النشر والمشاركة.",
  },
  {
    q: "هل السعر اشتراك شهري؟",
    a: "لا، السعر دفعة واحدة لكل دعوة — بدون أي اشتراكات شهرية أو رسوم متكررة.",
  },
  {
    q: "هل أستطيع تعديل الدعوة بعد نشرها؟",
    a: "نعم، يمكنك تعديل تفاصيل دعوتك في أي وقت، وتظهر التغييرات فورًا للضيوف.",
  },
  {
    q: "هل تدعم الدعوات العربية والإنجليزية؟",
    a: "بالتأكيد، يمكنك تصميم دعوتك باللغة العربية أو الإنجليزية حسب جمهورك.",
  },
  {
    q: "متى أحتاج إلى الدفع؟",
    a: "تدفع فقط عندما تكون جاهزًا لنشر الدعوة ومشاركتها مع ضيوفك.",
  },
  {
    q: "ما فائدة QR Code؟",
    a: "يمكن لضيوفك فتح الدعوة بمسح رمز QR بسهولة دون الحاجة لكتابة الرابط.",
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "المنتج",
    links: [
      "إنشاء دعوة",
      "استعرض القوالب",
      "تجربة تأكيد الحضور",
      "صفحة الأسعار",
    ],
  },
  {
    title: "روابط سريعة",
    links: ["الرئيسية", "القوالب", "المميزات", "الأسعار", "اراء العملاء"],
  },
  {
    title: "الدعم",
    links: ["الأسئلة الشائعة", "سياسة الخصوصية", "الشروط والأحكام", "المساعدة"],
  },
] as const;
