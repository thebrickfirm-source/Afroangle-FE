import LocaleLink from "../common/LocaleLink";
import { getAuthorById } from "@/sanity/services/authorService";

interface AuthorBioProps {
  articleId: string;
}

const AuthorBio = async ({ articleId }: AuthorBioProps) => {
  const author = await getAuthorById(articleId);

  if (!author) {
    return null;
  }

  return (
    <div className="w-full max-w-screen-xl space-y-3 bg-neutral p-6 lg:p-8">
      <LocaleLink href={`/authors/${author.slug}`}>
        <h5 className="font-semibold font-primary capitalize">{author.name}</h5>
      </LocaleLink>
      <p className="font-secondary">{author.bio}</p>
    </div>
  );
};

export default AuthorBio;
