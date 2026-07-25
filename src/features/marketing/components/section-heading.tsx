import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small rose pill above the title. */
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}

/**
 * Shared section header used across the landing page: a rose "eyebrow" pill,
 * a large centered title, and an optional muted description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-2xl flex-col items-center gap-4 text-center",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose px-4 py-1.5 text-sm font-medium text-primary">
        <Sparkles className="size-3.5" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold text-balance text-ink sm:text-[30px]">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-relaxed text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}
