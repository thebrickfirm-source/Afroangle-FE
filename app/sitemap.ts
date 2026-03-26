// app/sitemap.ts
import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace this with your actual production URL later!
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://afroangle.com";

  // Fetch all published articles with their language and update times
  const query = `*[_type == "article" && !(_id in path('drafts.**'))] {
    "slug": slug.current,
    language,
    _updatedAt
  }`;
  const categoriesQuery = `*[_type == "category"] {
    "slug": slug.current,
    language,
    _updatedAt
  }`;
  const authorQuery = `*[_type == "author"] {
    "slug": slug.current,
    language,
    _updatedAt
  }`;
  const articles = await client.fetch(query);
  const categories = await client.fetch(categoriesQuery);
  const authors = await client.fetch(authorQuery);
  
  // Map the articles to sitemap URL objects
  const articleUrls: MetadataRoute.Sitemap = articles.map((article: any) => ({
    url: `${baseUrl}/${article.language}/articles/${article.slug}`,
    lastModified: article._updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));
  // map the categories and authors to sitemap URL objects
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category: any) => ({
    url: `${baseUrl}/${category.language}/categories/${category.slug}`,
    lastModified: category._updatedAt, 
    changeFrequency: "weekly",  
    priority: 0.7,
  }));

  const authorUrls: MetadataRoute.Sitemap = authors.map((author: any) => ({
    url: `${baseUrl}/${author.language}/authors/${author.slug}`,  
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Add your static localized routes (Home, Categories index, etc.)
  const localizedRoutes: MetadataRoute.Sitemap = ["en", "fr"].map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  }));
  const staticRoutes: MetadataRoute.Sitemap = ["en", "fr"].flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}/about`,
    },
    {url: `${baseUrl}/${lang}/submit-piece`,},
  ]);

  return [...localizedRoutes, ...staticRoutes, ...authorUrls, ...categoryUrls, ...articleUrls, ];
}
