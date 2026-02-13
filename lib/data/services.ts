export type ServiceCategory = "face" | "body" | "intimate";

export interface Service {
  id: string;
  name: string;
  namePt: string;
  priceBrl: number;
  priceEur: number;
  duration: number;
  description: string;
  descriptionPt: string;
  includes: string[];
  includesPt: string[];
  category: ServiceCategory;
}

/** Preço do serviço conforme o idioma: PT = Brasil (R$), EN = Grécia/Atenas (€) */
export function getServicePrice(
  service: Service | { priceBrl?: number; priceEur?: number; price?: number },
  locale: string
): number {
  const s = service as Record<string, number | undefined>;
  if (locale === "pt") {
    const v = s.priceBrl ?? s.price;
    return typeof v === "number" ? v : 0;
  }
  const v = s.priceEur ?? s.price;
  return typeof v === "number" ? v : 0;
}

export const services: Service[] = [
  {
    id: "buco",
    name: "Upper Lip",
    namePt: "Buço",
    priceBrl: 15,
    priceEur: 7,
    duration: 10,
    description: "Gentle waxing for upper lip area. Women only.",
    descriptionPt: "Depilação suave na área do buço.",
    includes: ["Pre-wax cleansing", "Premium hard wax", "Post-wax soothing"],
    includesPt: ["Limpeza pré-depilação", "Cera de qualidade", "Gel pós-depilação"],
    category: "face",
  },
  {
    id: "axila",
    name: "Underarms",
    namePt: "Axila",
    priceBrl: 25,
    priceEur: 10,
    duration: 15,
    description: "Quick and effective underarm waxing. Women only.",
    descriptionPt: "Depilação rápida e eficaz das axilas.",
    includes: ["Skin prep", "Hard wax", "Aftercare advice"],
    includesPt: ["Preparação da pele", "Cera dura", "Cuidados pós-procedimento"],
    category: "body",
  },
  {
    id: "virilha-simples",
    name: "Bikini Line",
    namePt: "Virilha simples",
    priceBrl: 35,
    priceEur: 15,
    duration: 20,
    description: "Bikini line waxing. Women only.",
    descriptionPt: "Depilação da virilha simples (linha do biquíni).",
    includes: ["Discreet service", "Gentle technique", "Sensitive skin care"],
    includesPt: ["Atendimento discreto", "Técnica suave", "Cuidado com pele sensível"],
    category: "intimate",
  },
  {
    id: "virilha-completa",
    name: "Full Bikini",
    namePt: "Virilha completa",
    priceBrl: 50,
    priceEur: 20,
    duration: 30,
    description: "Full bikini wax. Women only.",
    descriptionPt: "Depilação virilha completa.",
    includes: ["Complete removal", "Hard wax for less pain", "Intimate area care"],
    includesPt: ["Remoção completa", "Cera dura para menos dor", "Cuidado área íntima"],
    category: "intimate",
  },
  {
    id: "meia-perna",
    name: "Half Legs",
    namePt: "Meia perna",
    priceBrl: 40,
    priceEur: 15,
    duration: 25,
    description: "Lower or upper legs waxing. Women only.",
    descriptionPt: "Depilação meia perna (panturrilha ou coxa).",
    includes: ["Leg prep", "Hard wax technique", "Moisturizing finish"],
    includesPt: ["Preparação", "Técnica de cera dura", "Hidratação final"],
    category: "body",
  },
  {
    id: "perna-inteira",
    name: "Full Legs",
    namePt: "Perna inteira",
    priceBrl: 70,
    priceEur: 22,
    duration: 40,
    description: "Full leg waxing from thigh to ankle. Women only.",
    descriptionPt: "Depilação perna inteira (da coxa ao tornozelo).",
    includes: ["Exfoliation", "Full leg wax", "Soothing treatment"],
    includesPt: ["Esfoliação", "Cera em toda a perna", "Tratamento calmante"],
    category: "body",
  },
  {
    id: "bracos",
    name: "Arms",
    namePt: "Braços",
    priceBrl: 35,
    priceEur: 18,
    duration: 25,
    description: "Full or half arms waxing. Women only.",
    descriptionPt: "Depilação dos braços.",
    includes: ["Skin prep", "Smooth finish", "Aftercare"],
    includesPt: ["Preparação da pele", "Acabamento liso", "Cuidados pós"],
    category: "body",
  },
  {
    id: "abdomen",
    name: "Abdomen",
    namePt: "Abdômen",
    priceBrl: 30,
    priceEur: 10,
    duration: 15,
    description: "Abdomen / belly waxing. Women only.",
    descriptionPt: "Depilação do abdômen.",
    includes: ["Gentle wax", "Skin care", "Quick service"],
    includesPt: ["Cera suave", "Cuidado com a pele", "Serviço rápido"],
    category: "body",
  },
  {
    id: "costas",
    name: "Back",
    namePt: "Costas",
    priceBrl: 40,
    priceEur: 25,
    duration: 30,
    description: "Back waxing. Women only.",
    descriptionPt: "Depilação das costas.",
    includes: ["Full back coverage", "Hard wax", "Soothing finish"],
    includesPt: ["Cobertura completa", "Cera dura", "Finalização calmante"],
    category: "body",
  },
];

/** Taxa de deslocamento: Brasil (R$), Grécia (€) */
export const TRAVEL_FEE_BRL = 15;
export const TRAVEL_FEE_EUR = 5;

export function getTravelFee(locale: string): number {
  return locale === "pt" ? TRAVEL_FEE_BRL : TRAVEL_FEE_EUR;
}

export function getCurrencySymbol(locale: string): string {
  return locale === "pt" ? "R$" : "€";
}

export function formatPrice(amount: number, locale: string): string {
  const n = Number(amount);
  if (Number.isNaN(n) || !Number.isFinite(n)) return locale === "pt" ? "R$ 0,00" : "€0";
  const symbol = getCurrencySymbol(locale);
  if (locale === "pt") {
    return `${symbol} ${n.toFixed(2).replace(".", ",")}`;
  }
  return `€${Math.round(n)}`;
}
