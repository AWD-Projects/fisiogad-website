import { ExternalLink, Star } from "lucide-react"
import { SITE } from "@/lib/site"

// Se conserva el texto original de cada paciente; solo se corrigió ortografía evidente.
const TESTIMONIALS = [
  {
    name: "Sofía Bañuelos",
    role: "Jugadora de tocho",
    rating: 5,
    content:
      "Llevo varias sesiones con el equipo de Fisio GAD tras mi ruptura de ligamento cruzado anterior y no puedo estar más agradecida con todo lo que he avanzado. Las terapias han sido clave en mi recuperación y en mi regreso al tocho. Además, las sesiones de descarga muscular me han ayudado muchísimo en las temporadas. 100% recomendados!! Muy atentos y con el equipo necesario.",
  },
  {
    name: "Elvia Escobar",
    role: "Ama de casa",
    rating: 5,
    content:
      "Fui a rehabilitación por un dolor en la muñeca y desde la primera sesión sentí mucha mejoría, lo recomiendo.",
  },
  {
    name: "Allberto Franco Pallas",
    role: "Cliente frecuente",
    rating: 5,
    content:
      "El lugar está súper bonito, la atención es muy buena ya que son profesionales, les gusta su trabajo, salgo contento después de mi terapia, ¡100% recomendados!",
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={i < n ? "h-5 w-5 fill-primary text-primary" : "h-5 w-5 text-border"} aria-hidden />
      ))}
    </div>
  )
}

function Person({ name, role, inverted = false }: { name: string; role: string; inverted?: boolean }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      <span
        aria-hidden
        className={
          inverted
            ? "flex h-11 w-11 items-center justify-center rounded-full bg-background/15 font-semibold text-background"
            : "flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary"
        }
      >
        {initials}
      </span>
      <span>
        <span className={inverted ? "block font-semibold text-background" : "block font-semibold text-text"}>{name}</span>
        <span className={inverted ? "text-sm text-background/75" : "text-sm text-text-light"}>{role}</span>
      </span>
    </figcaption>
  )
}

export default function TestimonialsSection() {
  const [featured, ...rest] = TESTIMONIALS
  return (
    <section id="testimonials" className="section-y">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-text">Lo que dicen nuestros pacientes</h2>
            <p className="mt-5 text-lg text-text-light">
              Historias reales de personas que volvieron a moverse con confianza.
            </p>
          </div>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            Ver reseñas en Google
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          <figure className="rounded-2xl bg-primary p-8 text-background lg:col-span-3 lg:p-10">
            <Stars n={featured.rating} />
            <blockquote className="mt-5 text-xl leading-relaxed md:text-2xl">{featured.content}</blockquote>
            <Person name={featured.name} role={featured.role} inverted />
          </figure>

          <div className="grid gap-5 lg:col-span-2">
            {rest.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-white p-6">
                <Stars n={t.rating} />
                <blockquote className="mt-4 text-text">{t.content}</blockquote>
                <Person name={t.name} role={t.role} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
