"use client"
import * as React from "react"
import { DayPicker } from "react-day-picker"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = false, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={es}
      weekStartsOn={1}
      showOutsideDays={showOutsideDays}
      className={cn("p-1", className)}
      classNames={{
        months: "relative",
        month: "space-y-3",
        month_caption: "flex h-10 items-center justify-center",
        caption_label: "text-base font-semibold capitalize text-text",
        nav: "absolute inset-x-0 top-0 flex h-10 items-center justify-between",
        button_previous:
          "inline-flex h-10 w-10 items-center justify-center rounded-md text-text hover:bg-accent hover:text-primary disabled:opacity-30",
        button_next:
          "inline-flex h-10 w-10 items-center justify-center rounded-md text-text hover:bg-accent hover:text-primary disabled:opacity-30",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-11 flex-1 pb-2 text-center text-sm font-medium capitalize text-muted-foreground",
        week: "mt-1 flex",
        day: "flex-1 p-0 text-center",
        day_button:
          "mx-auto flex h-11 w-11 items-center justify-center rounded-md text-base font-medium text-text transition-colors hover:bg-accent hover:text-primary disabled:cursor-not-allowed",
        selected: "[&>button]:bg-primary [&>button]:text-background [&>button:hover]:bg-primary-dark [&>button:hover]:text-background",
        today: "[&>button]:ring-1 [&>button]:ring-primary/50",
        disabled: "[&>button]:text-muted-foreground/40 [&>button]:hover:bg-transparent [&>button]:hover:text-muted-foreground/40",
        outside: "opacity-40",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
