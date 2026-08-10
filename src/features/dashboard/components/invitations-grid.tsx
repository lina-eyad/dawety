"use client";

import { FileText, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { INVITATIONS, type InviteStatus } from "../content";
import { InvitationCard } from "./dashboard-widgets";

const FILTERS: { key: "all" | InviteStatus; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "published", label: "المنشورة" },
  { key: "draft", label: "المسودات" },
];

export function InvitationsGrid() {
  const [filter, setFilter] = useState<"all" | InviteStatus>("all");
  const items = INVITATIONS.filter(
    (i) => filter === "all" || i.status === filter,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const on = filter === f.key;
          const count =
            f.key === "all"
              ? INVITATIONS.length
              : INVITATIONS.filter((i) => i.status === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                on
                  ? "bg-primary text-primary-foreground"
                  : "border border-warm-border bg-card text-ink-muted hover:border-primary/40 hover:text-primary",
              )}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      {items.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((invite) => (
            <InvitationCard key={invite.id} invite={invite} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-warm-border bg-card/50 px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-rose text-primary">
            <FileText className="size-6" aria-hidden />
          </span>
          <p className="text-lg font-bold text-ink">لا توجد دعوات هنا</p>
          <p className="max-w-sm text-sm text-ink-muted">
            ابدأ بتصميم دعوتك الأولى وستظهر هنا مباشرةً.
          </p>
          <Button asChild className="mt-2 rounded-[8px] font-semibold">
            <Link href={ROUTES.create}>
              <Plus className="size-4" aria-hidden />
              دعوة جديدة
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
