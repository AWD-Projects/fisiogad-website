import { ImageResponse } from "next/og"

export const alt = "Fisiogad, fisioterapia personalizada en Colonia Del Valle"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Imagen para compartir en redes (1200x630) con los colores de marca.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBFBFB",
          padding: 80,
          borderLeft: "28px solid #8B0900",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, color: "#8B0900" }}>Fisiogad</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, color: "#1F2937", lineHeight: 1.05 }}>
            Fisioterapia profesional
          </div>
          <div style={{ fontSize: 40, color: "#6B7280", marginTop: 24 }}>
            Lesiones deportivas y dolor diario · Colonia Del Valle, CDMX
          </div>
        </div>
      </div>
    ),
    size
  )
}
