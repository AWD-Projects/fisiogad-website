import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-[background-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 [&_svg.arrow]:transition-transform [&_svg.arrow]:duration-300 group-hover:[&_svg.arrow]:translate-x-1",
  {
    variants: {
      variant: {
        default: "bg-primary text-background hover:bg-primary-dark",
        outline: "border border-primary bg-background text-primary hover:bg-accent",
        ghost: "text-text hover:bg-accent hover:text-primary",
        soft: "bg-primary/10 text-primary hover:bg-primary/15",
        onDark: "bg-background text-primary hover:bg-white",
        outlineOnDark: "border border-background/60 text-background hover:bg-background/10",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-8 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
