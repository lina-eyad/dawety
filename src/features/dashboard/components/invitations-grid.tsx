"use client";

import Image from "next/image";
import {
  Eye,
  FileText,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { INVITATIONS, type InviteStatus, type PaymentStatus } from "../content";
import { InvitationCard, PaymentBadge, StatusBadge } from "./dashboard-widgets";

type StatusFilter = "all" | InviteStatus;
type PayFilter = "all" | PaymentStatus;

const STATUS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "published", label: "المنشورة" },
  { key: "draft", label: "المسودات" },
];
const PAY: { key: PayFilter; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "paid", label: "مدفوعة" },
  { key: "unpaid", label: "غير مدفوعة" },
];

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
        on
          ? "bg-primary text-primary-foreground"
          : "border border-warm-border bg-card text-ink-muted hover:border-primary/40 hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

export function InvitationsGrid() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [pay, setPay] = useState<PayFilter>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");

  const items = useMemo(() => {
    const q = query.trim();
    return INVITATIONS.filter(
      (i) =>
        (status === "all" || i.status === status) &&
        (pay === "all" || i.payment === pay) &&
        (q === "" || i.title.includes(q) || i.type.includes(q)),
    );
  }, [status, pay, query]);

  return (
    <div className="flex flex-col gap-5">
      {/* Search + view toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في الدعوات…"
            aria-label="ابحث في الدعوات"
            className="h-11 w-full rounded-xl border border-warm-border bg-card ps-4 pe-10 text-sm transition-colors outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/10"
          />
        </div>
        <div className="flex rounded-lg border border-warm-border bg-card p-0.5">
          {(
            [
              { key: "grid", Icon: LayoutGrid, label: "بطاقات" },
              { key: "table", Icon: List, label: "جدول" },
            ] as const
          ).map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setView(v.key)}
              aria-label={v.label}
              aria-pressed={view === v.key}
              className={cn(
                "flex size-8 items-center justify-center rounded-md transition-colors",
                view === v.key
                  ? "bg-primary text-primary-foreground"
                  : "text-ink-muted hover:text-primary",
              )}
            >
              <v.Icon className="size-4" aria-hidden />
            </button>
          ))}
        </div>
      </div>

      {/* Filters: status + payment */}
      <div className="flex flex-wrap items-center gap-2">
        {STATUS.map((f) => (
          <Chip
            key={f.key}
            on={status === f.key}
            onClick={() => setStatus(f.key)}
          >
            {f.label}
          </Chip>
        ))}
        <span className="mx-1 h-5 w-px bg-warm-border" aria-hidden />
        <span className="text-xs text-ink-muted">الدفع:</span>
        {PAY.map((f) => (
          <Chip key={f.key} on={pay === f.key} onClick={() => setPay(f.key)}>
            {f.label}
          </Chip>
        ))}
      </div>

      {/* Results */}
      {items.length === 0 ? (
        <EmptyState />
      ) : view === "grid" ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((invite) => (
            <InvitationCard key={invite.id} invite={invite} />
          ))}
        </div>
      ) : (
        <InvitationsTable />
      )}
    </div>
  );

  function InvitationsTable() {
    const action =
      "flex size-8 items-center justify-center rounded-[8px] text-ink-muted transition-colors";
    return (
      <div className="overflow-x-auto rounded-2xl border border-warm-border bg-card">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-warm-bg/60 text-ink-muted">
            <tr>
              {[
                "الدعوة",
                "تاريخ الحدث",
                "الحالة",
                "الدفع",
                "الردود",
                "المشاهدات",
                "إجراءات",
              ].map((h) => (
                <th
                  key={h}
                  className="p-4 text-center font-medium first:text-start"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-t border-warm-border">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-warm-bg">
                      <Image
                        src={i.img}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-bold text-ink">
                        {i.title}
                      </div>
                      <div className="text-xs text-ink-muted">{i.type}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-center text-ink-muted">{i.date}</td>
                <td className="p-3 text-center">
                  <StatusBadge status={i.status} />
                </td>
                <td className="p-3 text-center">
                  <PaymentBadge payment={i.payment} />
                </td>
                <td className="p-3 text-center" dir="ltr">
                  {i.rsvps.toLocaleString("en-US")}
                </td>
                <td className="p-3 text-center" dir="ltr">
                  {i.views.toLocaleString("en-US")}
                </td>
                <td className="p-3">
                  <div className="flex justify-center gap-1">
                    <Link
                      href={ROUTES.create}
                      aria-label="تعديل"
                      className={cn(action, "hover:bg-rose hover:text-primary")}
                    >
                      <Pencil className="size-4" aria-hidden />
                    </Link>
                    <Link
                      href={ROUTES.preview}
                      aria-label="معاينة"
                      className={cn(action, "hover:bg-rose hover:text-primary")}
                    >
                      <Eye className="size-4" aria-hidden />
                    </Link>
                    <button
                      type="button"
                      aria-label="حذف"
                      className={cn(
                        action,
                        "hover:bg-destructive/10 hover:text-destructive",
                      )}
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-warm-border bg-card/50 px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-rose text-primary">
        <FileText className="size-6" aria-hidden />
      </span>
      <p className="text-lg font-bold text-ink">لا توجد دعوات مطابقة</p>
      <p className="max-w-sm text-sm text-ink-muted">
        جرّب تغيير الفلاتر أو كلمة البحث، أو ابدأ بتصميم دعوة جديدة.
      </p>
      <Button asChild className="mt-2 rounded-[8px] font-semibold">
        <Link href={ROUTES.create}>
          <Plus className="size-4" aria-hidden />
          دعوة جديدة
        </Link>
      </Button>
    </div>
  );
}
