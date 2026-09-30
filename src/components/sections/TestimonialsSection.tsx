"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { SectionShell } from "./section-shell"
import { SITE } from "@/lib/site"

// Se conserva el texto original de cada paciente; solo se corrigió ortografía evidente.
const TESTIMONIALS = [
  {
    name: "Sofía Bañuelos",
    role: "Jugadora de tocho",
    content:
      "Llevo varias sesiones con el equipo de Fisio GAD tras mi ruptura de ligamento cruzado anterior y no puedo estar más agradecida con todo lo que he avanzado. Las terapias han sido clave en mi recuperación y en mi regreso al tocho. Además, las sesiones de descarga muscular me han ayudado muchísimo en las temporadas. 100% recomendados!! Muy atentos y con el equipo necesario.",
  },
  {
    name: "Elvia Escobar",
    role: "Ama de casa",
    content:
      "Fui a rehabilitación por un dolor en la muñeca y desde la primera sesión sentí mucha mejoría, lo recomiendo.",
  },
  {
    name: "Allberto Franco Pallas",
    role: "Cliente frecuente",
    content:
      "El lugar está súper bonito, la atención es muy buena ya que son profesionales, les gusta su trabajo, salgo contento después de mi terapia, ¡100% recomendados!",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

export default function TestimonialsSection() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const t = TESTIMONIALS[i]
  const n = TESTIMONIALS.length

  useEffect(() => {
    if (paused || reduce) return
    const id = setInterval(() => setI((v) => (v + 1) % n), 9000)
    return () => clearInterval(id)
  }, [paused, reduce, n])

  const go = (d: number) => setI((v) => (v + d + n) % n)

  return (
    <SectionShell
      id="testimonials"
      title="Lo que dicen nuestros pacientes"
      aside={
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-primary"
        >
          <span className="link-line">Ver reseñas en Google</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      }
    >
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="min-h-[20rem] sm:min-h-[22rem] md:min-h-[26rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <blockquote
                className={`font-display font-medium tracking-tight text-text ${
                  t.content.length > 220 ? "text-2xl leading-snug md:text-[2rem]" : "text-3xl leading-tight md:text-5xl"
                }`}
              >
                “{t.content}”
              </blockquote>
              <figcaption className="mt-10">
                <span className="block text-lg font-semibold text-text">{t.name}</span>
                <span className="text-text-light">{t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <p className="tabular-nums text-text-light" aria-hidden>
            {i + 1} / {n}
          </p>
          <div className="flex gap-3">
            {[
              { label: "Testimonio anterior", d: -1, Icon: ArrowLeft },
              { label: "Siguiente testimonio", d: 1, Icon: ArrowRight },
            ].map(({ label, d, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(d)}
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-text transition-all duration-300 hover:border-primary hover:bg-primary hover:text-background active:scale-95"
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
