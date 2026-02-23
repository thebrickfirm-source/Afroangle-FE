import LocaleLink from "../common/LocaleLink";
import ShareButton from "../common/ShareButton";

interface ArticleHeaderProps {
  category: {
    name: string;
    slug: string;
  };
  dict: {
    common: {
      buttons: {
        share: string;
        copied: string;
      };
    };
  };
}

export default function ArticleHeader({ category, dict }: ArticleHeaderProps) {
  return (
    <div className="mb-4 flex justify-between px-4 items-center lg:mb-8 lg:pl-24 lg:pr-8">
      <LocaleLink href={`/categories/${category.slug}`}>
        <h3 className="text-2xl text-primary-red">{category.name}</h3>
      </LocaleLink>
      <ShareButton dict={dict} />
    </div>
  );
}
