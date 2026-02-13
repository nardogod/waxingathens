"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-apple-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-apple-gray-200 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-apple-text-secondary" />
      </div>
      <h1 className="text-xl font-semibold text-apple-text mb-2">
        Something went wrong
      </h1>
      <p className="text-apple-text-secondary text-sm mb-6 max-w-xs">
        We couldn’t load this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-apple-accent text-white rounded-apple font-medium touch-feedback"
        aria-label="Try again"
      >
        Try again
      </button>
    </div>
  );
}
