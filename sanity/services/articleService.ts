import { client } from "@/sanity/lib/client";
import {
  ALL_ARTICLES_QUERY,
  TOTAL_ARTICLES_COUNT,
  ARTICLES_BY_CATEGORY_QUERY,
  ARTICLE_BY_SLUG_QUERY,
} from "../queries/articles";
// Use your existing Article type here
import { TOTAL_CATEGORY_COUNT } from "../queries/categories";
import {
  ALL_ARTICLES_QUERY_RESULT,
  ARTICLE_BY_SLUG_QUERY_RESULT,
  ARTICLES_BY_CATEGORY_QUERY_RESULT,
} from "../types";

// Helper Interface for Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const DEFAULT_LIMIT = 10;

// --- 1. Get All Articles (Paginated) ---
export async function getAllArticles(
  page: number = 1,
  locale: string,
  limit: number = DEFAULT_LIMIT,
): Promise<PaginatedResponse<ALL_ARTICLES_QUERY_RESULT>> {
  const start = (page - 1) * limit;
  const end = start + limit;

  // Run both the data fetch and the count fetch in parallel for speed
  const [data, total] = await Promise.all([
    client.fetch(
      ALL_ARTICLES_QUERY,
      { locale, start, end },
      { next: { revalidate: 3600 } },
    ),
    client.fetch(TOTAL_ARTICLES_COUNT, {}, { next: { revalidate: 3600 } }),
  ]);

  return {
    data,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

// --- 2. Get Articles By Category (Paginated) ---
export async function getArticlesByCategory(
  slug: string,
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
  locale: string,
): Promise<PaginatedResponse<ARTICLES_BY_CATEGORY_QUERY_RESULT>> {
  const start = (page - 1) * limit;
  const end = start + limit;

  const [data, total] = await Promise.all([
    client.fetch(
      ARTICLES_BY_CATEGORY_QUERY,
      { slug, locale, start, end },
      { next: { revalidate: 3600 } },
    ),
    client.fetch(
      TOTAL_CATEGORY_COUNT,
      { slug },
      { next: { revalidate: 3600 } },
    ),
  ]);

  return {
    data,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

// --- 3. Get Single Article (No Pagination Needed) ---
export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<ARTICLE_BY_SLUG_QUERY_RESULT | null> {
  return await client.fetch(
    ARTICLE_BY_SLUG_QUERY,
    { slug, locale },
    { next: { revalidate: 10 } },
  );
}
