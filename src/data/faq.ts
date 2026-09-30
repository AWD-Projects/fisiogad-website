import { SITE } from "@/lib/site"

export const FAQ = [
  {
    q: "¿Cómo agendo mi primera sesión?",
    a: "Elige el servicio, el día y el horario en el formulario de esta página. Te abrimos WhatsApp con tu solicitud lista y te confirmamos la cita. También puedes llamarnos o escribirnos directamente.",
  },
  {
    q: "¿Dónde se encuentra el consultorio?",
    a: `Estamos en ${SITE.address.street}, ${SITE.address.colony}, ${SITE.address.borough}, ${SITE.address.city}.`,
  },
  {
    q: "¿Qué horarios manejan?",
    a: "De lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 14:00. Si necesitas un horario distinto, escríbenos y lo revisamos contigo.",
  },
  {
    q: "¿Atienden a domicilio?",
    a: "Sí. Llevamos equipo profesional a tu hogar para que recibas tu tratamiento sin desplazarte. Escríbenos por WhatsApp para confirmar la disponibilidad en tu zona.",
  },
  {
    q: "¿Qué lesiones y molestias tratan?",
    a: "Lesiones deportivas como esguinces, desgarros, rodilla del corredor o rehabilitación de ligamento cruzado, y dolores de la vida diaria como espalda, cuello, muñeca o mala postura. También ofrecemos sesiones de descarga muscular.",
  },
  {
    q: "¿Necesito tener una lesión para ir?",
    a: "No. Puedes venir por dolores ocasionales, por descarga muscular o para que evaluemos tu caso y armemos un plan a tu medida.",
  },
  {
    q: "¿Qué pasa después de la primera sesión?",
    a: "Diseñamos un plan personalizado y damos seguimiento a tu progreso, ajustando el tratamiento según cómo evoluciones. Nuestro objetivo es que tu recuperación se mantenga a largo plazo.",
  },
] as const
