"use client";

import { tajawal } from "@/lib/fonts";
import "@/styles/globals.css";

/**
 * Catastrophic error boundary — fires only when the root layout itself throws,
 * so no locale/provider context is guaranteed. It must render its own <html>/
 * <body> and cannot use i18n; the copy is therefore a static bilingual fallback.
 */
export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <h1 className="text-xl font-bold">
            حدث خطأ ما · Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground">
            واجهنا مشكلة غير متوقعة. حاول مرة أخرى.
            <br />
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-soft transition-colors outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            حاول مرة أخرى · Try again
          </button>
        </div>
      </body>
    </html>
  );
}
