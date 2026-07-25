import { Smartphone } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { PhonePreview } from "@/features/create/components/phone-preview";
import { WizardStepper } from "@/features/create/components/wizard-stepper";
import { MarketingNavbar } from "@/features/marketing";

/** Preview stage — review the invitation as guests will see it (node 3:1726). */
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
              راجع دعوتك كما ستظهر للضيوف قبل الدفع.
            </p>
          </div>
          <PhonePreview />
          <Button size="lg" className="shadow-brand">
            <Smartphone className="size-4" aria-hidden />
            فتح المعاينة الكاملة
          </Button>
          <p className="text-sm text-ink-muted">
            افتحها على هاتفك للتأكد من الشكل قبل المتابعة.
          </p>
        </div>
      </main>
    </>
  );
}
