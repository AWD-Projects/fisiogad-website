import { BookingForm } from "@/components/features/booking-form"
import { Reveal } from "@/components/motion/reveal"
import { SectionShell } from "./section-shell"
import { SITE, whatsappLink } from "@/lib/site"

const address = `${SITE.address.street}, ${SITE.address.colony}, ${SITE.address.borough}, ${SITE.address.postalCode} ${SITE.address.city}`

const INFO = [
  { title: "Teléfono", value: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` },
  { title: "WhatsApp", value: "Escríbenos", href: whatsappLink("Hola, quisiera información sobre una sesión de fisioterapia.") },
  { title: "Correo", value: SITE.email, href: `mailto:${SITE.email}` },
  { title: "Consultorio", value: address, href: SITE.mapsUrl },
  { title: "Instagram", value: "@fisio.gad", href: SITE.instagram },
] as const

export default function ContactSection() {
  return (
    <SectionShell
      id="contact"
      title="Agenda tu sesión"
      dark
      stickyHead={false}
      className="pb-16 md:pb-24"
      aside={
        <div className="space-y-8 text-background/85">
          <p>Elige servicio, día y horario. Armamos tu solicitud y la enviamos por WhatsApp para confirmarla contigo.</p>
          <dl className="space-y-5">
            {INFO.map((i) => (
              <div key={i.title}>
                <dt className="text-sm text-background/75">{i.title}</dt>
                <dd>
                  <a
                    href={i.href}
                    target={i.href.startsWith("http") ? "_blank" : undefined}
                    rel={i.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="link-line text-background"
                  >
                    {i.value}
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-sm text-background/75">Horario</dt>
              <dd className="text-background">
                {SITE.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.open} a {h.close}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      }
    >
      <Reveal>
        <BookingForm />
      </Reveal>
    </SectionShell>
  )
}
