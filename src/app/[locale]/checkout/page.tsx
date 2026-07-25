import { setRequestLocale } from "next-intl/server";

import { CheckoutCard } from "@/features/create/components/checkout-card";
import { WizardStepper } from "@/features/create/components/wizard-stepper";
import { MarketingNavbar } from "@/features/marketing";

/** Payment stage — pay once to unlock publishing & sharing (node 3:1801). */
export default async function CheckoutPage({
  params,
}: PageProps<"/[locale]/checkout">) {
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
          <WizardStepper current={2} />
        </div>

        <div className="mt-12">
          <CheckoutCard />
        </div>
      </main>
    </>
  );
}
