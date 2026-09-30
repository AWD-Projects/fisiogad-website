import { Instagram, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import logo from "@/assets/logo.svg"
import { SITE } from "@/lib/site"

const LINKS = [
  { name: "Inicio", href: "#hero" },
  { name: "Servicios", href: "#services" },
  { name: "Nosotros", href: "#about" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "Preguntas frecuentes", href: "#faq" },
  { name: "Contacto", href: "#contact" },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-primary text-background">
      <div className="container grid gap-10 py-14 md:grid-cols-3 md:py-16">
        <div>
          <Image src={logo} alt="Fisiogad" className="h-14 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-xs text-background/80">
            Servicios profesionales de fisioterapia con tratamientos personalizados para todas las partes del cuerpo y
            condiciones.
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Fisiogad"
            className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>

        <nav aria-label="Enlaces rápidos">
          <h3 className="text-lg font-semibold md:text-lg">Enlaces rápidos</h3>
          <ul className="mt-4 space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="text-background/80 transition-colors hover:text-background">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-lg font-semibold md:text-lg">Contáctanos</h3>
          <ul className="mt-4 space-y-3 text-background/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-background">
                {SITE.address.street}, {SITE.address.colony}, {SITE.address.borough}, {SITE.address.postalCode}{" "}
                {SITE.address.city}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0" aria-hidden />
              <a href={`tel:${SITE.phoneTel}`} className="hover:text-background">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0" aria-hidden />
              <a href={`mailto:${SITE.email}`} className="hover:text-background">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/15">
        <div className="container flex flex-col gap-2 py-5 text-sm text-background/75 sm:flex-row sm:justify-between">
          <p>© {year} Fisiogad. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a href="https://www.amoxtli.tech" target="_blank" rel="noopener noreferrer" className="underline hover:text-background">
              Amoxtli Web Developers
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
