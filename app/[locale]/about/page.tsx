import AboutPageContent from "@/components/AboutPage";
import { Metadata } from "next";

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Afroangle, our mission, and the team behind the African lens for global issues.",
};

const About = async ({ params }: AboutPageProps) => {
  const { locale } = await params;
  return (
    <main className="">
      <AboutPageContent locale={locale} />
    </main>
  );
};

export default About;
