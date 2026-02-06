import Image from "next/image";

interface HeroProps {
  name: string;
  bio: string;
  social: any[];
}

const AuthorHero = ({ author }: HeroProps) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-24 space-y-8 mb-8">
      <h1 className="text-7xl capitalize font-bold">{author.name}</h1>
      <p className="font-secondary">{author.bio}</p>
      <Image
        src={author.image}
        alt={author.alt}
        width={600}
        height={300}
        className="h-auto w-full object-contain"
      />
    </div>
  );
};
export default AuthorHero;
