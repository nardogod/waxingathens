"use client";

import { motion } from "framer-motion";
import { Home, ShoppingBag } from "lucide-react";

interface BottomNavProps {
  locale: string;
  cartCount: number;
  onHome: () => void;
  onCart: () => void;
}

export default function BottomNav({
  locale,
  cartCount,
  onHome,
  onCart,
}: BottomNavProps) {
  const isPt = locale === "pt";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-apple-surface/90 backdrop-blur-xl border-t border-apple-border safe-area-bottom z-40">
      <div className="max-w-md mx-auto px-6 py-2 flex items-center justify-around">
        <button
          onClick={onHome}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors text-apple-accent"
          aria-label={isPt ? "Início" : "Home"}
        >
          <Home className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] font-medium">
            {isPt ? "Início" : "Home"}
          </span>
        </button>

        <button
          onClick={onHome}
          className="flex flex-col items-center justify-center w-14 h-14 -mt-6 rounded-full shadow-apple-lg transition-all touch-feedback bg-apple-accent text-white scale-110"
          aria-label={isPt ? "Início" : "Home"}
        >
          <Home className="w-6 h-6" strokeWidth={2.5} />
        </button>

        <button
          onClick={onCart}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors text-apple-text-secondary hover:text-apple-accent relative"
          aria-label={isPt ? "Reserva" : "Booking"}
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" strokeWidth={2} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 bg-apple-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </div>
          <span className="text-[10px] font-medium">
            {isPt ? "Reserva" : "Booking"}
          </span>
        </button>
      </div>
    </nav>
  );
}
