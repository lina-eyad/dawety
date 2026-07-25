import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Generic page-level loading placeholder. A neutral default for `loading.tsx`
 * route files; feature areas should compose their own skeletons that mirror
 * their real layout for the least perceived layout shift.
 */
export function PageSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-3xl space-y-6 px-6 py-16", className)}
      aria-busy
      aria-live="polite"
    >
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-5/6" />
      <div className="grid gap-4 pt-4 sm:grid-cols-2">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    </div>
  );
}
