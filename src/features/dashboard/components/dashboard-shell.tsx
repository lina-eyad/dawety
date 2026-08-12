"use client";

import Image from "next/image";
import {
  Bell,
  LayoutDashboard,
  LayoutTemplate,
  type LucideIcon,
  Mail,
  Menu,
  Plus,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { DASHBOARD_NAV, type DashboardNavItem } from "../content";

const ICONS: Record<DashboardNavItem["icon"], LucideIcon> = {
  overview: LayoutDashboard,
  invitations: Mail,
  rsvps: Users,
  templates: LayoutTemplate,
  settings: Settings,
};

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-1">
      {DASHBOARD_NAV.map((item) => {
        const Icon = ICONS[item.icon];
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-ink-muted hover:bg-rose/60 hover:text-primary",
            )}
          >
            <Icon className="size-5" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <Link
        href={ROUTES.home}
        className="flex items-center"
        aria-label="INVITERA"
        onClick={onNavigate}
      >
        <Image
          src="/images/logo.png"
          alt="INVITERA"
          width={199}
          height={58}
          className="h-8 w-auto"
        />
      </Link>

      <Button
        asChild
        size="lg"
        className="h-11 rounded-[8px] font-semibold shadow-brand"
      >
        <Link href={ROUTES.create} onClick={onNavigate}>
          <Plus className="size-4" aria-hidden />
          دعوة جديدة
        </Link>
      </Button>

      <NavLinks onNavigate={onNavigate} />

      <div className="flex items-center gap-3 rounded-2xl border border-warm-border bg-warm-bg/60 p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
          ل
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-ink">
            لينا العيد
          </span>
          <span className="block truncate text-xs text-ink-muted">
            الخطة المجانية
          </span>
        </span>
      </div>
    </div>
  );
}

/** Dashboard layout — RTL sidebar (right), top bar, and a mobile drawer. */
export function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warm-bg/40">
      {/* Desktop sidebar (right in RTL) */}
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-72 border-e border-warm-border bg-card lg:block">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 start-0 w-72 max-w-[80%] bg-card shadow-soft-lg">
            <button
              type="button"
              aria-label="إغلاق"
              onClick={() => setOpen(false)}
              className="absolute end-3 top-3 flex size-8 items-center justify-center rounded-full text-ink-muted hover:bg-rose"
            >
              <X className="size-5" aria-hidden />
            </button>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      {/* Main */}
      <div className="lg:ps-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-warm-border bg-card/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="القائمة"
              onClick={() => setOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg text-ink-muted hover:bg-rose lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
            <h1 className="text-lg font-bold text-ink">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="الإشعارات"
              className="relative flex size-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-rose hover:text-primary"
            >
              <Bell className="size-5" aria-hidden />
              <span className="absolute end-2 top-2 size-2 rounded-full bg-primary" />
            </button>
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              ل
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
