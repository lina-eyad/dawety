import { cn } from "@/lib/utils";

import { STAGES } from "../content";

/** Outer 4-stage progress bar (التصميم → المعاينة → الدفع → المشاركة). */
export function WizardStepper({
  current = 0,
  className,
}: {
  current?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto flex w-full max-w-2xl items-center", className)}
    >
      {STAGES.map((stage, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <div
            key={stage.num}
            className="flex flex-1 items-center last:flex-none"
          >
            <div
              aria-current={active ? "step" : undefined}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border text-sm font-bold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : done
                      ? "border-primary text-primary"
                      : "border-[#afb8c7] text-[#afb8c7]",
                )}
              >
                {stage.num}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  active || done ? "text-primary" : "text-[#afb8c7]",
                )}
              >
                {stage.label}
              </span>
            </div>
            {i < STAGES.length - 1 ? (
              <span
                className={cn(
                  "mx-2 flex-1 border-t",
                  done ? "border-primary" : "border-dashed border-[#afb8c7]",
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
