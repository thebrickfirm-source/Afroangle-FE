import AboutPageContent from "@/components/AboutPage";
import { Metadata } from "next";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const seo = dict.common.seo.about;

  return {
    title: seo.title,
    description: seo.description,
  };
}

const About = async ({ params }: AboutPageProps) => {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main className="">
      <AboutPageContent locale={locale} dict={dict} />
    </main>
  );
};

export default About;
