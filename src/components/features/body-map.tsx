"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, MessageCircle, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HOTSPOTS, ZONES, type Side, type ZoneId } from "@/data/zones"
import { serviceLabel } from "@/data/services"
import { useBooking } from "@/lib/booking-context"
import { whatsappLink } from "@/lib/site"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

function Silhouette({ side }: { side: Side }) {
  const tone = "rgba(139,9,0,0.07)"
  const line = "rgba(139,9,0,0.28)"
  return (
    <svg viewBox="0 0 200 440" className="h-full w-full" aria-hidden focusable="false">
      {/* Extremidades */}
      <g fill="none" stroke={tone} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round">
        <path d="M54 96 L40 150 L32 222" />
        <path d="M146 96 L160 150 L168 222" />
        <path d="M82 214 L78 322 L76 408" strokeWidth="26" />
        <path d="M118 214 L122 322 L124 408" strokeWidth="26" />
      </g>
      {/* Torso, cuello y cabeza */}
      <path
        d="M62 84 Q100 72 138 84 L146 196 Q100 216 54 196 Z"
        fill={tone}
        stroke={line}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="91" y="56" width="18" height="24" rx="8" fill={tone} stroke={line} strokeWidth="1.5" />
      <circle cx="100" cy="36" r="22" fill={tone} stroke={line} strokeWidth="1.5" />
      {side === "back" ? (
        <path d="M100 82 L100 190" stroke={line} strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
      ) : (
        <path d="M100 118 m-16 0 q16 10 32 0" stroke={line} strokeWidth="1.5" fill="none" />
      )}
    </svg>
  )
}

export function BodyMap() {
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
          { key: `${h.zone}-l`, zone: h.zone, x: h.x, y: h.y },
          { key: `${h.zone}-r`, zone: h.zone, x: 200 - h.x, y: h.y },
        ]
      : [{ key: h.zone, zone: h.zone, x: h.x, y: h.y }]
  )

  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,12.5rem)_1fr] sm:items-center">
      <div className="relative mx-auto w-full max-w-[12.5rem]">
        <div className="relative aspect-[200/440] w-full">
          <Silhouette side={side} />
          {points.map((p) => {
            const active = zone === p.zone
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => pick(p.zone)}
                aria-pressed={active}
                aria-label={`${ZONES[p.zone].label}: ver qué tratamos`}
                title={ZONES[p.zone].label}
                className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ left: `${(p.x / 200) * 100}%`, top: `${(p.y / 440) * 100}%` }}
              >
                {!active && (
                  <span className="absolute h-4 w-4 rounded-full bg-primary/40 motion-safe:animate-pulseRing" aria-hidden />
                )}
                <span
                  className={cn(
                    "relative h-4 w-4 rounded-full border-2 border-background shadow transition-all duration-200 group-hover:scale-125",
                    active ? "scale-125 bg-primary ring-4 ring-primary/25" : "bg-primary/85"
                  )}
                />
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => setSide((s) => (s === "front" ? "back" : "front"))}
          className="mx-auto mt-3 flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
        >
          <RotateCw className="h-4 w-4" aria-hidden />
          {side === "front" ? "Ver espalda" : "Ver frente"}
        </button>
      </div>

      <div className="min-h-[15rem] rounded-xl bg-white p-5 shadow-sm ring-1 ring-border sm:p-6" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <h3 className="text-2xl font-bold text-text md:text-2xl">{selected.label}</h3>
              <p className="mt-1 text-text-light">Aquí tratamos con frecuencia:</p>
              <ul className="mt-3 space-y-1.5 text-text">
                {selected.treats.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-text-light">
                Servicio sugerido: <span className="font-medium text-text">{serviceLabel(selected.serviceValue)}</span>
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => goToBooking({ zone: selected.id, service: selected.serviceValue })}>
                  Agendar por {selected.label.toLowerCase()}
                  <ArrowRight />
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={whatsappLink(`Hola, me duele ${selected.label.toLowerCase()} y quisiera agendar una sesión.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { source: "body_map", zone: selected.id })}
                  >
                    <MessageCircle />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col justify-center">
              <h3 className="text-2xl font-bold text-text">Toca la zona que te duele</h3>
              <p className="mt-2 text-text-light">
                Te mostramos qué tratamos ahí y armamos tu cita con esa información.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
