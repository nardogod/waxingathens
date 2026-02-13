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
  const title = isPt
    ? "Depilação Atenas | by Lais Santana"
    : "Waxing Athens | by Lais Santana";
  const description = isPt
    ? "Depilação profissional na sua casa. Veja preços, monte sua reserva e finalize pelo WhatsApp. Só atende mulheres."
    : "Professional waxing at your home. See prices, build your booking and finish via WhatsApp. Women only.";
  return {
    title: isPt
      ? "Depilação Atenas | Depilação profissional na sua casa"
      : "Waxing Athens | Professional Waxing at Your Home",
    description: isPt
      ? "Depilação brasileira profissional. Atendimento no local. Taxa de deslocamento fixa. Reserve pelo WhatsApp."
      : "Professional Brazilian waxing. At-home service. Fixed travel fee. Book via WhatsApp.",
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Waxing Athens",
      locale: isPt ? "pt_BR" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "By Lais Santana - Depilação profissional",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
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
