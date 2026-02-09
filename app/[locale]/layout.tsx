import type { Metadata } from "next";
import { Rokkitt, Kumbh_Sans } from "next/font/google";
import Header from "@/components/common/Header";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/locales";
import Footer from "@/components/common/Footer";

const rokkitt = Rokkitt({
  variable: "--font-rokkitt",
  subsets: ["latin"],
});

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://afroangle.com"),

  title: {
    default: "Afroangle",
    template: "%s | Afroangle",
  },

  description: "The African lens for global issues",

  openGraph: {
    type: "website",
    url: "https://afroangle.com",
    siteName: "Afroangle",
    title: "Afroangle - The African lens for global issues",
    description:
      "The Afroangle publication believes that great journalism has the power to make each reader's life richer and more fulfilling, and all of society stronger and more just.",
    images: [
      {
        url: "/og-image.jpeg", // Located at: public/og-image.png
        width: 1200,
        height: 630,
        alt: "Afroangle - The African lens for global issues",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Afroangle - The African lens for global issues",
    description:
      "The Afroangle publication believes that great journalism has the power to make each reader's life richer and more fulfilling, and all of society stronger and more just.",
    images: ["/og-image.jpeg"], // Removed /public/
  },

  icons: {
    // If icon is in public folder
    icon: "/favicon.ico",
    // Or if using the Next.js specialized icon file in the app dir,
    // you don't even need to include it in the metadata object;
    // just name it icon.png inside the [locale] folder.
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body className={`${rokkitt.variable} ${kumbhSans.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
