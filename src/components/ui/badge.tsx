import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-background",
        soft: "bg-primary/10 text-primary",
        outline: "border border-border text-text-light bg-background",
      },
    },
    defaultVariants: { variant: "soft" },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
