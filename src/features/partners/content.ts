/** Partner directory data — swap for a real API/services call later. */

export type PartnerType = "planner" | "designer" | "photographer" | "other";

export const PARTNER_TYPES: { key: "all" | PartnerType; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "planner", label: "منظّمو حفلات" },
  { key: "designer", label: "مصمّمون" },
  { key: "photographer", label: "مصوّرون" },
  { key: "other", label: "أخرى" },
];

const TYPE_LABEL: Record<PartnerType, string> = {
  planner: "منظّم حفلات",
  designer: "مصمّم",
  photographer: "مصوّر",
  other: "أخرى",
};

export type Partner = {
  id: string;
  name: string;
  type: PartnerType;
  typeLabel: string;
  city: string;
  bio: string;
  featured?: boolean;
};

function p(
  id: string,
  name: string,
  type: PartnerType,
  city: string,
  bio: string,
  featured?: boolean,
): Partner {
  return { id, name, type, typeLabel: TYPE_LABEL[type], city, bio, featured };
}

export const PARTNERS: Partner[] = [
  p(
    "kd",
    "كنون للتنظيم",
    "planner",
    "الرياض",
    "تنظيم حفلات زفاف ومناسبات فاخرة.",
    true,
  ),
  p(
    "nw",
    "نوّارة للتصميم",
    "designer",
    "جدة",
    "تصميم هويات ودعوات رقمية أنيقة.",
  ),
  p("lj", "لجين للهدايا", "other", "الدمام", "توزيعات وهدايا لكل المناسبات."),
  p(
    "or",
    "أوركيد ديزاين",
    "designer",
    "الرياض",
    "تصميم دعوات ومطبوعات راقية.",
    true,
  ),
  p(
    "ln",
    "عدسة لينا",
    "photographer",
    "المدينة",
    "تصوير أعراس ومناسبات احترافي.",
  ),
  p("ev", "إيفينت هاوس", "planner", "مكة", "إدارة فعاليات ومؤتمرات متكاملة."),
  p("sh", "استوديو شمس", "photographer", "أبها", "تصوير سينمائي للمناسبات."),
  p("ml", "ملامح", "designer", "الخبر", "علامات بصرية ودعوات مخصّصة."),
  p(
    "rw",
    "روّاد المناسبات",
    "planner",
    "الرياض",
    "تنظيم حفلات ومعارض ومؤتمرات.",
  ),
];

export const PARTNER_STATS = [
  { value: "+10", label: "دول" },
  { value: "24 ساعة", label: "مدة المراجعة" },
  { value: "+13", label: "شريكاً" },
];
