"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, MessageCircle, MapPin } from "lucide-react";
import type { Service } from "@/lib/data/services";
import {
  getServicePrice,
  getTravelFee,
  formatPrice,
} from "@/lib/data/services";

export interface CartItem {
  service: Service;
  quantity: number;
}

interface CartProps {
  locale: string;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (serviceId: string) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export default function Cart({
  locale,
  isOpen,
  onClose,
  items,
  onRemove,
  onClear,
  onCheckout,
}: CartProps) {
  const [checkoutDisabled, setCheckoutDisabled] = useState(false);
  const isPt = locale === "pt";
  const travelFee = getTravelFee(locale);
  const subtotal = items.reduce(
    (sum, item) => sum + getServicePrice(item.service, locale) * item.quantity,
    0
  );
  const total = items.length > 0 ? subtotal + travelFee : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-apple-surface shadow-apple-float"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="sticky top-0 bg-apple-surface border-b border-apple-border px-4 py-4 flex items-center justify-between safe-area-top">
              <h2 className="text-lg font-semibold text-apple-text">
                {isPt ? "Sua Reserva" : "Your Booking"}
              </h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-apple-gray-100 flex items-center justify-center touch-feedback"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-apple-text-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-apple-gray-100 flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-apple-text-secondary" />
                  </div>
                  <p className="text-apple-text-secondary">
                    {isPt
                      ? "Nenhum serviço selecionado"
                      : "No services selected"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const price = getServicePrice(item.service, locale);
                    const lineTotal = price * item.quantity;
                    return (
                      <motion.div
                        key={item.service.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-apple-gray-100 rounded-apple p-3 flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-apple-text truncate">
                            {isPt ? item.service.namePt : item.service.name}
                          </h4>
                          <p className="text-xs text-apple-text-secondary">
                            {item.quantity}x {formatPrice(price, locale)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-apple-text">
                            {formatPrice(lineTotal, locale)}
                          </span>
                          <button
                            onClick={() => onRemove(item.service.id)}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center touch-feedback"
                            aria-label={isPt ? "Remover" : "Remove"}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}

                  <button
                    onClick={onClear}
                    className="w-full py-2 text-xs text-apple-text-secondary hover:text-red-500 transition-colors"
                  >
                    {isPt ? "Limpar tudo" : "Clear all"}
                  </button>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="sticky bottom-0 bg-apple-surface border-t border-apple-border p-4 safe-area-bottom">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-apple-text-secondary">
                      {isPt ? "Subtotal" : "Subtotal"}
                    </span>
                    <span className="text-apple-text">
                      {formatPrice(subtotal, locale)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-apple-text-secondary flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {isPt ? "Taxa de deslocamento" : "Travel fee"}
                    </span>
                    <span className="text-apple-text">
                      {formatPrice(travelFee, locale)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base font-semibold pt-2 border-t border-apple-border">
                    <span className="text-apple-text">
                      {isPt ? "Total" : "Total"}
                    </span>
                    <span className="text-apple-accent text-xl">
                      {formatPrice(total, locale)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutDisabled(true);
                    onCheckout();
                    setTimeout(() => setCheckoutDisabled(false), 3000);
                  }}
                  disabled={checkoutDisabled}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-70 text-white rounded-apple font-semibold flex items-center justify-center gap-2 transition-colors touch-feedback"
                  aria-label={isPt ? "Reservar via WhatsApp" : "Book via WhatsApp"}
                >
                  <MessageCircle className="w-5 h-5" />
                  {checkoutDisabled
                    ? (isPt ? "Abrindo…" : "Opening…")
                    : isPt
                      ? "Reservar via WhatsApp"
                      : "Book via WhatsApp"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
