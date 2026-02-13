"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { MapPin, Instagram } from "lucide-react";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import ServiceDetail from "@/components/ServiceDetail";
import Cart from "@/components/Cart";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";
import CookieConsent from "@/components/CookieConsent";
import FAQ from "@/components/FAQ";
import { useCartStore, services, getTravelFee } from "@/lib/store/cart-store";
import { useToastStore } from "@/lib/store/toast-store";
import type { Service } from "@/lib/store/cart-store";

const CATEGORIES: {
  id: Service["category"];
  labelEn: string;
  labelPt: string;
}[] = [
  { id: "face", labelEn: "Face", labelPt: "Rosto" },
  { id: "body", labelEn: "Body", labelPt: "Corpo" },
  { id: "intimate", labelEn: "Intimate", labelPt: "Íntimo" },
];

const VALID_LOCALES = ["en", "pt"] as const;

export default function LocalePage() {
  const params = useParams();
  const rawLocale = (params?.locale as string) || "en";
  const locale = VALID_LOCALES.includes(rawLocale as (typeof VALID_LOCALES)[number])
    ? rawLocale
    : "en";
  const isPt = locale === "pt";

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const {
    items: cartItems,
    isOpen: cartOpen,
    setCartOpen,
    addItem,
    removeItem,
    clearCart,
    getTotalItems: cartCount,
    getWhatsAppMessage,
  } = useCartStore();

  const showToast = useToastStore((s) => s.show);
  const addItemWithToast = useCallback(
    (service: Service) => {
      addItem(service);
      showToast(isPt ? "Adicionado!" : "Added!");
    },
    [addItem, showToast, isPt]
  );

  const handleCheckout = useCallback(() => {
    const num =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511995102916";
    const msg = getWhatsAppMessage(locale);
    if (!msg) return;
    window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
  }, [locale, getWhatsAppMessage]);

  const isInCart = (serviceId: string) =>
    cartItems.some((i) => i.service.id === serviceId);
  const getQuantity = (serviceId: string) =>
    cartItems.find((i) => i.service.id === serviceId)?.quantity ?? 0;

  const travelFee = getTravelFee(locale);
  const travelFeeFormatted = isPt
    ? `R$ ${travelFee.toFixed(2).replace(".", ",")}`
    : `€${travelFee}`;

  return (
    <main className="min-h-screen bg-apple-bg pb-24">
      <Header locale={locale} />

      <div className="max-w-md mx-auto px-4 pt-4">
        <p className="mb-2 flex items-center gap-1.5 text-left font-serif text-xs italic tracking-[0.1em] text-apple-text/90">
          by Lais Santana <span className="not-italic" aria-hidden>💄</span>
          <a
            href="https://instagram.com/lais.santana_lk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 text-apple-text/80 hover:text-apple-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-accent rounded"
            aria-label="Instagram @lais.santana_lk"
          >
            <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        </p>
        <div className="mb-3 flex items-center justify-center gap-2 py-2 px-3 rounded-apple bg-apple-accent/10 text-apple-text text-xs font-medium">
          {isPt ? "Só atende mulheres" : "Women only"}
        </div>
        <div className="mb-6 flex items-center gap-2 text-apple-text-secondary text-sm bg-apple-surface rounded-apple px-4 py-3 shadow-apple">
          <MapPin className="w-4 h-4 text-apple-accent shrink-0" />
          <span>
            {isPt
              ? `Taxa de deslocamento: ${travelFeeFormatted} (fixa)`
              : `Travel fee: ${travelFeeFormatted} (fixed) - We serve all Athens`}
          </span>
        </div>

        <h2 className="text-xl font-bold text-apple-text mb-4">
          {isPt ? "Nossos Serviços" : "Our Services"}
        </h2>

        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="mb-6">
            <h3 className="text-sm font-semibold text-apple-text-secondary uppercase tracking-wide mb-3 px-1">
              {isPt ? cat.labelPt : cat.labelEn}
            </h3>
            <div className="space-y-3">
              {services
                .filter((s) => s.category === cat.id)
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    locale={locale}
                    onSelect={setSelectedService}
                    onAdd={addItemWithToast}
                    isInCart={isInCart(service.id)}
                    quantity={getQuantity(service.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      <FAQ locale={locale} />

      <Toast />
      <CookieConsent />

      <AnimatePresence mode="wait">
        {selectedService ? (
          <ServiceDetail
            key={selectedService.id}
            service={selectedService}
            locale={locale}
            onClose={() => setSelectedService(null)}
            onAdd={addItemWithToast}
            isInCart={isInCart(selectedService.id)}
          />
        ) : null}
      </AnimatePresence>

      <Cart
        locale={locale}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeItem}
        onClear={clearCart}
        onCheckout={handleCheckout}
      />

      <BottomNav
        locale={locale}
        cartCount={cartCount()}
        onHome={() => setCartOpen(false)}
        onCart={() => setCartOpen(true)}
      />
    </main>
  );
}
