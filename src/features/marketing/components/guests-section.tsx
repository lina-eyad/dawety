import { Check, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { GUEST_BENEFITS, GUEST_LIST, GUEST_STATS } from "../content";

const TONE: Record<string, string> = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const TONE_BG: Record<string, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

/** "تابع ردود ضيوفك من مكان واحد" — content + guest-summary dashboard card. */
export function GuestsSection() {
  return (
    <section className="bg-background py-[50px]">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-2">
        {/* Summary dashboard card */}
        <div className="rounded-[30px] border border-primary/20 bg-card p-6 shadow-soft-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-ink">ملخص الضيوف</h3>
            <span className="flex size-9 items-center justify-center rounded-full bg-rose text-primary">
              <Users className="size-4" aria-hidden />
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {GUEST_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-2xl bg-warm-bg/70 p-4 text-center"
              >
                <span className={cn("text-2xl font-bold", TONE[stat.tone])}>
                  {stat.value}
                </span>
                <span className="text-xs text-ink-muted">{stat.label}</span>
              </div>
            ))}
          </div>

          <ul className="mt-5 flex flex-col gap-2.5">
            {GUEST_LIST.map((g) => (
              <li
                key={g.name}
                className="flex items-center justify-between rounded-[30px] border border-primary/20 px-4 py-3"
              >
                <span className="text-sm font-medium text-ink">{g.name}</span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    TONE_BG[g.tone],
                  )}
                >
                  {g.status}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-4 w-full text-center text-sm font-medium text-primary"
          >
            عرض جميع الضيوف
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-start">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose px-4 py-1.5 text-sm font-medium text-primary">
            إدارة الضيوف
          </span>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            تابع ردود ضيوفك من مكان واحد
          </h2>
          <p className="text-lg leading-relaxed text-ink-muted">
            اسمح لضيوفك بتأكيد حضورهم من رابط الدعوة، وتابع الردود بسهولة في
            مكان واحد ومنظم.
          </p>
          <ul className="flex flex-col gap-3">
            {GUEST_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <span className="font-medium text-ink">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
