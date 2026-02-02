// app/articles/[slug]/page.tsx
import { getArticleBySlug } from "@/sanity/services/articleService";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ArticlePageContent from "@/components/ArticlePage";

interface ArticlePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  console.log(locale);
  const article = await getArticleBySlug(slug, locale);
  console.log(article);
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: `${article.title} - Afroangle`,
    openGraph: {
      title: article.title || "Afroangle",
      description: `${article.title} - Afroangle`,
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

  return <ArticlePageContent article={article} />;
}
