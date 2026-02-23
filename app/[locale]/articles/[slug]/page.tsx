import { getArticleBySlug } from "@/sanity/services/articleService";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticlePageContent from "@/components/ArticlePage";
import { getDictionary, hasLocale } from "@/app/[locale]/dictionaries";

interface ArticlePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const seo = dict.common.seo.home;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: seo.defaultTitle,
    };
  }
  return {
    title: article.title,
    description: `${article.title} - ${seo.defaultTitle}`,
    openGraph: {
      title: article.title || seo.ogTitle,
      description: `${article.title} - ${seo.defaultTitle}`,
      images: article.mainImage?.url ? [article.mainImage.url] : [],
    },
  };
}
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);
  if (!article) {
    notFound();
  }
  return <ArticlePageContent article={article} locale={locale} />;
}
