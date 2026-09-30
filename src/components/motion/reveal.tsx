"use client"
// Estilo Magic UI · Blur Fade: entrada suave al llegar al viewport, una sola vez.
import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  onLoad = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  /** true: anima al cargar la página (elementos del hero) en vez de al hacer scroll. */
  onLoad?: boolean
}) {
  const reduce = useReducedMotion()
  const trigger = onLoad
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -8% 0px" } }
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Titular que sube palabra por palabra desde una máscara. */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  onLoad = false,
}: {
  text: string
  as?: "h1" | "h2" | "h3"
  className?: string
  delay?: number
  /** true: anima al cargar (hero). false: al entrar en pantalla. */
  onLoad?: boolean
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  // Se observa el contenedor (no las palabras): el navegador ignora lo recortado por la máscara.
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const show = onLoad || seen
  const words = text.split(" ")
  return (
    <Tag ref={ref} className={cn("text-text", className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? { y: "0%" } : { y: "112%" }}
            animate={show ? { y: "0%" } : undefined}
            transition={{ duration: 0.95, delay: delay + i * 0.07, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
