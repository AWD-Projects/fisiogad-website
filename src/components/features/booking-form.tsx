"use client"
import { useEffect, useMemo, useState } from "react"
import { addDays, format, startOfDay } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowRight, Check, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input, Textarea } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SERVICE_OPTIONS, serviceLabel } from "@/data/services"
import { ZONES } from "@/data/zones"
import { useBooking } from "@/lib/booking-context"
import { whatsappLink } from "@/lib/site"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

/** Horas de inicio disponibles según el horario del consultorio: Lun-Vie 9-18, Sáb 9-14, Dom cerrado. */
function slotsFor(date: Date) {
  const day = date.getDay()
  const lastStart = day === 6 ? 13 : day === 0 ? -1 : 17
  const hours: string[] = []
  const now = new Date()
  const isToday = startOfDay(now).getTime() === startOfDay(date).getTime()
  for (let h = 9; h <= lastStart; h++) {
    if (isToday && h <= now.getHours()) continue
    hours.push(`${String(h).padStart(2, "0")}:00`)
  }
  return hours
}

type Errors = Partial<Record<"service" | "date" | "time" | "name" | "phone", string>>

export function BookingForm() {
  const { zone, setZone, service, setService } = useBooking()
  const [mounted, setMounted] = useState(false)
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  useEffect(() => setMounted(true), [])

  const today = useMemo(() => startOfDay(new Date()), [])
  const slots = useMemo(() => (date ? slotsFor(date) : []), [date])

  function validate(): Errors {
    const e: Errors = {}
    if (!service) e.service = "Elige el servicio que necesitas"
    if (!date) e.date = "Elige una fecha"
    if (date && !time) e.time = "Elige un horario"
    if (name.trim().length < 2) e.name = "Escribe tu nombre"
    if (phone.replace(/\D/g, "").length < 10) e.phone = "Escribe un teléfono de 10 dígitos"
    return e
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      track("booking_validation_error", { fields: Object.keys(found).join(",") })
      return
    }
    const lines = [
      "Hola, quiero agendar una sesión en Fisiogad.",
      `Servicio: ${serviceLabel(service)}`,
      zone ? `Zona: ${ZONES[zone].label}` : "",
      `Fecha: ${format(date!, "EEEE d 'de' MMMM", { locale: es })}`,
      `Horario preferido: ${time}`,
      `Nombre: ${name.trim()}`,
      `Teléfono: ${phone.trim()}`,
      message.trim() ? `Mensaje: ${message.trim()}` : "",
    ].filter(Boolean)

    track("booking_submit", { service, zone: zone ?? "", weekday: date!.getDay() })
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer")
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    toast.success("Abrimos WhatsApp con tu solicitud", {
      description: "Envía el mensaje para que te confirmemos tu cita.",
    })
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-12 bg-background p-6 text-text sm:p-10">
      <fieldset className="space-y-5">
        <legend className="text-2xl font-semibold tracking-tight text-text font-display">¿Qué necesitas?</legend>
        <div className="space-y-2">
          <Label htmlFor="service">Servicio</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service" aria-invalid={!!errors.service}>
              <SelectValue placeholder="Selecciona un servicio" />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
        </div>
        {zone && (
          <button
            type="button"
            onClick={() => setZone(null)}
            className="group inline-flex items-center gap-2 border border-primary/30 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-background"
          >
            Zona: {ZONES[zone].label}
            <X className="h-4 w-4" aria-hidden />
            <span className="sr-only">Quitar zona</span>
          </button>
        )}
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-2xl font-semibold tracking-tight text-text font-display">¿Cuándo te queda bien?</legend>
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          <div className="min-h-[21rem] md:w-[19.5rem]">
            {mounted ? (
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d)
                  setTime("")
                }}
                disabled={[{ before: today }, { after: addDays(today, 60) }, { dayOfWeek: [0] }]}
                defaultMonth={today}
              />
            ) : (
              <div className="h-[21rem] animate-pulse rounded-md bg-muted" aria-hidden />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-text">Horario preferido</p>
            {!date ? (
              <p className="mt-2 text-sm text-text-light">Elige un día para ver los horarios.</p>
            ) : slots.length === 0 ? (
              <p className="mt-2 text-sm text-text-light">Ya no hay horarios hoy. Elige otro día.</p>
            ) : (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Horario preferido">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={time === s}
                    onClick={() => setTime(s)}
                    className={cn(
                      "h-11 border text-base font-medium tabular-nums transition-all duration-200 active:scale-95",
                      time === s
                        ? "border-primary bg-primary text-background"
                        : "border-border bg-transparent text-text hover:border-primary hover:text-primary"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {(errors.date || errors.time) && <p className="mt-2 text-sm text-destructive">{errors.date ?? errors.time}</p>}
            <p className="mt-4 text-sm text-text-light">
              Lun-Vie 9:00 a 18:00 y Sáb 9:00 a 14:00. Te confirmamos tu cita por WhatsApp.
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-2xl font-semibold tracking-tight text-text font-display">Tus datos</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} placeholder="Juan Pérez" />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} placeholder="55 1234 5678" />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Cuéntanos qué sientes (opcional)</Label>
          <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Dolor al correr, lesión previa, indicaciones de tu médico..." />
        </div>
      </fieldset>

      <Button type="submit" size="lg" className="w-full">
        {sent ? (
          <>
            <Check />
            Solicitud lista en WhatsApp
          </>
        ) : (
          <>
            Agendar por WhatsApp
            <ArrowRight className="arrow" />
          </>
        )}
      </Button>
    </form>
  )
}
