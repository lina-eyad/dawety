import { create } from "zustand";

import { DETAILS_FIELDS, INVITE_TEXT } from "./content";

/** The six additional-option feature flags, keyed to match the FEATURES cards. */
export type FeatureKey =
  "rsvp" | "gallery" | "notes" | "music" | "program" | "contact";

export type ContactChannel = { enabled: boolean; value: string };

export type ProgramStep = { time: string; label: string };

type Setter =
  Partial<InvitationState> | ((s: InvitationState) => Partial<InvitationState>);

export type InvitationState = {
  /* ---- basics (shared by editor + preview) ---- */
  event: number;
  template: number;
  color: string;
  font: number;
  bg: number;
  textScale: number;
  eventDate?: Date;
  startTime: string;
  endTime: string;
  details: Record<string, string>;
  inviteText: string;
  venue: string;
  address: string;
  guests: string;
  lang: string;

  /* ---- which additional options are enabled ---- */
  features: Record<FeatureKey, boolean>;

  /* ---- per-option configuration ---- */
  rsvp: {
    companions: boolean;
    guestMsg: boolean;
    maxCompanions: number;
    thanks: string;
    deadline: string;
  };
  gallery: { title: string; images: string[]; cover: boolean; layout: number };
  notes: { message: string; items: string[]; placement: number };
  music: { title: string; src: string };
  program: { steps: ProgramStep[]; showTimes: boolean };
  contact: {
    name: string;
    buttonLabel: string;
    whatsapp: ContactChannel;
    phone: ContactChannel;
    email: ContactChannel;
    waMessage: string;
  };

  /* ---- mutations ---- */
  set: (partial: Setter) => void;
  setDetail: (key: string, value: string) => void;
  toggleFeature: (key: FeatureKey) => void;
};

/**
 * Single source of truth for the invitation being designed. It is a module
 * singleton, so it survives client-side navigation from /create to /preview —
 * the editor writes to it and every preview surface reads from it.
 *
 * Defaults reuse the project's existing placeholder content (not new mock data).
 */
export const useInvitation = create<InvitationState>((set) => ({
  event: 0,
  template: 3,
  color: "#9e0d3d",
  font: 0,
  bg: 1,
  textScale: 1,
  eventDate: new Date(2025, 5, 20),
  startTime: "07:00 مساءً",
  endTime: "11:00 مساءً",
  details: Object.fromEntries(
    DETAILS_FIELDS.map((f) => [f.label, f.placeholder]),
  ),
  inviteText: INVITE_TEXT,
  venue: "فندق الريتز كارلتون",
  address: "الرياض، السعودية",
  guests: "شخصين",
  lang: "ar",

  features: {
    rsvp: true,
    gallery: false,
    notes: true,
    music: false,
    program: true,
    contact: false,
  },

  rsvp: {
    companions: true,
    guestMsg: true,
    maxCompanions: 2,
    thanks: "شكرًا لتأكيد حضوركم، سعداء بمشاركتكم فرحتنا.",
    deadline: "قبل 3 أيام من الحفل",
  },
  gallery: {
    title: "لحظاتنا الجميلة",
    images: ["/images/template-1.png", "/images/template-2.png"],
    cover: true,
    layout: 0,
  },
  notes: {
    message:
      "يسعدنا ويشرّفنا حضوركم لمشاركتنا هذه المناسبة الغالية على قلوبنا.",
    items: [
      "الزيّ الرسمي: كلاسيكي أنيق",
      "يتوفّر موقف سيارات مجاني للضيوف",
      "نرجو الحضور قبل الموعد بـ 15 دقيقة",
    ],
    placement: 0,
  },
  music: { title: "موسيقى الخلفية", src: "" },
  program: {
    steps: [
      { time: "06:00 مساءً", label: "استقبال الضيوف" },
      { time: "07:30 مساءً", label: "العشاء" },
      { time: "09:00 مساءً", label: "مراسم الزفاف" },
      { time: "10:30 مساءً", label: "تقطيع الكيك" },
      { time: "11:30 مساءً", label: "ختام الحفل" },
    ],
    showTimes: true,
  },
  contact: {
    name: "",
    buttonLabel: "تواصل معنا",
    whatsapp: { enabled: true, value: "" },
    phone: { enabled: false, value: "" },
    email: { enabled: false, value: "" },
    waMessage: "مرحبًا، لديّ استفسار بخصوص الدعوة.",
  },

  set: (partial) => set(partial as Setter),
  setDetail: (key, value) =>
    set((s) => ({ details: { ...s.details, [key]: value } })),
  toggleFeature: (key) =>
    set((s) => ({ features: { ...s.features, [key]: !s.features[key] } })),
}));
