import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

const locales = ["en", "pt"] as const;

function resolveParams(
  params: Promise<{ locale: string }> | { locale: string }
): Promise<{ locale: string }> {
  return Promise.resolve(params);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}): Promise<Metadata> {
  const { locale } = await resolveParams(params);
  const isPt = locale === "pt";
  return {
    title: isPt
      ? "Depilação Atenas | Depilação profissional na sua casa"
      : "Waxing Athens | Professional Waxing at Your Home",
    description: isPt
      ? "Depilação brasileira profissional em Atenas. Atendimento no local. Taxa de deslocamento fixa."
      : "Professional Brazilian waxing in Athens. At-home service. Fixed travel fee.",
    openGraph: {
      title: isPt ? "Depilação Atenas" : "Waxing Athens",
      description: isPt
        ? "Depilação profissional na sua casa"
        : "Professional waxing at your home",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await resolveParams(params);
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  let messages: Record<string, unknown> = {};
  let serverLocale = locale;
  try {
    messages = (await getMessages()) as Record<string, unknown>;
    const loc = await getLocale();
    if (loc) serverLocale = loc;
  } catch {
    try {
      messages = (await import(`../../messages/${locale}.json`)).default;
    } catch {
      messages = {};
    }
  }

  return (
    <NextIntlClientProvider locale={serverLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
