import { groq } from "next-sanity";

// Fetch all articles for the homepage
export const ALL_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    publishedAt
  }
`;

// Fetch a single article by slug
export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    content,
    "author": author->name
  }
`;
