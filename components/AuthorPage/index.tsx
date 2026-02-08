import { getArticlesByAuthor } from "@/sanity/services/articleService";
import ArticleList from "../ArticleList";
import AuthorHero from "./AuthorHero";
import AuthorNav from "./AuthorNav";

interface AuthorPageContentProps {
  author: any;
  locale: string;
}
const AuthorPageContent = async ({
  author,
  locale,
}: AuthorPageContentProps) => {
  console.log(author);
  const articles = (await getArticlesByAuthor(author._id, locale)).data;
  return (
    <main className="">
      <AuthorNav />
      <AuthorHero author={author} />
      <section className="max-w-screen-xl mx-auto lg:px-24">
        <ArticleList
          articles={articles}
          heading={`READ MORE FROM ${author.name}`}
          subheading={`This are all the opinion pieces that were published by ${author.name}`}
          center={false}
        />
      </section>
    </main>
  );
};
export default AuthorPageContent;
