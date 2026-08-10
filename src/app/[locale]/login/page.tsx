import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { ROUTES } from "@/constants/routes";
import { LoginForm } from "@/features/auth/login-form";
import { Link } from "@/i18n/navigation";

/** Sign-in — email one-time code or Google. */
export default async function LoginPage({
  params,
}: PageProps<"/[locale]/login">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-warm-bg/40 px-6 py-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,var(--rose)_0%,transparent_70%)]"
        aria-hidden
      />
      <Link href={ROUTES.home} className="relative" aria-label="INVITERA">
        <Image
          src="/images/logo.png"
          alt="INVITERA"
          width={199}
          height={58}
          className="h-10 w-auto"
          priority
        />
      </Link>

      <div className="relative w-full max-w-md">
        <LoginForm />
      </div>

      <Link
        href={ROUTES.home}
        className="relative text-sm font-medium text-ink-muted transition-colors hover:text-primary"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </main>
  );
}
