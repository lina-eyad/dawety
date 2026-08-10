"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@/i18n/navigation";

const CARD =
  "flex flex-col gap-4 rounded-2xl border border-warm-border bg-card p-6 shadow-soft";
const FIELD = "h-[50px] rounded-[12px] border-[#e5e7eb] bg-[#f9fafb] px-4";

function ToggleRow({
  title,
  desc,
  checked,
  onToggle,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e7eb] p-3.5">
      <span>
        <span className="block text-sm font-medium text-ink">{title}</span>
        <span className="text-xs text-ink-muted">{desc}</span>
      </span>
      <Switch checked={checked} onClick={onToggle} label={title} />
    </div>
  );
}

export function SettingsPanel() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [emailNotif, setEmailNotif] = useState(true);
  const [rsvpNotif, setRsvpNotif] = useState(true);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <section className={CARD}>
        <h3 className="font-bold text-ink">الملف الشخصي</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">الاسم</span>
            <Input
              defaultValue={user?.name ?? "لينا العيد"}
              className={FIELD}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">
              البريد الإلكتروني
            </span>
            <Input
              dir="ltr"
              defaultValue={user?.email ?? "lina@invitera.com"}
              className={FIELD}
            />
          </label>
        </div>
        <Button
          className="self-start rounded-[8px] font-semibold"
          onClick={() => toast.success("تم حفظ التغييرات")}
        >
          حفظ التغييرات
        </Button>
      </section>

      <section className={CARD}>
        <h3 className="font-bold text-ink">الإشعارات</h3>
        <ToggleRow
          title="إشعارات البريد الإلكتروني"
          desc="ملخّص دوري عن أداء دعواتك."
          checked={emailNotif}
          onToggle={() => setEmailNotif((v) => !v)}
        />
        <ToggleRow
          title="تنبيه عند رد جديد"
          desc="أعلمني فور تأكيد أحد الضيوف حضوره."
          checked={rsvpNotif}
          onToggle={() => setRsvpNotif((v) => !v)}
        />
      </section>

      <section className={CARD}>
        <h3 className="font-bold text-ink">الحساب</h3>
        <p className="text-sm text-ink-muted">
          تسجيل الخروج من حسابك على هذا الجهاز.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            logout();
            router.push(ROUTES.home);
          }}
          className="self-start rounded-[8px] border-destructive/40 font-semibold text-destructive hover:bg-destructive/10"
        >
          <LogOut className="size-4" aria-hidden />
          تسجيل الخروج
        </Button>
      </section>
    </div>
  );
}
