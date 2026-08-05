"use client";

import Image from "next/image";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  Mail,
  MapPin,
  Music,
  Pause,
  Phone,
  Play,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  DESIGN_BACKGROUNDS,
  DESIGN_FONTS,
  EVENT_TYPES,
  WIZARD_TEMPLATES,
} from "../../content";
import { useInvitation, type InvitationState } from "../../invitation-store";

/** Text-size multipliers for the "حجم النص" design control. */
const SCALE = [0.92, 1, 1.1];

function formatDate(d?: Date) {
  if (!d) return "";
  return new Intl.DateTimeFormat("ar", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
    numberingSystem: "latn",
  }).format(d);
}

/** WhatsApp glyph (lucide ships no brand icons). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * The digital invitation exactly as a guest will see it — a self-contained,
 * scrollable, mobile-first canvas driven entirely by the shared invitation
 * store. Sections render conditionally based on the enabled features.
 */
export function InvitationCanvas() {
  const s = useInvitation();
  const bg = DESIGN_BACKGROUNDS[s.bg] ?? DESIGN_BACKGROUNDS[0];
  const fontFamily = DESIGN_FONTS[s.font]?.family;
  const scale = SCALE[s.textScale] ?? 1;
  const acc = s.color;

  return (
    <div
      dir="rtl"
      className={cn(
        "h-full overflow-x-hidden overflow-y-auto",
        bg.dark ? "text-white" : "text-ink",
      )}
      style={{ background: bg.css, fontFamily }}
    >
      <Hero s={s} acc={acc} scale={scale} />
      <Details s={s} acc={acc} scale={scale} />
      {s.features.notes ? (
        <MessageSection s={s} acc={acc} scale={scale} />
      ) : null}
      {s.features.program ? (
        <ProgramSection s={s} acc={acc} scale={scale} />
      ) : null}
      {s.features.gallery && s.gallery.images.length > 0 ? (
        <GallerySection s={s} acc={acc} scale={scale} />
      ) : null}
      {s.features.rsvp ? <RsvpSection s={s} acc={acc} scale={scale} /> : null}
      {s.features.contact ? (
        <ContactSection s={s} acc={acc} scale={scale} />
      ) : null}
      <div className="h-6" />
      {s.features.music ? <MusicControl s={s} acc={acc} /> : null}
    </div>
  );
}

type SectionProps = { s: InvitationState; acc: string; scale: number };

/** Section title with two short accent rules. */
function SectionTitle({
  children,
  acc,
  scale,
}: {
  children: React.ReactNode;
  acc: string;
  scale: number;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-6 opacity-40" style={{ background: acc }} />
      <h2 className="font-bold" style={{ color: acc, fontSize: 15 * scale }}>
        {children}
      </h2>
      <span className="h-px w-6 opacity-40" style={{ background: acc }} />
    </div>
  );
}

function Hero({ s, acc, scale }: SectionProps) {
  const img = WIZARD_TEMPLATES[s.template]?.img;
  const name1 = s.details["الاسم الأول"];
  const name2 = s.details["الاسم الثاني"];
  return (
    <section>
      <div className="relative aspect-4/5 w-full overflow-hidden">
        {img ? (
          <Image src={img} alt="" fill sizes="480px" className="object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-5 text-center text-white">
          <span
            className="rounded-full bg-white/15 px-3 py-1 font-medium backdrop-blur-sm"
            style={{ fontSize: 11 * scale }}
          >
            {EVENT_TYPES[s.event]?.label}
          </span>
          <h1
            className="leading-tight font-bold"
            style={{ fontSize: 30 * scale }}
          >
            {name1 || "—"}
            <span className="mx-1 opacity-90">&</span>
            {name2 || "—"}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center px-6 py-6 text-center">
        <span className="h-px w-12" style={{ background: acc }} />
        <p
          className="mt-4 leading-relaxed opacity-90"
          style={{ fontSize: 13.5 * scale }}
        >
          {s.inviteText}
        </p>
      </div>
    </section>
  );
}

function Details({ s, acc, scale }: SectionProps) {
  const rows = [
    { Icon: CalendarDays, value: formatDate(s.eventDate) },
    { Icon: Clock, value: `${s.startTime} — ${s.endTime}`, ltr: true },
    { Icon: MapPin, value: s.venue, sub: s.address },
    { Icon: Users, value: `الدعوة باسم ${s.guests}` },
  ];
  return (
    <section className="px-6 pb-6">
      <div
        className="mx-auto flex max-w-xs flex-col gap-3.5 rounded-2xl border p-5"
        style={{ borderColor: acc + "33" }}
      >
        {rows.map((r, i) =>
          r.value ? (
            <div key={i} className="flex items-center gap-3">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full"
                style={{ background: acc + "1a", color: acc }}
              >
                <r.Icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span
                  className="block font-medium"
                  style={{ fontSize: 13 * scale }}
                  dir={r.ltr ? "ltr" : undefined}
                >
                  {r.value}
                </span>
                {r.sub ? (
                  <span
                    className="block opacity-70"
                    style={{ fontSize: 11.5 * scale }}
                  >
                    {r.sub}
                  </span>
                ) : null}
              </span>
            </div>
          ) : null,
        )}
      </div>
    </section>
  );
}

function MessageSection({ s, acc, scale }: SectionProps) {
  return (
    <section className="px-6 py-6">
      <SectionTitle acc={acc} scale={scale}>
        رسالتنا إليكم
      </SectionTitle>
      <p
        className="mx-auto mt-4 max-w-sm text-center leading-relaxed opacity-90"
        style={{ fontSize: 13.5 * scale }}
      >
        {s.notes.message}
      </p>
      {s.notes.items.length > 0 ? (
        <div className="mx-auto mt-5 flex max-w-xs flex-col gap-2.5">
          {s.notes.items.map((n) => (
            <div
              key={n}
              className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5"
              style={{ borderColor: acc + "22" }}
            >
              <Info
                className="size-4 shrink-0"
                style={{ color: acc }}
                aria-hidden
              />
              <span style={{ fontSize: 12.5 * scale }}>{n}</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ProgramSection({ s, acc, scale }: SectionProps) {
  return (
    <section className="px-6 py-6">
      <SectionTitle acc={acc} scale={scale}>
        برنامج الحفل
      </SectionTitle>
      <div className="mx-auto mt-5 flex max-w-xs flex-col">
        {s.program.steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ background: acc, boxShadow: `0 0 0 4px ${acc}22` }}
              />
              {i < s.program.steps.length - 1 ? (
                <span
                  className="my-1 w-px flex-1"
                  style={{ background: acc + "33" }}
                />
              ) : null}
            </div>
            <div className="-mt-1 flex-1 pb-4">
              {s.program.showTimes ? (
                <span
                  className="font-bold"
                  style={{ color: acc, fontSize: 12 * scale }}
                  dir="ltr"
                >
                  {step.time}
                </span>
              ) : null}
              <p style={{ fontSize: 13 * scale }}>{step.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ s, acc, scale }: SectionProps) {
  const [open, setOpen] = useState<number | null>(null);
  const imgs = s.gallery.images;
  const show = (i: number) => setOpen(i);
  const move = (dir: number) =>
    setOpen((cur) =>
      cur === null ? cur : (cur + dir + imgs.length) % imgs.length,
    );

  return (
    <section className="px-6 py-6">
      <SectionTitle acc={acc} scale={scale}>
        {s.gallery.title || "معرض الصور"}
      </SectionTitle>
      <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2">
        {imgs.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => show(i)}
            className="group relative aspect-square overflow-hidden rounded-xl"
            aria-label={`عرض الصورة ${i + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="120px"
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open !== null ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="إغلاق"
            className="absolute end-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <X className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="السابق"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute end-3 flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <ChevronRight className="size-6" aria-hidden />
          </button>
          <div
            className="relative aspect-4/5 w-full max-w-sm overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={open}
              src={imgs[open]}
              alt=""
              fill
              sizes="480px"
              unoptimized
              className="animate-in object-cover duration-300 fade-in"
            />
          </div>
          <button
            type="button"
            aria-label="التالي"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute start-3 flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>
        </div>
      ) : null}
    </section>
  );
}

function RsvpSection({ s, acc, scale }: SectionProps) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const field =
    "w-full rounded-xl border bg-white/60 px-3 py-2.5 text-sm text-ink outline-none";

  if (sent) {
    return (
      <section className="px-6 py-8">
        <div
          className="mx-auto flex max-w-xs flex-col items-center gap-2 rounded-2xl border p-6 text-center"
          style={{ borderColor: acc + "33" }}
        >
          <span
            className="flex size-11 items-center justify-center rounded-full"
            style={{ background: acc + "1a", color: acc }}
          >
            <Check className="size-6" aria-hidden />
          </span>
          <p style={{ fontSize: 13.5 * scale }}>{s.rsvp.thanks}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-6">
      <SectionTitle acc={acc} scale={scale}>
        تأكيد الحضور
      </SectionTitle>
      <div className="mx-auto mt-5 flex max-w-xs flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "سأحضر", val: true },
            { label: "أعتذر", val: false },
          ].map((o) => {
            const on = attending === o.val;
            return (
              <button
                key={o.label}
                type="button"
                onClick={() => setAttending(o.val)}
                className="rounded-xl border py-2.5 text-sm font-medium transition-colors"
                style={
                  on
                    ? { background: acc, color: "#fff", borderColor: acc }
                    : { borderColor: acc + "33" }
                }
              >
                {o.label}
              </button>
            );
          })}
        </div>

        {attending ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسم الضيف"
              className={field}
              style={{ borderColor: acc + "33" }}
            />
            {s.rsvp.companions ? (
              <div
                className="flex items-center justify-between rounded-xl border px-3 py-2"
                style={{ borderColor: acc + "33" }}
              >
                <span className="text-sm text-ink">عدد المرافقين</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="إنقاص"
                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                    className="flex size-7 items-center justify-center rounded-full border text-ink"
                    style={{ borderColor: acc + "44" }}
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm font-bold text-ink">
                    {count}
                  </span>
                  <button
                    type="button"
                    aria-label="زيادة"
                    onClick={() =>
                      setCount((c) => Math.min(s.rsvp.maxCompanions + 1, c + 1))
                    }
                    className="flex size-7 items-center justify-center rounded-full border text-ink"
                    style={{ borderColor: acc + "44" }}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : null}
            {s.rsvp.guestMsg ? (
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="رسالة تهنئة (اختياري)"
                className={field}
                style={{ borderColor: acc + "33" }}
              />
            ) : null}
          </>
        ) : null}

        <button
          type="button"
          disabled={attending === null}
          onClick={() => setSent(true)}
          className="rounded-xl py-3 text-sm font-bold text-white transition-opacity disabled:opacity-40"
          style={{ background: acc }}
        >
          إرسال الرد
        </button>
        <p className="text-center text-[11px] opacity-60">
          آخر موعد للرد: {s.rsvp.deadline}
        </p>
      </div>
    </section>
  );
}

function ContactSection({ s, acc, scale }: SectionProps) {
  const c = s.contact;
  const waDigits = c.whatsapp.value.replace(/\D/g, "");
  const items = [
    c.whatsapp.enabled && {
      Icon: WhatsAppIcon,
      label: "واتساب",
      href: `https://wa.me/${waDigits || "966500000000"}?text=${encodeURIComponent(c.waMessage)}`,
      external: true,
    },
    c.phone.enabled && {
      Icon: Phone,
      label: "اتصال",
      href: `tel:${c.phone.value || "+966500000000"}`,
    },
    c.email.enabled && {
      Icon: Mail,
      label: "بريد",
      href: `mailto:${c.email.value || "info@invitera.com"}`,
    },
  ].filter(Boolean) as {
    Icon: typeof Phone;
    label: string;
    href: string;
    external?: boolean;
  }[];

  if (items.length === 0) return null;

  return (
    <section className="px-6 py-6">
      <SectionTitle acc={acc} scale={scale}>
        {c.buttonLabel || "تواصل معنا"}
      </SectionTitle>
      {c.name ? (
        <p
          className="mt-3 text-center opacity-80"
          style={{ fontSize: 13 * scale }}
        >
          {c.name}
        </p>
      ) : null}
      <div className="mx-auto mt-4 flex max-w-xs flex-wrap justify-center gap-3">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target={it.external ? "_blank" : undefined}
            rel={it.external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className="flex size-12 items-center justify-center rounded-full"
              style={{ background: acc + "1a", color: acc }}
            >
              <it.Icon className="size-5" aria-hidden />
            </span>
            <span style={{ fontSize: 11 * scale }}>{it.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function MusicControl({ s, acc }: { s: InvitationState; acc: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const el = audioRef.current;
    if (el && s.music.src) {
      if (playing) el.pause();
      else void el.play().catch(() => undefined);
    }
    setPlaying((p) => !p);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      aria-pressed={playing}
      className="sticky bottom-4 float-start ms-4 flex items-center gap-2 rounded-full px-3 py-2 text-white shadow-lg backdrop-blur-sm"
      style={{ background: acc }}
    >
      {s.music.src ? (
        <audio ref={audioRef} src={s.music.src} loop preload="none" />
      ) : null}
      <Music className={cn("size-4", playing && "animate-pulse")} aria-hidden />
      {playing ? (
        <Pause className="size-4" aria-hidden />
      ) : (
        <Play className="size-4" aria-hidden />
      )}
    </button>
  );
}
