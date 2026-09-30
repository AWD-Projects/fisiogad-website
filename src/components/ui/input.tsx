import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-none border-0 border-b border-input bg-transparent px-0 text-lg text-text placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] focus-visible:shadow-[0_1px_0_0_hsl(var(--ring))] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[96px] w-full resize-none rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-lg text-text placeholder:text-muted-foreground/60 transition-[border-color,box-shadow] focus-visible:shadow-[0_1px_0_0_hsl(var(--ring))] focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"

export { Input, Textarea }
