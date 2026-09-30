import { SplitHeading } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/**
 * Estructura única de todas las secciones: título en las columnas 1-4 (fijo al hacer scroll en escritorio)
 * y contenido en las columnas 5-12. Garantiza que todo quede sobre los mismos ejes.
 */
export function SectionShell({
  id,
  title,
  aside,
  children,
  dark = false,
  stickyHead = true,
  className,
}: {
  id: string
  title: string
  aside?: React.ReactNode
  children: React.ReactNode
  dark?: boolean
  /** false cuando la columna del título es más alta que la pantalla (ej. Contacto). */
  stickyHead?: boolean
  className?: string
}) {
  return (
    <section id={id} className={cn("section-y", dark && "bg-primary text-background", className)}>
      <div className="container">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className={stickyHead ? "md:sticky md:top-32" : undefined}>
              <SplitHeading text={title} className={dark ? "!text-background" : ""} />
              {aside && <div className="mt-8 max-w-xs">{aside}</div>}
            </div>
          </div>
          <div className="md:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  )
}
