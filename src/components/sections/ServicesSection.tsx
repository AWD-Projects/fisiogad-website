"use client"
import { useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring } from "framer-motion"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ArrowUpRight, Plus } from "lucide-react"
import { SERVICES } from "@/data/services"
import { SectionShell } from "./section-shell"
import { Reveal } from "@/components/motion/reveal"
import { useBooking } from "@/lib/booking-context"
import { track } from "@/lib/analytics"

/**
 * Índice de servicios. Al pasar el cursor aparece la foto del servicio siguiendo el puntero
 * (patrón "hover image" de Aceternity); al abrir una fila se ven los tratamientos.
 */
export default function ServicesSection() {
  const { goToBooking } = useBooking()
  const [hover, setHover] = useState<number | null>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.5 })

  return (
    <SectionShell
      id="services"
      title="Nuestros servicios"
      aside={
        <p className="text-text-light">
          Tratamientos integrales adaptados a lo que necesitas, con atención especializada en cada parte del cuerpo.
        </p>
      }
    >
      <Reveal>
        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="border-t border-border"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return
            x.set(e.clientX + 32)
            y.set(e.clientY - 150)
          }}
          onPointerLeave={() => setHover(null)}
        >
          {SERVICES.map((s, i) => (
            <AccordionPrimitive.Item key={s.id} value={s.id} className="border-b border-border">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
                >
                  <span className="font-display text-3xl font-semibold tracking-tight text-text transition-all duration-500 ease-out group-hover:translate-x-3 group-hover:text-primary md:text-[2.5rem] md:leading-none">
                    {s.title}
                  </span>
                  <Plus
                    aria-hidden
                    className="h-6 w-6 shrink-0 text-text transition-all duration-500 group-hover:text-primary group-data-[state=open]:rotate-45"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="grid gap-8 pb-10 md:grid-cols-2 md:gap-12">
                  <p className="max-w-md text-lg text-text-light">{s.description}</p>
                  <div>
                    <ul className="border-t border-border">
                      {s.treatments.map((t) => (
                        <li key={t} className="border-b border-border py-3 text-text">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        track("service_cta_click", { service: s.id })
                        goToBooking({ service: s.formValue })
                      }}
                      className="group/cta mt-6 inline-flex items-center gap-2 font-medium text-primary"
                    >
                      <span className="link-line">Agendar este servicio</span>
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </Reveal>

      {/* Foto que sigue al cursor (solo escritorio con mouse) */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        animate={{ opacity: hover === null ? 0 : 1, scale: hover === null ? 0.92 : 1 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-72 w-56 overflow-hidden md:block"
      >
        {SERVICES.map((s, i) => (
          <Image
            key={s.id}
            src={s.image}
            alt=""
            fill
            sizes="224px"
            className={`object-cover transition-opacity duration-300 ${hover === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </motion.div>
    </SectionShell>
  )
}
