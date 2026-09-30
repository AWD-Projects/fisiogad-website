"use client"
import { useEffect, useState } from "react"
import { CalendarCheck, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { whatsappLink } from "@/lib/site"
import { track } from "@/lib/analytics"

/** Barra fija en móvil: aparece al salir del inicio y se oculta al llegar al formulario. */
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero")
    const contact = document.getElementById("contact")
    let heroGone = false
    let atContact = false
    const update = () => setVisible(heroGone && !atContact)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroGone = !e.isIntersecting
        if (e.target === contact) atContact = e.isIntersecting
      })
      update()
    })
    hero && io.observe(hero)
    contact && io.observe(contact)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur transition-transform duration-300 xl:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex gap-3">
        <Button asChild className="flex-1" tabIndex={visible ? 0 : -1}>
          <a href="#contact" onClick={() => track("cta_click", { source: "mobile_bar" })}>
            <CalendarCheck />
            Agendar cita
          </a>
        </Button>
        <Button asChild variant="outline" size="icon" tabIndex={visible ? 0 : -1}>
          <a
            href={whatsappLink("Hola, quisiera información sobre una sesión de fisioterapia.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            onClick={() => track("whatsapp_click", { source: "mobile_bar" })}
          >
            <MessageCircle />
          </a>
        </Button>
      </div>
    </div>
  )
}
