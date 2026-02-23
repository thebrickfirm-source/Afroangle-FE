import { ALL_ARTICLES_QUERY_RESULT } from "@/sanity/types";
import ArticleMeta from "../../common/ArticleMeta";
import LocaleLink from "@/components/common/LocaleLink";

interface FeaturedArticleProps {
  article: ALL_ARTICLES_QUERY_RESULT[number];
}
// 2. Sub-component for the Main Feature
const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0)), url(${article.mainImage})`,
  };
  const extract =
    article.excerpt.length > 240
      ? article.excerpt.slice(0, 210) + "…"
      : article.excerpt;
  return (
    <article
      style={backgroundStyle}
      className={`w-full h-full min-h-140 flex items-end lg:p-8 p-4 relative bg-cover bg-center bg-no-repeat`}
    >
      <div className="lg:w-3/5 space-y-3">
        <LocaleLink
          href={`/articles/${article.slug}`}
          className="active::underline hover:underline decoration-primary-red decoration-2"
        >
          <h2
            className={`font-extrabold tracking-wide uppercase ${
              article?.title.length > 80
                ? "lg:text-2xl text-xl"
                : article?.title.length > 50
                  ? "lg:text-3xl text-xl"
                  : "lg:text-4xl text-2xl"
            }`}
          >
            {article.title}
          </h2>
        </LocaleLink>

        <ArticleMeta author={article.author} date={article.publishedAt} />
        <LocaleLink href={`/articles/${article.slug}`}>
          <p className="font-secondary leading-tight">{extract}</p>
        </LocaleLink>
      </div>

      {/* Floating Category Badge */}
      <div className="slant-left lg:bottom-0 top-0 lg:top-auto lg:py-5 bg-neutral lg:pr-12 lg:pl-24 py-4 pr-5 pl-10 right-0">
        <LocaleLink href={`/categories/${article.category.slug}`}>
          <h4 className="text-primary-red font-secondary text-xl lg:text-4xl">
            {article.category.name}
          </h4>
        </LocaleLink>
      </div>
    </article>
  );
};

export default FeaturedArticle;
