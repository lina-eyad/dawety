import { setRequestLocale } from "next-intl/server";

import { CreateWizard } from "@/features/create/components/create-wizard";
import { PhonePreview } from "@/features/create/components/phone-preview";
import { WizardStepper } from "@/features/create/components/wizard-stepper";
import { MarketingNavbar } from "@/features/marketing";

/** Invitation-creation wizard — Figma "ابدأ التصميم" flow (design stage). */
export default async function CreatePage({
  params,
}: PageProps<"/[locale]/create">) {
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

        <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row-reverse">
          <div className="flex w-full flex-col gap-8 lg:flex-1">
            <WizardStepper current={0} className="max-w-none px-2" />
            <CreateWizard />
          </div>
          <div className="mx-auto lg:mx-0">
            <PhonePreview />
          </div>
        </div>
      </main>
    </>
  );
}
