import type { ReactNode } from "react";

/** Device frame that holds the live invitation preview beside the wizard. */
export function PhonePreview({ children }: { children?: ReactNode }) {
  return (
    <div className="mx-auto w-[300px] shrink-0">
      <div className="relative aspect-[300/620] rounded-[44px] border-[10px] border-ink/90 bg-ink shadow-soft-lg">
        {/* notch */}
        <div className="absolute start-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <div className="size-full overflow-hidden rounded-[34px] bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}
