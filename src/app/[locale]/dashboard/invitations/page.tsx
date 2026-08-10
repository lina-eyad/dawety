import { Plus } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { DashboardShell, InvitationsGrid } from "@/features/dashboard";
import { Link } from "@/i18n/navigation";

/** All of the user's invitations, filterable by status. */
export default async function DashboardInvitationsPage({
  params,
}: PageProps<"/[locale]/dashboard/invitations">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <DashboardShell title="دعواتي">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-ink">دعواتي</h2>
            <p className="mt-1 text-ink-muted">
              أنشئ، عدّل، وتابع كل دعواتك من مكان واحد.
            </p>
          </div>
          <Button asChild className="rounded-[8px] font-semibold shadow-brand">
            <Link href={ROUTES.create}>
              <Plus className="size-4" aria-hidden />
              دعوة جديدة
            </Link>
          </Button>
        </div>
        <InvitationsGrid />
      </div>
    </DashboardShell>
  );
}
