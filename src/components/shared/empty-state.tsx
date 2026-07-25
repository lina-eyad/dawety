import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /** Optional leading icon (e.g. a Lucide icon element). */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Optional action slot, e.g. a primary Button or a Link. */
  action?: ReactNode;
  className?: string;
}

/**
 * Presentational empty/zero state — no data or i18n coupling. Used for empty
 * lists, no-results screens, and (styled by callers) 404 pages.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </span>
      ) : null}
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
