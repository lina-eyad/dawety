"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";

/**
 * Route-segment error boundary. Uses Next.js 16.2's `unstable_retry` to re-render
 * the segment's children (preferred over the older `reset`).
 */
export default function LocaleError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    // TODO: forward to an error reporting service.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <ErrorState
        title={t("title")}
        description={t("description")}
        actionLabel={t("retry")}
        onRetry={unstable_retry}
      />
    </div>
  );
}
