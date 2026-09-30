"use client"
import { useEffect, useRef, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.svg"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { track } from "@/lib/analytics"

const NAV = [
  { name: "Servicios", href: "#services" },
  { name: "Cómo trabajamos", href: "#process" },
  { name: "Nosotros", href: "#about" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "Preguntas", href: "#faq" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const last = useRef(0)

  // Se oculta al bajar y reaparece al subir, para dejar el contenido libre.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > last.current && y > 320)
      last.current = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    NAV.forEach((n) => {
      const el = document.getElementById(n.href.slice(1))
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled ? "bg-background/90 py-3 backdrop-blur" : "py-6",
        hidden && !open && "-translate-y-full"
      )}
    >
      <div className="container flex items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <Link href="/" aria-label="Fisiogad, inicio">
            <Image src={logo} alt="Fisiogad" priority className={cn("w-auto transition-all duration-500", scrolled ? "h-10" : "h-12")} />
          </Link>
          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={active === item.href.slice(1) ? "true" : undefined}
                    className={cn(
                      "link-line py-1 transition-colors",
                      active === item.href.slice(1) ? "text-primary [background-size:100%_1px]" : "text-text hover:text-primary"
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden xl:block">
          <Button
            asChild
            className={cn(!scrolled && "bg-background text-primary hover:bg-white")}
          >
            <a href="#contact" onClick={() => track("cta_click", { source: "header" })}>
              Agendar cita
            </a>
          </Button>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className={cn("-mr-2 p-2 xl:hidden", !scrolled ? "text-text lg:text-background" : "text-text")}
              aria-label="Abrir menú"
            >
              <Menu size={28} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-primary p-8 text-background data-[state=open]:animate-in data-[state=open]:slide-in-from-right">
              <Dialog.Title className="sr-only">Menú</Dialog.Title>
              <Dialog.Description className="sr-only">Navegación del sitio</Dialog.Description>
              <div className="flex justify-end">
                <Dialog.Close asChild>
                  <button className="-mr-2 p-2" aria-label="Cerrar menú">
                    <X size={28} />
                  </button>
                </Dialog.Close>
              </div>
              <nav aria-label="Móvil" className="mt-10 flex flex-1 flex-col gap-2">
                {[...NAV, { name: "Agendar cita", href: "#contact" }].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-background/20 py-4 font-display text-3xl font-semibold tracking-tight transition-transform duration-300 hover:translate-x-2"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
