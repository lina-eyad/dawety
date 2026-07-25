import { setRequestLocale } from "next-intl/server";

import {
  CtaSection,
  FaqSection,
  FeaturesSection,
  GuestsSection,
  HeroSection,
  MarketingFooter,
  MarketingNavbar,
  PricingSection,
  StepsSection,
  TemplatesSection,
  TestimonialsSection,
} from "@/features/marketing";

/** INVITERA landing page — built to match the Figma design (node 2:2). */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MarketingNavbar />
      <main className="flex flex-col">
        <HeroSection />
        <StepsSection />
        <TemplatesSection />
        <FeaturesSection />
        <GuestsSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
        <FaqSection />
      </main>
      <MarketingFooter />
    </>
  );
}
