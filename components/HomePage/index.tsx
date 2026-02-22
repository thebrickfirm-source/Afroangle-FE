import ArticleList from "../ArticleList";
import CategoryNav from "../common/CategoryNav";
import Hero from "@/components/HomePage/Hero";
import { getAllCategories } from "@/sanity/services/categoryService";
import { getAllArticles } from "@/sanity/services/articleService";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";

const HomePage = async ({ locale }: { locale: string }) => {
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const categories = await getAllCategories();
  const articles = (await getAllArticles(locale)).data;

  return (
    <>
      <CategoryNav categories={categories} />
      <Hero articles={articles.slice(0, 3)} />
      <ArticleList
        heading={dict.categories.topIdea}
        subheading={dict.categories.subheading}
        articles={articles}
        dict={dict}
        center={true}
      />
    </>
  );
};

export default HomePage;
