import { setRequestLocale } from "next-intl/server";

import { DashboardShell, RsvpsList } from "@/features/dashboard";

/** Guest responses across all invitations. */
export default async function DashboardRsvpsPage({
  params,
}: PageProps<"/[locale]/dashboard/rsvps">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DashboardShell title="الردود">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-ink">ردود الحضور</h2>
          <p className="mt-1 text-ink-muted">
            تابع من أكّد حضوره ومن اعتذر عبر جميع دعواتك.
          </p>
        </div>
        <RsvpsList />
      </div>
    </DashboardShell>
  );
}
