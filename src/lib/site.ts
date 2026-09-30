// Datos de contacto y negocio en un solo lugar (fuente única para header, footer, contacto y SEO).
export const SITE = {
  name: "Fisiogad",
  legalName: "Fisioterapia y Rehabilitación Gad",
  url: "https://fisiogad.com.mx",
  phoneDisplay: "+52 55 4959 1491",
  phoneTel: "+525549591491",
  whatsappNumber: "525549591491",
  whatsappShort: "https://wa.link/ma7xty",
  email: "Terapia.gad@gmail.com",
  address: {
    street: "Félix Cuevas 301, Consultorio 104",
    colony: "Colonia Del Valle",
    borough: "Benito Juárez",
    postalCode: "03104",
    city: "Ciudad de México",
    region: "CDMX",
    country: "MX",
  },
  mapsUrl: "https://maps.app.goo.gl/1eUdE5NmNViAsbG6A",
  instagram: "https://www.instagram.com/fisio.gad",
  hours: [
    { days: "Lun-Vie", open: "9:00", close: "18:00" },
    { days: "Sáb", open: "9:00", close: "14:00" },
  ],
} as const

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
