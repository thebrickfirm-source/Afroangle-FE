import ArticleMeta from "../common/ArticleMeta";
import { ARTICLES_BY_CATEGORY_QUERY_RESULT } from "@/sanity/types";
import LocaleLink from "../common/LocaleLink";

interface ArticleSpotlightProps {
  article: ARTICLES_BY_CATEGORY_QUERY_RESULT[number];
  dict: {
    list: {
      topArticle: string;
      noArticles: string;
      featured: string;
      catchUp: string;
    };
  };
}

const ArticleSpotlight = ({ article, dict }: ArticleSpotlightProps) => {
  const extract =
    article.excerpt.length > 400
      ? article.excerpt.slice(0, 400) + "…"
      : article.excerpt;
  const linkPath = `/articles/${article.slug}`;
  return (
    <div className="flex flex-col lg:flex-row lg:gap-9 gap-6 lg:mt-8 mt-4 lg:mb-20 mb-12 w-full max-w-screen-xl mx-auto px-4 lg:px-16">
      {/* LEFT SIDE: IMAGE (Wrapped in Link) */}
      <div className="lg:w-1/2">
        <LocaleLink href={linkPath} className="block w-full">
          <div
            className="w-full lg:p-8 p-4 relative h-120 lg:h-110 bg-cover bg-center bg-no-repeat cursor-pointer hover:opacity-95 transition-opacity"
            style={{ backgroundImage: `url(${article.mainImage})` }}
          >
            <div className="top-banner-slant lg:py-5 py-3 pr-8 pl-10 bg-neutral lg:pr-12 lg:pl-18 ">
              <h4 className="text-primary-red font-secondary lg:text-3xl text-2xl capitalize">
                {dict.list.topArticle}
              </h4>
            </div>
            <div className="slant-left bottom-0 lg:py-5 py-3 bg-neutral pr-8 lg:pr-12 pl-18 lg:pl-24 right-0">
              <h4 className="text-primary-red font-secondary lg:text-3xl text-2xl capitalize">
                {article.category.name}
              </h4>
            </div>
          </div>
        </LocaleLink>
      </div>

      {/* RIGHT SIDE: CONTENT */}
      <div className="flex flex-col justify-center lg:gap-8 gap-4 lg:w-2/5 w-full">
        {/* TITLE (Wrapped in Link) */}
        <LocaleLink
          href={linkPath}
          className="hover:underline decoration-primary-red decoration-2"
        >
          <h2
            className={`font-extrabold ${
              article?.title.length > 80
                ? "text-2xl lg:text-3xl"
                : "text-3xl lg:text-4xl"
            }`}
          >
            {article.title}
          </h2>
        </LocaleLink>

        <ArticleMeta author={article.author} date={article.publishedAt} large />
        <p className="font-secondary lg:leading-tight lg:text-lg">{extract}</p>
      </div>
    </div>
  );
};

export default ArticleSpotlight;
