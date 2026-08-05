"use client";

import Image from "next/image";
import {
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  Clock,
  Contact,
  GripVertical,
  ImagePlus,
  Images,
  Info,
  Lock,
  Mail,
  MessageSquare,
  Minus,
  NotebookPen,
  Phone,
  Plus,
  Sparkles,
  Star,
  UserCheck,
  Users,
  Utensils,
  X,
} from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { useInvitation, type InvitationState } from "../invitation-store";

/** Dialog body wrapper: caps height and scrolls the content via a styled bar. */
function ModalShell({ children }: { children: ReactNode }) {
  return (
    <DialogContent className="max-h-[85vh] gap-0 overflow-hidden p-0 sm:max-w-lg">
      <ScrollArea className="max-h-[85vh]">
        <div className="flex flex-col p-4">{children}</div>
      </ScrollArea>
    </DialogContent>
  );
}

/** Icon + title/desc row with a trailing pill switch — used for form options. */
function ToggleRow({
  Icon,
  title,
  desc,
  checked,
  onToggle,
}: {
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e5e7eb] p-3.5">
      <span className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose text-primary">
          <Icon className="size-4" aria-hidden />
        </span>
        <span>
          <span className="block text-sm font-medium text-ink">{title}</span>
          <span className="text-xs text-ink-muted">{desc}</span>
        </span>
      </span>
      <Switch checked={checked} onClick={onToggle} label={title} />
    </div>
  );
}

/** Compact −/+ number stepper. */
function Stepper({
  value,
  setValue,
  min = 0,
  max = 10,
}: {
  value: number;
  setValue: (n: number) => void;
  min?: number;
  max?: number;
}) {
  const btn =
    "flex size-8 items-center justify-center rounded-full border border-[#d1d5db] text-ink transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40";
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setValue(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="إنقاص"
        className={btn}
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span className="w-6 text-center text-sm font-bold text-ink">
        {value}
      </span>
      <button
        type="button"
        onClick={() => setValue(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="زيادة"
        className={btn}
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export function RsvpModal({ trigger }: { trigger: ReactNode }) {
  const inv = useInvitation();
  const enabled = inv.features.rsvp;
  const c = inv.rsvp;
  const setC = (p: Partial<InvitationState["rsvp"]>) =>
    inv.set((s) => ({ rsvp: { ...s.rsvp, ...p } }));

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <ModalShell>
        <DialogHeader>
          <div className="flex items-start gap-3 text-start">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-rose text-primary">
              <UserCheck className="size-5" aria-hidden />
            </span>
            <div>
              <DialogTitle className="text-lg font-bold text-ink">
                إعداد تأكيد الحضور
              </DialogTitle>
              <DialogDescription className="text-ink-muted">
                حدد ما الذي سيظهر للضيف عند تأكيد الحضور، وكيف ستتابع الردود.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Master enable */}
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-rose/50 p-4">
          <span>
            <span className="block text-sm font-medium text-ink">
              تفعيل تأكيد الحضور
            </span>
            <span className="text-xs text-ink-muted">
              اسمح لضيوفك بإرسال ردهم من داخل الدعوة.
            </span>
          </span>
          <Switch
            checked={enabled}
            onClick={() => inv.toggleFeature("rsvp")}
            label="تفعيل تأكيد الحضور"
          />
        </div>

        {/* Config — dimmed while disabled */}
        <div
          className={cn(
            "mt-5 flex flex-col gap-4 transition-opacity",
            !enabled && "pointer-events-none opacity-50",
          )}
        >
          <div>
            <p className="mb-2.5 text-sm font-bold text-ink">
              ماذا يملأ الضيف عند الرد؟
            </p>
            <div className="flex flex-col gap-2.5">
              {/* Attendance — always on */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-3.5">
                <span className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-rose text-primary">
                    <CalendarCheck className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      سؤال الحضور
                    </span>
                    <span className="text-xs text-ink-muted">
                      يختار الضيف: سأحضر أو أعتذر
                    </span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-rose px-2.5 py-1 text-[11px] font-medium text-primary">
                  <Lock className="size-3" aria-hidden />
                  أساسي
                </span>
              </div>

              <ToggleRow
                Icon={Users}
                title="عدد المرافقين"
                desc="اسمح للضيف بتحديد عدد الأشخاص القادمين معه"
                checked={c.companions}
                onToggle={() => setC({ companions: !c.companions })}
              />
              {c.companions ? (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-[#e5e7eb] px-4 py-3">
                  <span className="text-sm text-ink">
                    الحد الأقصى للمرافقين
                  </span>
                  <Stepper
                    value={c.maxCompanions}
                    setValue={(n) => setC({ maxCompanions: n })}
                    min={0}
                    max={10}
                  />
                </div>
              ) : null}

              <ToggleRow
                Icon={MessageSquare}
                title="رسالة من الضيف"
                desc="اسمح بإرسال تهنئة أو ملاحظة قصيرة"
                checked={c.guestMsg}
                onToggle={() => setC({ guestMsg: !c.guestMsg })}
              />
              <ToggleRow
                Icon={Utensils}
                title="تفضيل الوجبة"
                desc="اسمح للضيف باختيار نوع الطعام المفضل"
                checked={c.meal}
                onToggle={() => setC({ meal: !c.meal })}
              />
            </div>
          </div>

          {/* RSVP deadline */}
          <div className="flex flex-col gap-1.5">
            <Label>آخر موعد لاستقبال الردود</Label>
            <div className="flex h-[50px] items-center gap-2 rounded-[12px] border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-ink">
              <CalendarDays
                className="size-4 shrink-0 text-ink-muted"
                aria-hidden
              />
              <span className="flex-1">قبل 3 أيام من الحفل</span>
              <ChevronDown
                className="size-4 shrink-0 text-ink-muted"
                aria-hidden
              />
            </div>
          </div>

          {/* Thank-you message */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label className="mb-0">رسالة الشكر بعد التأكيد</Label>
              <span className="text-xs text-ink-muted" dir="ltr">
                {c.thanks.length}/120
              </span>
            </div>
            <textarea
              rows={2}
              maxLength={120}
              value={c.thanks}
              onChange={(e) => setC({ thanks: e.target.value })}
              className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2 sm:justify-start">
          <Button className="shadow-brand">حفظ الإعدادات</Button>
          <DialogClose asChild>
            <Button variant="secondary">إلغاء</Button>
          </DialogClose>
        </DialogFooter>
      </ModalShell>
    </Dialog>
  );
}

export function ContactModal({ trigger }: { trigger: ReactNode }) {
  const inv = useInvitation();
  const enabled = inv.features.contact;
  const c = inv.contact;
  const setC = (p: Partial<InvitationState["contact"]>) =>
    inv.set((s) => ({ contact: { ...s.contact, ...p } }));
  const setCh = (
    ch: "whatsapp" | "phone" | "email",
    p: Partial<{ enabled: boolean; value: string }>,
  ) =>
    inv.set((s) => ({
      contact: { ...s.contact, [ch]: { ...s.contact[ch], ...p } },
    }));

  const field = "h-[50px] rounded-[12px] border-[#e5e7eb] bg-[#f9fafb] px-4";
  const prefix =
    "flex items-center rounded-[12px] border border-[#e5e7eb] bg-[#f9fafb] px-3 text-sm text-ink-muted";
  const reveal = "rounded-2xl border border-dashed border-[#e5e7eb] p-3";

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <ModalShell>
        <DialogHeader>
          <div className="flex items-start gap-3 text-start">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-rose text-primary">
              <Contact className="size-5" aria-hidden />
            </span>
            <div>
              <DialogTitle className="text-lg font-bold text-ink">
                إعداد معلومات التواصل
              </DialogTitle>
              <DialogDescription className="text-ink-muted">
                أضف وسائل تواصل تظهر للضيوف داخل الدعوة عند الحاجة.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Master enable */}
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-rose/50 p-4">
          <span>
            <span className="block text-sm font-medium text-ink">
              تفعيل معلومات التواصل
            </span>
            <span className="text-xs text-ink-muted">
              عند تفعيله، سيظهر زر تواصل داخل الدعوة.
            </span>
          </span>
          <Switch
            checked={enabled}
            onClick={() => inv.toggleFeature("contact")}
            label="تفعيل معلومات التواصل"
          />
        </div>

        {/* Config — dimmed while disabled */}
        <div
          className={cn(
            "mt-5 flex flex-col gap-4 transition-opacity",
            !enabled && "pointer-events-none opacity-50",
          )}
        >
          {/* Contact name */}
          <div className="flex flex-col gap-1.5">
            <Label>اسم جهة التواصل</Label>
            <Input
              value={c.name}
              onChange={(e) => setC({ name: e.target.value })}
              placeholder="مثال: أحمد / منسّقة الحفل / والد العروس"
              className={field}
            />
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-2">
            <Label>قنوات التواصل</Label>
            <div className="flex flex-col gap-2.5">
              {/* WhatsApp */}
              <ToggleRow
                Icon={MessageSquare}
                title="واتساب"
                desc="زر محادثة مباشرة عبر واتساب"
                checked={c.whatsapp.enabled}
                onToggle={() =>
                  setCh("whatsapp", { enabled: !c.whatsapp.enabled })
                }
              />
              {c.whatsapp.enabled ? (
                <div className={cn(reveal, "flex flex-col gap-2")}>
                  <div className="flex gap-2" dir="ltr">
                    <span className={prefix}>+966</span>
                    <Input
                      value={c.whatsapp.value}
                      onChange={(e) =>
                        setCh("whatsapp", { value: e.target.value })
                      }
                      placeholder="5XXXXXXXX"
                      className={cn(field, "flex-1")}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-ink">
                        رسالة جاهزة (اختياري)
                      </span>
                      <span className="text-xs text-ink-muted" dir="ltr">
                        {c.waMessage.length}/120
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      maxLength={120}
                      value={c.waMessage}
                      onChange={(e) => setC({ waMessage: e.target.value })}
                      className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    />
                  </div>
                </div>
              ) : null}

              {/* Phone call */}
              <ToggleRow
                Icon={Phone}
                title="مكالمة هاتفية"
                desc="زر اتصال مباشر"
                checked={c.phone.enabled}
                onToggle={() => setCh("phone", { enabled: !c.phone.enabled })}
              />
              {c.phone.enabled ? (
                <div className={cn(reveal, "flex gap-2")} dir="ltr">
                  <span className={prefix}>+966</span>
                  <Input
                    value={c.phone.value}
                    onChange={(e) => setCh("phone", { value: e.target.value })}
                    placeholder="5XXXXXXXX"
                    className={cn(field, "flex-1")}
                  />
                </div>
              ) : null}

              {/* Email */}
              <ToggleRow
                Icon={Mail}
                title="البريد الإلكتروني"
                desc="راسلنا عبر البريد"
                checked={c.email.enabled}
                onToggle={() => setCh("email", { enabled: !c.email.enabled })}
              />
              {c.email.enabled ? (
                <div className={reveal}>
                  <Input
                    type="email"
                    dir="ltr"
                    value={c.email.value}
                    onChange={(e) => setCh("email", { value: e.target.value })}
                    placeholder="name@example.com"
                    className={cn(field, "w-full")}
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Button label */}
          <div className="flex flex-col gap-1.5">
            <Label>نص زر التواصل داخل الدعوة</Label>
            <Input
              value={c.buttonLabel}
              onChange={(e) => setC({ buttonLabel: e.target.value })}
              className={field}
            />
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2 sm:justify-start">
          <Button className="shadow-brand">حفظ الإعدادات</Button>
          <DialogClose asChild>
            <Button variant="secondary">إلغاء</Button>
          </DialogClose>
        </DialogFooter>
      </ModalShell>
    </Dialog>
  );
}

export function GalleryModal({ trigger }: { trigger: ReactNode }) {
  const inv = useInvitation();
  const enabled = inv.features.gallery;
  const g = inv.gallery;
  const setG = (p: Partial<InvitationState["gallery"]>) =>
    inv.set((s) => ({ gallery: { ...s.gallery, ...p } }));
  const layouts = ["شبكة", "منزلق", "فسيفساء"];

  const addImages = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setG({ images: [...g.images, ...urls].slice(0, 6) });
  };
  const removeImage = (i: number) =>
    setG({ images: g.images.filter((_, j) => j !== i) });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <ModalShell>
        <DialogHeader>
          <div className="flex items-start gap-3 text-start">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-rose text-primary">
              <Images className="size-5" aria-hidden />
            </span>
            <div>
              <DialogTitle className="text-lg font-bold text-ink">
                إعداد معرض الصور
              </DialogTitle>
              <DialogDescription className="text-ink-muted">
                أضف صورًا جميلة تظهر داخل دعوتك وتمنح الضيوف تجربة أكثر دفئًا.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Master enable */}
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-rose/50 p-4">
          <span>
            <span className="block text-sm font-medium text-ink">
              تفعيل معرض الصور
            </span>
            <span className="text-xs text-ink-muted">
              عند تفعيله، سيظهر قسم الصور داخل دعوتك.
            </span>
          </span>
          <Switch
            checked={enabled}
            onClick={() => inv.toggleFeature("gallery")}
            label="تفعيل معرض الصور"
          />
        </div>

        {/* Config — dimmed while disabled */}
        <div
          className={cn(
            "mt-5 flex flex-col gap-4 transition-opacity",
            !enabled && "pointer-events-none opacity-50",
          )}
        >
          {/* Gallery title */}
          <div className="flex flex-col gap-1.5">
            <Label>عنوان المعرض (اختياري)</Label>
            <Input
              value={g.title}
              onChange={(e) => setG({ title: e.target.value })}
              placeholder="مثال: لحظاتنا الجميلة"
              className="h-[50px] rounded-[12px] border-[#e5e7eb] bg-[#f9fafb] px-4"
            />
          </div>

          {/* Images */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="mb-0">الصور</Label>
              <span className="text-xs text-ink-muted" dir="ltr">
                {g.images.length}/6
              </span>
            </div>

            {/* Dropzone */}
            <label className="flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border border-dashed border-[#d1d5db] bg-[#f9fafb] p-6 text-center transition-colors hover:border-primary/50 hover:bg-rose/30">
              <ImagePlus className="size-6 text-primary" aria-hidden />
              <span className="text-sm font-medium text-ink">
                اسحب الصور هنا أو اضغط للاختيار
              </span>
              <span className="text-xs text-ink-muted">
                JPG / PNG · حتى 6 صور · 10MB لكل صورة
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addImages(e.target.files)}
              />
            </label>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {g.images.map((src, i) => (
                <div
                  key={src}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-[#e5e7eb]"
                >
                  <Image
                    src={src}
                    alt={`صورة ${i + 1}`}
                    fill
                    sizes="120px"
                    unoptimized
                    className="object-cover"
                  />
                  {g.cover && i === 0 ? (
                    <span className="absolute end-1.5 top-1.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                      غلاف
                    </span>
                  ) : null}
                  <button
                    type="button"
                    aria-label="حذف الصورة"
                    onClick={() => removeImage(i)}
                    className="absolute start-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-ink/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="size-3.5" aria-hidden />
                  </button>
                </div>
              ))}

              {/* Add tile */}
              {g.images.length < 6 ? (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#d1d5db] text-ink-muted transition-colors hover:border-primary hover:text-primary">
                  <Plus className="size-5" aria-hidden />
                  <span className="text-xs">إضافة</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => addImages(e.target.files)}
                  />
                </label>
              ) : null}
            </div>
          </div>

          {/* Layout */}
          <div>
            <Label>طريقة العرض داخل الدعوة</Label>
            <div className="mt-2 flex h-[50px] gap-1 rounded-[12px] border border-[#d1d5db] p-1">
              {layouts.map((l, i) => {
                const on = g.layout === i;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setG({ layout: i })}
                    className={cn(
                      "flex flex-1 items-center justify-center rounded-[8px] border text-sm font-medium transition-colors",
                      on
                        ? "border-primary/30 bg-rose text-primary"
                        : "border-transparent text-ink-muted hover:text-ink",
                    )}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cover toggle */}
          <ToggleRow
            Icon={Star}
            title="اجعل أول صورة غلافاً للمعرض"
            desc="تظهر كصورة رئيسية أعلى المعرض"
            checked={g.cover}
            onToggle={() => setG({ cover: !g.cover })}
          />
        </div>

        <DialogFooter className="mt-6 gap-2 sm:justify-start">
          <Button className="shadow-brand">حفظ الإعدادات</Button>
          <DialogClose asChild>
            <Button variant="secondary">إلغاء</Button>
          </DialogClose>
        </DialogFooter>
      </ModalShell>
    </Dialog>
  );
}

export function NotesModal({ trigger }: { trigger: ReactNode }) {
  const inv = useInvitation();
  const enabled = inv.features.notes;
  const n = inv.notes;
  const setN = (p: Partial<InvitationState["notes"]>) =>
    inv.set((s) => ({ notes: { ...s.notes, ...p } }));
  const placements = ["أعلى الدعوة", "أسفل الدعوة"];

  const setItem = (i: number, value: string) =>
    setN({ items: n.items.map((it, j) => (j === i ? value : it)) });
  const removeItem = (i: number) =>
    setN({ items: n.items.filter((_, j) => j !== i) });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <ModalShell>
        <DialogHeader>
          <div className="flex items-start gap-3 text-start">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-rose text-primary">
              <NotebookPen className="size-5" aria-hidden />
            </span>
            <div>
              <DialogTitle className="text-lg font-bold text-ink">
                إعداد الرسالة والملاحظات
              </DialogTitle>
              <DialogDescription className="text-ink-muted">
                أضف رسالة ترحيب وملاحظات مهمّة تظهر للضيوف داخل الدعوة.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Master enable */}
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-rose/50 p-4">
          <span>
            <span className="block text-sm font-medium text-ink">
              تفعيل الرسالة والملاحظات
            </span>
            <span className="text-xs text-ink-muted">
              عند تفعيله، ستظهر رسالتك وملاحظاتك داخل الدعوة.
            </span>
          </span>
          <Switch
            checked={enabled}
            onClick={() => inv.toggleFeature("notes")}
            label="تفعيل الرسالة والملاحظات"
          />
        </div>

        {/* Config — dimmed while disabled */}
        <div
          className={cn(
            "mt-5 flex flex-col gap-4 transition-opacity",
            !enabled && "pointer-events-none opacity-50",
          )}
        >
          {/* Welcome message */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label className="mb-0">رسالة الترحيب</Label>
              <span className="text-xs text-ink-muted" dir="ltr">
                {n.message.length}/200
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={200}
              value={n.message}
              onChange={(e) => setN({ message: e.target.value })}
              className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            <button
              type="button"
              className="inline-flex items-center gap-1.5 self-end rounded-full border border-primary/20 bg-rose px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-rose/70"
            >
              <Sparkles className="size-4" aria-hidden />
              استخدام نص مقترح
            </button>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <Label>ملاحظات مهمّة للضيوف</Label>
            <div className="flex flex-col gap-2">
              {n.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-[#e5e7eb] p-3"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-rose text-primary">
                    <Info className="size-4" aria-hidden />
                  </span>
                  <input
                    value={item}
                    onChange={(e) => setItem(i, e.target.value)}
                    placeholder="اكتب ملاحظة…"
                    className="flex-1 bg-transparent text-sm text-ink outline-none"
                  />
                  <button
                    type="button"
                    aria-label="حذف الملاحظة"
                    onClick={() => removeItem(i)}
                    className="text-ink-muted transition-colors hover:text-primary"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setN({ items: [...n.items, ""] })}
            >
              <Plus className="size-4" aria-hidden />
              إضافة ملاحظة
            </Button>
          </div>

          {/* Placement */}
          <div>
            <Label>موضع الظهور داخل الدعوة</Label>
            <div className="mt-2 flex h-[50px] gap-1 rounded-[12px] border border-[#d1d5db] p-1">
              {placements.map((p, i) => {
                const on = n.placement === i;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setN({ placement: i })}
                    className={cn(
                      "flex flex-1 items-center justify-center rounded-[8px] border text-sm font-medium transition-colors",
                      on
                        ? "border-primary/30 bg-rose text-primary"
                        : "border-transparent text-ink-muted hover:text-ink",
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2 sm:justify-start">
          <Button className="shadow-brand">حفظ الإعدادات</Button>
          <DialogClose asChild>
            <Button variant="secondary">إلغاء</Button>
          </DialogClose>
        </DialogFooter>
      </ModalShell>
    </Dialog>
  );
}

export function ProgramModal({ trigger }: { trigger: ReactNode }) {
  const inv = useInvitation();
  const enabled = inv.features.program;
  const prog = inv.program;
  const setP = (patch: Partial<InvitationState["program"]>) =>
    inv.set((s) => ({ program: { ...s.program, ...patch } }));
  const [format, setFormat] = useState(0);
  const formats = ["12 ساعة", "24 ساعة"];

  const setStep = (
    i: number,
    patch: Partial<{ time: string; label: string }>,
  ) =>
    setP({
      steps: prog.steps.map((st, j) => (j === i ? { ...st, ...patch } : st)),
    });
  const removeStep = (i: number) =>
    setP({ steps: prog.steps.filter((_, j) => j !== i) });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <ModalShell>
        <DialogHeader>
          <div className="flex items-start gap-3 text-start">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-rose text-primary">
              <CalendarClock className="size-5" aria-hidden />
            </span>
            <div>
              <DialogTitle className="text-lg font-bold text-ink">
                إعداد برنامج الحفل
              </DialogTitle>
              <DialogDescription className="text-ink-muted">
                رتّب فقرات حفلك زمنياً لتظهر للضيوف داخل الدعوة.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Master enable */}
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-rose/50 p-4">
          <span>
            <span className="block text-sm font-medium text-ink">
              عرض برنامج الحفل داخل الدعوة
            </span>
            <span className="text-xs text-ink-muted">
              عند تفعيله، سيظهر جدول البرنامج داخل دعوتك.
            </span>
          </span>
          <Switch
            checked={enabled}
            onClick={() => inv.toggleFeature("program")}
            label="عرض برنامج الحفل داخل الدعوة"
          />
        </div>

        {/* Config — dimmed while disabled */}
        <div
          className={cn(
            "mt-5 flex flex-col gap-4 transition-opacity",
            !enabled && "pointer-events-none opacity-50",
          )}
        >
          {/* Agenda */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="mb-0">فقرات البرنامج</Label>
              <span className="text-xs text-ink-muted" dir="ltr">
                {prog.steps.length}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {prog.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-2xl border border-[#e5e7eb] p-3"
                >
                  <GripVertical
                    className="size-4 shrink-0 text-ink-muted/50"
                    aria-hidden
                  />
                  {prog.showTimes ? (
                    <input
                      value={step.time}
                      onChange={(e) => setStep(i, { time: e.target.value })}
                      className="w-24 rounded-lg bg-rose px-2 py-1.5 text-center text-xs font-bold text-primary outline-none"
                    />
                  ) : null}
                  <input
                    value={step.label}
                    onChange={(e) => setStep(i, { label: e.target.value })}
                    placeholder="اسم الفقرة"
                    className="flex-1 bg-transparent text-sm text-ink outline-none"
                  />
                  <button
                    type="button"
                    aria-label="حذف الفقرة"
                    onClick={() => removeStep(i)}
                    className="text-ink-muted transition-colors hover:text-primary"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                setP({
                  steps: [...prog.steps, { time: "08:00 مساءً", label: "" }],
                })
              }
            >
              <Plus className="size-4" aria-hidden />
              إضافة فقرة
            </Button>
          </div>

          {/* Show times */}
          <ToggleRow
            Icon={Clock}
            title="إظهار الأوقات"
            desc="عرض توقيت كل فقرة بجانبها"
            checked={prog.showTimes}
            onToggle={() => setP({ showTimes: !prog.showTimes })}
          />

          {/* Time format */}
          <div>
            <Label>صيغة الوقت</Label>
            <div className="mt-2 flex h-[50px] gap-1 rounded-[12px] border border-[#d1d5db] p-1">
              {formats.map((f, i) => {
                const on = format === i;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(i)}
                    className={cn(
                      "flex flex-1 items-center justify-center rounded-[8px] border text-sm font-medium transition-colors",
                      on
                        ? "border-primary/30 bg-rose text-primary"
                        : "border-transparent text-ink-muted hover:text-ink",
                    )}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-2 sm:justify-start">
          <Button className="shadow-brand">حفظ الإعدادات</Button>
          <DialogClose asChild>
            <Button variant="secondary">إلغاء</Button>
          </DialogClose>
        </DialogFooter>
      </ModalShell>
    </Dialog>
  );
}
