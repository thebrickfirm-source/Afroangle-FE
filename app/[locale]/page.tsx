import HomePage from "@/components/HomePage";
import { locales } from "../../i18n/locales";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main className="">
      <HomePage locale={locale} />
    </main>
  );
}
