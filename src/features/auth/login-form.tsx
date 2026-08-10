"use client";

import { ArrowLeft, Loader2, Mail, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Google "G" mark. */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

export function LoginForm() {
  const { requestEmailCode, verifyEmailCode, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [busy, setBusy] = useState(false);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const emailValid = EMAIL_RE.test(email);

  const done = () => {
    toast.success("تم تسجيل الدخول بنجاح");
    router.push(ROUTES.dashboard);
  };

  const sendCode = async () => {
    if (!emailValid || busy) return;
    setBusy(true);
    await requestEmailCode(email);
    setBusy(false);
    setStep("code");
    setCode(["", "", "", "", "", ""]);
    setTimeout(() => boxes.current[0]?.focus(), 40);
  };

  const verify = async (value: string) => {
    if (value.length < 6 || busy) return;
    setBusy(true);
    const ok = await verifyEmailCode(value);
    setBusy(false);
    if (ok) done();
    else {
      toast.error("رمز غير صحيح، تحقق وحاول مجدداً.");
      setCode(["", "", "", "", "", ""]);
      boxes.current[0]?.focus();
    }
  };

  const setBox = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 5) boxes.current[i + 1]?.focus();
    if (next.every((x) => x)) void verify(next.join(""));
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0)
      boxes.current[i - 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!t) return;
    e.preventDefault();
    const next = Array.from({ length: 6 }, (_, i) => t[i] ?? "");
    setCode(next);
    boxes.current[Math.min(t.length, 5)]?.focus();
    if (t.length === 6) void verify(t);
  };

  const google = async () => {
    if (busy) return;
    setBusy(true);
    await loginWithGoogle();
    setBusy(false);
    toast.success("تم تسجيل الدخول عبر Google");
    router.push(ROUTES.dashboard);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-warm-border bg-card p-8 shadow-soft-lg">
      {step === "email" ? (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-ink">تسجيل الدخول</h1>
            <p className="mt-1.5 text-sm text-ink-muted">
              أدخل بريدك وسنرسل لك رمز دخول لمرة واحدة.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">
                البريد الإلكتروني
              </span>
              <div className="relative" dir="ltr">
                <Mail
                  className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden
                />
                <Input
                  type="email"
                  dir="ltr"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendCode()}
                  placeholder="name@example.com"
                  className="h-[50px] rounded-[12px] pe-11 text-start"
                />
              </div>
            </label>

            <Button
              size="lg"
              onClick={sendCode}
              disabled={!emailValid || busy}
              className="h-[50px] rounded-[12px] font-semibold shadow-brand"
            >
              {busy ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : null}
              إرسال رمز الدخول
              <ArrowLeft className="size-4" aria-hidden />
            </Button>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-ink-muted">
            <span className="h-px flex-1 bg-warm-border" />
            أو
            <span className="h-px flex-1 bg-warm-border" />
          </div>

          <Button
            size="lg"
            variant="outline"
            onClick={google}
            disabled={busy}
            className="h-[50px] w-full rounded-[12px] font-semibold"
          >
            <GoogleIcon className="size-5" />
            المتابعة عبر Google
          </Button>
        </>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-ink">أدخل رمز الدخول</h1>
            <p className="mt-1.5 text-sm text-ink-muted">
              أرسلنا رمزاً من 6 أرقام إلى
            </p>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              dir="ltr"
            >
              {email}
              <Pencil className="size-3.5" aria-hidden />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2" dir="ltr">
            {code.map((c, i) => (
              <input
                key={i}
                ref={(el) => {
                  boxes.current[i] = el;
                }}
                value={c}
                onChange={(e) => setBox(i, e.target.value)}
                onKeyDown={(e) => onKey(i, e)}
                onPaste={onPaste}
                inputMode="numeric"
                maxLength={1}
                aria-label={`الرقم ${i + 1}`}
                className={cn(
                  "size-12 rounded-[12px] border border-[#d1d5db] bg-[#f9fafb] text-center text-lg font-bold text-ink transition-colors outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                )}
              />
            ))}
          </div>

          <Button
            size="lg"
            onClick={() => verify(code.join(""))}
            disabled={code.some((x) => !x) || busy}
            className="mt-6 h-[50px] w-full rounded-[12px] font-semibold shadow-brand"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : null}
            تسجيل الدخول
          </Button>

          <button
            type="button"
            onClick={sendCode}
            disabled={busy}
            className="mt-4 w-full text-center text-sm font-medium text-primary hover:underline"
          >
            إعادة إرسال الرمز
          </button>
        </>
      )}

      <p className="mt-6 text-center text-xs leading-relaxed text-ink-muted">
        بمتابعتك فإنك توافق على شروط الاستخدام وسياسة الخصوصية.
      </p>
    </div>
  );
}
