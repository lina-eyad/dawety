import { Skeleton } from "@/components/ui/skeleton";

/**
 * Full-page loading skeleton that mirrors the marketing layout (navbar + hero +
 * card row). Rendered by route `loading.tsx` files while a segment streams in.
 * Built entirely from the shadcn <Skeleton> primitive.
 */
export function PageLoading() {
  return (
    <div className="min-h-screen" aria-busy aria-live="polite">
      {/* Navbar */}
      <div className="border-b border-warm-border/70">
        <div className="mx-auto flex h-[100px] w-full max-w-[1200px] items-center justify-between px-6">
          <Skeleton className="h-9 w-32" />
          <div className="hidden items-center gap-6 lg:flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-10 w-28 rounded-[8px]" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row lg:justify-between">
        <Skeleton className="aspect-[4/3] w-full max-w-xl rounded-3xl lg:w-[52%]" />
        <div className="flex w-full max-w-xl flex-col items-center gap-5 lg:w-[44%] lg:items-start">
          <Skeleton className="h-8 w-52 rounded-full" />
          <Skeleton className="h-12 w-72" />
          <Skeleton className="h-12 w-60" />
          <Skeleton className="h-5 w-full max-w-md" />
          <Skeleton className="h-5 w-5/6 max-w-md" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-12 w-36 rounded-full" />
            <Skeleton className="h-12 w-36 rounded-full" />
          </div>
        </div>
      </div>

      {/* Card row */}
      <div className="mx-auto grid w-full max-w-[1200px] gap-6 px-6 pb-20 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-4 rounded-3xl border border-warm-border p-8"
          >
            <Skeleton className="size-14 rounded-2xl" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
