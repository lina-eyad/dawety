"use client";

import Image from "next/image";
import {
  Eye,
  MoreVertical,
  Pencil,
  Share2,
  Trash2,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import type { InviteStatus, Invitation } from "../content";

/** Compact metric tile for the dashboard overview. */
export function StatCard({
  Icon,
  label,
  value,
  hint,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-warm-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-muted">{label}</span>
        <span className="flex size-9 items-center justify-center rounded-xl bg-rose text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
      </div>
      <span className="text-2xl font-bold text-ink" dir="ltr">
        {value}
      </span>
      {hint ? <span className="text-xs text-ink-muted">{hint}</span> : null}
    </div>
  );
}

export function StatusBadge({ status }: { status: InviteStatus }) {
  const published = status === "published";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        published ? "bg-green-50 text-green-700" : "bg-warm-bg text-ink-muted",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          published ? "bg-green-600" : "bg-ink-muted",
        )}
      />
      {published ? "منشورة" : "مسودة"}
    </span>
  );
}

/** Invitation card with cover, status, quick stats and actions. */
export function InvitationCard({ invite }: { invite: Invitation }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-warm-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-warm-bg">
        <Image
          src={invite.img}
          alt=""
          fill
          sizes="(max-width:1024px) 100vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute end-3 top-3">
          <StatusBadge status={invite.status} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-ink">{invite.title}</h3>
            <p className="text-xs text-ink-muted">
              {invite.type} · {invite.date}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="خيارات"
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-rose hover:text-primary"
              >
                <MoreVertical className="size-4" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={ROUTES.preview}>
                  <Eye className="size-4" aria-hidden />
                  معاينة
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.share}>
                  <Share2 className="size-4" aria-hidden />
                  مشاركة
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4" aria-hidden />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Eye className="size-3.5" aria-hidden />
            {invite.views.toLocaleString("en-US")} مشاهدة
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-3.5" aria-hidden />
            {invite.rsvps.toLocaleString("en-US")} رد
          </span>
        </div>

        <div className="mt-auto flex gap-2 pt-1">
          <Button asChild size="sm" className="flex-1 rounded-lg">
            <Link href={ROUTES.create}>
              <Pencil className="size-3.5" aria-hidden />
              تعديل
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 rounded-lg border-primary text-primary"
          >
            <Link href={ROUTES.preview}>معاينة</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
