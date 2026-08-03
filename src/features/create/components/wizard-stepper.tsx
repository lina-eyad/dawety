import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { STAGES } from "../content";

/** Each stage maps to its page so the bar doubles as flow navigation. */
const STAGE_ROUTES = [
  ROUTES.create,
  ROUTES.preview,
  ROUTES.checkout,
  ROUTES.share,
];

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
            <Link
              href={STAGE_ROUTES[i]}
              aria-current={active ? "step" : undefined}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border text-sm font-bold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : done
                      ? "border-primary text-primary group-hover:bg-rose"
                      : "border-[#afb8c7] text-[#afb8c7] group-hover:border-primary/50 group-hover:text-primary/70",
                )}
              >
                {stage.num}
              </span>
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  active
                    ? "text-primary"
                    : done
                      ? "text-primary"
                      : "text-[#afb8c7] group-hover:text-primary/70",
                )}
              >
                {stage.label}
              </span>
            </Link>
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
