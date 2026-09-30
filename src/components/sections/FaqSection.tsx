import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQ } from "@/data/faq"

export default function FaqSection() {
  return (
    <section id="faq" className="section-y">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 className="text-text">Preguntas frecuentes</h2>
            <p className="mt-5 text-lg text-text-light">
              Lo que más nos preguntan antes de la primera sesión. Si te queda una duda, escríbenos.
            </p>
          </div>
          <Accordion type="single" collapsible className="border-t border-border">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
