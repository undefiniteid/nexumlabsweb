"use client";
import { useState } from "react";
import { ParticleText } from "./particle-text";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function GradientAccordion() {
  const faqData: FAQItem[] = [
    {
      question: "¿Qué tipo de soluciones desarrollan en Nexum Labs?",
      answer:
        "Desarrollamos desde automatizaciones internas complejas con IA, hasta plataformas web y bots conversacionales avanzados. Nos adaptamos a las necesidades de tu operativa para reducir costos y aumentar la eficiencia.",
    },
    {
      question: "¿Trabajan exclusivamente con clientes tipo Enterprise?",
      answer:
        "No. Nuestra misión es precisamente democratizar la tecnología de primer nivel. Entregamos soluciones corporativas y escalables tanto a startups que están escalando como a pymes consolidadas.",
    },
    {
      question: "¿Cuánto tiempo tarda la implementación de un proyecto medio?",
      answer:
        "Depende de la complejidad técnica, pero al utilizar stacks modernos y no depender de código heredado, nuestros tiempos oscilan entre 2 y 6 semanas para tener una solución funcional en producción.",
    },
    {
      question: "¿Mis datos y los de mis clientes están seguros?",
      answer:
        "Absolutamente. Implementamos infraestructura y bases de datos seguras (ej. Supabase, PostgreSQL) con estrictos controles de acceso y encriptación. La privacidad y la seguridad son innegociables.",
    },
  ];

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto py-24 px-4 pointer-events-auto">
      <div className="relative inline-flex mb-8 group cursor-default mx-auto text-center w-full justify-center">
        <div className="absolute inset-0 max-w-[200px] mx-auto bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_5px_rgba(168,85,247,0.8)]"></div>
          <span className="text-white/90 text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Preguntas y Respuestas</span>
        </div>
      </div>
      <div className="text-center mb-12">
        <ParticleText text="Resolvemos tus dudas" particleColor="#06b6d4" />
      </div>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="p-[2px] rounded-xl bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-cyan-500/40 relative isolate overflow-hidden group">
      {isOpen && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 blur-xl opacity-30 -z-10 transition-opacity"></div>
      )}
      
      <div className="bg-[#0a0a0a] rounded-[10px] h-full w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center text-left p-6 focus:outline-none hover:bg-white/[0.02] transition-colors duration-200 rounded-[10px]"
        >
          <span className="text-lg font-medium text-white/90">
            {question}
          </span>
          <span
            className={`transform transition-transform duration-300 ml-4 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="p-6 pt-0 border-t border-white/5 mt-0">
            <p className="text-white/60 leading-relaxed font-light mt-4">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
