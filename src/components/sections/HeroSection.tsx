"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BodyMap } from "@/components/features/body-map"
import { NumberTicker } from "@/components/magicui/number-ticker"

const STATS = [
  { value: 5, suffix: "+", label: "Años de experiencia" },
  { value: 100, suffix: "+", label: "Pacientes satisfechos" },
  { value: 15, suffix: "+", label: "Tipos de tratamientos" },
  { value: 30, suffix: "", label: "Certificaciones" },
]

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background-alt pb-16 pt-32 md:pb-24 md:pt-40">
      <div aria-hidden className="bg-grid-brand pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl text-text md:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">Fisioterapia profesional para lesiones deportivas y dolor diario</h1>
            <p className="mt-6 max-w-lg text-lg text-text-light md:text-xl">
              Tratamientos personalizados con equipo profesional y cuidado continuo. Dinos dónde te duele y agenda en
              un minuto.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contact">Agendar una sesión</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#services">
                  Explorar servicios
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl bg-background/80 p-4 shadow-lg ring-1 ring-border backdrop-blur sm:p-6"
          >
            <h2 className="mb-5 text-2xl font-bold text-text md:text-3xl">¿Dónde te duele?</h2>
            <BodyMap />
          </motion.div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 md:mt-20 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-4xl font-bold text-primary md:text-5xl font-display">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </dd>
              <p aria-hidden className="mt-1 text-text-light">
                {s.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
