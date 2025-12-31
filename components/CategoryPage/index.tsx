import CategoryNav from "../common/CategoryNav";
import ArticleList from "../ArticleList";
import CategoryInfo from "./CategoryInfo";
import ArticleSpotlight from "./ArticleSpolight";
import { article } from "@/data/article";
import { getAllCategories } from "@/sanity/services/categoryService";

const CategoryPage = async () => {
  const categories = await getAllCategories();
  const category = "culture"; // Replace with dynamic category name based on slug
  return (
    <>
      <CategoryInfo
        slug={`culture`}
        name={`culture`}
        description={`Writers explore the depths of our cultural heritage and how it shapes who we are and who we’ll be`}
      />
      <CategoryNav categories={categories} />
      <ArticleSpotlight article={article} />
      <div className="border-t border-t-black/30">
        <div className="max-w-screen-xl mx-auto px-16 py-12">
          <ArticleList
            heading={`Read more of ${category}`}
            subheading="Our top analyses, debates, ideas and stories of the week."
          />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
