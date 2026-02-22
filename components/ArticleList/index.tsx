import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import ArticleItem from "./ArticleItem";

type Dict = {
  articles: {
    list: {
      noArticles: string;
    };
  };
};

interface ArticleListProps {
  heading: string;
  subheading: string;
  center?: boolean;
  articles: ALL_ARTICLES_QUERY_RESULT;
  dict: Dict;
}

const ArticleList = async ({
  heading,
  subheading,
  center = false,
  articles,
  dict,
}: ArticleListProps) => {
  return (
    <section className={`w-full max-w-5xl px-4 ${center ? "mx-auto" : ""}`}>
      <div className={`${center ? "text-center" : ""} space-y-3 mb-8 lg:mb-14`}>
        <h2 className="text-2xl lg:text-3xl tracking-widest mb-0 lg:mb-2 uppercase">
          {heading}
        </h2>
        <p className="text-lg lg:text-xl">{subheading}</p>
      </div>
      <div className="space-y-11 mb-5">
        {articles.length === 0 ? (
          <p className="text-gray-500 italic">
            {dict.articles.list.noArticles}
          </p>
        ) : (
          articles.map((article) => (
            <ArticleItem key={article._id} article={article} />
          ))
        )}
      </div>
    </section>
  );
};

export default ArticleList;
