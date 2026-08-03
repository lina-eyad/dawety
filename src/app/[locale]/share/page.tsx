import { setRequestLocale } from "next-intl/server";

import { ShareCard } from "@/features/create/components/share-card";
import { WizardStepper } from "@/features/create/components/wizard-stepper";
import { MarketingNavbar } from "@/features/marketing";

/** Sharing stage — the published invitation is ready to send to guests. */
export default async function SharePage({
  params,
}: PageProps<"/[locale]/share">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MarketingNavbar />
      <main className="mx-auto w-full max-w-[1000px] px-6 py-12">
        <header className="text-center lg:text-start">
          <h1 className="text-3xl font-bold text-ink">صمّم دعوتك</h1>
          <p className="mt-1 text-ink-muted">
            عدّل التفاصيل وشاهد دعوتك تتغير مباشرة
          </p>
        </header>

        <div className="mt-8">
          <WizardStepper current={3} />
        </div>

        <div className="mt-12">
          <ShareCard />
        </div>
      </main>
    </>
  );
}
