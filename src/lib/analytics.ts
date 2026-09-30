// Envío de eventos ligero. Funciona con Google Tag Manager (dataLayer) o gtag si están instalados;
// si no existe ninguno, no hace nada.
type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return
  window.dataLayer?.push({ event, ...params })
  window.gtag?.("event", event, params)
}
