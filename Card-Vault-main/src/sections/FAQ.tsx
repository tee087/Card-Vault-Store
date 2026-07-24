import { Terminal, ChevronRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/data/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={ref}
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-mono text-sm">faq.help</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono text-green-400 mb-2">
            $ man cardvault
          </h2>
          <p className="text-green-600 font-mono text-sm">
            Frequently asked questions and answers
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className={`border border-green-500/30 bg-black data-[state=open]:border-green-500 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="text-left hover:no-underline py-4 px-5 font-mono text-sm text-green-400 hover:text-green-300">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-green-600" />
                  <span>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-green-700 font-mono text-sm px-5 pb-4 pl-11">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-12 border border-green-500/30 p-6 bg-green-500/5">
          <div className="text-green-700 font-mono text-sm mb-2">$ echo "Need more help?"</div>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-mono text-sm"
          >
            <ChevronRight className="w-4 h-4" />
            ./contact_support.sh
          </a>
        </div>
      </div>
    </section>
  );
}
