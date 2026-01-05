// components/articles/ArticleHeader.tsx

import ShareButton from "../common/ShareButton";

interface ArticleHeaderProps {
  category: string;
}

export default function ArticleHeader({ category }: ArticleHeaderProps) {
  return (
    <div className="mb-4 flex justify-between px-4 items-center lg:mb-8 lg:pl-24 lg:pr-8">
      <h3 className="text-2xl text-primary-red">{category}</h3>
      <ShareButton />
    </div>
  );
}
