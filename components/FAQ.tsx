"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  qEn: string;
  qPt: string;
  aEn: string;
  aPt: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    qEn: "How long does each service take?",
    qPt: "Quanto tempo dura cada serviço?",
    aEn: "Between 10 and 60 minutes depending on the service. Duration is shown on each service card.",
    aPt: "Entre 10 e 60 minutos conforme o serviço. A duração aparece em cada card.",
  },
  {
    qEn: "Do I need to prepare my skin before the appointment?",
    qPt: "Preciso preparar a pele antes do atendimento?",
    aEn: "Hair should be at least 3mm long. Avoid sunbathing and heavy creams on the area 24h before.",
    aPt: "Os pelos devem ter pelo menos 3mm. Evite sol e cremes fortes na área 24h antes.",
  },
  {
    qEn: "What is the travel fee?",
    qPt: "Como funciona a taxa de deslocamento?",
    aEn: "Fixed €5 for all Athens. No surprises — the total is always clear before you book.",
    aPt: "Taxa fixa de R$ 15,00. Sem surpresas — o total fica claro antes de reservar.",
  },
  {
    qEn: "What payment methods do you accept?",
    qPt: "Quais formas de pagamento são aceitas?",
    aEn: "Cash or card at the appointment. We'll confirm when you book via WhatsApp.",
    aPt: "Dinheiro ou cartão no atendimento. Confirmamos quando você reservar pelo WhatsApp.",
  },
];

export default function FAQ({ locale }: { locale: string }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const isPt = locale === "pt";

  return (
    <section className="max-w-md mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-apple-text mb-4">
        {isPt ? "Perguntas frequentes" : "FAQ"}
      </h2>
      <div className="space-y-2">
        {FAQ_DATA.map((item, index) => (
          <div
            key={index}
            className="bg-apple-surface rounded-apple border border-apple-border overflow-hidden"
          >
            <button
              onClick={() => setOpenId(openId === index ? null : index)}
              className="w-full flex items-center justify-between gap-3 py-4 px-4 text-left text-sm font-medium text-apple-text touch-feedback"
              aria-expanded={openId === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span>{isPt ? item.qPt : item.qEn}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-apple-text-secondary transition-transform ${
                  openId === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all duration-200 ${
                openId === index ? "max-h-48" : "max-h-0"
              }`}
            >
              <p className="px-4 pb-4 pt-0 text-sm text-apple-text-secondary">
                {isPt ? item.aPt : item.aEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
