// Zonas del mapa corporal. Los textos salen de los tratamientos ya publicados en el sitio.
export type ZoneId =
  | "cuello"
  | "hombro"
  | "codo"
  | "muneca"
  | "espalda-baja"
  | "muslo"
  | "rodilla"
  | "tobillo"

export interface Zone {
  id: ZoneId
  label: string
  treats: string[]
  serviceValue: "sports-injury" | "daily-pain"
}

export const ZONES: Record<ZoneId, Zone> = {
  cuello: {
    id: "cuello",
    label: "Cuello",
    treats: ["Dolor de cuello", "Síndrome de cuello tecnológico", "Corrección postural"],
    serviceValue: "daily-pain",
  },
  hombro: {
    id: "hombro",
    label: "Hombro",
    treats: ["Pinzamientos de hombro", "Lesiones del manguito rotador", "Descarga muscular"],
    serviceValue: "sports-injury",
  },
  codo: {
    id: "codo",
    label: "Codo",
    treats: ["Codo de tenista", "Codo de golfista", "Lesiones por esfuerzo repetitivo"],
    serviceValue: "sports-injury",
  },
  muneca: {
    id: "muneca",
    label: "Muñeca y mano",
    treats: ["Dolor de muñeca", "Síndrome del túnel carpiano", "Lesiones por esfuerzo repetitivo"],
    serviceValue: "daily-pain",
  },
  "espalda-baja": {
    id: "espalda-baja",
    label: "Espalda baja",
    treats: ["Dolor de espalda", "Molestias relacionadas con el trabajo", "Corrección postural"],
    serviceValue: "daily-pain",
  },
  muslo: {
    id: "muslo",
    label: "Muslo",
    treats: ["Distensiones musculares", "Desgarros musculares", "Descarga muscular"],
    serviceValue: "sports-injury",
  },
  rodilla: {
    id: "rodilla",
    label: "Rodilla",
    treats: ["Rodilla del corredor", "Rehabilitación de ligamento cruzado (LCA)", "Esguinces articulares"],
    serviceValue: "sports-injury",
  },
  tobillo: {
    id: "tobillo",
    label: "Tobillo y pie",
    treats: ["Esguinces de tobillo", "Periostitis tibial", "Descarga muscular"],
    serviceValue: "sports-injury",
  },
}

export type Side = "front" | "back"

// Posiciones en un lienzo de 200 x 440. `mirror` duplica el punto del otro lado del cuerpo.
export const HOTSPOTS: Record<Side, { zone: ZoneId; x: number; y: number; mirror?: boolean }[]> = {
  front: [
    { zone: "cuello", x: 100, y: 58 },
    { zone: "hombro", x: 60, y: 82, mirror: true },
    { zone: "codo", x: 49, y: 152, mirror: true },
    { zone: "muneca", x: 34, y: 226, mirror: true },
    { zone: "muslo", x: 79, y: 262, mirror: true },
    { zone: "rodilla", x: 79, y: 332, mirror: true },
    { zone: "tobillo", x: 77, y: 410, mirror: true },
  ],
  back: [
    { zone: "cuello", x: 100, y: 58 },
    { zone: "hombro", x: 60, y: 82, mirror: true },
    { zone: "espalda-baja", x: 100, y: 176 },
    { zone: "muslo", x: 79, y: 262, mirror: true },
    { zone: "rodilla", x: 79, y: 332, mirror: true },
    { zone: "tobillo", x: 77, y: 410, mirror: true },
  ],
}
