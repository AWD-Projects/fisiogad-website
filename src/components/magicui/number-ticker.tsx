"use client"
// Basado en Magic UI · Number Ticker. Anima un número al entrar en pantalla.
import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export function NumberTicker({
  value,
  className,
  suffix = "",
}: {
  value: number
  className?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 60, stiffness: 90 })
  const inView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Intl.NumberFormat("es-MX").format(Math.round(latest))}${suffix}`
        }
      }),
    [spring, suffix]
  )

  // El valor final queda en el HTML inicial para lectores de pantalla y SEO
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value}
      {suffix}
    </span>
  )
}
