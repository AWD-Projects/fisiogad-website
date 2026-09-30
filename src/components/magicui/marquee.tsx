// Basado en Magic UI · Marquee. Carrusel continuo que se detiene al pasar el cursor.
import { cn } from "@/lib/utils"

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  repeat = 3,
}: {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
}) {
  return (
    <div
      className={cn("group flex overflow-hidden [--duration:45s] [--gap:1rem] [gap:var(--gap)]", className)}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee motion-reduce:animate-none",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
