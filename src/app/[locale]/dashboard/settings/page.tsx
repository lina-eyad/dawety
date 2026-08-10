import { setRequestLocale } from "next-intl/server";

import { DashboardShell } from "@/features/dashboard";
import { SettingsPanel } from "@/features/dashboard/components/settings-panel";

/** Account and notification settings. */
export default async function DashboardSettingsPage({
  params,
}: PageProps<"/[locale]/dashboard/settings">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DashboardShell title="الإعدادات">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-ink">الإعدادات</h2>
          <p className="mt-1 text-ink-muted">
            أدر ملفك الشخصي وتفضيلات الإشعارات وحسابك.
          </p>
        </div>
        <SettingsPanel />
      </div>
    </DashboardShell>
  );
}
