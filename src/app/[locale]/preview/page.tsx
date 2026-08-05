import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { InvitationCanvas } from "@/features/create/components/invitation/invitation-canvas";
import { WizardStepper } from "@/features/create/components/wizard-stepper";
import { MarketingNavbar } from "@/features/marketing";

/** Preview stage — the invitation exactly as a guest will see it. */
export default async function PreviewPage({
  params,
}: PageProps<"/[locale]/preview">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MarketingNavbar />
      <main className="mx-auto w-full max-w-[1200px] px-6 py-12">
        <header className="text-center lg:text-start">
          <h1 className="text-3xl font-bold text-ink">صمّم دعوتك</h1>
          <p className="mt-1 text-ink-muted">
            عدّل التفاصيل وشاهد دعوتك تتغير مباشرة
          </p>
        </header>

        <div className="mt-8">
          <WizardStepper current={1} />
        </div>

        <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-6 text-center">
          <div>
            <h2 className="text-2xl font-bold text-ink">معاينة الدعوة</h2>
            <p className="mt-1 text-ink-muted">
              هذه دعوتك كما ستظهر تماماً لضيوفك بعد النشر.
            </p>
          </div>

          {/* Guest experience inside a device frame (same on every screen). */}
          <div className="w-full max-w-[380px]">
            <div className="relative aspect-[380/760] overflow-hidden rounded-[40px] border-[10px] border-ink/90 bg-background shadow-soft-lg">
              <span className="absolute top-0 left-1/2 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink" />
              <div className="size-full overflow-hidden rounded-[30px]">
                <InvitationCanvas animated />
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="h-[50px] w-full max-w-xs rounded-[8px] shadow-brand"
            asChild
          >
            <Link href={ROUTES.checkout}>
              المتابعة للدفع
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </Button>
          <p className="text-sm text-ink-muted">
            راجع التفاصيل جيداً، ويمكنك العودة للتعديل في أي وقت.
          </p>
        </div>
      </main>
    </>
  );
}
