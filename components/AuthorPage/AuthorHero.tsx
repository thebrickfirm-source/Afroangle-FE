import Image from "next/image";

interface HeroProps {
  name: string;
  bio: string;
  social: any[];
}

const AuthorHero = ({ author }: HeroProps) => {
  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 lg:px-24 space-y-8 border-b border-b-gray-400 mb-8 pb-2">
      <header className="space-y-3">
        <h1 className="text-7xl uppercase font-bold">{author?.name}</h1>

        {author?.bio ? (
          <p className="font-secondary max-w-5xl">{author.bio}</p>
        ) : (
          ""
        )}
      </header>

      {author?.image ? (
        <figure className="space-y-4">
          <Image
            src={author.image}
            alt={author?.alt || author?.name || "Author photo"}
            width={800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 800px"
            className="h-auto w-full max-w-xl object-contain"
            loading="lazy"
          />

          {author?.alt ? (
            <figcaption className="max-w-2xl w-full text-sm text-gray-600">
              {author.alt}
            </figcaption>
          ) : (
            ""
          )}
        </figure>
      ) : null}

      {author.socials && {}}
    </section>
  );
};
export default AuthorHero;
