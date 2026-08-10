"use client";

import { LayoutDashboard, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";
import { Link, useRouter } from "@/i18n/navigation";

/** Navbar auth slot: a login link when signed out, a user menu when signed in. */
export function NavAuth() {
  const { status, user, logout } = useAuth();
  const router = useRouter();

  if (status !== "authenticated" || !user) {
    return (
      <Link
        href={ROUTES.login}
        className="hidden text-[15px] font-medium text-ink transition-colors hover:text-primary sm:block"
      >
        تسجيل الدخول
      </Link>
    );
  }

  const initial = user.name.trim().charAt(0) || "م";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="حسابي"
          className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
        >
          {initial}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-bold text-ink">{user.name}</p>
          <p className="truncate text-xs text-ink-muted" dir="ltr">
            {user.email}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROUTES.dashboard}>
            <LayoutDashboard className="size-4" aria-hidden />
            لوحة التحكم
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            logout();
            router.push(ROUTES.home);
          }}
        >
          <LogOut className="size-4" aria-hidden />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
