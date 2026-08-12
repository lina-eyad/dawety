/**
 * Dashboard sample data. Shaped to be swapped for real API calls later
 * (the project already ships React Query + a services layer).
 */

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: "overview" | "invitations" | "rsvps" | "templates" | "settings";
};

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { label: "نظرة عامة", href: "/dashboard", icon: "overview" },
  { label: "دعواتي", href: "/dashboard/invitations", icon: "invitations" },
  { label: "الردود", href: "/dashboard/rsvps", icon: "rsvps" },
  { label: "تصفّح القوالب", href: "/templates", icon: "templates" },
  { label: "الإعدادات", href: "/dashboard/settings", icon: "settings" },
];

export type InviteStatus = "published" | "draft";
export type PaymentStatus = "paid" | "unpaid";

export type Invitation = {
  id: string;
  title: string;
  type: string;
  date: string;
  status: InviteStatus;
  payment: PaymentStatus;
  views: number;
  rsvps: number;
  confirmed: number;
  img: string;
};

export const INVITATIONS: Invitation[] = [
  {
    id: "inv-1024",
    title: "زفاف أحمد وسارة",
    type: "زفاف",
    date: "20 يونيو 2025",
    status: "published",
    payment: "paid",
    views: 1240,
    rsvps: 312,
    confirmed: 280,
    img: "/images/template-4.png",
  },
  {
    id: "inv-1023",
    title: "خطوبة نورة",
    type: "خطوبة",
    date: "8 مايو 2025",
    status: "published",
    payment: "paid",
    views: 640,
    rsvps: 150,
    confirmed: 132,
    img: "/images/template-1.png",
  },
  {
    id: "inv-1022",
    title: "حفل تخرج عبدالله",
    type: "تخرج",
    date: "2 يوليو 2025",
    status: "published",
    payment: "paid",
    views: 420,
    rsvps: 96,
    confirmed: 88,
    img: "/images/template-3.png",
  },
  {
    id: "inv-1021",
    title: "عيد ميلاد لين",
    type: "عيد ميلاد",
    date: "مسودة",
    status: "draft",
    payment: "unpaid",
    views: 0,
    rsvps: 0,
    confirmed: 0,
    img: "/images/template-2.png",
  },
  {
    id: "inv-1020",
    title: "استقبال مولود",
    type: "استقبال مولود",
    date: "مسودة",
    status: "draft",
    payment: "unpaid",
    views: 0,
    rsvps: 0,
    confirmed: 0,
    img: "/images/template-5.png",
  },
];

export type RsvpStatus = "attending" | "declined";

export type RsvpEntry = {
  id: string;
  name: string;
  invitation: string;
  status: RsvpStatus;
  companions: number;
  at: string;
  message?: string;
};

export const RSVPS: RsvpEntry[] = [
  {
    id: "r-1",
    name: "محمد الراشد",
    invitation: "زفاف أحمد وسارة",
    status: "attending",
    companions: 2,
    at: "قبل ساعة",
    message: "مبروك، بالتوفيق دائماً 🤍",
  },
  {
    id: "r-2",
    name: "سارة القحطاني",
    invitation: "خطوبة نورة",
    status: "attending",
    companions: 1,
    at: "قبل 3 ساعات",
  },
  {
    id: "r-3",
    name: "خالد العتيبي",
    invitation: "زفاف أحمد وسارة",
    status: "declined",
    companions: 0,
    at: "أمس",
    message: "أعتذر لظرف طارئ، مبارك عليكم.",
  },
  {
    id: "r-4",
    name: "منى الدوسري",
    invitation: "حفل تخرج عبدالله",
    status: "attending",
    companions: 3,
    at: "أمس",
  },
  {
    id: "r-5",
    name: "عبدالعزيز الحربي",
    invitation: "خطوبة نورة",
    status: "attending",
    companions: 0,
    at: "قبل يومين",
    message: "سأحضر بإذن الله.",
  },
];

/** Aggregate metrics derived from the sample invitations. */
export function dashboardStats() {
  const published = INVITATIONS.filter((i) => i.status === "published");
  return {
    invitations: INVITATIONS.length,
    published: published.length,
    views: INVITATIONS.reduce((n, i) => n + i.views, 0),
    rsvps: INVITATIONS.reduce((n, i) => n + i.rsvps, 0),
    confirmed: INVITATIONS.reduce((n, i) => n + i.confirmed, 0),
  };
}
