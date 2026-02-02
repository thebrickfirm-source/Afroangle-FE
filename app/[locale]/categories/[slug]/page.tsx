import CategoryPage from "@/components/CategoryPage";
import { getCategoryBySlug } from "@/sanity/services/categoryService";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
    },
  };
}
const Category = async ({ params }: CategoryPageProps) => {
  const { slug, locale } = await params;
  return (
    <main className="">
      <CategoryPage slug={slug} locale={locale} />
    </main>
  );
  s;
};

export default Category;
