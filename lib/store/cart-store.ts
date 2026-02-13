import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Service } from "@/lib/data/services";
import {
  services,
  getServicePrice,
  getTravelFee,
  getCurrencySymbol,
} from "@/lib/data/services";

export type { Service };

export interface CartItem {
  service: Service;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (service: Service) => void;
  removeItem: (serviceId: string) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getSubtotal: (locale: string) => number;
  getTotal: (locale: string) => number;
  getWhatsAppMessage: (locale: string) => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (service: Service) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.service.id === service.id
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.service.id === service.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { service, quantity: 1 }] };
        });
      },

      removeItem: (serviceId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.service.id !== serviceId),
        }));
      },

      clearCart: () => set({ items: [] }),

      setCartOpen: (open: boolean) => set({ isOpen: open }),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: (locale: string) =>
        get().items.reduce(
          (sum, i) => sum + getServicePrice(i.service, locale) * i.quantity,
          0
        ),

      getTotal: (locale: string) => {
        const { items } = get();
        if (items.length === 0) return 0;
        return get().getSubtotal(locale) + getTravelFee(locale);
      },

      getWhatsAppMessage: (locale: string) => {
        const { items } = get();
        if (items.length === 0) return "";
        const isPt = locale === "pt";
        const subtotal = get().getSubtotal(locale);
        const total = get().getTotal(locale);
        const travelFee = getTravelFee(locale);
        const symbol = getCurrencySymbol(locale);
        const lines = items.map(
          (i) =>
            `- ${isPt ? i.service.namePt : i.service.name}: ${symbol}${locale === "pt" ? getServicePrice(i.service, locale).toFixed(2).replace(".", ",") : getServicePrice(i.service, locale)}`
        );
        const msg = isPt
          ? `Olá! Gostaria de agendar os seguintes serviços:\n\n${lines.join("\n")}\n\nSubtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}\nTaxa de deslocamento: R$ ${travelFee.toFixed(2).replace(".", ",")}\n*Total: R$ ${total.toFixed(2).replace(".", ",")}*\n\nPor favor, me informe as datas disponíveis. Obrigada!`
          : `Hello! I would like to book the following services:\n\n${lines.join("\n")}\n\nSubtotal: €${subtotal}\nTravel fee: €${travelFee}\n*Total: €${total}*\n\nPlease let me know available dates. Thank you!`;
        return encodeURIComponent(msg);
      },
    }),
    {
      name: "waxing-cart-v2",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (s) => ({ items: s.items }),
    }
  )
);

export { services, getTravelFee, getCurrencySymbol };
export { getServicePrice } from "@/lib/data/services";
