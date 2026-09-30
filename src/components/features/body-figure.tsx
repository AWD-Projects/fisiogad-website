"use client"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HOTSPOTS, ZONES, type Side, type ZoneId } from "@/data/zones"
import { serviceLabel } from "@/data/services"
import { useBooking } from "@/lib/booking-context"
import { whatsappLink } from "@/lib/site"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

// Media figura; la otra mitad es su espejo. Coordenadas sobre un lienzo de 200 x 440.
const HALF =
  "M92 52 L92 64 C78 68 66 72 58 80 C48 90 42 112 38 140 C34 170 30 200 26 226 C25 234 24 238 28 240 C36 242 40 236 42 230 C48 208 54 180 60 150 C62 138 64 126 66 116 C66 150 68 186 72 214 C70 250 68 290 68 330 C68 366 68 396 64 422 C63 430 66 432 74 432 L88 432 C90 396 90 350 92 300 C93 270 96 246 100 228"

const EASE = [0.22, 1, 0.36, 1] as const

export function BodyFigure() {
  const reduce = useReducedMotion()
  const [side, setSide] = useState<Side>("front")
  const { zone, setZone, setService, goToBooking } = useBooking()
  const selected = zone ? ZONES[zone] : null

  function pick(id: ZoneId) {
    setZone(id)
    setService(ZONES[id].serviceValue)
    track("body_map_zone_selected", { zone: id })
  }

  const points = HOTSPOTS[side].flatMap((h) =>
    h.mirror
      ? [
          { key: `${h.zone}-l`, zone: h.zone, x: h.x, y: h.y, right: false },
          { key: `${h.zone}-r`, zone: h.zone, x: 200 - h.x, y: h.y, right: true },
        ]
      : [{ key: h.zone, zone: h.zone, x: h.x, y: h.y, right: false }]
  )

  const draw = (delay: number) => ({
    initial: reduce ? { pathLength: 1 } : { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 2.2, delay, ease: EASE },
  })

  return (
    <div className="flex h-full min-h-0 flex-col text-background">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="!text-[1.75rem] md:!text-[2rem] !leading-none text-background">¿Dónde te duele?</h2>
        <button
          type="button"
          onClick={() => setSide((s) => (s === "front" ? "back" : "front"))}
          className="link-line py-1 text-sm text-background/80 hover:text-background"
        >
          {side === "front" ? "Ver espalda" : "Ver frente"}
        </button>
      </div>

      <div className="relative my-6 flex min-h-0 flex-1 items-center justify-center">
        <div className="relative aspect-[200/440] h-full max-h-[34rem] min-h-[22rem]">
          <svg viewBox="0 0 200 440" className="absolute inset-0 h-full w-full" fill="none" aria-hidden focusable="false">
            <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
              <motion.circle cx="100" cy="32" r="20" {...draw(0)} />
              <motion.path d={HALF} {...draw(0.3)} />
              <motion.path d={HALF} transform="translate(200 0) scale(-1 1)" {...draw(0.3)} />
            </g>
            <AnimatePresence>
              {side === "back" && (
                <motion.path
                  key="spine"
                  d="M100 70 L100 222"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </svg>

          {points.map((p, i) => {
            const active = zone === p.zone
            return (
              <motion.button
                key={p.key}
                type="button"
                onClick={() => pick(p.zone)}
                aria-pressed={active}
                aria-label={`${ZONES[p.zone].label}: ver qué tratamos`}
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduce ? 0 : 1.9 + i * 0.06, duration: 0.5, ease: EASE }}
                className="group absolute flex h-11 w-11 items-center justify-center"
                style={{ left: `${(p.x / 200) * 100}%`, top: `${(p.y / 440) * 100}%`, x: "-50%", y: "-50%" }}
              >
                {!active && (
                  <span aria-hidden className="absolute h-3 w-3 rounded-full bg-background/50 motion-safe:animate-pulseRing" />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "relative block rounded-full border transition-all duration-300 ease-out",
                    active
                      ? "h-4 w-4 border-background bg-background"
                      : "h-2.5 w-2.5 border-background bg-primary group-hover:h-4 group-hover:w-4 group-hover:bg-background"
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 md:block",
                    p.right ? "left-full ml-1 translate-x-0 group-hover:translate-x-1" : "right-full mr-1 group-hover:-translate-x-1"
                  )}
                >
                  {ZONES[p.zone].label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="min-h-[9.5rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="font-display text-2xl font-semibold tracking-tight">{selected.label}</p>
              <p className="mt-1 max-w-sm text-background/80">
                {selected.treats.join(" · ")}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button variant="onDark" size="sm" onClick={() => goToBooking({ zone: selected.id, service: selected.serviceValue })}>
                  Agendar por {selected.label.toLowerCase()}
                  <ArrowRight className="arrow" />
                </Button>
                <a
                  href={whatsappLink(`Hola, me duele ${selected.label.toLowerCase()} y quisiera agendar una sesión.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { source: "body_map", zone: selected.id })}
                  className="link-line text-background/90"
                >
                  Escribir por WhatsApp
                </a>
              </div>
              <span className="sr-only">Servicio sugerido: {serviceLabel(selected.serviceValue)}</span>
            </motion.div>
          ) : (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xs text-background/80">
              Toca un punto del cuerpo. Te mostramos qué tratamos ahí y armamos tu cita con esa información.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
