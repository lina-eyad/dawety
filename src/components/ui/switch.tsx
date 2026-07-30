"use client";

import { cn } from "@/lib/utils";

/** Pill switch — maroon/knob-left when on, gray/knob-right when off (RTL). */
export function Switch({
  checked,
  onClick,
  label,
  className,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative h-7 w-14 shrink-0 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-[#d1d5db]",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 size-6 -translate-y-1/2 rounded-full bg-white shadow-soft transition-all",
          checked ? "left-1" : "right-1",
        )}
      />
    </button>
  );
}
