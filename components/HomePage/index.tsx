import { articles } from "@/data/article";
import ArticleList from "../ArticleList";
import CategoryNav from "../common/CategoryNav";
import Hero from "@/components/HomePage/Hero";
import { getAllCategories } from "@/sanity/services/categoryService";

const HomePage = async () => {
  const categories = await getAllCategories();
  return (
    <>
      <CategoryNav categories={categories} />
      <Hero />
      <ArticleList
        heading="THIS WEEK’S TOP IDEAS"
        subheading="Our top analyses, debates, ideas and stories of the week."
        articles={articles}
        center={true}
      />
    </>
  );
};

export default HomePage;
