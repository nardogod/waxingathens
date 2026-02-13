"use client";

import { motion } from "framer-motion";
import { Plus, Check, Clock } from "lucide-react";
import type { Service } from "@/lib/data/services";
import { getServicePrice, formatPrice } from "@/lib/data/services";

interface ServiceCardProps {
  service: Service;
  locale: string;
  onSelect: (service: Service) => void;
  onAdd: (service: Service) => void;
  isInCart: boolean;
  quantity?: number;
}

export default function ServiceCard({
  service,
  locale,
  onSelect,
  onAdd,
  isInCart,
  quantity = 0,
}: ServiceCardProps) {
  const isPt = locale === "pt";
  const name = isPt ? service.namePt : service.name;
  const description = isPt ? service.descriptionPt : service.description;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(service)}
      className="bg-apple-surface rounded-apple shadow-apple border border-apple-border overflow-hidden touch-feedback cursor-pointer"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-apple-text leading-tight mb-1">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-apple-text-secondary mb-2">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{service.duration} min</span>
            </div>
            <p className="text-xs text-apple-text-secondary line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-lg font-bold text-apple-accent">
              {formatPrice(getServicePrice(service, locale), locale)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(service);
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all touch-feedback ${
                isInCart
                  ? "bg-apple-success text-white"
                  : "bg-apple-accent text-white hover:opacity-90"
              }`}
              aria-label={isInCart ? "Added" : "Add to booking"}
            >
              {isInCart ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
            {quantity > 0 && (
              <span className="text-[10px] font-medium text-apple-success">
                {quantity}x
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
