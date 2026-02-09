import Image from "next/image";
import SocialLink, { PlatformType } from "./SocialLink";

// 1. Define the interface for a single social object
interface SocialItem {
  platform: PlatformType;
  url: string;
}

// 2. Define the Author structure
interface Author {
  name: string;
  bio?: string; // Optional field
  socials: SocialItem[];
  image?: string;
  alt?: string;
}

// 3. Define the Props for this component
interface AuthorHeroProps {
  author: Author;
}

const AuthorHero = ({ author }: AuthorHeroProps) => {
  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 lg:px-24 space-y-6 border-b border-b-gray-400 mb-8 pb-2">
      <header className="space-y-3">
        <h1 className="text-7xl uppercase font-bold">{author.name}</h1>

        {author.bio && (
          <p className="font-secondary max-w-5xl text-gray-700">{author.bio}</p>
        )}
      </header>

      <div className="flex gap-4 items-center">
        {author.socials?.map((social, index) => (
          <SocialLink
            key={`${social.platform}-${index}`}
            platform={social.platform}
            url={social.url}
          />
        ))}
      </div>

      {author.image && (
        <figure className="space-y-4">
          <Image
            src={author.image}
            alt={author.alt || author.name || "Author photo"}
            width={800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="h-auto w-full max-w-xl object-contain"
            loading="lazy"
          />

          {author.alt && (
            <figcaption className="max-w-2xl w-full text-sm text-gray-600 italic">
              {author.alt}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
};

export default AuthorHero;
