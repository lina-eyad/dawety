import { SITE } from "@/constants/site";

/**
 * App-wide footer shell. Minimal for the foundation phase.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}
      </div>
    </footer>
  );
}
