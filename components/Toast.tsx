"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/lib/store/toast-store";

export default function Toast() {
  const message = useToastStore((s) => s.message);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-24 left-4 right-4 z-[60] mx-auto max-w-md rounded-apple bg-apple-text py-3 px-4 text-center text-sm font-medium text-white shadow-apple-float safe-area-bottom"
          role="status"
          aria-live="polite"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
