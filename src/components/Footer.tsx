import Image from "next/image"
import logo from "@/assets/logo.svg"
import { SITE } from "@/lib/site"

const LINKS = [
  { name: "Servicios", href: "#services" },
  { name: "Cómo trabajamos", href: "#process" },
  { name: "Nosotros", href: "#about" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "Preguntas frecuentes", href: "#faq" },
  { name: "Agendar", href: "#contact" },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-primary text-background">
      <div className="container">
        <div className="grid gap-x-8 gap-y-10 border-t border-background/20 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image src={logo} alt="Fisiogad" className="h-14 w-auto brightness-0 invert" />
          </div>
          <nav aria-label="Enlaces del sitio" className="md:col-span-3">
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="link-line text-background/90 hover:text-background">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-5">
            <p className="max-w-sm text-background/90">
              {SITE.address.street}, {SITE.address.colony}, {SITE.address.borough}, {SITE.address.postalCode}{" "}
              {SITE.address.city}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-background/20 py-6 text-sm text-background/80 sm:flex-row sm:justify-between">
          <p>© {year} Fisiogad. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a href="https://www.amoxtli.tech" target="_blank" rel="noopener noreferrer" className="link-line hover:text-background">
              Amoxtli Web Developers
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
