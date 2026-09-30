"use client"
import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { SectionShell } from "./section-shell"

// Basado en el texto de los servicios ya publicados (evaluación, plan personalizado, seguimiento).
const STEPS = [
  {
    title: "Evaluamos tu caso",
    text: "Revisamos tu condición, historial y objetivos para entender el origen de la molestia.",
  },
  {
    title: "Diseñamos tu plan",
    text: "Armamos ejercicios y técnicas a la medida de tu cuerpo y de tu estilo de vida.",
  },
  {
    title: "Trabajamos contigo",
    text: "Sesiones con equipo profesional en el consultorio de Colonia Del Valle o en tu casa.",
  },
  {
    title: "Damos seguimiento",
    text: "Monitoreamos tu progreso, ajustamos el tratamiento y reforzamos la prevención para que la mejora se mantenga.",
  },
]

function Step({ index, title, text }: { index: number; title: string; text: string }) {
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "start 52%"] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.22, 1])
  const shift = useTransform(scrollYProgress, [0, 1], [24, 0])
  const dot = useTransform(scrollYProgress, [0.6, 1], [0, 1])

  return (
    <li ref={ref} className="relative pb-16 pl-12 last:pb-0 md:pl-20">
      <span aria-hidden className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-primary bg-background">
        <motion.span style={{ scale: dot }} className="block h-[9px] w-[9px] rounded-full bg-primary" />
      </span>
      <motion.div style={{ opacity, y: shift }}>
        <p className="font-display text-sm font-semibold text-primary">0{index + 1}</p>
        <h3 className="mt-2 !text-3xl text-text md:!text-4xl">{title}</h3>
        <p className="mt-4 max-w-md text-lg text-text-light">{text}</p>
      </motion.div>
    </li>
  )
}

export default function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] })
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <SectionShell
      id="process"
      title="Cómo trabajamos"
      className="bg-background-alt"
      aside={<p className="text-text-light">Un proceso claro, de la primera sesión al alta.</p>}
    >
      <ol ref={listRef} className="relative">
        <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-border" />
        <motion.span
          aria-hidden
          style={{ scaleY: line }}
          className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-primary"
        />
        {STEPS.map((s, i) => (
          <Step key={s.title} index={i} {...s} />
        ))}
      </ol>
    </SectionShell>
  )
}
