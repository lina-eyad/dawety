"use client";

import Image from "next/image";
import { Eye, Search, SearchX, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { TEMPLATE_CATEGORIES, TEMPLATE_ITEMS } from "../content";

/**
 * Browsable template catalogue: search box + category chips filter a responsive
 * card grid. Each card reveals "معاينة"/"استخدم القالب" actions on hover, with a
 * graceful empty state when nothing matches.
 */
export function TemplatesGallery() {
  const [active, setActive] = useState<string>("الكل");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim();
    return TEMPLATE_ITEMS.filter((t) => {
      const byCategory = active === "الكل" || t.category === active;
      const bySearch =
        q === "" || t.title.includes(q) || t.category.includes(q);
      return byCategory && bySearch;
    });
  }, [active, query]);

  return (
    <div>
      {/* Search */}
      <div className="relative mx-auto w-full max-w-md">
        <Search
          className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
          aria-hidden
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن قالب…"
          aria-label="ابحث عن قالب"
          className="h-12 w-full rounded-full border border-warm-border bg-background ps-4 pe-11 text-sm transition-colors outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/10"
        />
      </div>

      {/* Category chips */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
        {TEMPLATE_CATEGORIES.map((cat) => {
          const on = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                on
                  ? "bg-primary text-primary-foreground"
                  : "border border-warm-border bg-background text-ink-muted hover:border-primary/40 hover:text-primary",
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="mt-8 text-center text-sm text-ink-muted">
        {results.length > 0
          ? `عرض ${results.length} قالب`
          : "لا توجد نتائج مطابقة"}
      </p>

      {/* Grid / empty state */}
      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((t) => (
            <article
              key={t.title}
              className="group overflow-hidden rounded-[24px] border border-primary/15 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-warm-bg">
                <Image
                  src={t.img}
                  alt={t.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {t.featured ? (
                  <span className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/95 px-3 py-1 text-xs font-medium text-primary-foreground shadow-soft">
                    <Sparkles className="size-3" aria-hidden />
                    مميز
                  </span>
                ) : null}

                {/* Hover actions */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/45 p-4 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                  <Button
                    asChild
                    className="h-11 w-full max-w-[180px] rounded-[8px] bg-background font-semibold text-primary shadow-lg hover:bg-background/90"
                  >
                    <Link href={ROUTES.create}>استخدم القالب</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 w-full max-w-[180px] rounded-[8px] border-white/70 bg-transparent font-medium text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={ROUTES.preview}>
                      <Eye className="size-4" aria-hidden />
                      معاينة
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-4">
                <h3 className="font-bold text-ink">{t.title}</h3>
                <span className="rounded-full bg-rose px-3 py-1 text-xs font-medium text-primary">
                  {t.category}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-[24px] border border-dashed border-warm-border bg-warm-bg/50 px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-rose text-primary">
            <SearchX className="size-6" aria-hidden />
          </span>
          <p className="text-lg font-bold text-ink">لا يوجد قالب مطابق</p>
          <p className="max-w-sm text-sm text-ink-muted">
            جرّب تصنيفاً آخر أو كلمة بحث مختلفة، أو ابدأ تصميم دعوتك من الصفر.
          </p>
          <Button
            className="mt-2 h-[46px] rounded-[8px] font-semibold"
            onClick={() => {
              setActive("الكل");
              setQuery("");
            }}
          >
            عرض كل القوالب
          </Button>
        </div>
      )}
    </div>
  );
}
