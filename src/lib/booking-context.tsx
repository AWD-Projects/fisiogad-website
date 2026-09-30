"use client"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { ZoneId } from "@/data/zones"

interface BookingState {
  zone: ZoneId | null
  service: string
  setZone: (zone: ZoneId | null) => void
  setService: (service: string) => void
  /** Lleva al visitante al formulario de cita con la zona y/o servicio ya elegidos. */
  goToBooking: (opts?: { zone?: ZoneId | null; service?: string }) => void
}

const BookingContext = createContext<BookingState | null>(null)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [zone, setZone] = useState<ZoneId | null>(null)
  const [service, setService] = useState("")

  const goToBooking = useCallback((opts?: { zone?: ZoneId | null; service?: string }) => {
    if (opts?.zone !== undefined) setZone(opts.zone)
    if (opts?.service !== undefined) setService(opts.service)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const value = useMemo(
    () => ({ zone, service, setZone, setService, goToBooking }),
    [zone, service, goToBooking]
  )
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking debe usarse dentro de BookingProvider")
  return ctx
}
