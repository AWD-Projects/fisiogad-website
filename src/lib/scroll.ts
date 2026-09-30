// Desplazamiento a un ancla, compatible con el scroll suave (Lenis) si está activo.
type LenisLike = { scrollTo: (t: HTMLElement, o?: { offset?: number; duration?: number }) => void }

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.3 })
  else el.scrollIntoView({ behavior: "smooth", block: "start" })
}
