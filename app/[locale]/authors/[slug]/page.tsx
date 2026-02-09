import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAuthorBySlug } from "@/sanity/services/authorService";
import AuthorPageContent from "@/components/AuthorPage";

interface AuthorPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    return {
      title: "Author does not exist",
    };
  }

  return {
    title: author.name,
    description: `${author.bio} - Afroangle`,
    openGraph: {
      title: author.name || "Afroangle",
      description: `${author.name} - Afroangle`,
      images: author.mainImage?.url ? [author.mainImage.url] : [],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug, locale } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    notFound();
  }
  return <AuthorPageContent author={author} locale={locale} />;
}
