"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

const STORAGE_KEY = "waxing-cookie-consent";

export default function CookieConsent() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setAccepted(raw === "accepted" || raw === "declined");
    } catch {
      setAccepted(false);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setAccepted(true);
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {}
    setAccepted(true);
  };

  const isPt = locale === "pt";

  if (!mounted || accepted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-[55] border-t border-apple-border bg-apple-surface p-4 shadow-apple-float safe-area-bottom"
      >
        <p className="text-sm text-apple-text mb-3">
          {isPt
            ? "Usamos cookies para salvar suas preferências (idioma e reserva)."
            : "We use cookies to save your preferences (language and booking)."}
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="flex-1 py-2.5 rounded-apple border border-apple-border text-apple-text text-sm font-medium touch-feedback"
          >
            {isPt ? "Recusar" : "Decline"}
          </button>
          <button
            onClick={accept}
            className="flex-1 py-2.5 rounded-apple bg-apple-accent text-white text-sm font-medium touch-feedback"
          >
            {isPt ? "Aceitar" : "Accept"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
