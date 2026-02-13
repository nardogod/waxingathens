"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check, Clock, Sparkles } from "lucide-react";
import type { Service } from "@/lib/data/services";
import { getServicePrice, formatPrice } from "@/lib/data/services";

interface ServiceDetailProps {
  service: Service | null;
  locale: string;
  onClose: () => void;
  onAdd: (service: Service) => void;
  isInCart: boolean;
}

export default function ServiceDetail({
  service,
  locale,
  onClose,
  onAdd,
  isInCart,
}: ServiceDetailProps) {
  if (!service) return null;

  const isPt = locale === "pt";
  const name = isPt ? service.namePt : service.name;
  const description = isPt ? service.descriptionPt : service.description;
  const includes = isPt ? service.includesPt : service.includes;

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
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 bg-apple-surface rounded-t-[20px] max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-apple-surface border-b border-apple-border px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-apple-text">
              {isPt ? "Detalhes do Serviço" : "Service Details"}
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-apple-gray-100 flex items-center justify-center touch-feedback"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-apple-text-secondary" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[calc(85vh-60px)]">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-apple-text mb-2">
                {name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-apple-text-secondary mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-apple-accent" />
                  <span className="text-apple-accent font-semibold">
                    {formatPrice(getServicePrice(service, locale), locale)}
                  </span>
                </div>
              </div>
              <p className="text-apple-text-secondary leading-relaxed">
                {description}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-apple-text mb-3 uppercase tracking-wide">
                {isPt ? "Inclui" : "Includes"}
              </h4>
              <ul className="space-y-2">
                {includes.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-apple-text"
                  >
                    <div className="w-5 h-5 rounded-full bg-apple-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-apple-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                onAdd(service);
                onClose();
              }}
              className={`w-full py-4 rounded-apple font-semibold text-white flex items-center justify-center gap-2 transition-all touch-feedback ${
                isInCart ? "bg-apple-success" : "bg-apple-accent"
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-5 h-5" />
                  {isPt ? "Adicionado!" : "Added!"}
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  {isPt ? "Adicionar à reserva" : "Add to booking"} -{" "}
                  {formatPrice(getServicePrice(service, locale), locale)}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
