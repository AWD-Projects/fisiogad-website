"use client"
import { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.svg"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { track } from "@/lib/analytics"

const NAV = [
  { name: "Inicio", href: "#hero" },
  { name: "Servicios", href: "#services" },
  { name: "Nosotros", href: "#about" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "Preguntas", href: "#faq" },
  { name: "Contacto", href: "#contact" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 py-3 shadow-sm backdrop-blur" : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" aria-label="Fisiogad, inicio">
          <Image
            src={logo}
            alt="Fisiogad"
            priority
            className={cn("w-auto transition-all duration-300", scrolled ? "h-11" : "h-14")}
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  aria-current={active === item.href.slice(1) ? "true" : undefined}
                  className={cn(
                    "font-medium transition-colors hover:text-primary",
                    active === item.href.slice(1) ? "text-primary" : "text-text"
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <a href="#contact" onClick={() => track("cta_click", { source: "header" })}>
              Agendar cita
            </a>
          </Button>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="-mr-2 p-2 text-text lg:hidden" aria-label="Abrir menú">
              <Menu size={26} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm bg-background p-6 shadow-xl">
              <Dialog.Title className="sr-only">Menú</Dialog.Title>
              <Dialog.Description className="sr-only">Navegación del sitio</Dialog.Description>
              <div className="mb-8 flex items-center justify-between">
                <Image src={logo} alt="Fisiogad" className="h-12 w-auto" />
                <Dialog.Close asChild>
                  <button className="p-2" aria-label="Cerrar menú">
                    <X size={24} />
                  </button>
                </Dialog.Close>
              </div>
              <nav aria-label="Móvil" className="flex flex-col gap-5">
                {NAV.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-text hover:text-primary"
                  >
                    {item.name}
                  </a>
                ))}
                <Button asChild className="mt-2 w-full">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Agendar cita
                  </a>
                </Button>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
