"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import photo from "@/assets/services/follow.jpg"
import { SectionShell } from "./section-shell"
import { Reveal } from "@/components/motion/reveal"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { SITE } from "@/lib/site"

const FEATURES = [
  {
    title: "Equipo profesional",
    text: "Llevamos equipos de fisioterapia de nivel hospitalario directamente a tu puerta para los tratamientos más efectivos.",
  },
  {
    title: "Terapeutas certificados",
    text: "Profesionales licenciados con amplia formación y años de experiencia práctica.",
  },
  {
    title: "Horarios flexibles",
    text: "Programa citas en horarios que funcionen para ti, incluyendo tardes y fines de semana.",
  },
  {
    title: "Enfoque personalizado",
    text: "Cada plan está adaptado a tus necesidades específicas, condición y objetivos de recuperación.",
  },
]

const NUMBERS = [
  { value: 5, suffix: "+", label: "años de experiencia" },
  { value: 100, suffix: "+", label: "pacientes satisfechos" },
  { value: 30, suffix: "", label: "certificaciones" },
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"])
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(12% 12% 12% 12%)", "inset(0% 0% 0% 0%)"])

  return (
    <SectionShell id="about" title="Sobre Fisiogad">
      <Reveal>
        <p className="font-display text-2xl font-medium leading-snug tracking-tight text-text md:text-[2rem]">
          En {SITE.legalName}, ubicada en Colonia del Valle, mejoramos tu salud y calidad de vida con tratamientos
          personalizados de fisioterapia y rehabilitación física.
        </p>
        <p className="mt-6 max-w-xl text-lg text-text-light">
          Atendemos lesiones deportivas, problemas de columna y procesos posoperatorios. Nuestro equipo te acompaña en
          cada paso de tu recuperación con atención cercana y enfocada en tus necesidades.
        </p>
      </Reveal>

      <div ref={ref} className="mt-16">
        <motion.div style={{ clipPath: clip }} className="relative aspect-[16/10] overflow-hidden bg-muted">
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[12%] inset-x-0">
            <Image
              src={photo}
              alt="Vendaje neuromuscular en rodilla durante una sesión de fisioterapia"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              placeholder="blur"
              className="object-cover object-center grayscale contrast-125"
            />
          </motion.div>
          {/* Tinte de marca sobre la foto para unificar cualquier imagen */}
          <div aria-hidden className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        </motion.div>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex items-center gap-2 text-text-light hover:text-primary"
        >
          <span className="link-line">
            {SITE.address.street}, {SITE.address.colony}
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <dl className="mt-20 border-t border-border">
        {FEATURES.map((f) => (
          <Reveal key={f.title} y={16}>
            <div className="grid gap-2 border-b border-border py-6 md:grid-cols-[1fr_1.6fr] md:gap-8">
              <dt className="font-display text-xl font-semibold tracking-tight text-text">{f.title}</dt>
              <dd className="text-text-light">{f.text}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <dl className="mt-20 grid grid-cols-3 gap-6">
        {NUMBERS.map((n) => (
          <div key={n.label}>
            <dt className="sr-only">{n.label}</dt>
            <dd className="font-display text-4xl font-semibold tracking-tight text-primary md:text-6xl">
              <NumberTicker value={n.value} suffix={n.suffix} />
            </dd>
            <p aria-hidden className="mt-2 text-sm text-text-light md:text-base">
              {n.label}
            </p>
          </div>
        ))}
      </dl>
    </SectionShell>
  )
}
