import { CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title: string;
  description?: string;
  /** Retry affordance. Both `actionLabel` and `onRetry` are required to show it. */
  actionLabel?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Presentational error state. Intentionally free of i18n/data coupling so it can
 * be reused everywhere — including `global-error`, where no provider is mounted.
 */
export function ErrorState({
  title,
  description,
  actionLabel,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <CircleAlert className="size-6" aria-hidden />
      </span>
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actionLabel && onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
