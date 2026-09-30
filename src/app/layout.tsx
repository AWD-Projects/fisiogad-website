import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MobileCtaBar from "@/components/MobileCtaBar"
import { BookingProvider } from "@/lib/booking-context"
import { FAQ } from "@/data/faq"
import { SITE } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" })

const TITLE = "Fisiogad - Servicios de Fisioterapia Personalizada"
const DESCRIPTION =
  "Tratamientos profesionales de fisioterapia a domicilio con atención personalizada para lesiones deportivas, lesiones por actividades diarias y dolores ocasionales."

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "fisioterapia",
    "lesiones deportivas",
    "descarga muscular",
    "lesiones",
    "rehabilitación",
    "fisioterapia colonia del valle",
    "fisioterapia benito juárez",
  ],
  creator: "Fisiogad",
  authors: [{ name: "Fisiogad", url: SITE.url }],
  alternates: { canonical: "/" },
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: TITLE,
    description: "Recupera tu bienestar con fisioterapia a domicilio. Atención especializada y profesional en cada sesión.",
    url: SITE.url,
    siteName: "Fisiogad",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Fisioterapia profesional para tu bienestar físico. Atención especializada en casa.",
    site: "@fisiogad",
  },
}

export const viewport: Viewport = { themeColor: "#8B0900" }

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Physiotherapy", "LocalBusiness"],
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      alternateName: SITE.legalName,
      url: SITE.url,
      image: `${SITE.url}/opengraph-image`,
      telephone: SITE.phoneTel,
      email: SITE.email,
      description: DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: `${SITE.address.colony}, ${SITE.address.borough}`,
        addressRegion: SITE.address.city,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
      ],
      hasMap: SITE.mapsUrl,
      sameAs: [SITE.instagram],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <BookingProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileCtaBar />
        </BookingProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  )
}
