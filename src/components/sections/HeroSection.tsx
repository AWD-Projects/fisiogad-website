"use client"
import { ArrowRight } from "lucide-react"
import { BodyFigure } from "@/components/features/body-figure"
import { Magnetic } from "@/components/motion/magnetic"
import { Reveal, SplitHeading } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { SITE } from "@/lib/site"
import { track } from "@/lib/analytics"

export default function HeroSection() {
  return (
    <section id="hero" className="relative lg:min-h-[100svh]">
      <div className="container relative z-10 pointer-events-none lg:absolute lg:inset-0 lg:mx-auto">
        <div className="pointer-events-none flex h-full flex-col justify-center pb-16 pt-36 lg:w-[58%] lg:pb-14 lg:pt-32">
          <div className="pointer-events-auto">
            <SplitHeading as="h1" text="Fisioterapia profesional" onLoad delay={0.15} className="max-w-[10ch]" />
            <Reveal onLoad delay={0.7} className="mt-8 max-w-md">
              <p className="text-xl text-text-light">
                Para lesiones deportivas y dolor del día a día. Toca la zona que te duele y agenda en un minuto.
              </p>
            </Reveal>
            <Reveal onLoad delay={0.85} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic>
                <Button asChild size="lg">
                  <a href="#contact" onClick={() => track("cta_click", { source: "hero" })}>
                    Agendar una sesión
                    <ArrowRight className="arrow" />
                  </a>
                </Button>
              </Magnetic>
              <a href="#services" className="link-line text-lg text-text">
                Ver servicios
              </a>
            </Reveal>
          </div>

          <Reveal onLoad delay={1.1} className="pointer-events-auto mt-16 hidden border-t border-border pt-5 text-sm text-text-light lg:block lg:mt-auto">
            <p>
              {SITE.address.colony}, {SITE.address.city}
              <span className="mx-3 text-border">/</span>
              Lun a Vie 9:00 a 18:00
              <span className="mx-3 text-border">/</span>
              Sáb 9:00 a 14:00
            </p>
          </Reveal>
        </div>
      </div>
      {/* Panel de marca a sangre: solo escritorio; en móvil va debajo del titular */}
      <div className="relative z-0 bg-primary px-4 py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[38%] lg:pb-12 lg:pl-12 lg:pr-[max(1rem,calc((100vw-80rem)/2+1rem))] lg:pt-32 xl:pl-16">
        <div className="mx-auto h-[38rem] max-w-md lg:h-full lg:max-w-none">
          <BodyFigure />
        </div>
      </div>

    </section>
  )
}
