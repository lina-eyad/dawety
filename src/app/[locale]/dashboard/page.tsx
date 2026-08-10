import { CalendarCheck, Eye, Mail, Users } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { ROUTES } from "@/constants/routes";
import {
  DashboardShell,
  INVITATIONS,
  InvitationCard,
  StatCard,
  dashboardStats,
} from "@/features/dashboard";
import { Link } from "@/i18n/navigation";

/** Dashboard overview — key metrics and the latest invitations. */
export default async function DashboardPage({
  params,
}: PageProps<"/[locale]/dashboard">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const stats = dashboardStats();
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <DashboardShell title="نظرة عامة">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold text-ink">أهلاً بك، لينا 👋</h2>
          <p className="mt-1 text-ink-muted">
            إليك ملخّصاً سريعاً عن دعواتك وردود ضيوفك.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            Icon={Mail}
            label="إجمالي الدعوات"
            value={fmt(stats.invitations)}
            hint={`${stats.published} منشورة`}
          />
          <StatCard Icon={Eye} label="المشاهدات" value={fmt(stats.views)} />
          <StatCard
            Icon={Users}
            label="إجمالي الردود"
            value={fmt(stats.rsvps)}
          />
          <StatCard
            Icon={CalendarCheck}
            label="الحضور المؤكد"
            value={fmt(stats.confirmed)}
          />
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ink">أحدث الدعوات</h3>
            <Link
              href="/dashboard/invitations"
              className="text-sm font-medium text-primary hover:underline"
            >
              عرض الكل
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {INVITATIONS.slice(0, 3).map((invite) => (
              <InvitationCard key={invite.id} invite={invite} />
            ))}
          </div>
        </section>

        <Link
          href={ROUTES.create}
          className="rounded-2xl border border-dashed border-primary/30 bg-rose/40 px-6 py-5 text-center text-sm font-medium text-primary transition-colors hover:bg-rose/70"
        >
          + صمّم دعوة جديدة
        </Link>
      </div>
    </DashboardShell>
  );
}
