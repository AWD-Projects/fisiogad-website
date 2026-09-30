"use client"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { SERVICES } from "@/data/services"
import { SpotlightCard } from "@/components/aceternity/spotlight-card"
import { Marquee } from "@/components/magicui/marquee"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/lib/booking-context"
import { track } from "@/lib/analytics"

const MARQUEE_ITEMS = [
  "Rodilla del corredor",
  "Esguinces articulares",
  "Codo de tenista",
  "Pinzamientos de hombro",
  "Dolor de espalda y cuello",
  "Síndrome de cuello tecnológico",
  "Corrección postural",
  "Distensiones y desgarros",
  "Descarga muscular",
  "Rehabilitación de LCA",
]

export default function ServicesSection() {
  const { goToBooking } = useBooking()

  return (
    <section id="services" className="section-y">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-text">Nuestros servicios profesionales</h2>
          <p className="mt-5 text-lg text-text-light">
            Tratamientos integrales adaptados a lo que necesitas, con atención especializada en cada parte del cuerpo y
            articulación.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
          {SERVICES.map((s, i) => {
            const feature = i < 2
            return (
              <SpotlightCard key={s.id} className={s.span}>
                <article className="flex h-full flex-col">
                  <div className={feature ? "relative h-52 md:h-64" : "relative h-44"}>
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-text md:text-2xl">{s.title}</h3>
                    <p className="mt-2 text-text-light">{s.description}</p>
                    <ul className="mt-4 space-y-1.5 text-sm text-text">
                      {s.treatments.slice(0, feature ? 5 : 4).map((t) => (
                        <li key={t} className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-5 self-start px-0 text-primary hover:bg-transparent hover:underline"
                      onClick={() => {
                        track("service_cta_click", { service: s.id })
                        goToBooking({ service: s.formValue })
                      }}
                    >
                      Agendar este servicio
                      <ArrowRight />
                    </Button>
                  </div>
                </article>
              </SpotlightCard>
            )
          })}
        </div>
      </div>

      <div className="mt-16 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-label="Lesiones y molestias que tratamos">
        <Marquee>
          {MARQUEE_ITEMS.map((t) => (
            <span
              key={t}
              className="whitespace-nowrap rounded-full border border-border bg-white px-5 py-2.5 text-text"
            >
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
