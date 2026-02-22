import ArticleMeta from "../common/ArticleMeta";
import ArticleHeader from "./ArticleHeader";
import ArticleImage from "./ArticleImage";
import { components } from "../SanityComponents/PortableTextComponents";
import { ARTICLE_BY_SLUG_QUERY_RESULT } from "@/sanity/types";
import Comments from "./Comments";
import AudioPlayer from "./AudioPlayer";
import CommentForm from "./AddComment";
import { PortableText } from "@portabletext/react";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";
import { notFound } from "next/navigation";

interface ArticlePageContentProps {
  locale: string;
  article: ARTICLE_BY_SLUG_QUERY_RESULT;
}

export default async function ArticlePageContent({
  locale,
  article,
}: ArticlePageContentProps) {
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main>
      <section className="mx-auto max-w-screen-xl py-8 lg:py-12">
        <ArticleHeader category={article?.category} />

        <article className="space-y-4 px-4 lg:space-y-8 lg:px-24">
          <h1 className="text-3xl font-bold italic lg:w-11/12 lg:text-6xl capitalize">
            {article?.title}
          </h1>

          <div className="flex gap-2">
            <p className="text-lg">{dict.articles.metadata.by}</p>
            <ArticleMeta
              large
              author={article?.author}
              date={article?.publishedAt}
            />
          </div>

          <div className="">
            <ArticleImage
              src={article.mainImage.url!}
              caption={article.mainImage.caption!}
            />
            <hr className="text-black/30 mt-10" />
            <AudioPlayer src={article.audioUrl} dict={dict} />
            <hr className="text-black/30" />
          </div>

          <div className="prose prose-blue prose-lg max-w-3xl mx-auto">
            <PortableText value={article?.content} components={components} />
          </div>

          <div className="">
            <Comments id={article._id} locale={locale} dict={dict} />
            <CommentForm locale={locale} postId={article?._id!} dict={dict} />
          </div>
        </article>
      </section>
    </main>
  );
}
