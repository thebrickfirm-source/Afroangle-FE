import { groq } from "next-sanity";

export const GET_AUTHOR_BY_SLUG = groq` 
  *[_type=="author" && slug.current==$slug][0]{
    name, bio,
    "image": image.asset->url,
    "alt": image.alt,
    socials[]{platform, url}
  }`;

export const ARTICLES_IN_AUTHOR_COUNT = groq`
  count(*[_type == "article" && $slug in author[]->slug.current])
  `;
