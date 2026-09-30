"use client"
// Basado en Aceternity UI · Card Spotlight / Hover Effect. El brillo sigue al cursor
// usando el color de marca. En pantallas táctiles no aplica (queda la tarjeta estática).
import { useState } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [hovered, setHovered] = useState(false)

  const background = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(139,9,0,0.10), transparent 80%)`

  return (
    <div
      className={cn("group relative overflow-hidden rounded-xl border border-border bg-white", className)}
      onMouseMove={({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{ background, opacity: hovered ? 1 : 0 }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
