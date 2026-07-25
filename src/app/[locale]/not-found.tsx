import { FileQuestion } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex flex-1 items-center justify-center">
      <EmptyState
        icon={<FileQuestion className="size-6" aria-hidden />}
        title={t("title")}
        description={t("description")}
        action={
          <Button asChild>
            <Link href={ROUTES.home}>{t("backHome")}</Link>
          </Button>
        }
      />
    </div>
  );
}
