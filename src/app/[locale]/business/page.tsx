import { ArrowLeft, Building2 } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { MarketingFooter, MarketingNavbar } from "@/features/marketing";

/** Business mode — gate that points partners to the application flow. */
export default async function BusinessPage({
  params,
}: PageProps<"/[locale]/business">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const perks = [
    "إدارة عدة مناسبات وعملاء من مكان واحد",
    "أسعار خاصة على الكميات وباقات المنظّمين",
    "ظهورك ضمن دليل شركائنا الموثوقين",
    "دعم مخصّص ذو أولوية",
  ];

  return (
    <>
      <MarketingNavbar />
      <main className="relative flex min-h-[70vh] items-center overflow-hidden bg-background px-6 py-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,var(--rose)_0%,transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl border border-warm-border bg-card p-8 text-center shadow-soft-lg sm:p-10">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-rose text-primary">
            <Building2 className="size-8" aria-hidden />
          </span>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose px-4 py-1.5 text-sm font-medium text-primary">
              وضع الأعمال
            </span>
            <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
              مخصّص لشركاء الأعمال
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-ink-muted">
              هذه المنطقة للمنظّمين والمصمّمين ومزوّدي خدمات المناسبات. قدّم
              طلبك للانضمام كشريك وابدأ إدارة أعمالك عبر منصّتنا.
            </p>
          </div>

          <ul className="flex w-full flex-col gap-2.5 text-start">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5 text-sm">
                <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-ink">{perk}</span>
              </li>
            ))}
          </ul>

          <Button
            asChild
            size="lg"
            className="h-[50px] w-full rounded-[8px] font-semibold shadow-lg"
          >
            <Link href={ROUTES.partners}>
              انضم كشريك
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </Button>
          <Link
            href={ROUTES.partners}
            className="text-sm font-medium text-primary hover:underline"
          >
            تصفّح شركاءنا الحاليين
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
