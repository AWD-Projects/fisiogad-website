import sport from "@/assets/services/sport.jpg"
import daily from "@/assets/services/daily.jpg"
import home from "@/assets/services/home.jpg"
import follow from "@/assets/services/follow.jpg"
import custom from "@/assets/services/custom.jpg"

// `formValue` es el valor que usa el formulario de cita para cada servicio.
export const SERVICES = [
  {
    id: "sports-injuries",
    formValue: "sports-injury",
    title: "Lesiones deportivas",
    description:
      "Tratamientos especializados para atletas y entusiastas del deporte para recuperarse de lesiones y mejorar el rendimiento.",
    treatments: [
      "Distensiones y desgarros musculares",
      "Esguinces articulares",
      "Codo de tenista/golfista",
      "Rodilla del corredor",
      "Pinzamientos de hombro",
    ],
    image: sport,
    span: "md:col-span-3",
  },
  {
    id: "daily-pain",
    formValue: "daily-pain",
    title: "Dolores de actividad diaria",
    description:
      "Alivio del dolor causado por actividades cotidianas, mala postura o movimientos repetitivos.",
    treatments: [
      "Dolor de espalda y cuello",
      "Corrección postural",
      "Lesiones por esfuerzo repetitivo",
      "Molestias relacionadas con el trabajo",
      "Síndrome de cuello tecnológico",
    ],
    image: daily,
    span: "md:col-span-3",
  },
  {
    id: "home-therapy",
    formValue: "home",
    title: "Servicios a domicilio",
    description:
      "Equipos y tratamientos de fisioterapia profesional llevados directamente a tu hogar para máxima comodidad.",
    treatments: [
      "Configuración personalizada en casa",
      "Provisión de equipos",
      "Entorno cómodo",
      "Sin necesidad de viajar",
      "Horarios flexibles",
    ],
    image: home,
    span: "md:col-span-2",
  },
  {
    id: "follow-up",
    formValue: "follow-up",
    title: "Cuidado continuo",
    description:
      "Planes de tratamiento continuos con seguimientos regulares para garantizar una recuperación y bienestar a largo plazo.",
    treatments: [
      "Monitoreo del progreso",
      "Ajustes en el tratamiento",
      "Estrategias de prevención",
      "Planes de mantenimiento",
      "Seguimientos digitales",
    ],
    image: follow,
    span: "md:col-span-2",
  },
  {
    id: "custom-treatment",
    formValue: "custom-treatment",
    title: "Tratamientos personalizados",
    description:
      "Enfoques de fisioterapia diseñados específicamente para tu cuerpo, condición y objetivos de recuperación.",
    treatments: [
      "Evaluación personalizada",
      "Programas de ejercicios a medida",
      "Técnicas adaptativas",
      "Planes orientados a objetivos",
      "Integración en el estilo de vida",
    ],
    image: custom,
    span: "md:col-span-2",
  },
] as const

export const SERVICE_OPTIONS = [
  { value: "sports-injury", label: "Lesiones deportivas" },
  { value: "daily-pain", label: "Dolor por actividad diaria" },
  { value: "home", label: "Sesión a domicilio" },
  { value: "custom-treatment", label: "Tratamiento personalizado" },
  { value: "follow-up", label: "Sesión de seguimiento" },
  { value: "consultation", label: "Consulta inicial" },
] as const

export function serviceLabel(value: string) {
  return SERVICE_OPTIONS.find((s) => s.value === value)?.label ?? ""
}
