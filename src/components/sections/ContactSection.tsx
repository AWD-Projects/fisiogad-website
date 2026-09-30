import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { BookingForm } from "@/components/features/booking-form"
import { Button } from "@/components/ui/button"
import { SITE, whatsappLink } from "@/lib/site"

const address = `${SITE.address.street}, ${SITE.address.colony}, ${SITE.address.borough}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.region}`

const INFO = [
  { icon: Phone, title: "Teléfono", value: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` },
  { icon: Mail, title: "Correo", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, title: "Dirección", value: address, href: SITE.mapsUrl },
  { icon: Instagram, title: "Instagram", value: "@fisio.gad", href: SITE.instagram },
] as const

export default function ContactSection() {
  return (
    <section id="contact" className="section-y bg-primary/[0.04]">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-text">Agenda tu sesión</h2>
          <p className="mt-5 text-lg text-text-light">
            Elige servicio, día y horario. Armamos tu solicitud y la mandamos por WhatsApp para confirmarla contigo.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <BookingForm />
          </div>

          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-8">
              <h3 className="text-xl font-bold text-text md:text-2xl">Información de contacto</h3>
              <ul className="mt-5 space-y-2">
                {INFO.map(({ icon: Icon, title, value, href }) => (
                  <li key={title}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="-mx-3 flex items-start gap-4 rounded-md p-3 transition-colors hover:bg-accent"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-medium text-text">{title}</span>
                        <span className="text-text-light">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li className="-mx-3 flex items-start gap-4 p-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-medium text-text">Horario de atención</span>
                    {SITE.hours.map((h) => (
                      <span key={h.days} className="block text-text-light">
                        {h.days}: {h.open} a {h.close}
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-primary p-6 text-background sm:p-8">
              <h3 className="text-xl font-bold md:text-2xl">¿Necesitas atención urgente?</h3>
              <p className="mt-2 text-background/85">Llámanos directamente para citas el mismo día.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild variant="onDark">
                  <a href={`tel:${SITE.phoneTel}`}>
                    <Phone />
                    Llamar ahora
                  </a>
                </Button>
                <Button asChild variant="outlineOnDark">
                  <a href={whatsappLink("Hola, necesito una cita lo antes posible.")} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
