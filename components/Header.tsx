"use client";

import Link from "next/link";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const isPt = locale === "pt";
  return (
    <header className="sticky top-0 z-50 bg-apple-surface/90 backdrop-blur-xl border-b border-apple-border safe-area-top">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-apple-text tracking-tight">
            {isPt ? "Depilação Atenas" : "Waxing Athens"}
          </h1>
          <p className="text-xs text-apple-text-secondary">
            {isPt
              ? "Cuidado profissional na sua casa"
              : "Professional care at your home"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/en"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-lg transition-colors touch-feedback ${
              !isPt ? "bg-apple-gray-100 ring-2 ring-apple-accent" : "bg-apple-gray-100 hover:bg-apple-gray-200"
            }`}
            aria-label="English"
          >
            🇺🇸
          </Link>
          <Link
            href="/pt"
            className={`flex items-center justify-center w-10 h-10 rounded-full text-lg transition-colors touch-feedback ${
              isPt ? "bg-apple-gray-100 ring-2 ring-apple-accent" : "bg-apple-gray-100 hover:bg-apple-gray-200"
            }`}
            aria-label="Português"
          >
            🇧🇷
          </Link>
        </div>
      </div>
    </header>
  );
}
