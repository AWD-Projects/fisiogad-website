import Image from "next/image"
import { Award, Clock, MapPin, Shield, Star } from "lucide-react"
import mainlogo from "@/assets/mainlogo.svg"
import hero from "@/assets/hero.jpg"
import { SITE } from "@/lib/site"

const FEATURES = [
  {
    icon: Shield,
    title: "Equipo profesional",
    description:
      "Llevamos equipos de fisioterapia de nivel hospitalario directamente a tu puerta para los tratamientos más efectivos.",
  },
  {
    icon: Award,
    title: "Terapeutas certificados",
    description:
      "Nuestro equipo consta de profesionales licenciados con amplia formación y años de experiencia práctica.",
  },
  {
    icon: Clock,
    title: "Horarios flexibles",
    description: "Programa citas en horarios que funcionen para ti, incluyendo tardes y fines de semana.",
  },
  {
    icon: Star,
    title: "Enfoque personalizado",
    description:
      "Cada plan de tratamiento está adaptado a tus necesidades específicas, condición y objetivos de recuperación.",
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="section-y bg-background-alt">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={hero}
                alt="Fisioterapeuta atendiendo a un paciente"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-6 left-4 right-4 flex items-start gap-3 rounded-xl bg-white p-4 shadow-lg ring-1 ring-border transition-shadow hover:shadow-xl sm:left-auto sm:max-w-xs"
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span className="text-sm text-text">
                <span className="block font-semibold">Consultorio en Colonia Del Valle</span>
                {SITE.address.street}, Benito Juárez. Ver en Google Maps
              </span>
            </a>
          </div>

          <div>
            <Image src={mainlogo} alt="Fisiogad" className="mb-6 h-14 w-auto" />
            <h2 className="text-text">Sobre Fisiogad</h2>
            <p className="mt-5 text-lg text-text-light">
              En {SITE.legalName}, ubicada en Colonia del Valle, mejoramos tu salud y calidad de vida con tratamientos
              personalizados de fisioterapia y rehabilitación física. Atendemos lesiones deportivas, problemas de
              columna y procesos posoperatorios.
            </p>
            <p className="mt-4 text-lg text-text-light">
              Nuestro equipo profesional te acompaña en cada paso de tu recuperación con atención cercana y enfocada en
              tus necesidades. Tu bienestar es nuestra prioridad.
            </p>

            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-text md:text-lg">{title}</h3>
                    <p className="mt-1 text-sm text-text-light">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
