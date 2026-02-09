import { client } from "../lib/client";
import { GET_AUTHOR_BY_SLUG } from "../queries/authors";

// get category by slug
export async function getAuthorBySlug(slug: string): Promise<any | null> {
  return await client.fetch(
    GET_AUTHOR_BY_SLUG,
    { slug }, // Default to English locale if not provided
    { next: { revalidate: 3600 } }, // Cache for 1 hour
  );
}
