"use client"
import { useEffect } from "react"
import Lenis from "lenis"
import { useReducedMotion } from "framer-motion"

/** Scroll suave global. Se desactiva con "reducir movimiento". Enlaces # usan el mismo motor. */
export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || a.getAttribute("href") === "#") return
      const target = document.getElementById(a.getAttribute("href")!.slice(1))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: 0, duration: 1.3 })
    }
    document.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("click", onClick)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [reduce])

  return null
}
