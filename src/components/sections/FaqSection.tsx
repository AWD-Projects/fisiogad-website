import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/motion/reveal"
import { SectionShell } from "./section-shell"
import { FAQ } from "@/data/faq"

export default function FaqSection() {
  return (
    <SectionShell
      id="faq"
      title="Preguntas frecuentes"
      aside={<p className="text-text-light">Lo que más nos preguntan antes de la primera sesión.</p>}
    >
      <Reveal>
        <Accordion type="single" collapsible className="border-t border-border">
          {FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </SectionShell>
  )
}
