"use client";

import "react-day-picker/style.css";

import { arSA } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type CalendarProps = ComponentProps<typeof DayPicker>;

/**
 * Date picker (react-day-picker) themed to the INVITERA brand via CSS-variable
 * overrides on `.dawety-rdp` (see globals.css). Arabic + RTL by default.
 */
export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={arSA}
      dir="rtl"
      showOutsideDays
      className={cn("dawety-rdp", className)}
      {...props}
    />
  );
}
